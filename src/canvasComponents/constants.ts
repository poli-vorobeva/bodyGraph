export const CANVAS_WIDTH = 600;
export const CANVAS_HEIGHT = 700;

export const TRIANGLE_EDGE_LENGHT = 100;
export const RECTANGLE_EDGE_LENGHT = 90;

export const DEFAULT_ANGLE = 60;
export const INNER_TRIANGLE_SCALE = 0.55;
export const SHAPE_SIDES_COUNT = 3;

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
export const FONT_SIZE = 12;
export enum PATH_WIDTH {
  ACTIVE = 3,
  REGULAR = 1,
}
export const DRAW_GATES_STEPS = 20;

export enum COLORS {
  BLACK = "black",
  RED = "red",
  GREEN = "yellowgreen",
  BLUE = "midnightblue",
  GREY = "dimgrey",
  WHITE = "white",
  LIGHTGREY = "grey",
  YELLOW = "lightyellow",
  ORANGE = "orangeRed",
}
export enum SHAPES {
  TRIANGLE = "triangle",
  RECTANGLE = "rectangle",
}
export enum SHAPES_EDGES_COUNT {
  TRIANGLE = 3,
  RECTANGLE = 4,
}
export type tDrawDataItem = {
  title: CENTER_NAME;
  shape: SHAPES;
  gates: number[];
  rotateAngle: number;
  startCoordinates: number[];
  edgeWidth: number;
  extraAngles?: [number, number];
  color: COLORS;
};
