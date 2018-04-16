'use strict';

window.card = (function () {

  return {
    renderCard: function (notice) {
      var similarCardTemplate = document.querySelector('template').content.querySelector('.map__card');

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

      for (var i = 0; i < notice.offer.features.length; i++) {
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
    },
  };
})();


