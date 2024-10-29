import { expect, test } from "vitest";
import { calc } from "../src/index.js";

test("number of decimal place", () => {
  expect(calc("0.12345")).toBe(0.12345);
  expect(calc("0.123456789123456789")).toBe(0.1234567891);
  expect(calc("0.123456789123456789", { digits: 4 })).toBe(0.1235);
  expect(calc("0.12345", { digits: 10 })).toBe(0.12345);
  expect(calc("1 / 3", { digits: 3 })).toBe(0.333);
});
