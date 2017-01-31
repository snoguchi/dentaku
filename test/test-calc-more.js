'use strict'

var assert = require('assert');
var calc = require('./easy-calc');

function eq(expr, ans) {
  assert.strictEqual(calc(expr), ans);
}

function test_basic() {
  eq('4 - 6 =', '-2');
  eq('1 + 2 / 3 * 4 - 5.5 =', '-1.5');
  eq('2 * -3 =', '-6');
}

function test_Equal_Equal() {
  eq('100 * 1.03 =', '103');
  eq('100 * 1.03 = =', '106.09');
  eq('100 * 1.03 = = =', '109.2727');
}

function test_Operator_Equal() {
  eq('1 + =', '2');
  eq('1 + = + =', '4');
  eq('1 + = + = + =', '8');
}

function test_Number_Equal() {
  eq('1 + 1 =', '2');
  eq('1 + 1 = 5 =', '6');
  eq('1 + 1 = 5 = 10 =', '11');
}

function test_dividedByZero() {
  eq('100 / 0 =', 'Infinity');
  eq('0 / 0 =', 'NaN');
}

function test_decimal() {
  eq('0.7 * 1400 =', '980');
}

function test_bignumber() {
  eq('99999999999999 * =', '9999999999999800000000000001');
  eq('1 / 3 =', '0.33333333333333333333');
}

test_basic();
test_Equal_Equal();
test_Operator_Equal();
test_Number_Equal();
test_dividedByZero();
test_decimal();
test_bignumber();
