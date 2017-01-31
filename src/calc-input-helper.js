'use strict'

function isInteger(x) {
  return !isNaN(x) && x % 1 === 0;
}

function isDigit(x) {
  return isInteger(x) && 0 <= x && x <= 9;
}

function CalcInputHelper() {
  this.init();
}
CalcInputHelper.prototype = {
  init: function() {
    this.isNegative = false;
    this.hasDecimal = false;
    this.integer = [];
    this.decimal = [];
  },
  addDigit: function(digit) {
    console.assert(isDigit(digit));
    if (this.hasDecimal) {
      this.decimal.push(digit);
    } else {
      if (this.integer.length === 1 && this.integer[0] === 0) {
        this.integer = [digit];
      } else {
        this.integer.push(digit);
      }
    }
  },
  addPeriod: function() {
    this.hasDecimal = true;
  },
  removeTail: function() {
    if (this.hasDecimal) {
      if (this.decimal.length > 0) {
        this.decimal.pop();
      } else {
        this.hasDecimal = false;
      }
    } else {
      if (this.integer.length > 0) {
        this.integer.pop();
      }
      if (this.integer.length === 0) {
        this.isNegative = false;
      }
    }
  },
  toggleSign: function() {
    if (!this.isEmpty()) {
      this.isNegative = !this.isNegative;
    }
  },
  isEmpty: function() {
    return this.integer.length === 0
      && this.decimal.length === 0
      && this.hasDecimal === false;
  },
  clear: function() {
    this.init();
  },
  getNumberAsString: function() {
    var str = '';
    if (this.isNegative) {
      str += '-';
    }
    str += this.integer.join('') || '0';
    if (this.hasDecimal) {
      str += '.';
      str += this.decimal.join('');
    }
    return str;
  }
}

module.exports = CalcInputHelper;
