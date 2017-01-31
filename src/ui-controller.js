'use strict'

var CalcInputHelper = require('./calc-input-helper');
var CalcStateMachine = require('./calc-state-machine');

window.addEventListener('load', function() {

  // models
  var cih = new CalcInputHelper();
  var csm = new CalcStateMachine();

  // views
  var frame = document.getElementById('frame');
  var state = document.getElementById('state');
  var result = document.getElementById('result');

  // controller
  frame.addEventListener('click', function(ev) {

    // update models
    var val = (ev.target.value || '').split('::');

    switch (val[0]) {
    case 'digit':
      cih.addDigit(parseInt(val[1]));
      break;
    case 'period':
      cih.addPeriod();
      break;
    case 'backspace':
      cih.removeTail();
      break;
    case 'plusminus':
      cih.toggleSign();
      break;
    case 'operator':
      if (!cih.isEmpty()) {
        csm.addNumber(cih.getNumberAsString());
        cih.clear();
      }
      csm.addOperator(val[1]);
      break;
    case 'equal':
      if (!cih.isEmpty()) {
        csm.addNumber(cih.getNumberAsString());
        cih.clear();
      }
      csm.addEqual();
      break;
    case 'clearentry':
      cih.clear();
      break;
    case 'clear':
      cih.clear();
      csm.clear();
      break;
    default:
      return;
    }

    console.log('Register:', csm.getRegister());

    // update view
    result.innerHTML = cih.isEmpty() ? csm.getAnswer() : cih.getNumberAsString();
  });
});
