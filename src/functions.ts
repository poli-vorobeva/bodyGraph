export const sliceGatedByEdges = (gates: number[], edgesCount: number) => {
  const slicedGates = [];
  let currentStep = 0;
  while (currentStep * edgesCount <= gates.length - 1) {
    slicedGates.push(gates.slice(currentStep * edgesCount, currentStep * edgesCount + edgesCount));
    currentStep += 1;
  }
  return slicedGates;
};

//Canvas functions

export function gateText(ctx: CanvasRenderingContext2D, text: string, x: never, y: never) {
  ctx.beginPath();
  ctx.font = "60px Arial";
  ctx.fillStyle = "white";
  ctx.fillText(text, x, y);
  ctx.closePath();
}
