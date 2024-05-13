import { createSlice } from "@reduxjs/toolkit";

export type tGatePaths = [number, number][];

type IState = {
  gatePaths: tGatePaths;
  gateRelations: Record<number, number>;
  activeGates: number[];
};
const paths: [number, number][] = [
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
  [42, 53],
  [3, 60],
  [9, 52],
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
const sortedGates = paths.flat().sort((a, b) => a - b);
const pathsToRelate = () => {
  const relateObject: Record<number, number> = {};
  paths.forEach(([p1, p2]: [number, number]) => {
    relateObject[p1] = p2;
    relateObject[p2] = p1;
  });
  return relateObject;
};
const initialState: IState = {
  gatePaths: [...paths],
  gateRelations: pathsToRelate(),
  activeGates: [],
};

const graphSlice = createSlice({
  name: "graph",
  initialState,
  reducers: {
    onRandomGates: (state: IState) => {
      const activeGatesCount = Math.floor(sortedGates.length - Math.random() * sortedGates.length);
      const gatesToActive: Set<number> = new Set();
      let currentStep = 0;
      while (currentStep < activeGatesCount) {
        const randomEl = Math.floor(Math.random() * sortedGates.length);
        if (!gatesToActive.has(sortedGates[randomEl])) {
          gatesToActive.add(sortedGates[randomEl]);
          currentStep++;
        }
      }
      state.activeGates = [...gatesToActive];
    },
    clearState: (state: IState) => {
      state.activeGates = [];
    },
  },
});

export const { onRandomGates, clearState } = graphSlice.actions;

export default graphSlice.reducer;
