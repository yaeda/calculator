import { expect, test } from "vitest";
import { calc } from "../src/index.js";

test("IEEE 754 float error", () => {
  expect(calc("0.1 + 0.2")).toBe(0.3);
  expect(calc("1 / 3 * 3")).toBe(1);
});

test("zero divide", () => {
  expect(calc("1 / 0")).toBe(Infinity);
  expect(calc("1 / (3 - 3)")).toBe(Infinity);
});

test("other error", () => {
  expect(calc("")).toBeNull();
  expect(calc("*1")).toBeNull();
  expect(calc("3 = 4")).toBeNull();
  expect(calc("(1+2)(3+4)")).toBeNull();
});
