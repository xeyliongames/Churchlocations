import { MAP_ID } from "./utils/consts";
import { FeltContext } from "./utils/context";
import { useFeltEmbed } from "./utils/useFeltEmbed";
import { Map } from "./Map";
import { Box, Theme } from "@chakra-ui/react";
import { Info } from "./Info";

export default function App() {
  const { felt, mapRef } = useFeltEmbed(MAP_ID, {
    uiControls: {
      cooperativeGestures: false,
      fullScreenButton: false,
      zoomControls: false,
    },
    initialViewport: {
      center: {
        latitude: 38.027813,
        longitude: -78.476674,
      },
      zoom: 17,
    },
  });

  return (
    <Theme appearance="dark">
      <Box position="relative">
        <Box width="100vw" height="100vh" position="absolute">
          <Map mapRef={mapRef} loading={!felt} />
        </Box>

        {felt && (
          <FeltContext.Provider value={felt}>
            <Box zIndex={1} position="fixed" right="0" top="0">
              <Info />
            </Box>
          </FeltContext.Provider>
        )}
      </Box>
    </Theme>
  );
}
