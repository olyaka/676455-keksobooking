'use strict';

(function () {
  window.util = {
    PIN_WIDTH: 50,
    PIN_HEIGHT: 70,
    ESC_KEYCODE: 27,

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
    },
    onError: function (errorMessage) {
      var node = document.createElement('div');
      node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: #ff6d51;';
      node.style.position = 'absolute';
      node.style.left = 0;
      node.style.right = 0;
      node.style.top = document.documentElement.clientHeight / 2 + window.pageYOffset + 'px';
      node.style.fontSize = '30px';

      node.classList.add('error');

      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);
      document.addEventListener('click', function () {
        node.remove();
      });
    },

    onEscPress: function (evt) {
      if (evt.keyCode === window.util.ESC_KEYCODE) {
        window.util.closeCard();
      }
    },

    closeCard: function () {
      var similarCardsElement = document.querySelector('.map');
      similarCardsElement.removeChild(document.querySelector('.map__card'));
      document.removeEventListener('keydown', window.util.onEscPress);
    }
  };
})();
