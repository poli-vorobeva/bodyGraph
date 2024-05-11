import { SHAPES, tDrawDataItem } from "./Canvas";
import { RECTANGLE_EDGE_LENGHT, TRIANGLE_EDGE_LENGHT } from "./mathFunctions";

export const enum CENTER_NAME {
  HEAD = "Head",
  AJNA = "Ajna",
  THROAT = "Throat",
  G = "G",
  SACRAL = "Sacral",
  ROOT = "Root",
  SPLEEN = "Spleen",
  SOLAR = "Solar",
  HEART = "Heart",
}
export const drawData = (width: number): tDrawDataItem[] => {
  return [
    {
      title: CENTER_NAME.HEAD,
      shape: SHAPES.TRIANGLE,
      gates: ["", "", 63, 61, 64, ""],
      rotateAngle: 0,
      startCoordinates: [Math.floor(width / 2), 0],
      edgeWidth: TRIANGLE_EDGE_LENGHT,
    },
    {
      title: CENTER_NAME.AJNA,
      shape: SHAPES.TRIANGLE,
      gates: [43, 17, 47, 24, 4, 11],
      rotateAngle: 180,
      startCoordinates: [Math.floor(width / 2), 70],
      edgeWidth: TRIANGLE_EDGE_LENGHT,
    },
    {
      title: CENTER_NAME.THROAT,
      shape: SHAPES.RECTANGLE,
      gates: [62, 23, 56, 35, 12, 45, 33, 8, 31, 20, "", 16],
      rotateAngle: 0,
      get startCoordinates() {
        return [Math.floor(width / 2 - this.edgeWidth / 2), 200];
      },
      edgeWidth: RECTANGLE_EDGE_LENGHT,
    },

    {
      title: CENTER_NAME.G,
      shape: SHAPES.RECTANGLE,
      gates: [1, 13, 25, 46, 2, 15, 10, 7],
      rotateAngle: 45,
      get startCoordinates() {
        return [Math.floor(width / 2 - this.edgeWidth / 2), 320];
      },
      edgeWidth: RECTANGLE_EDGE_LENGHT,
    },
    {
      title: CENTER_NAME.SACRAL,
      shape: SHAPES.RECTANGLE,
      gates: [5, 14, 29, "", "", 59, 9, 3, 42, 27, "", 34],
      rotateAngle: 0,
      get startCoordinates() {
        return [Math.floor(width / 2 - this.edgeWidth / 2), 450];
      },
      edgeWidth: RECTANGLE_EDGE_LENGHT,
    },
    {
      title: CENTER_NAME.ROOT,
      shape: SHAPES.RECTANGLE,
      gates: [53, 60, 52, 19, 39, 41, "", "", "", 58, 38, 54],
      rotateAngle: 0,
      get startCoordinates() {
        return [Math.floor(width / 2 - this.edgeWidth / 2), 580];
      },
      edgeWidth: RECTANGLE_EDGE_LENGHT,
    },
    {
      title: CENTER_NAME.SPLEEN,
      shape: SHAPES.TRIANGLE,
      gates: [50, 32, 28, 18, "", "", 48, 57, 44],
      rotateAngle: 90,
      get startCoordinates() {
        return [this.edgeWidth / 2, 430];
      },
      edgeWidth: RECTANGLE_EDGE_LENGHT,
    },
    {
      title: CENTER_NAME.SOLAR,
      shape: SHAPES.TRIANGLE,
      gates: [6, 37, 22, 36, "", "", 30, 55, 49],
      rotateAngle: 270,
      get startCoordinates() {
        return [width - this.edgeWidth / 2, 430];
      },
      edgeWidth: RECTANGLE_EDGE_LENGHT,
    },
    {
      title: CENTER_NAME.SPLEEN,
      shape: SHAPES.TRIANGLE,
      gates: [40, "", 26, 51, 21, ""],
      rotateAngle: 110,
      get startCoordinates() {
        return [width / 2 + this.edgeWidth * 1.2, 350];
      },
      edgeWidth: RECTANGLE_EDGE_LENGHT,
      extraAngles: [80, 40],
    },
  ];
};

export const getesRelations = [
  [64, 47],
  [61, 24],
  [63, 4],
  [17, 62],
  [43, 23],
  [11, 56],
  [16, 48],
  [20, 57],
  [31, 7],
  [8, 1],
  [33, 13],
  [45, 21],
  [12, 22],
  [35, 36],
  [25, 51],
  [15, 5],
  [40, 37],
  [2, 14],
  [46, 29],
  [44, 26],
  [50, 27],
  [59, 6],
  [32, 54],
  [28, 38],
  [18, 58],
  [19, 49],
  [39, 55],
  [41, 30],
];
