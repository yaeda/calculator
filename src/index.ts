import { evaluate } from "./calculator.js";

const DEFAULT_DIGITS = 10;

/**
 * @typedef {Object} Option
 * @property {number} digits - The number of decimal places to round the result to.
 */
export type Option = {
  digits: number;
};

/**
 * Evaluates a mathematical expression and returns the result rounded to a specified number of decimal places.
 *
 * @param {string} expr - The mathematical expression to evaluate.
 * @param {Option} [option] - Optional settings.
 * @param {number} [option.digits=10] - The number of decimal places to round the result to. Defaults to 10 if not provided.
 * @returns {number|null} The evaluated result rounded to the specified number of decimal places, or null if an error occurs.
 *
 * @example
 * // Returns 7
 * calc("1 + 2 * 3");
 *
 * @example
 * // Returns 2.71828
 * calc("2.718281828459", { digits: 5 });
 *
 * @example
 * // Returns null (invalid expression)
 * calc("invalid expression");
 */
export const calc = (expr: string, option?: Option) => {
  const digits = option?.digits ?? DEFAULT_DIGITS;
  const factor = 10 ** digits;

  try {
    return Math.round(evaluate(expr) * factor) / factor;
  } catch (e) {
    return null;
  }
};
