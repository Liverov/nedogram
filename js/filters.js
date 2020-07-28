'use strict';

(function () {
  var RANDOM_PHOTOS_COUNT = 10;
  var imgFilters = document.querySelector('.img-filters');
  var buttonFilters = document.querySelectorAll('.img-filters__button');

  window.filters = {
    showFilterBarOnPage: function () {
      imgFilters.classList.remove('img-filters--inactive');
    },
    randomfilterHandler: function () {
      var photosArrayIndexes = [];
      for (var k = 0; photosArrayIndexes.length < RANDOM_PHOTOS_COUNT; k++) {
        var randomPhotoIndex = window.utils.getRandomInt(0, window.photosArrays.length - 1);
        if (!(photosArrayIndexes.includes(randomPhotoIndex))) {
          photosArrayIndexes.push(randomPhotoIndex);
        }
      }
      var randomPhotoArrays = photosArrayIndexes.map(function (element) {
        return window.photosArrays[element];
      });
      window.picture.updateHandler(randomPhotoArrays, true);
    },
    mostCommentedfilterHandler: function () {
      var mostCommentedPhotos = window.photosArrays.slice();
      mostCommentedPhotos.sort(function (a, b) {
        return b.comments.length - a.comments.length;
      });
      window.picture.updateHandler(mostCommentedPhotos, true);
    }
  };

  var changeFilterHandler = function (evt) {
    switch (evt.target.id) {
      case 'filter-default':
        window.picture.renderPreview(window.photosArrays, true);
        break;
      case 'filter-random':
        window.filters.randomfilterHandler();
        break;
      case 'filter-discussed':
        window.filters.mostCommentedfilterHandler();
        break;
    }

    for (var j = 0; j < buttonFilters.length; j++) {
      if (evt.target.id === buttonFilters[j].id) {
        buttonFilters[j].classList.add('img-filters__button--active');
      } else {
        buttonFilters[j].classList.remove('img-filters__button--active');
      }
    }
  };

  for (var i = 0; i < buttonFilters.length; i++) {
    buttonFilters[i].addEventListener('click', window.debounce(changeFilterHandler));
  }
})();
