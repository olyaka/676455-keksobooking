'use strict';

(function () {
  var filter = {
    onHousingTypeChange: function () {},
    onHousingPriceChange: function () {},
    onHousingRoomsChange: function () {},
    onHousingGuestsChange: function () {},
    onHouseingFeaturesChange: function () {}
  };

  document.querySelector('#housing-type').addEventListener('change', function () {
    var type = document.querySelector('#housing-type').options[document.querySelector('#housing-type').selectedIndex].value;

    filter.onHousingTypeChange(type);
  });

  document.querySelector('#housing-price').addEventListener('change', function () {
    var price = document.querySelector('#housing-price').options[document.querySelector('#housing-price').selectedIndex].value;

    filter.onHousingPriceChange(price);
  });

  document.querySelector('#housing-rooms').addEventListener('change', function () {
    var rooms = document.querySelector('#housing-rooms').options[document.querySelector('#housing-rooms').selectedIndex].value;

    filter.onHousingRoomsChange(rooms);
  });

  document.querySelector('#housing-guests').addEventListener('change', function () {
    var guests = document.querySelector('#housing-guests').options[document.querySelector('#housing-guests').selectedIndex].value;

    filter.onHousingGuestsChange(guests);
  });

  document.querySelector('#housing-features').addEventListener('change', function () {
    var features = (Array.from(document.querySelectorAll('.map__checkbox:checked'))).map(function (feature) {
      return feature.value;
    });

    filter.onHouseingFeaturesChange(features);
  });

  window.filter = filter;
  return window.filter;
})();
