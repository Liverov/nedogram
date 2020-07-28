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
      var randomPhotoArrays = window.photosGroup.sort(function () {
        return 0.5 - Math.random();
      }).slice(0, RANDOM_PHOTOS_COUNT);
      window.picture.updateHandler(randomPhotoArrays, true);
    },
    mostCommentedfilterHandler: function () {
      var mostCommentedPhotos = window.photosGroup.slice();
      mostCommentedPhotos.sort(function (a, b) {
        return b.comments.length - a.comments.length;
      });
      window.picture.updateHandler(mostCommentedPhotos, true);
    }
  };

  var changeFilterHandler = function (evt) {
    switch (evt.target.id) {
      case 'filter-default':
        window.picture.renderPreview(window.photosGroup, true);
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
