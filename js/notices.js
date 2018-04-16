'use strict';

window.notices = (function () {
  var NUMBER_OF_NOTICES = 8;
  var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец',
    'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var CHECKIN = ['12:00', '13:00', '14:00'];
  var CHECKOUT = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  return {
    getNotice: function () {
      var randomAvatar = window.util.randomiseArray([1, 2, 3, 4, 5, 6, 7, 8], NUMBER_OF_NOTICES);
      var randomTitle = window.util.randomiseArray(TITLES, 8);

      var notices = [];

      for (var i = 0; i < NUMBER_OF_NOTICES; i++) {
        var x = window.util.getRandomValue(300, 900, true);
        var y = window.util.getRandomValue(150, 500, true);

        notices[i] = {
          author: {
            avatar: 'img/avatars/user0' + randomAvatar[i] + '.png'
          },
          offer: {
            title: randomTitle[i],
            address: x + ', ' + y,
            price: window.util.getRandomValue(1000, 1000000, true),
            type: window.util.getRandomElement(TYPES),
            rooms: window.util.getRandomValue(1, 5, true),
            guests: window.util.getRandomValue(1, 10, true),
            checkin: window.util.getRandomElement(CHECKIN),
            checkout: window.util.getRandomElement(CHECKOUT),
            features: window.util.randomiseArray(FEATURES),
            description: '',
            photos: window.util.randomiseArray(PHOTOS, 3)
          },
          location: {
            x: x,
            y: y
          }
        };
      }
      return notices;
    }
  };


})();
