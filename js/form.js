'use strict';

(function () {
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

  var form = document.querySelector('.ad-form');
  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), function () {
      form.reset();
      document.querySelector('.success').classList.remove('hidden');
      document.addEventListener('click', function () {
        document.querySelector('.success').classList.add('hidden');
      });
    }, window.util.onError);
    evt.preventDefault();
  });

})();

