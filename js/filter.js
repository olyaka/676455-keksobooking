'use strict';

(function () {
  var filter = {
    onHousingTypeChange: function () {},
    onHousingPriceChange: function () {},
    onHousingRoomsChange: function () {},
    onHousingGuestsChange: function () {},
    onHouseingFeaturesChange: function () {}
  };

  var onFilterChange = function (option, changeHandler) {
    var type;

    if (option === '#housing-features') {
      type = (Array.from(document.querySelectorAll('.map__checkbox:checked'))).map(function (feature) {
        return feature.value;
      });
    } else {
      type = document.querySelector(option).options[document.querySelector(option).selectedIndex].value;
    }

    changeHandler(type);
    if (document.querySelector('.map__card')) {
      window.util.closeCard();
    }
  };

  document.querySelector('#housing-type').addEventListener('change', function () {
    onFilterChange('#housing-type', filter.onHousingTypeChange);
  });

  document.querySelector('#housing-price').addEventListener('change', function () {
    onFilterChange('#housing-price', filter.onHousingPriceChange);
  });

  document.querySelector('#housing-rooms').addEventListener('change', function () {
    onFilterChange('#housing-rooms', filter.onHousingRoomsChange);
  });

  document.querySelector('#housing-guests').addEventListener('change', function () {
    onFilterChange('#housing-guests', filter.onHousingGuestsChange);
  });

  document.querySelector('#housing-features').addEventListener('change', function () {
    onFilterChange('#housing-features', filter.onHouseingFeaturesChange);
  });

  window.filter = filter;
  return window.filter;
})();
