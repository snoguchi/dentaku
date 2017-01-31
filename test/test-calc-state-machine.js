'use strict'

var assert = require('assert');
var CalcStateMachine = require('../src/calc-state-machine');

function test_transition() {
  var csm = new CalcStateMachine();
  assert.deepEqual(csm.getRegister(), {A: '0', B: '0', Op: null, State: 'EMPTY'});

  csm.addNumber('123');
  assert.deepEqual(csm.getRegister(), {A: '123', B: '0', Op: null, State: 'ONE_NUM'});

  csm.addOperator('+');
  assert.deepEqual(csm.getRegister(), {A: '123', B: '0', Op: '+', State: 'ONE_OP'});

  csm.addNumber('456');
  assert.deepEqual(csm.getRegister(), {A: '123', B: '456', Op: '+', State: 'TWO_NUM'});

  csm.addEqual();
  assert.deepEqual(csm.getRegister(), {A: '579', B: '456', Op: '+', State: 'ANSWER'});

  csm.addNumber('999');
  assert.deepEqual(csm.getRegister(), {A: '999', B: '456', Op: '+', State: 'NEXT_NUM'});
}

function test_EMPTY() {
  var csm = new CalcStateMachine();

  csm.setRegister({A: '0', B: '0', Op: null, State: 'EMPTY'});
  csm.addNumber('123');
  assert.deepEqual(csm.getRegister(), {A: '123', B: '0', Op: null, State: 'ONE_NUM'});

  csm.setRegister({A: '0', B: '0', Op: null, State: 'EMPTY'});
  csm.addOperator('+');
  assert.deepEqual(csm.getRegister(), {A: '0', B: '0', Op: '+', State: 'ONE_OP'});

  csm.setRegister({A: '0', B: '0', Op: null, State: 'EMPTY'});
  csm.addEqual();
  assert.deepEqual(csm.getRegister(), {A: '0', B: '0', Op: null, State: 'ANSWER'});
}

function test_ONE_NUM() {
  var csm = new CalcStateMachine();

  csm.setRegister({A: '123', B: '0', Op: null, State: 'ONE_NUM'});
  csm.addOperator('+');
  assert.deepEqual(csm.getRegister(), {A: '123', B: '0', Op: '+', State: 'ONE_OP'});

  csm.setRegister({A: '123', B: '0', Op: null, State: 'ONE_NUM'});
  csm.addEqual();
  assert.deepEqual(csm.getRegister(), {A: '123', B: '0', Op: null, State: 'ANSWER'});
}

function test_ONE_OP() {
  var csm = new CalcStateMachine();

  csm.setRegister({A: '123', B: '0', Op: '+', State: 'ONE_OP'});
  csm.addNumber('456');
  assert.deepEqual(csm.getRegister(), {A: '123', B: '456', Op: '+', State: 'TWO_NUM'});

  csm.setRegister({A: '123', B: '0', Op: '+', State: 'ONE_OP'});
  csm.addOperator('*');
  assert.deepEqual(csm.getRegister(), {A: '123', B: '0' , Op: '*', State: 'ONE_OP'});

  csm.setRegister({A: '123', B: '0', Op: '+', State: 'ONE_OP'});
  csm.addEqual();
  assert.deepEqual(csm.getRegister(), {A: '246', B: '0' , Op: '+', State: 'ANSWER'});
}

function test_TWO_NUM() {
  var csm = new CalcStateMachine();

  csm.setRegister({A: '123', B: '456', Op: '+', State: 'TWO_NUM'});
  csm.addOperator('*');
  assert.deepEqual(csm.getRegister(), {A: '579', B: '456' , Op: '*', State: 'ONE_OP'});

  csm.setRegister({A: '123', B: '456', Op: '+', State: 'TWO_NUM'});
  csm.addEqual();
  assert.deepEqual(csm.getRegister(), {A: '579', B: '456' , Op: '+', State: 'ANSWER'});
}

function test_ANSWER() {
  var csm = new CalcStateMachine();

  csm.setRegister({A: '579', B: '456', Op: '+', State: 'ANSWER'});
  csm.addNumber('-100');
  assert.deepEqual(csm.getRegister(), {A: '-100', B: '456', Op: '+', State: 'NEXT_NUM'});

  csm.setRegister({A: '579', B: '456', Op: '+', State: 'ANSWER'});
  csm.addOperator('*');
  assert.deepEqual(csm.getRegister(), {A: '579', B: '456' , Op: '*', State: 'ONE_OP'});

  csm.setRegister({A: '579', B: '456', Op: '+', State: 'ANSWER'});
  csm.addEqual();
  assert.deepEqual(csm.getRegister(), {A: '1035', B: '456' , Op: '+', State: 'ANSWER'});
}

function test_NEXT_NUM() {
  var csm = new CalcStateMachine();

  csm.setRegister({A: '999', B: '456', Op: '+', State: 'NEXT_NUM'});
  csm.addOperator('*');
  assert.deepEqual(csm.getRegister(), {A: '999', B: '456', Op: '*', State: 'ONE_OP'});

  csm.setRegister({A: '999', B: '456', Op: '+', State: 'NEXT_NUM'});
  csm.addEqual();
  assert.deepEqual(csm.getRegister(), {A: '1455', B: '456' , Op: '+', State: 'ANSWER'});
}

test_transition();
test_EMPTY();
test_ONE_NUM();
test_ONE_OP();
test_TWO_NUM();
test_ANSWER();
test_NEXT_NUM();
