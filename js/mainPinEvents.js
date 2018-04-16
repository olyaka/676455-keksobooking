'use strict';

(function () {
  var similarPinsElement = document.querySelector('.map__pins');
  var mainMapPin = document.querySelector('.map__pin--main');
  var similarCardsElement = document.querySelector('.map');
  var notices = window.notices.getNotice();

  window.util.setAddress(mainMapPin);

  var formFieldsets = document.querySelectorAll('fieldset');
  for (var i = 0; i < formFieldsets.length; i++) {
    formFieldsets[i].setAttribute('disabled', 'disabled');
  }

  var onMapPinClick = function (evt) {
    var currentCard = document.querySelector('.map__card');
    if (currentCard) {
      similarCardsElement.removeChild(document.querySelector('.map__card'));
    }
    var mapPinX = parseInt(evt.currentTarget.style.left, 10) + window.util.PIN_WIDTH / 2;
    var mapPinY = parseInt(evt.currentTarget.style.top, 10) + window.util.PIN_HEIGHT;
    for (i = 0; i < notices.length; i++) {
      if ((notices[i].location.x === mapPinX) & (notices[i].location.y === mapPinY)) {
        var cardFragment = document.createDocumentFragment();
        cardFragment.appendChild(window.card.renderCard(notices[i]));
        similarCardsElement.appendChild(cardFragment);
        document.querySelector('.popup__close').addEventListener('click', function () {
          similarCardsElement.removeChild(document.querySelector('.map__card'));
        });
        break;
      }
    }
  };

  var onMainMapPinMouseUp = function () {
    window.util.activatePage(formFieldsets);
    window.util.setAddress(mainMapPin);
    window.pins.renderAllPins(notices);

    for (i = 0; i < similarPinsElement.querySelectorAll('.map__pin').length; i++) {
      similarPinsElement.querySelectorAll('.map__pin')[i].addEventListener('click', onMapPinClick);
    }
    mainMapPin.removeEventListener('mouseup', onMainMapPinMouseUp);
  };

  mainMapPin.addEventListener('mouseup', onMainMapPinMouseUp);

  mainMapPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var newX = mainMapPin.offsetLeft - shift.x;
      var newY = mainMapPin.offsetTop - shift.y;

      if (newX > 0 && newX + window.util.PIN_WIDTH < document.querySelector('.map').offsetWidth && newY > 0 && newY + window.util.PIN_HEIGHT < document.querySelector('.map').offsetHeight) {
        mainMapPin.style.top = newY + 'px';
        mainMapPin.style.left = newX + 'px';
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      window.util.setAddress(mainMapPin);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
