'use strict'

var CalcStateMachine = require('../src/calc-state-machine');

function isEqual(str) {
  return str === '=';
}

function isOperator(str) {
  return '+-*/'.indexOf(str) !== -1;
}

function isNumber(str) {
  return /^\-?([1-9]\d*|0)(\.\d+)?$/.test(str);
}

function calc(expr) {
  var csm = new CalcStateMachine();

  // assume whitespace separated expression like '2 + 3.5 ='

  expr.split(/\s+/).forEach(function(arg) {
    if (isEqual(arg)) {
      csm.addEqual();
    } else if (isOperator(arg)) {
      csm.addOperator(arg);
    } else if (isNumber(arg)) {
      csm.addNumber(arg);
    } else {
      throw 'Illegal expression';
    }
  });

  return csm.getAnswer();
}

module.exports = calc;
