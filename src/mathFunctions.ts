export function rotateTriangleCoordinates(
  p1x: number,
  p2x: number,
  p3x: number,
  p1y: number,
  p2y: number,
  p3y: number,
  angle: number,
) {
  const center = getCenterCoordinates(p1x, p2x, p3x, p1y, p2y, p3y);
  const newwCoords1 = getPointRotateCoord(
    p1x,
    p1y,
    angle,
    center[0],
    center[1],
  );
  const newwCoords2 = getPointRotateCoord(
    p2x,
    p2y,
    angle,
    center[0],
    center[1],
  );
  const newwCoords3 = getPointRotateCoord(
    p3x,
    p3y,
    angle,
    center[0],
    center[1],
  );
  return [newwCoords1, newwCoords2, newwCoords3];
}

export function getCenterCoordinates(
  x1: number,
  x2: number,
  x3: number,
  y1: number,
  y2: number,
  y3: number,
) {
  const centerX = (x1 + x2 + x3) / 3;
  const centerY = (y1 + y2 + y3) / 3;
  return [centerX, centerY];
}

export function getPointRotateCoord(
  x: number,
  y: number,
  angle: number,
  centerX: number,
  centerY: number,
) {
  // Преобразовать угол в радианы
  const radians = (angle * Math.PI) / 180;

  // Рассчитать новые координаты
  const xPrime =
    (x - centerX) * Math.cos(radians) -
    (y - centerY) * Math.sin(radians) +
    centerX;
  const yPrime =
    (x - centerX) * Math.sin(radians) +
    (y - centerY) * Math.cos(radians) +
    centerY;

  // Вернуть новые координаты
  return { x: xPrime, y: yPrime };
}

export function getTriangleVertexesBySingle(
  angle1: number,
  angle2: number,
  x: number,
  y: number,
) {
  // Вычислить длину стороны a
  const a = 100 / Math.sin((angle1 * Math.PI) / 180);

  // Вычислить координаты второй вершины
  const x2 = x + a * Math.cos((angle1 * Math.PI) / 180);
  const y2 = y + a * Math.sin((angle1 * Math.PI) / 180);

  // Вычислить координаты третьей вершины
  const vx = x2 - x;
  const vy = y2 - y;

  const vx3 =
    vx * Math.cos((angle2 * Math.PI) / 180) -
    vy * Math.sin((angle2 * Math.PI) / 180);
  const vy3 =
    vx * Math.sin((angle2 * Math.PI) / 180) +
    vy * Math.cos((angle2 * Math.PI) / 180);

  const x3 = x + vx3;
  const y3 = y + vy3;
  return [
    [x2, y2],
    [x3, y3],
  ];
}
