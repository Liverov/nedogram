'use strict';

(function () {
  var imgFilters = document.querySelector('.img-filters');
  var buttonFilter = document.querySelectorAll('.img-filters__button');

  window.filters = {
    showFiltersOnPage: function () {
      imgFilters.classList.remove('img-filters--inactive');
    },
    randomfilterHandler: function () {
      var photosArrayIndexes = [];
      for (var k = 0; photosArrayIndexes.length < 25; k++) {
        var randomPhotoIndex = window.utils.getRandomInt(0, window.photosArray.length - 1);
        if (!(photosArrayIndexes.includes(randomPhotoIndex))) {
          photosArrayIndexes.push(randomPhotoIndex);
        }
      }
      var randomPhotoArrays = photosArrayIndexes.map(function (element) {
        return window.photosArray[element];
      });
      window.picture.updateHandler(randomPhotoArrays, true);
    },
    mostCommentedfilterHandler: function () {
      var mostCommentedPhotos = window.photosArray.slice();
      mostCommentedPhotos.sort(function (a, b) {
        return b.comments.length - a.comments.length;
      });
      window.picture.updateHandler(mostCommentedPhotos, true);
    }
  };

  var changeFilterHandler = function (evt) {
    switch (evt.target.id) {
      case 'filter-default':
        window.picture.renderPreview(window.photosArray, true);
        break;
      case 'filter-random':
        window.filters.randomfilterHandler();
        break;
      case 'filter-discussed':
        window.filters.mostCommentedfilterHandler();
        break;
    }

    for (var j = 0; j < buttonFilter.length; j++) {
      if (evt.target.id === buttonFilter[j].id) {
        buttonFilter[j].classList.add('img-filters__button--active');
      } else {
        buttonFilter[j].classList.remove('img-filters__button--active');
      }
    }
  };

  for (var i = 0; i < buttonFilter.length; i++) {
    buttonFilter[i].addEventListener('click', window.debounce(changeFilterHandler));
  }
})();
