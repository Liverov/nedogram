'use strict';

(function () {
  var RANDOM_PHOTOS_COUNT = 10;

  var imgFilters = document.querySelector('.img-filters');
  var buttonFilters = document.querySelectorAll('.img-filters__button');

  window.sort = {
    showFilterBarOnPage: function () {
      imgFilters.classList.remove('img-filters--inactive');
    },
    randomfilter: function () {
      var randomPhotoArrays = window.photosGroups.slice();
      randomPhotoArrays.sort(function () {
        return 0.5 - Math.random();
      }).slice(0, RANDOM_PHOTOS_COUNT);
      window.picture.updateData(randomPhotoArrays, true);
    },
    mostCommentedfilter: function () {
      var mostCommentedPhotos = window.photosGroups.slice();
      mostCommentedPhotos.sort(function (a, b) {
        return b.comments.length - a.comments.length;
      });
      window.picture.updateData(mostCommentedPhotos, true);
    }
  };

  var changeFilter = function (evt) {
    switch (evt.target.id) {
      case 'filter-default':
        window.picture.updateData(window.photosGroups, true);
        break;
      case 'filter-random':
        window.sort.randomfilter();
        break;
      case 'filter-discussed':
        window.sort.mostCommentedfilter();
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
    buttonFilters[i].addEventListener('click', window.debounce(changeFilter));
  }
})();
