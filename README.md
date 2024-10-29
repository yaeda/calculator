# @yaeda/calculator

A simple JavaScript library for evaluating mathematical expressions.

## Features

- Supports basic arithmetic operations (`+`, `-`, `*`, `/`)
- Supports parentheses (`(`, `)`), exponentiation (`^`), and square root (`sqrt`)
- Supports [見せ算](https://dic.nicovideo.jp/a/見せ算) (`@`)
  - same precedence as multiplication and division, and left-associative
- Allows omission of multiplication sign between number and parentheses
- Allows changing the number of decimal places with an option

## Installation

You can install the library via npm:

```bash
npm install @yaeda/calculator
```

## Usage

First, import the `calc` function from the library:

```javascript
import { calc } from "@yaeda/calculator";
```

### Example

Here are some examples of how to use the `calc` function:

```javascript
import { calc } from "@yaeda/calculator";

calc("0.1 + 0.2"); // 0.3
calc("1 * 2 + 3 / 4 -  5"); // -2.25
calc("2 * 2 ^ 2"); // 8
calc("2(3+4)"); // 14

// round to specified decimal places
calc("3.14159265359", { digits: 2 }); // 3.14
calc("1 / 3", { digits: 3 }); // 0.333

// invalid expression
calc("invalid expression"); // null
```

For more examples, please refer to the [test directory](./test).

## API

### `calc`

```typescript
/**
 * Evaluates a mathematical expression and returns the result rounded to a specified number of decimal places.
 *
 * @param {string} expr - The mathematical expression to evaluate.
 * @param {Option} [option] - Optional settings.
 * @param {number} [option.digits=10] - The number of decimal places to round the result to. Defaults to 10 if not provided.
 * @returns {number|null} The evaluated result rounded to the specified number of decimal places, or null if an error occurs.
 */
export const calc: (expr: string, option?: Option) => number | null;
```

### `Option`

```typescript
/**
 * @typedef {Object} Option
 * @property {number} digits - The number of decimal places to round the result to.
 */
export type Option = {
  digits: number;
};
```

## Expression Syntax

The syntax for the mathematical expressions is defined using Extended Backus-Naur Form (EBNF):

```ebnf
<expression> ::= <term> | <expression> ("+" | "-") <term>
<term>       ::= <factor> | <term> ("*" | "/" | "@") <factor>
<factor>     ::= <base> | <base> "^" <factor>
<base>       ::= <number> | ("+" | "-" | "sqrt") <base> | "(" <expression> ")" | <number> "(" <expression> ")"
<number>     ::= \d+(\.\d+)?
```

## References

This library is based on and inspired by the following projects:

- [microsoft/ts-parsec](https://github.com/microsoft/ts-parsec)
- [Ran350/misezan](https://github.com/Ran350/misezan)
