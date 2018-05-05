'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileChooser = document.querySelector('.ad-form__input');
  var adPhoto = document.querySelector('.ad-form__photo');
  var photoContainer = document.querySelector('.ad-form__photo-container');

  var createImg = function (reader, photo) {
    var img = document.createElement('img');
    img.src = reader.result;
    img.width = 70;
    img.heigth = 70;

    photo.appendChild(img);

    return photo;
  };

  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        var photos = document.querySelector('.ad-form__photo').children;
        if (photos.length !== 0) {
          var newPhoto = document.createElement('div');
          newPhoto.classList.add('ad-form__photo');

          photoContainer.appendChild(createImg(reader, newPhoto));
        } else {
          createImg(reader, adPhoto);
        }
      });
      reader.readAsDataURL(file);
    }
  });
})();
