import {
  alt,
  apply,
  buildLexer,
  expectEOF,
  expectSingleResult,
  kmid,
  lrec_sc,
  rule,
  seq,
  str,
  tok,
  Token,
} from "typescript-parsec";
import { misezan } from "./misezan.js";

enum TokenKind {
  Number,
  Add,
  Sub,
  Mul,
  Div,
  Power,
  Sqrt,
  Mise,
  LParen,
  RParen,
  Space,
}

const lexer = buildLexer([
  [true, /^\d+(\.\d+)?/g, TokenKind.Number],
  [true, /^\+/g, TokenKind.Add],
  [true, /^-/g, TokenKind.Sub],
  [true, /^\*/g, TokenKind.Mul],
  [true, /^\//g, TokenKind.Div],
  [true, /^\^/g, TokenKind.Power],
  [true, /^sqrt/g, TokenKind.Sqrt],
  [true, /^@/g, TokenKind.Mise],
  [true, /^\(/g, TokenKind.LParen],
  [true, /^\)/g, TokenKind.RParen],
  [false, /^\s+/g, TokenKind.Space],
]);

function applyNumber(value: Token<TokenKind.Number>): number {
  return +value.text;
}

function applyUnary(value: [Token<TokenKind>, number]): number {
  switch (value[0].text) {
    case "+":
      return +value[1];
    case "-":
      return -value[1];
    case "sqrt":
      return Math.sqrt(value[1]);
    default:
      throw new Error(`Unknown unary operator: ${value[0].text}`);
  }
}

function applyBinary(
  first: number,
  second: [Token<TokenKind>, number]
): number {
  switch (second[0].text) {
    case "+":
      return first + second[1];
    case "-":
      return first - second[1];
    case "*":
      return first * second[1];
    case "/":
      return first / second[1];
    case "^":
      return first ** second[1];
    case "@":
      return misezan(first, second[1]);
    default:
      throw new Error(`Unknown binary operator: ${second[0].text}`);
  }
}

const BASE = rule<TokenKind, number>();
const FACTOR = rule<TokenKind, number>();
const TERM = rule<TokenKind, number>();
const EXP = rule<TokenKind, number>();

/*
BASE
  = NUMBER
  = ('+' | '-' | 'sqrt') BASE
  = '(' EXP ')'
  = NUMBER '(' EXP ')'
*/
BASE.setPattern(
  alt(
    apply(tok(TokenKind.Number), applyNumber),
    apply(seq(alt(str("+"), str("-"), str("sqrt")), BASE), applyUnary),
    kmid(str("("), EXP, str(")")),
    apply(
      seq(tok(TokenKind.Number), kmid(str("("), EXP, str(")"))),
      ([left, right]) => applyNumber(left) * right
    )
  )
);

/*
FACTOR
  = BASE
  = BASE '^' FACTOR
*/
FACTOR.setPattern(
  alt(
    BASE,
    apply(seq(BASE, str("^"), FACTOR), ([left, op, right]) =>
      applyBinary(left, [op, right])
    )
  )
);

/*
TERM
  = FACTOR
  = TERM ('*' | '/' | '@') FACTOR
*/
TERM.setPattern(
  lrec_sc(FACTOR, seq(alt(str("*"), str("/"), str("@")), FACTOR), applyBinary)
);

/*
EXP
  = TERM
  = EXP ('+' | '-') TERM
*/
EXP.setPattern(lrec_sc(TERM, seq(alt(str("+"), str("-")), TERM), applyBinary));

export const evaluate = (expr: string): number => {
  return expectSingleResult(expectEOF(EXP.parse(lexer.parse(expr))));
};
