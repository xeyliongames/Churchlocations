import { GeoJsonGeometry } from "@feltmaps/js-sdk";

export interface AggregateStats {
  TotalRoofArea: number;
  UsableRoofArea: number;
  PercentUsable: number;
  PotentialSystemSize: number;
  ProjectedAnnualKWH: number;
  ProjectedAnnualSavings: number;
}

function convertGeoJSONPolygonToArcGIS(
  geoJsonPolygon: any, 
  wkid: number = 4326
): any {
  // Validate input
  if (!geoJsonPolygon || geoJsonPolygon.type !== 'Polygon') {
    throw new Error('Input must be a valid GeoJSON Polygon');
  }

  // Convert coordinates to rings format
  const rings = geoJsonPolygon.coordinates;

  // Return ArcGIS format geometry object (not the full query object)
  return {
    rings: rings,
    spatialReference: {
      wkid: wkid
    }
  };
}

export async function fetchData(polygonCoords: GeoJsonGeometry) {
  // Prepare the polygon for ArcGIS query
  const esriGeometry = convertGeoJSONPolygonToArcGIS(polygonCoords);
  
  console.log("Formatted ESRI geometry:", JSON.stringify(esriGeometry));

  // Electric Power Transmission Lines service URL
  // const arcgisUrl = "https://services1.arcgis.com/Hp6G80Pky0om7QvQ/ArcGIS/rest/services/Electric_Power_Transmission_Lines/FeatureServer/0/query";
  const arcgisUrl = "https://gisweb.charlottesville.org/cvgisweb/rest/services/OpenData_1/MapServer/83/query"
  

  // Query for features in GeoJSON format
  const featureParams = new URLSearchParams();
  featureParams.append("outFields", "*");
  featureParams.append("where", "1=1");
  featureParams.append("f", "geojson");
  featureParams.append("geometry", JSON.stringify(esriGeometry)); // Just stringify once
  featureParams.append("geometryType", "esriGeometryPolygon");
  featureParams.append("spatialRel", "esriSpatialRelIntersects");



  try {

    const featuresUrl = `${arcgisUrl}?${featureParams.toString()}`;
    console.log("Features URL:", featuresUrl);
    const featuresResponse = await fetch(featuresUrl);
    const geoJsonData = await featuresResponse.json();
    console.log("GeoJSON response:", geoJsonData);

    // Calculate aggregate statistics
    const aggregateStats = {
      TotalRoofArea: 0,
      UsableRoofArea: 0,
      PercentUsable: 0,
      PotentialSystemSize: 0,
      ProjectedAnnualKWH: 0,
      ProjectedAnnualSavings: 0,
    };

    if (geoJsonData.features && geoJsonData.features.length > 0) {
      geoJsonData.features.forEach((feature: any) => {
        const props = feature.properties;
        aggregateStats.TotalRoofArea += Number(props.TotalRoofArea) || 0;
        aggregateStats.UsableRoofArea += Number(props.UsableRoofArea) || 0;
        aggregateStats.PotentialSystemSize += Number(props.PotentialSystemSize) || 0;
        aggregateStats.ProjectedAnnualKWH += Number(props.ProjectedAnnualKWH) || 0;
        aggregateStats.ProjectedAnnualSavings += Number(props.ProjectedAnnualSavings) || 0;
      });

      // Calculate average percent usable
      if (geoJsonData.features.length > 0) {
        aggregateStats.PercentUsable = geoJsonData.features.reduce((acc: number, feature: any) => 
          acc + (Number(feature.properties.PercentUsable) || 0), 0) / geoJsonData.features.length;
      }

      console.log("Aggregate stats:", aggregateStats);
    }

    return {
      geoJsonData,
      aggregateStats
    };
    
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
} 
