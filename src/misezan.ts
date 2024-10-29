// source : https://github.com/Ran350/misezan/blob/main/packages/misezan/src/misezan.ts
// license: https://github.com/Ran350/misezan/blob/main/packages/misezan/LICENCE
// MIT License
//
// Copyright (c) 2023 Ran350
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

export const misezan = (a: number, b: number) => {
  // 同じ数字を見せると0になる
  // 自分と同じ格好の人を見ると気まずくなりその場を離れるから
  if (a === b) return 0;

  //お互いが生き別れの兄弟と勘違いして近づいてしまうから
  if ((a === 6 && b === 9) || (a === 9 && b === 6)) return 11;

  // お互いが生き別れの兄弟と勘違いして近寄るがよく見ると全然違うことに気付きびっくりして携帯「.」を落としてしまうから
  if ((a === 2 && b === 5) || (a === 5 && b === 2)) return 1.1;

  // 100は大群だから1が逃げられへんくなって、腹括って頑張って17人倒すから
  if ((a === 1 && b === 100) || (a === 100 && b === 1)) return 83;

  // 小さい数字に大きい数字を見せると大きい数字が残る。
  // （大きい人を見るとこわくて逃げたくなるため。）
  return Math.max(a, b);
};
