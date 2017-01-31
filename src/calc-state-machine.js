// cf. http://www.is.akita-u.ac.jp/~sig/PDF/java-calculator-model.pdf

'use strict'

var BigNumber = require('../lib/bignumber');

var operation = {
  '+': function(lhs, rhs) {
    return new BigNumber(lhs).plus(rhs).toString(10);
  },
  '-': function(lhs, rhs) {
    return new BigNumber(lhs).minus(rhs).toString(10);
  },
  '*': function(lhs, rhs) {
    return new BigNumber(lhs).times(rhs).toString(10);
  },
  '/': function(lhs, rhs) {
    return new BigNumber(lhs).dividedBy(rhs).toString(10);
  }
};

var stateMachine = {
  EMPTY: {
    Number: function(reg, num) {
      reg.A = num;
      reg.State = 'ONE_NUM';
    },
    Operator: function(reg, op) {
      reg.Op = op;
      reg.State = 'ONE_OP';
    },
    Equal: function(reg) {
      reg.State = 'ANSWER';
    }
  },
  ONE_NUM: {
    Number: function(reg, num) {
      throw 'unexpected trigger <Number> occurs in <ONE_NUM> state';
    },
    Operator: function(reg, op) {
      reg.Op = op;
      reg.State = 'ONE_OP';
    },
    Equal: function(reg) {
      reg.State = 'ANSWER';
    }
  },
  ONE_OP: {
    Number: function(reg, num) {
      reg.B = num;
      reg.State = 'TWO_NUM';
    },
    Operator: function(reg, op) {
      reg.Op = op;
      reg.State = 'ONE_OP';
    },
    Equal: function(reg) {
      reg.A = operation[reg.Op](reg.A, reg.A);
      reg.State = 'ANSWER';
    }
  },
  TWO_NUM: {
    Number: function(reg, num) {
      throw 'unexpected trigger <Number> occurs in <TWO_NUM> state';
    },
    Operator: function(reg, op) {
      reg.A = operation[reg.Op](reg.A, reg.B);
      reg.Op = op;
      reg.State = 'ONE_OP';
    },
    Equal: function(reg) {
      reg.A = operation[reg.Op](reg.A, reg.B);
      reg.State = 'ANSWER';
    }
  },
  ANSWER: {
    Number: function(reg, num) {
      reg.A = num;
      reg.State = 'NEXT_NUM';
    },
    Operator: function(reg, op) {
      reg.Op = op;
      reg.State = 'ONE_OP';
    },
    Equal: function(reg) {
      reg.A = operation[reg.Op](reg.A, reg.B);
      reg.State = 'ANSWER';
    }
  },
  NEXT_NUM: {
    Number: function(reg, num) {
      throw 'unexpected trigger <Number> occurs in <NEXT_NUM> state';
    },
    Operator: function(reg, op) {
      reg.Op = op;
      reg.State = 'ONE_OP';
    },
    Equal: function(reg) {
      reg.A = operation[reg.Op](reg.A, reg.B);
      reg.State = 'ANSWER';
    }
  },
};

function init(reg) {
  reg.A = '0';
  reg.B = '0';
  reg.Op = null;
  reg.State = 'EMPTY';
}

function signal(reg, trigger, param) {
  console.assert(stateMachine[reg.State],
                 'invalid state <' + reg.State + '>');
  console.assert(stateMachine[reg.State][trigger],
                 'invalid trigger <' + trigger + '>');

  stateMachine[reg.State][trigger](reg, param);
}

function CalcStateMachine() {
  init(this._register = {});
}
CalcStateMachine.prototype = {
  addNumber: function(param) {
    signal(this._register, 'Number', param);
  },
  addOperator: function(param) {
    signal(this._register, 'Operator', param);
  },
  addEqual: function() {
    signal(this._register, 'Equal');
  },
  getRegister: function() {
    return this._register;
  },
  setRegister: function(register) {
    for (var key in register) {
      this._register[key] = register[key];
    }
  },
  getAnswer: function() {
    return this._register.A;
  },
  clear: function() {
    init(this._register);
  }
};

module.exports = CalcStateMachine;
