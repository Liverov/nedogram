'use strict';

(function () {
  var SCALE_STEP = 25;
  var DEFAULT_SCALE_VALUE = '100%';
  var DEFAULT_SCALE_SIZE = 100;
  var EFFECT_LINE_WIDTH = 435;
  var EFFECT_MIN = 0;
  var EFFECT_MAX = 100;
  var CHROME_MAX = 1;
  var SEPIA_MAX = 1;
  var MARVIN_MAX = 100;
  var PHOBOS_MAX = 3;
  var HEAT_MIN = 1;
  var HEAT_MAX = 3;

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
  var effectLevelValue = document.querySelector('.effect-level__value');
  var effectRadioButtons = effectList.querySelectorAll('.effects__radio');
  var startScroll;
  var imageStyle = imagePreview.style;

  window.effects = {
    effectChange: function () {
      var value = +effectLevelPin.style.left.replace('px', '');
      effectLevelValue.setAttribute('value', (value * 100 / EFFECT_LINE_WIDTH).toFixed(0));
      window.effects.scaleChange();
      var getEffectValue = function (effectMin, effectMax) {
        return ((effectLevelValue.value * (effectMax - effectMin) / 100) + effectMin);
      };

      if (effectRadioButtons[1].checked) {
        imageStyle.filter = 'grayscale(' + getEffectValue(EFFECT_MIN, CHROME_MAX) + ')';
      } else if (effectRadioButtons[2].checked) {
        imageStyle.filter = 'sepia(' + getEffectValue(EFFECT_MIN, SEPIA_MAX) + ')';
      } else if (effectRadioButtons[3].checked) {
        imageStyle.filter = 'invert(' + getEffectValue(EFFECT_MIN, MARVIN_MAX) + '%)';
      } else if (effectRadioButtons[4].checked) {
        imageStyle.filter = 'blur(' + getEffectValue(EFFECT_MIN, PHOBOS_MAX) + 'px)';
      } else if (effectRadioButtons[5].checked) {
        imageStyle.filter = 'brightness(' + getEffectValue(HEAT_MIN, HEAT_MAX) + ')';
      } else {
        effectLevel.classList.add('hidden');
        imagePreview.removeAttribute('style');
      }
    },
    scaleChange: function () {
      var scale = DEFAULT_SCALE_SIZE;
      scaleValue.value = DEFAULT_SCALE_VALUE;
      var scaleSumm;
      var setScaleSmallerHandler = function () {
        if (scale - SCALE_STEP >= SCALE_STEP) {
          scale -= SCALE_STEP;
          scaleSumm = scale / 100;
          imageStyle.transform = 'scale(' + scaleSumm + ')';
          scaleValue.value = scale + '%';
        }
      };

      var setScaleBiggerHandler = function () {
        if (scale < 100) {
          scale += SCALE_STEP;
          scaleSumm = scale / 100;
          imageStyle.transform = 'scale(' + scaleSumm + ')';
          scaleValue.value = scale + '%';
        }
      };

      scaleSmaller.addEventListener('click', setScaleSmallerHandler);
      scaleBigger.addEventListener('click', setScaleBiggerHandler);
    },
    resetFilters: function () {
      imagePreview.style.filter = '';
      effectLevelPin.style.left = EFFECT_MAX + '%';
      depth.style.width = EFFECT_MAX + '%';
    },
    changeEffectPicture: function (evt) {
      window.effects.resetFilters();
      var pictureEffect = evt.target.value;
      effectLevel.classList.remove('hidden');
      imagePreview.setAttribute('class', 'img-upload__preview');
      imagePreview.classList.add('effects__preview--' + pictureEffect);
      if (pictureEffect === 'none') {
        effectLevel.classList.add('hidden');
        imagePreview.style.filter = '';
      }
    },
    scrollEffectChange: function () {
      var setMouseDownChangeHandler = function (evt) {
        evt.preventDefault();
        var effectLineWidth = document.querySelector('.effect-level__line').offsetWidth;
        var onMouseMoveChange = function (moveEvt) {
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
          document.removeEventListener('mousemove', onMouseMoveChange);
          document.removeEventListener('mouseup', onMouseUpChangeHandler);
        };

        document.addEventListener('mousemove', onMouseMoveChange);
        document.addEventListener('mouseup', onMouseUpChangeHandler);
      };

      effectLevelPin.addEventListener('mousedown', setMouseDownChangeHandler);
    }
  };
  effectList.addEventListener('change', window.effects.changeEffectPicture);
})();
