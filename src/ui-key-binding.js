'use strict'

var keyCodeToKeyName = {
  8: 'Backspace',
  13: 'Enter',
  27: 'Escape',
  46: 'Delete',
  48: '0',
  49: '1',
  50: '2',
  51: '3',
  52: '4',
  53: '5',
  54: '6',
  55: '7',
  56: '8',
  57: '9',
  96: 'Num0',
  97: 'Num1',
  98: 'Num2',
  99: 'Num3',
  100: 'Num4',
  101: 'Num5',
  102: 'Num6',
  103: 'Num7',
  104: 'Num8',
  105: 'Num9',
  106: 'Num*',
  107: 'Num+',
  109: 'Num-',
  110: 'Num.',
  111: 'Num/',
  120: 'F9',
  186: ':',
  187: ';',
  189: '-',
  190: '.',
  191: '/',
};

// key input support
window.addEventListener('load', function() {

  var keyNameToElement = {};
  var elements = document.getElementsByTagName('button');
  Array.prototype.forEach.call(elements, function(elm) {
    if ('keyBinding' in elm.dataset) {
      elm.dataset.keyBinding.split(/\s+/).forEach(function(keyName) {
        keyNameToElement[keyName] = elm;
      });
    }
  });

  document.addEventListener('keydown', function(ev) {
    var keyName = '';
    if (ev.ctrlKey) {
      keyName += 'Ctrl-';
    }
    if (ev.shiftKey) {
      keyName += 'Shift-';
    }
    keyName += keyCodeToKeyName[ev.keyCode];

    console.log('Key:', keyName);

    if (keyName in keyNameToElement) {
      keyNameToElement[keyName].click();
      ev.preventDefault();
    }
  });
});
