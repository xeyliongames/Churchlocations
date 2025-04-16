import  { useEffect, useState } from "react";
import { useFelt } from "./utils/context";
import {
  Button,
  Heading,
  Text,
  VStack,
  Box,
  Spinner,
  HStack,
  IconButton,
  Center,
} from "@chakra-ui/react";
import { GeoJsonGeometry } from "@feltmaps/js-sdk";
import { AggregateStats, fetchData } from "./utils/fetchData";

import { DataTable } from "./Table";
import { layerStyle } from "./utils/layerStyle";
import { MdOutlineClose } from "react-icons/md";

type State = "idle" | "drawing" | "loading" | "dataLoaded" | "error";

export function Info() {
  const felt = useFelt();
  const [state, setState] = useState<State>("idle");
  const [geometry, setGeometry] = useState<GeoJsonGeometry | null>(null);
  const [stats, setStats] = useState<AggregateStats | null>(null);
  const [layerId, setLayerId] = useState<string | null>(null);
  const [elementId, setElementId] = useState<string | null>(null);

  function clear() {
    if (elementId) {
      felt.deleteElement(elementId);
    }
    if (layerId) {
      felt.deleteLayer(layerId);
    }
    setLayerId(null);
    setElementId(null);
    setGeometry(null);
    setStats(null);
  }

  useEffect(() => {
    if (state === "drawing") {
      felt.setToolSettings({
        tool: "polygon",
        fillOpacity: 0,
      });

      felt.setTool("polygon");
    } else if (state === "idle") {
      clear();
    }
  }, [felt, state]);

  useEffect(() => {
    const unsubscribeToolChange = felt.onToolChange({
      handler: (tool) => {
        if (tool === null) {
          setState("idle");
        }
      },
    });

    const unsubscribeElementCreateEnd = felt.onElementCreateEnd({
      handler: async ({ element }) => {
        if (element.type === "Polygon") {
          felt.clearSelection();
          const polygonCoords = await felt.getElementGeometry(element.id);
          if (!polygonCoords) {
            setState("idle");
            return;
          }

          setGeometry(polygonCoords);
          setElementId(element.id);
        }
      },
    });

    return () => {
      unsubscribeElementCreateEnd();
      unsubscribeToolChange();
    };
  }, [felt]);

  useEffect(() => {
    if (geometry) {
      setState("loading");
      fetchData(geometry).then(({ geoJsonData, aggregateStats }) => {
        felt
          .createLayersFromGeoJson({
            name: "Usable roof area",
            source: {
              type: "geoJsonData",
              data: geoJsonData,
            },
            geometryStyles: {
              Polygon: layerStyle,
            },
          })
          .then((data) => {
            const id = data?.layers.at(0)?.id;
            if (!id) {
              setState("error");
              return;
            }
            setLayerId(id);
            setStats(aggregateStats);
            setState("dataLoaded");
          });
      });
    }
  }, [geometry]);

  useEffect(() => {
    if (!elementId || !layerId) return;
    const unsubscribe = felt.onElementDelete({
      options: { id: elementId },
      handler: () => {
        setState("idle");
      },
    });
    return unsubscribe;
  }, [felt, elementId, layerId]);

  if (state === "idle") {
    return (
      <Button onClick={() => setState("drawing")} m="12px">
        Draw polygon
      </Button>
    );
  }

  if (state === "drawing") {
    return (
      <Button onClick={() => setState("idle")} m="12px">
        Cancel drawing
      </Button>
    );
  }

  return (
    <Box
      margin="12px"
      padding="8px 16px 16px 16px"
      boxShadow="0px 0px 1px rgba(24, 39, 75, 0.22), 0px 6px 12px -6px rgba(24, 39, 75, 0.12), 0px 8px 24px -4px rgba(24, 39, 75, 0.08)"
      borderRadius="8px"
      backgroundColor="rgba(17,17,17,0.8)"
      backdropFilter="blur(10px)"
      width="385px"
    >
      <VStack gap={1} alignItems="flex-start">
        <HStack justifyContent="space-between" width="100%">
          <Heading
            fontFamily="Atlas Grotesk LC Web, Arial, sans-serif"
            fontWeight="bold"
            fontSize="16px"
          >
            Area Statistics
          </Heading>
          <IconButton
            onClick={() => setState("idle")}
            variant="ghost"
            marginRight="-6px"
          >
            {" "}
            <MdOutlineClose />
          </IconButton>
        </HStack>
        {state === "loading" ? (
          <Center h="80px" w="100%">
            <Spinner />
          </Center>
        ) : state === "error" ? (
          <VStack gap={3} alignItems="flex-start">
            <Text>Something went wrong...</Text>
            <Button onClick={() => {
              clear();
              setState("drawing");
            }}>Retry</Button>
          </VStack>
        ) : (
          <DataTable stats={stats} />
        )}
      </VStack>
    </Box>
  );
}
