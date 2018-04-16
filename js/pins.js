'use strict';
// renderPin

window.pins = (function () {
  var similarPinsElement = document.querySelector('.map__pins');
  var similarPinTemplate = document.querySelector('template').content.querySelector('.map__pin');

  var renderPin = function (notice) {
    var pinElement = similarPinTemplate.cloneNode(true);
    var pinX = notice.location.x - window.util.PIN_WIDTH / 2;
    var pinY = notice.location.y - window.util.PIN_HEIGHT;
    pinElement.style = 'left: ' + pinX + 'px; top: ' + pinY + 'px;';
    pinElement.querySelector('.map__pin img').src = notice.author.avatar;
    pinElement.querySelector('.map__pin img').alt = notice.offer.title;
    return pinElement;
  };

  return {
    renderAllPins: function (notices) {
      var pinFragment = document.createDocumentFragment();
      for (var i = 0; i < notices.length; i++) {
        pinFragment.appendChild(renderPin(notices[i]));
      }
      similarPinsElement.appendChild(pinFragment);
    }
  };
})();

