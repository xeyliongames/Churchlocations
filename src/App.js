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
exports.__esModule = true;
var jsx_runtime_1 = require("react/jsx-runtime");
var consts_1 = require("./utils/consts");
var context_1 = require("./utils/context");
var useFeltEmbed_1 = require("./utils/useFeltEmbed");
var Map_1 = require("./Map");
var react_1 = require("@chakra-ui/react");
var Info_1 = require("./Info");
function App() {
    var _a = (0, useFeltEmbed_1.useFeltEmbed)(consts_1.MAP_ID, {
        uiControls: {
            cooperativeGestures: false,
            fullScreenButton: false,
            zoomControls: false
        },
        initialViewport: {
            center: {
                latitude: 38.027813,
                longitude: -78.476674
            },
            zoom: 17
        }
    }), felt = _a.felt, mapRef = _a.mapRef;
    return ((0, jsx_runtime_1.jsx)(react_1.Theme, __assign({ appearance: "dark" }, { children: (0, jsx_runtime_1.jsxs)(react_1.Box, __assign({ position: "relative" }, { children: [(0, jsx_runtime_1.jsx)(react_1.Box, __assign({ width: "100vw", height: "100vh", position: "absolute" }, { children: (0, jsx_runtime_1.jsx)(Map_1.Map, { mapRef: mapRef, loading: !felt }, void 0) }), void 0), felt && ((0, jsx_runtime_1.jsx)(context_1.FeltContext.Provider, __assign({ value: felt }, { children: (0, jsx_runtime_1.jsx)(react_1.Box, __assign({ zIndex: 1, position: "fixed", right: "0", top: "0" }, { children: (0, jsx_runtime_1.jsx)(Info_1.Info, {}, void 0) }), void 0) }), void 0))] }), void 0) }), void 0));
}
exports["default"] = App;
