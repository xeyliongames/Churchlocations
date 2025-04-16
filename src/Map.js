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
exports.Map = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("@chakra-ui/react");
function Map(_a) {
    var mapRef = _a.mapRef, loading = _a.loading;
    return ((0, jsx_runtime_1.jsx)(react_1.Box, __assign({ ref: mapRef, bg: "gray.100", height: "100%", css: {
            "& > iframe": {
                position: "relative",
                zIndex: 1
            }
        } }, { children: loading && ((0, jsx_runtime_1.jsx)(react_1.Center, __assign({ zIndex: 0, position: "absolute", inset: 0 }, { children: (0, jsx_runtime_1.jsxs)(react_1.VStack, __assign({ gap: 3 }, { children: [(0, jsx_runtime_1.jsx)(react_1.Spinner, {}, void 0), (0, jsx_runtime_1.jsx)(react_1.Text, __assign({ fontSize: "sm" }, { children: "Loading map\u2026" }), void 0)] }), void 0) }), void 0)) }), void 0));
}
exports.Map = Map;
