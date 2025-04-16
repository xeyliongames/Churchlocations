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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("@chakra-ui/react");
var react_2 = __importDefault(require("react"));
var client_1 = __importDefault(require("react-dom/client"));
var App_1 = __importDefault(require("./App"));
var rootElement = document.getElementById("root");
var root = client_1["default"].createRoot(rootElement);
root.render((0, jsx_runtime_1.jsx)(react_2["default"].StrictMode, { children: (0, jsx_runtime_1.jsx)(react_1.ChakraProvider, __assign({ value: react_1.defaultSystem }, { children: (0, jsx_runtime_1.jsx)(App_1["default"], {}, void 0) }), void 0) }, void 0));
