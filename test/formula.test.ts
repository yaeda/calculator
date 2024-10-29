import { expect, test } from "vitest";
import { calc } from "../src/index.js";

test("simple number [+, -]", () => {
  expect(calc("1")).toBe(1);
  expect(calc("+1.5")).toBe(1.5);
  expect(calc("-0.5")).toBe(-0.5);
  expect(calc("1 + 2 * 3 + 4")).toBe(11);
  expect(calc("(1 + 2) * (3 + 4)")).toBe(21);
});

test("add / sub [+, -]", () => {
  expect(calc("1 + 2")).toBe(3);
  expect(calc("1 - 2")).toBe(-1);
  expect(calc("- 5 - 3")).toBe(-8);
  expect(calc("+ 5 - 3")).toBe(2);
  expect(calc("1.2+-3.4")).toBe(-2.2);
  expect(calc("1.2--3.4")).toBe(4.6);
});

test("mul / div [*, /]", () => {
  expect(calc("1 * 2")).toBe(2);
  expect(calc("1 / 2")).toBe(0.5);
  expect(calc("1 * 2 * 3")).toBe(6);
  expect(calc("1 / 2 / 5")).toBe(0.1);
});

test("add / sub / mul / div [+, -, *, /]", () => {
  expect(calc("1 * 2 + 3 / 4 -  5")).toBe(-2.25);
  expect(calc("1 / 2 / -5")).toBe(-0.1);
});

test("parent [(, )]", () => {
  expect(calc("2 * (3 + 4)")).toBe(14);
  expect(calc("2 * (2 * (3 + 4))")).toBe(28);
  expect(calc("3 * (2 * (2 * (3 + 4)))")).toBe(84);
  expect(calc("3 * (2 * (2 * (3 + 4)))")).toBe(84);
});

test("power [^]", () => {
  expect(calc("2^3")).toBe(2 ** 3);
  expect(calc("2 ^ 3 ^ 2")).toBe(2 ** (3 ** 2));
  expect(calc("(2 ^ 3) ^ 2")).toBe((2 ** 3) ** 2);
  expect(calc("2^0")).toBe(1);
  expect(calc("2^(-1)")).toBe(0.5);
  expect(calc("2 * 2 ^ 2")).toBe(2 * 2 ** 2);
});

test("misezan [@]", () => {
  expect(calc("1 @ 1")).toBe(0);
  expect(calc("2 @ 1")).toBe(2);
  expect(calc("1 @ 2")).toBe(2);
  expect(calc("6 @ 9")).toBe(11);
  expect(calc("9 @ 6")).toBe(11);
  expect(calc("2 @ 5")).toBe(1.1);
  expect(calc("5 @ 2")).toBe(1.1);
  expect(calc("1 @ 100")).toBe(83);
  expect(calc("100 @ 1")).toBe(83);
  expect(calc("2 * 1 @ 1")).toBe(2);
  expect(calc("2 * (1 @ 1)")).toBe(0);
});

test("square root [sqrt]", () => {
  expect(calc("sqrt4")).toBe(2);
  expect(calc("sqrt16")).toBe(4);
  expect(calc("sqrt4*2")).toBe(4);
  expect(calc("sqrt4+5")).toBe(7);
  expect(calc("sqrt(4+5)")).toBe(3);
});

test("* omit before (", () => {
  expect(calc("2(3+4)")).toBe(14);
});
