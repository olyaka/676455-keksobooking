'use strict';
var NUMBER_OF_NOTICES = 8;
var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец',
  'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

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
    length = getRandomValue(1, array.length, true);
  }

  var i = 0;
  while (i < length) {
    var currentElement = array[getRandomValue(0, length - 1, true)];
    if (!ifContains(randomArray, currentElement)) {
      randomArray[i] = currentElement;
      i++;
    }
  }
  return randomArray;
};

var randomAvatar = randomiseArray([1, 2, 3, 4, 5, 6, 7, 8], NUMBER_OF_NOTICES);
var randomTitle = randomiseArray(TITLES, 8);

var notices = [];

for (var i = 0; i < NUMBER_OF_NOTICES; i++) {
  var x = getRandomValue(300, 900);
  var y = getRandomValue(150, 500);

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

document.querySelector('.map').classList.remove('map--faded');

var similarPinsElement = document.querySelector('.map__pins');
var similarPinTemplate = document.querySelector('template').content.querySelector('.map__pin');

var renderPin = function (notice) {
  var pinElement = similarPinTemplate.cloneNode(true);
  var pinX = notice.location.x - 25;
  var pinY = notice.location.y - 70;
  pinElement.style = 'left: ' + pinX + 'px; top: ' + pinY + 'px;';
  pinElement.querySelector('.map__pin img').src = notice.author.avatar;
  pinElement.querySelector('.map__pin img').alt = notice.offer.title;
  return pinElement;
};

var pinFragment = document.createDocumentFragment();
for (i = 0; i < notices.length; i++) {
  pinFragment.appendChild(renderPin(notices[i]));
}
similarPinsElement.appendChild(pinFragment);

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

var cardFragment = document.createDocumentFragment();
cardFragment.appendChild(renderCard(notices[0]));
similarCardsElement.appendChild(cardFragment);