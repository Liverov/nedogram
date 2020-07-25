'use strict';

(function () {
  var pictures = document.querySelector('.pictures');
  var uploadOverlay = pictures.querySelector('.img-upload__overlay');
  var imgPreview = pictures.querySelector('.img-upload__preview');
  var scaleSmaller = document.querySelector('.scale__control--smaller');
  var scaleBigger = document.querySelector('.scale__control--bigger');
  var scaleValue = document.querySelector('.scale__control--value');

  var effects = uploadOverlay.querySelector('.effects'); // Fieldset
  var effectLevel = uploadOverlay.querySelector('.img-upload__effect-level');
  var effectLevelPin = document.querySelector('.effect-level__pin');
  var depth = document.querySelector('.effect-level__depth');
  var startScroll;
  var effectLineWidth = document.querySelector('.effect-level__line').offsetWidth;
  window.effects = {
    effectChangeHandler: function (scrollPosition) {
      imgPreview.setAttribute('class', '');
      imgPreview.classList.add('effects__preview--' + window.pictureEffect);

      if (window.pictureEffect === 'none') {
        effectLevel.classList.add('hidden');
      } else {
        effectLevel.classList.remove('hidden');
      }

      switch (window.pictureEffect) {
        case 'chrome':
          imgPreview.style = 'filter: grayscale(' + scrollPosition / 100 + ')';
          break;
        case 'sepia':
          imgPreview.style = 'filter: sepia(' + scrollPosition / 100 + ')';
          break;
        case 'marvin':
          imgPreview.style = 'filter: invert(' + scrollPosition + '%)';
          break;
        case 'phobos':
          var phobosLevel = scrollPosition * 3 / 100;
          imgPreview.style = 'filter: blur(' + phobosLevel + 'px)';
          break;
        case 'heat':
          var heatLevel = scrollPosition * 3 / 100;
          if (heatLevel < 1) {
            heatLevel = 1;
          }
          imgPreview.style = 'filter: brightness(' + heatLevel + ')';
          break;
        case 'none':
          effectLevel.classList.add('hidden');
          imgPreview.style = '';
          break;
      }
    }
  };

  // ScaleControls
  var scale = 100;
  var scaleStep = 25;
  scaleValue.value = scale + '%';

  scaleSmaller.addEventListener('click', function () {
    if (scale - scaleStep >= scaleStep) {
      scale -= scaleStep;
      var scaleSumm = scale / 100;
      imgPreview.style = 'transform: scale(' + scaleSumm + ')';
      scaleValue.value = scale + '%';
    }
  });

  scaleBigger.addEventListener('click', function () {
    if (scale < 100) {
      scale += scaleStep;
      var scaleSumm = scale / 100;
      imgPreview.style = 'transform: scale(' + scaleSumm + ')';
      scaleValue.value = scale + '%';
    }
  });

  // effects.addEventListener('change', window.effects.effectChangeHandler);
  effects.addEventListener('change', function (evt) {
    window.pictureEffect = evt.target.value;
    window.effects.effectChangeHandler(100);
    effectLevelPin.style = 'left:' + effectLineWidth;
    depth.style = 'width:' + effectLineWidth;
  });

  effectLevelPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var onMouseMove = function (moveEvt) {
      var lineWidth = document.querySelector('.effect-level__line').offsetWidth;
      var moveScroll = startScroll - moveEvt.clientX;
      startScroll = moveEvt.clientX;
      var scrollPosition = effectLevelPin.offsetLeft - moveScroll;

      if (scrollPosition < 0) {
        scrollPosition = 0;
      }
      if (scrollPosition > lineWidth) {
        scrollPosition = lineWidth;
      }

      effectLevelPin.style.left = scrollPosition + 'px';
      depth.style.width = scrollPosition + 'px';
      scrollPosition = scrollPosition * 100 / lineWidth;
      effectLevelPin.value = scrollPosition;
      return window.effects.effectChangeHandler(scrollPosition);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });
})();
