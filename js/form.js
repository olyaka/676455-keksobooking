'use strict';

(function () {
  var selectedTypeElement = document.querySelector('#type');
  var inputPrice = document.querySelector('#price');
  var BUNGALO_MIN_PRICE = 0;
  var FLAT_MIN_PRICE = 1000;
  var HOUSE_MIN_PRICE = 5000;
  var PALACE_MIN_PRICE = 10000;
  var LARGE_NUMBER_OF_ROOMS = 100;
  var NO_GUESTS = 0;
  var ROOMS_GUESTS_VALIDATION_MESSAGE = 'Количество комнат не соответствует числу гостей';
  var TOO_MANY_ROOMS = 'Так много комнат не для гостей';

  selectedTypeElement.addEventListener('change', function (evt) {
    if (evt.currentTarget.value === 'bungalo') {
      inputPrice.placeholder = BUNGALO_MIN_PRICE;
      inputPrice.min = BUNGALO_MIN_PRICE;
    } else if (evt.currentTarget.value === 'flat') {
      inputPrice.placeholder = FLAT_MIN_PRICE;
      inputPrice.min = FLAT_MIN_PRICE;
    } else if (evt.currentTarget.value === 'house') {
      inputPrice.placeholder = HOUSE_MIN_PRICE;
      inputPrice.min = HOUSE_MIN_PRICE;
    } else if (evt.currentTarget.value === 'palace') {
      inputPrice.placeholder = PALACE_MIN_PRICE;
      inputPrice.min = PALACE_MIN_PRICE;
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
      selectedCapacity.setCustomValidity(ROOMS_GUESTS_VALIDATION_MESSAGE);
    } else if (roomNumber === LARGE_NUMBER_OF_ROOMS & guestNumber !== NO_GUESTS) {
      selectedCapacity.setCustomValidity(TOO_MANY_ROOMS);
    } else {
      selectedCapacity.setCustomValidity('');
    }
  };

  selectedRoomNumber.addEventListener('change', onRoomOrGuestNumberChange);

  selectedCapacity.addEventListener('change', onRoomOrGuestNumberChange);

  var mainMapPin = document.querySelector('.map__pin--main');

  var form = document.querySelector('.ad-form');
  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), function () {
      form.reset();
      window.util.setAddress(mainMapPin);
      document.querySelector('.success').classList.remove('hidden');
      document.addEventListener('click', function () {
        document.querySelector('.success').classList.add('hidden');
      });
    }, window.util.onError);
    evt.preventDefault();
  });
})();

