export const layerStyle = {
  type: "numeric",
  config: {
    steps: [0, 20, 40, 60, 80],
    numericAttribute: "PercentUsable",
  },
  paint: {
    color: "@ylRed",
    opacity: 1,
  },
  legend: {
    displayName: {
      "0": "0 - 20%",
      "1": "20 - 40%",
      "2": "40 - 60%",
      "3": "60 - 80%",
    },
  },
}