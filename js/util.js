'use strict';

window.util = (function () {


  return {
    PIN_WIDTH: 50,
    PIN_HEIGHT: 70,

    setAddress: function (mainMapPin) {
      var addressX = parseInt(mainMapPin.style.left, 10) + window.util.PIN_WIDTH / 2;
      var addressY = parseInt(mainMapPin.style.top, 10) + window.util.PIN_HEIGHT;
      document.querySelector('#address').value = addressX + ', ' + addressY;
    },

    activatePage: function (formFieldsets) {
      document.querySelector('.map').classList.remove('map--faded');
      document.querySelector('.ad-form').classList.remove('ad-form--disabled');
      for (var i = 0; i < formFieldsets.length; i++) {
        formFieldsets[i].removeAttribute('disabled');
      }
    },

    getRandomValue: function (min, max, round) {
      var random = Math.random() * (max - min) + min;
      return round ? Math.round(random) : random;
    },

    getRandomElement: function (array) {
      var index = Math.floor(Math.random() * array.length);
      return array[index];
    },

    ifContains: function (array, element) {
      return array.indexOf(element) !== -1;
    },

    randomiseArray: function (array, length) {
      var randomArray = [];
      if (!length) {
        length = window.util.getRandomValue(0, array.length, true);
      }

      if (length === 0) {
        randomArray = [];
      } else {
        var i = 0;
        while (i < length) {
          var currentElement = array[window.util.getRandomValue(0, length - 1, true)];
          if (!window.util.ifContains(randomArray, currentElement)) {
            randomArray[i] = currentElement;
            i++;
          }
        }
      }
      return randomArray;
    }
  };
})();
