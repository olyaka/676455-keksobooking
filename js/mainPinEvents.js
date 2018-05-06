'use strict';

(function () {
  var similarPinsElement = document.querySelector('.map__pins');
  var mainMapPin = document.querySelector('.map__pin--main');
  var similarCardsElement = document.querySelector('.map');
  var LOWER_PRICE_THRESHOLD = 10000;
  var UPPER_PRICE_THRESHOLD = 50000;

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

    notices.forEach(function (notice) {
      if ((notice.location.x === mapPinX) & (notice.location.y === mapPinY)) {
        var cardFragment = document.createDocumentFragment();
        cardFragment.appendChild(window.card.renderCard(notice));
        similarCardsElement.appendChild(cardFragment);

        document.querySelector('.popup__close').addEventListener('click', function () {
          window.util.closeCard();
        });

        document.addEventListener('keydown', window.util.onEscPress);
      }
    });
  };

  var notices = [];

  var housingType = 'any';
  var housingPrice = 'any';
  var housingRooms = 'any';
  var housingGuests = 'any';
  var housingFeatures = [];

  var priceRange = function (price) {
    var range;
    if (price > LOWER_PRICE_THRESHOLD && price < UPPER_PRICE_THRESHOLD) {
      range = 'middle';
    }
    if (price < LOWER_PRICE_THRESHOLD) {
      range = 'low';
    }
    if (price > UPPER_PRICE_THRESHOLD) {
      range = 'high';
    }
    return range;
  };

  var compareFeatures = function (noticeFeatures, filterFeatures) {
    var isIncludeAll = true;
    filterFeatures.forEach(function (feature) {
      isIncludeAll = isIncludeAll && noticeFeatures.includes(feature);
    });

    return isIncludeAll;
  };

  var getRank = function (notice) {
    var rank = 0;
    if (notice.offer.type === housingType || housingType === 'any') {
      rank += 1;
    }
    if (priceRange(notice.offer.price) === housingPrice || housingPrice === 'any') {
      rank += 1;
    }
    if (notice.offer.rooms === parseInt(housingRooms, 10) || housingRooms === 'any') {
      rank += 1;
    }
    if (notice.offer.guests === parseInt(housingGuests, 10) || housingGuests === 'any') {
      rank += 1;
    }
    if (compareFeatures(notice.offer.features, housingFeatures)) {
      rank += 1;
    }
    return rank;
  };

  var updatePins = function () {
    while (similarPinsElement.children.length > 2) {
      similarPinsElement.removeChild(similarPinsElement.lastChild);
    }

    var noticesCopy = notices.slice();

    var sorted = noticesCopy.sort(function (first, second) {
      var rankDiff = getRank(second) - getRank(first);
      if (rankDiff < 0) {
        rankDiff = noticesCopy.indexOf(first) - noticesCopy.indexOf(second);
      }
      return rankDiff;
    });

    var filtered = sorted.filter(function (notice) {
      return getRank(notice) > 4;
    });

    window.pins.renderAllPins(filtered);

    for (i = 0; i < similarPinsElement.querySelectorAll('.map__pin').length; i++) {
      similarPinsElement.querySelectorAll('.map__pin')[i].addEventListener('click', onMapPinClick);
    }
  };

  window.filter.onHousingTypeChange = function (type) {
    housingType = type;
    window.debounce(updatePins);
  };

  window.filter.onHousingPriceChange = function (price) {
    housingPrice = price;
    window.debounce(updatePins);
  };

  window.filter.onHousingRoomsChange = function (rooms) {
    housingRooms = rooms;
    window.debounce(updatePins);
  };

  window.filter.onHousingGuestsChange = function (guests) {
    housingGuests = guests;
    window.debounce(updatePins);
  };

  window.filter.onHouseingFeaturesChange = function (features) {
    housingFeatures = features;
    window.debounce(updatePins);
  };

  var onLoad = function (serverData) {
    notices = serverData;

    mainMapPin.addEventListener('mouseup', onMainMapPinMouseUp);

  };

  window.backend.load(onLoad, window.util.onError);

  var onMainMapPinMouseUp = function () {
    window.util.activatePage(formFieldsets);
    window.util.setAddress(mainMapPin);
    window.pins.renderAllPins(notices);

    for (i = 0; i < similarPinsElement.querySelectorAll('.map__pin').length; i++) {
      similarPinsElement.querySelectorAll('.map__pin')[i].addEventListener('click', onMapPinClick);
    }
    mainMapPin.removeEventListener('mouseup', onMainMapPinMouseUp);
  };

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
