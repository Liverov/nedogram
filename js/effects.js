'use strict';

(function () {
  var SCALE_STEP = 25;
  var DEFAULT_SCALE_VALUE = '100%';

  var pictures = document.querySelector('.pictures');
  var uploadOverlay = pictures.querySelector('.img-upload__overlay');
  var imagePreview = pictures.querySelector('.img-upload__preview');
  var scaleSmaller = document.querySelector('.scale__control--smaller');
  var scaleBigger = document.querySelector('.scale__control--bigger');
  var scaleValue = document.querySelector('.scale__control--value');

  var effectList = uploadOverlay.querySelector('.effects'); // Fieldset
  var effectLevel = uploadOverlay.querySelector('.img-upload__effect-level');
  var effectLevelPin = document.querySelector('.effect-level__pin');
  var depth = document.querySelector('.effect-level__depth');
  var effectLineWidth = document.querySelector('.effect-level__line').offsetWidth;
  var effectLevelValue = document.querySelector('.effect-level__value');
  var startScroll;

  window.effects = {
    effectChange: function (scrollPosition) {
      imagePreview.setAttribute('class', 'img-upload__preview');
      imagePreview.classList.add('effects__preview--' + window.pictureEffect);
      var value = +effectLevelPin.style.left.replace('px', '');
      effectLevelValue.setAttribute('value', (value * 100 / 450).toFixed(1));

      window.effects.scaleChange();
      if (window.pictureEffect === 'none') {
        effectLevel.classList.add('hidden');
      } else {
        effectLevel.classList.remove('hidden');
      }

      switch (window.pictureEffect) {
        case 'chrome':
          imagePreview.style = 'filter: grayscale(' + scrollPosition / 100 + ')';
          break;
        case 'sepia':
          imagePreview.style = 'filter: sepia(' + scrollPosition / 100 + ')';
          break;
        case 'marvin':
          imagePreview.style = 'filter: invert(' + scrollPosition + '%)';
          break;
        case 'phobos':
          var phobosLevel = scrollPosition * 3 / 100;
          imagePreview.style = 'filter: blur(' + phobosLevel + 'px)';
          break;
        case 'heat':
          var heatLevel = scrollPosition * 3 / 100;
          if (heatLevel < 1) {
            heatLevel = 1;
          }
          imagePreview.style = 'filter: brightness(' + heatLevel + ')';
          break;
        case 'none':
          effectLevel.classList.add('hidden');
          imagePreview.style = '';
          break;
      }
    },
    resetSlider: function () {
      effectLevelPin.style = 'left:' + effectLineWidth + 'px';
      depth.style = 'width:' + effectLineWidth + 'px';
      imagePreview.style = 'transform: scale(1)';
    },
    scaleChange: function () {
      var scale = 100;
      scaleValue.value = DEFAULT_SCALE_VALUE;
      var scaleSumm;
      var setScaleSmallerHandler = function () {
        if (scale - SCALE_STEP >= SCALE_STEP) {
          scale -= SCALE_STEP;
          scaleSumm = scale / 100;
          imagePreview.style = 'transform: scale(' + scaleSumm + ')';
          scaleValue.value = scale + '%';
        }
      };

      var setScaleBiggerHandler = function () {
        if (scale < 100) {
          scale += SCALE_STEP;
          scaleSumm = scale / 100;
          imagePreview.style = 'transform: scale(' + scaleSumm + ')';
          scaleValue.value = scale + '%';
        }
      };

      scaleSmaller.addEventListener('click', setScaleSmallerHandler);
      scaleBigger.addEventListener('click', setScaleBiggerHandler);
    },
    scrollEffectChange: function () {

      window.setChangeEffectList = function (evt) {
        window.pictureEffect = evt.target.value;
        window.effects.effectChange(100);
        effectLineWidth = document.querySelector('.effect-level__line').offsetWidth;
        effectLevelPin.style = 'left:' + effectLineWidth + 'px';
        depth.style = 'width:' + effectLineWidth + 'px';
      };

      window.setMouseDownChangeHandler = function (evt) {
        evt.preventDefault();

        var onMouseMoveChangeHandler = function (moveEvt) {
          effectLineWidth = document.querySelector('.effect-level__line').offsetWidth;
          var moveScroll = startScroll - moveEvt.clientX;
          startScroll = moveEvt.clientX;
          var scrollPosition = effectLevelPin.offsetLeft - moveScroll;

          if (scrollPosition < 0) {
            scrollPosition = 0;
          }
          if (scrollPosition > effectLineWidth) {
            scrollPosition = effectLineWidth;
          }

          effectLevelPin.style.left = scrollPosition + 'px';
          depth.style.width = scrollPosition + 'px';
          scrollPosition = scrollPosition * 100 / effectLineWidth;
          effectLevelPin.value = scrollPosition;
          return window.effects.effectChange(scrollPosition);
        };

        var onMouseUpChangeHandler = function (upEvt) {
          upEvt.preventDefault();
          document.removeEventListener('mousemove', onMouseMoveChangeHandler);
          document.removeEventListener('mouseup', onMouseUpChangeHandler);
        };

        document.addEventListener('mousemove', onMouseMoveChangeHandler);
        document.addEventListener('mouseup', onMouseUpChangeHandler);
      };

      effectList.addEventListener('change', window.setChangeEffectList);
      effectLevelPin.addEventListener('mousedown', window.setMouseDownChangeHandler);
    },
    resetMouseDownChange: function () {
      effectList.removeEventListener('change', window.setChangeEffectList);
      effectLevelPin.removeEventListener('mousedown', window.setMouseDownChangeHandler);
    }
  };
})();
