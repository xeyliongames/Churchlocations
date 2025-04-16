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
exports.DataTable = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("@chakra-ui/react");
function DataTable(_a) {
    var stats = _a.stats;
    return ((0, jsx_runtime_1.jsx)(react_1.VStack, __assign({ gap: 4, alignItems: "flex-end", width: "100%" }, { children: stats && ((0, jsx_runtime_1.jsx)(react_1.Box, { children: (0, jsx_runtime_1.jsxs)(react_1.Table.Root, __assign({ variant: "outline", fontSize: "14px" }, { children: [(0, jsx_runtime_1.jsx)(react_1.Table.Header, { children: (0, jsx_runtime_1.jsxs)(react_1.Table.Row, { children: [(0, jsx_runtime_1.jsx)(react_1.Table.ColumnHeader, { children: "Metric" }, void 0), (0, jsx_runtime_1.jsx)(react_1.Table.ColumnHeader, __assign({ textAlign: "right" }, { children: "Value" }), void 0)] }, void 0) }, void 0), (0, jsx_runtime_1.jsxs)(react_1.Table.Body, { children: [(0, jsx_runtime_1.jsxs)(react_1.Table.Row, { children: [(0, jsx_runtime_1.jsx)(react_1.Table.Cell, __assign({ fontWeight: "medium" }, { children: "Total Roof Area" }), void 0), (0, jsx_runtime_1.jsxs)(react_1.Table.Cell, __assign({ textAlign: "right" }, { children: [formatNumber(stats.TotalRoofArea), " sq ft"] }), void 0)] }, void 0), (0, jsx_runtime_1.jsxs)(react_1.Table.Row, { children: [(0, jsx_runtime_1.jsx)(react_1.Table.Cell, __assign({ fontWeight: "medium" }, { children: "Usable Roof Area" }), void 0), (0, jsx_runtime_1.jsxs)(react_1.Table.Cell, __assign({ textAlign: "right" }, { children: [formatNumber(stats.UsableRoofArea), " sq ft"] }), void 0)] }, void 0), (0, jsx_runtime_1.jsxs)(react_1.Table.Row, { children: [(0, jsx_runtime_1.jsx)(react_1.Table.Cell, __assign({ fontWeight: "medium" }, { children: "Average Percent Usable" }), void 0), (0, jsx_runtime_1.jsxs)(react_1.Table.Cell, __assign({ textAlign: "right" }, { children: [formatNumber(stats.PercentUsable), "%"] }), void 0)] }, void 0), (0, jsx_runtime_1.jsxs)(react_1.Table.Row, { children: [(0, jsx_runtime_1.jsx)(react_1.Table.Cell, __assign({ fontWeight: "medium" }, { children: "Total Potential System Size" }), void 0), (0, jsx_runtime_1.jsxs)(react_1.Table.Cell, __assign({ textAlign: "right" }, { children: [formatNumber(stats.PotentialSystemSize), " kW"] }), void 0)] }, void 0), (0, jsx_runtime_1.jsxs)(react_1.Table.Row, { children: [(0, jsx_runtime_1.jsx)(react_1.Table.Cell, __assign({ fontWeight: "medium" }, { children: "Total Projected Annual kWh" }), void 0), (0, jsx_runtime_1.jsxs)(react_1.Table.Cell, __assign({ textAlign: "right" }, { children: [formatNumber(stats.ProjectedAnnualKWH), " kWh"] }), void 0)] }, void 0), (0, jsx_runtime_1.jsxs)(react_1.Table.Row, { children: [(0, jsx_runtime_1.jsx)(react_1.Table.Cell, __assign({ fontWeight: "medium" }, { children: "Total Projected Annual Savings" }), void 0), (0, jsx_runtime_1.jsxs)(react_1.Table.Cell, __assign({ textAlign: "right" }, { children: ["$", formatNumber(stats.ProjectedAnnualSavings)] }), void 0)] }, void 0)] }, void 0)] }), void 0) }, void 0)) }), void 0));
}
exports.DataTable = DataTable;
var formatNumber = function (num) {
    return num.toLocaleString(undefined, { maximumFractionDigits: 2 });
};
