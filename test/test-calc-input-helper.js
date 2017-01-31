'use strict'

var assert = require('assert');
var CalcInputHelper = require('../src/calc-input-helper');

var cih = new CalcInputHelper();
assert.strictEqual(cih.getNumberAsString(), '0');

cih.removeTail();
assert.strictEqual(cih.getNumberAsString(), '0');

cih.addDigit(0);
assert.strictEqual(cih.getNumberAsString(), '0');

cih.addDigit(1);
assert.strictEqual(cih.getNumberAsString(), '1');

cih.addDigit(2);
assert.strictEqual(cih.getNumberAsString(), '12');

cih.addDigit(3);
assert.strictEqual(cih.getNumberAsString(), '123');

cih.removeTail();
assert.strictEqual(cih.getNumberAsString(), '12');

cih.addPeriod();
assert.strictEqual(cih.getNumberAsString(), '12.');

cih.removeTail();
assert.strictEqual(cih.getNumberAsString(), '12');

cih.addPeriod();
assert.strictEqual(cih.getNumberAsString(), '12.');

cih.addDigit(3);
assert.strictEqual(cih.getNumberAsString(), '12.3');

cih.addDigit(4);
assert.strictEqual(cih.getNumberAsString(), '12.34');

cih.toggleSign();
assert.strictEqual(cih.getNumberAsString(), '-12.34');

cih.toggleSign();
assert.strictEqual(cih.getNumberAsString(), '12.34');

cih.clear();
assert.strictEqual(cih.getNumberAsString(), '0');

cih.toggleSign();
assert.strictEqual(cih.getNumberAsString(), '0');

cih.addDigit(3);
assert.strictEqual(cih.getNumberAsString(), '3');

cih.toggleSign();
assert.strictEqual(cih.getNumberAsString(), '-3');

cih.removeTail();
assert.strictEqual(cih.getNumberAsString(), '0');
