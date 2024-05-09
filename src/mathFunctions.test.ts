import { describe, expect, test } from "vitest";
import { moveByX } from "./mathFunctions";

describe("from Left to right", () => {
  test("", () => {
    expect(moveByX(50, 100, 2)).toBe(50);
  });
});
