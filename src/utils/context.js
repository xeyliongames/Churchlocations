"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.useFelt = exports.FeltContext = void 0;
var react_1 = __importDefault(require("react"));
exports.FeltContext = react_1["default"].createContext({});
var useFelt = function () { return react_1["default"].useContext(exports.FeltContext); };
exports.useFelt = useFelt;
