"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.fetchData = void 0;
function convertGeoJSONPolygonToArcGIS(geoJsonPolygon, wkid) {
    if (wkid === void 0) { wkid = 4326; }
    // Validate input
    if (!geoJsonPolygon || geoJsonPolygon.type !== 'Polygon') {
        throw new Error('Input must be a valid GeoJSON Polygon');
    }
    // Convert coordinates to rings format
    var rings = geoJsonPolygon.coordinates;
    // Return ArcGIS format geometry object (not the full query object)
    return {
        rings: rings,
        spatialReference: {
            wkid: wkid
        }
    };
}
function fetchData(polygonCoords) {
    return __awaiter(this, void 0, void 0, function () {
        var esriGeometry, arcgisUrl, featureParams, featuresUrl, featuresResponse, geoJsonData, aggregateStats_1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    esriGeometry = convertGeoJSONPolygonToArcGIS(polygonCoords);
                    console.log("Formatted ESRI geometry:", JSON.stringify(esriGeometry));
                    arcgisUrl = "https://gisweb.charlottesville.org/cvgisweb/rest/services/OpenData_1/MapServer/83/query";
                    featureParams = new URLSearchParams();
                    featureParams.append("outFields", "*");
                    featureParams.append("where", "1=1");
                    featureParams.append("f", "geojson");
                    featureParams.append("geometry", JSON.stringify(esriGeometry)); // Just stringify once
                    featureParams.append("geometryType", "esriGeometryPolygon");
                    featureParams.append("spatialRel", "esriSpatialRelIntersects");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    featuresUrl = arcgisUrl + "?" + featureParams.toString();
                    console.log("Features URL:", featuresUrl);
                    return [4 /*yield*/, fetch(featuresUrl)];
                case 2:
                    featuresResponse = _a.sent();
                    return [4 /*yield*/, featuresResponse.json()];
                case 3:
                    geoJsonData = _a.sent();
                    console.log("GeoJSON response:", geoJsonData);
                    aggregateStats_1 = {
                        TotalRoofArea: 0,
                        UsableRoofArea: 0,
                        PercentUsable: 0,
                        PotentialSystemSize: 0,
                        ProjectedAnnualKWH: 0,
                        ProjectedAnnualSavings: 0
                    };
                    if (geoJsonData.features && geoJsonData.features.length > 0) {
                        geoJsonData.features.forEach(function (feature) {
                            var props = feature.properties;
                            aggregateStats_1.TotalRoofArea += Number(props.TotalRoofArea) || 0;
                            aggregateStats_1.UsableRoofArea += Number(props.UsableRoofArea) || 0;
                            aggregateStats_1.PotentialSystemSize += Number(props.PotentialSystemSize) || 0;
                            aggregateStats_1.ProjectedAnnualKWH += Number(props.ProjectedAnnualKWH) || 0;
                            aggregateStats_1.ProjectedAnnualSavings += Number(props.ProjectedAnnualSavings) || 0;
                        });
                        // Calculate average percent usable
                        if (geoJsonData.features.length > 0) {
                            aggregateStats_1.PercentUsable = geoJsonData.features.reduce(function (acc, feature) {
                                return acc + (Number(feature.properties.PercentUsable) || 0);
                            }, 0) / geoJsonData.features.length;
                        }
                        console.log("Aggregate stats:", aggregateStats_1);
                    }
                    return [2 /*return*/, {
                            geoJsonData: geoJsonData,
                            aggregateStats: aggregateStats_1
                        }];
                case 4:
                    error_1 = _a.sent();
                    console.error("Error fetching data:", error_1);
                    throw error_1;
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.fetchData = fetchData;
