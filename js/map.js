'use strict';
var NUMBER_OF_NOTICES = 8;
var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец',
  'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var getRandomValue = function (min, max, round) {
  var random = Math.random() * (max - min) + min;
  return round ? Math.round(random) : random;
};

var getRandomElement = function (array) {
  var index = Math.floor(Math.random() * array.length);
  return array[index];
};

var ifContains = function (array, element) {
  return array.indexOf(element) !== -1;
};

var randomiseArray = function (array, length) {
  var randomArray = [];
  if (!length) {
    length = getRandomValue(0, array.length, true);
  }

  if (length === 0) {
    randomArray = [];
  } else {
    var i = 0;
    while (i < length) {
      var currentElement = array[getRandomValue(0, length - 1, true)];
      if (!ifContains(randomArray, currentElement)) {
        randomArray[i] = currentElement;
        i++;
      }
    }
  }
  return randomArray;
};

var randomAvatar = randomiseArray([1, 2, 3, 4, 5, 6, 7, 8], NUMBER_OF_NOTICES);
var randomTitle = randomiseArray(TITLES, 8);

var notices = [];

for (var i = 0; i < NUMBER_OF_NOTICES; i++) {
  var x = getRandomValue(300, 900, true);
  var y = getRandomValue(150, 500, true);

  notices[i] = {
    author: {
      avatar: 'img/avatars/user0' + randomAvatar[i] + '.png'
    },
    offer: {
      title: randomTitle[i],
      address: x + ', ' + y,
      price: getRandomValue(1000, 1000000, true),
      type: getRandomElement(TYPES),
      rooms: getRandomValue(1, 5, true),
      guests: getRandomValue(1, 10, true),
      checkin: getRandomElement(CHECKIN),
      checkout: getRandomElement(CHECKOUT),
      features: randomiseArray(FEATURES),
      description: '',
      photos: randomiseArray(PHOTOS, 3)
    },
    location: {
      x: x,
      y: y
    }
  };
}

var similarPinsElement = document.querySelector('.map__pins');
var similarPinTemplate = document.querySelector('template').content.querySelector('.map__pin');

var renderPin = function (notice) {
  var pinElement = similarPinTemplate.cloneNode(true);
  var pinX = notice.location.x - PIN_WIDTH / 2;
  var pinY = notice.location.y - PIN_HEIGHT;
  pinElement.style = 'left: ' + pinX + 'px; top: ' + pinY + 'px;';
  pinElement.querySelector('.map__pin img').src = notice.author.avatar;
  pinElement.querySelector('.map__pin img').alt = notice.offer.title;
  return pinElement;
};

var renderAllPins = function () {
  var pinFragment = document.createDocumentFragment();
  for (i = 0; i < notices.length; i++) {
    pinFragment.appendChild(renderPin(notices[i]));
  }
  similarPinsElement.appendChild(pinFragment);
};

var similarCardTemplate = document.querySelector('template').content.querySelector('.map__card');
var similarCardsElement = document.querySelector('.map');

var renderCard = function (notice) {
  var accomodationType;

  if (notice.type === 'flat') {
    accomodationType = 'Квартира';
  } else if (notice.type === 'bungalo') {
    accomodationType = 'Бунгало';
  } else if (notice.type === 'house') {
    accomodationType = 'Дом';
  }

  var cardTemplate = similarCardTemplate.cloneNode(true);
  cardTemplate.querySelector('.popup__title').textContent = notice.offer.title;
  cardTemplate.querySelector('.popup__text--address').textContent = notice.offer.address;
  cardTemplate.querySelector('.popup__text--price').textContent = notice.offer.price + ' ₽/ночь';
  cardTemplate.querySelector('.popup__type').textContent = accomodationType;
  cardTemplate.querySelector('.popup__text--capacity').textContent = notice.offer.rooms + ' комнаты для ' + notice.offer.guests + ' гостей';
  cardTemplate.querySelector('.popup__text--time').textContent = 'Заезд после ' + notice.offer.checkin + ', выезд до ' + notice.offer.checkout;
  cardTemplate.querySelector('.popup__description').textContent = notice.offer.description;

  var featureElementTemplate = document.querySelector('template').content.querySelector('.popup__feature');
  var featureFragment = document.createDocumentFragment();

  while (cardTemplate.querySelector('.popup__feature')) {
    cardTemplate.querySelector('.popup__features').removeChild(cardTemplate.querySelector('.popup__feature'));
  }

  if (notice.offer.features.length === 0) {
    cardTemplate.querySelector('.popup__features').classList.add('hidden');
  }

  for (i = 0; i < notice.offer.features.length; i++) {
    var featureElement = featureElementTemplate.cloneNode(true);
    featureElement.classList.add('popup__feature');
    featureElement.classList.add('popup__feature--' + notice.offer.features[i]);
    featureFragment.appendChild(featureElement);
  }

  cardTemplate.querySelector('.popup__features').appendChild(featureFragment);

  cardTemplate.querySelector('.popup__avatar').src = notice.author.avatar;

  var photoElementTemplate = document.querySelector('template').content.querySelector('.popup__photo');
  var photoFragment = document.createDocumentFragment();

  for (i = 1; i < notice.offer.photos.length; i++) {
    var photoElement = photoElementTemplate.cloneNode(true);
    photoElement.src = notice.offer.photos[i];
    photoFragment.appendChild(photoElement);
  }

  cardTemplate.querySelector('.popup__photos img').src = notice.offer.photos[0];
  cardTemplate.querySelector('.popup__photos').appendChild(photoFragment);

  return cardTemplate;
};


