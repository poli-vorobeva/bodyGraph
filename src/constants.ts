export const CANVAS_WIDTH = 600;

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

export enum COLORS {
  BLACK = "black",
  RED = "red",
}
export enum SHAPES {
  TRIANGLE = "triangle",
  RECTANGLE = "rectangle",
}
export type tDrawDataItem = {
  title: CENTER_NAME;
  shape: SHAPES;
  gates: (string | number)[];
  rotateAngle: number;
  startCoordinates: number[];
  edgeWidth: number;
  extraAngles?: [number, number];
};
