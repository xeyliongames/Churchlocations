"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.Info = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var context_1 = require("./utils/context");
var react_2 = require("@chakra-ui/react");
var fetchData_1 = require("./utils/fetchData");
var Table_1 = require("./Table");
var layerStyle_1 = require("./utils/layerStyle");
var md_1 = require("react-icons/md");
function Info() {
    var _this = this;
    var felt = (0, context_1.useFelt)();
    var _a = (0, react_1.useState)("idle"), state = _a[0], setState = _a[1];
    var _b = (0, react_1.useState)(null), geometry = _b[0], setGeometry = _b[1];
    var _c = (0, react_1.useState)(null), stats = _c[0], setStats = _c[1];
    var _d = (0, react_1.useState)(null), layerId = _d[0], setLayerId = _d[1];
    var _e = (0, react_1.useState)(null), elementId = _e[0], setElementId = _e[1];
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
    (0, react_1.useEffect)(function () {
        if (state === "drawing") {
            felt.setToolSettings({
                tool: "polygon",
                fillOpacity: 0
            });
            felt.setTool("polygon");
        }
        else if (state === "idle") {
            clear();
        }
    }, [felt, state]);
    (0, react_1.useEffect)(function () {
        var unsubscribeToolChange = felt.onToolChange({
            handler: function (tool) {
                if (tool === null) {
                    setState("idle");
                }
            }
        });
        var unsubscribeElementCreateEnd = felt.onElementCreateEnd({
            handler: function (_a) {
                var element = _a.element;
                return __awaiter(_this, void 0, void 0, function () {
                    var polygonCoords;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                if (!(element.type === "Polygon")) return [3 /*break*/, 2];
                                felt.clearSelection();
                                return [4 /*yield*/, felt.getElementGeometry(element.id)];
                            case 1:
                                polygonCoords = _b.sent();
                                if (!polygonCoords) {
                                    setState("idle");
                                    return [2 /*return*/];
                                }
                                setGeometry(polygonCoords);
                                setElementId(element.id);
                                _b.label = 2;
                            case 2: return [2 /*return*/];
                        }
                    });
                });
            }
        });
        return function () {
            unsubscribeElementCreateEnd();
            unsubscribeToolChange();
        };
    }, [felt]);
    (0, react_1.useEffect)(function () {
        if (geometry) {
            setState("loading");
            (0, fetchData_1.fetchData)(geometry).then(function (_a) {
                var geoJsonData = _a.geoJsonData, aggregateStats = _a.aggregateStats;
                felt
                    .createLayersFromGeoJson({
                    name: "Usable roof area",
                    source: {
                        type: "geoJsonData",
                        data: geoJsonData
                    },
                    geometryStyles: {
                        Polygon: layerStyle_1.layerStyle
                    }
                })
                    .then(function (data) {
                    var _a;
                    var id = (_a = data === null || data === void 0 ? void 0 : data.layers.at(0)) === null || _a === void 0 ? void 0 : _a.id;
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
    (0, react_1.useEffect)(function () {
        if (!elementId || !layerId)
            return;
        var unsubscribe = felt.onElementDelete({
            options: { id: elementId },
            handler: function () {
                setState("idle");
            }
        });
        return unsubscribe;
    }, [felt, elementId, layerId]);
    if (state === "idle") {
        return ((0, jsx_runtime_1.jsx)(react_2.Button, __assign({ onClick: function () { return setState("drawing"); }, m: "12px" }, { children: "Draw polygon" }), void 0));
    }
    if (state === "drawing") {
        return ((0, jsx_runtime_1.jsx)(react_2.Button, __assign({ onClick: function () { return setState("idle"); }, m: "12px" }, { children: "Cancel drawing" }), void 0));
    }
    return ((0, jsx_runtime_1.jsx)(react_2.Box, __assign({ margin: "12px", padding: "8px 16px 16px 16px", boxShadow: "0px 0px 1px rgba(24, 39, 75, 0.22), 0px 6px 12px -6px rgba(24, 39, 75, 0.12), 0px 8px 24px -4px rgba(24, 39, 75, 0.08)", borderRadius: "8px", backgroundColor: "rgba(17,17,17,0.8)", backdropFilter: "blur(10px)", width: "385px" }, { children: (0, jsx_runtime_1.jsxs)(react_2.VStack, __assign({ gap: 1, alignItems: "flex-start" }, { children: [(0, jsx_runtime_1.jsxs)(react_2.HStack, __assign({ justifyContent: "space-between", width: "100%" }, { children: [(0, jsx_runtime_1.jsx)(react_2.Heading, __assign({ fontFamily: "Atlas Grotesk LC Web, Arial, sans-serif", fontWeight: "bold", fontSize: "16px" }, { children: "Area Statistics" }), void 0), (0, jsx_runtime_1.jsxs)(react_2.IconButton, __assign({ onClick: function () { return setState("idle"); }, variant: "ghost", marginRight: "-6px" }, { children: [" ", (0, jsx_runtime_1.jsx)(md_1.MdOutlineClose, {}, void 0)] }), void 0)] }), void 0), state === "loading" ? ((0, jsx_runtime_1.jsx)(react_2.Center, __assign({ h: "80px", w: "100%" }, { children: (0, jsx_runtime_1.jsx)(react_2.Spinner, {}, void 0) }), void 0)) : state === "error" ? ((0, jsx_runtime_1.jsxs)(react_2.VStack, __assign({ gap: 3, alignItems: "flex-start" }, { children: [(0, jsx_runtime_1.jsx)(react_2.Text, { children: "Something went wrong..." }, void 0), (0, jsx_runtime_1.jsx)(react_2.Button, __assign({ onClick: function () {
                                clear();
                                setState("drawing");
                            } }, { children: "Retry" }), void 0)] }), void 0)) : ((0, jsx_runtime_1.jsx)(Table_1.DataTable, { stats: stats }, void 0))] }), void 0) }), void 0));
}
exports.Info = Info;