var formFieldsets = document.querySelectorAll('fieldset');
for (i = 0; i < formFieldsets.length; i++) {
  formFieldsets[i].setAttribute('disabled', 'disabled');
}

var activatePage = function () {
  document.querySelector('.map').classList.remove('map--faded');
  document.querySelector('.ad-form').classList.remove('ad-form--disabled');
  for (i = 0; i < formFieldsets.length; i++) {
    formFieldsets[i].removeAttribute('disabled');
  }
};

var mainMapPin = document.querySelector('.map__pin--main');

var setAddress = function () {
  var addressX = parseInt(mainMapPin.style.left, 10) + PIN_WIDTH / 2;
  var addressY = parseInt(mainMapPin.style.top, 10) + PIN_HEIGHT;
  document.querySelector('#address').value = addressX + ', ' + addressY;
};

setAddress();

var onMainMapPinMouseUp = function () {
  activatePage();
  setAddress();
  renderAllPins();

  for (i = 0; i < similarPinsElement.querySelectorAll('.map__pin').length; i++) {
    similarPinsElement.querySelectorAll('.map__pin')[i].addEventListener('click', onMapPinClick);
  }
  mainMapPin.removeEventListener('mouseup', onMainMapPinMouseUp);
};

mainMapPin.addEventListener('mouseup', onMainMapPinMouseUp);

var onMapPinClick = function (evt) {
  var currentCard = document.querySelector('.map__card');
  if (currentCard) {
    similarCardsElement.removeChild(document.querySelector('.map__card'));
  }
  var mapPinX = parseInt(evt.currentTarget.style.left, 10) + PIN_WIDTH / 2;
  var mapPinY = parseInt(evt.currentTarget.style.top, 10) + PIN_HEIGHT;
  for (i = 0; i < notices.length; i++) {
    if ((notices[i].location.x === mapPinX) & (notices[i].location.y === mapPinY)) {
      var cardFragment = document.createDocumentFragment();
      cardFragment.appendChild(renderCard(notices[i]));
      similarCardsElement.appendChild(cardFragment);
      document.querySelector('.popup__close').addEventListener('click', function () {
        similarCardsElement.removeChild(document.querySelector('.map__card'));
      });
      break;
    }
  }
};

var selectedTypeElement = document.querySelector('#type');
var inputPrice = document.querySelector('#price');

selectedTypeElement.addEventListener('change', function (evt) {
  if (evt.currentTarget.value === 'bungalo') {
    inputPrice.placeholder = '0';
    inputPrice.min = 0;
  } else if (evt.currentTarget.value === 'flat') {
    inputPrice.placeholder = '1000';
    inputPrice.min = 1000;
  } else if (evt.currentTarget.value === 'house') {
    inputPrice.placeholder = '5000';
    inputPrice.min = 5000;
  } else if (evt.currentTarget.value === 'palace') {
    inputPrice.placeholder = '10000';
    inputPrice.min = 10000;
  }
});

var selectedCheckIn = document.querySelector('#timein');
var selectedCheckOut = document.querySelector('#timeout');

selectedCheckIn.addEventListener('change', function (evt) {
  selectedCheckOut.value = evt.currentTarget.value;
});

selectedCheckOut.addEventListener('change', function (evt) {
  selectedCheckIn.value = evt.currentTarget.value;
});

var selectedRoomNumber = document.querySelector('#room_number');
var selectedCapacity = document.querySelector('#capacity');

var onRoomOrGuestNumberChange = function () {
  var roomNumber = parseInt(selectedRoomNumber.value, 10);
  var guestNumber = parseInt(selectedCapacity.value, 10);
  if (roomNumber < guestNumber) {
    selectedCapacity.setCustomValidity('Количество комнат не соответствует числу гостей');
  } else if (roomNumber === 100 & guestNumber !== 0) {
    selectedCapacity.setCustomValidity('Так много комнат не для гостей');
  } else {
    selectedCapacity.setCustomValidity('');
  }
};

selectedRoomNumber.addEventListener('change', onRoomOrGuestNumberChange);

selectedCapacity.addEventListener('change', onRoomOrGuestNumberChange);

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

    if (newX > 0 && newX + PIN_WIDTH < document.querySelector('.map').offsetWidth && newY > 0 && newY + PIN_HEIGHT < document.querySelector('.map').offsetHeight) {
      mainMapPin.style.top = newY + 'px';
      mainMapPin.style.left = newX + 'px';
    }


  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    setAddress();
    
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});
