'use strict';

(function () {
  var main = document.querySelector('main');
  window.modalForm = {
    showSuccessMessage: function () {
      var success = document.querySelector('#success').content;
      var cloneSuccess = success.cloneNode(true);
      main.appendChild(cloneSuccess);
      document.addEventListener('click', closeSuccessFormHandler);
      document.addEventListener('keydown', closeSuccessHandler);
    },
    showErrorMessage: function () {
      var error = document.querySelector('#error').content;
      var errorClone = error.cloneNode(true);
      main.appendChild(errorClone);
      document.addEventListener('click', closeErrorFormHandler);
      document.addEventListener('keydown', closeErrorHandler);
    }
  };

  var closeSuccessFormHandler = function (evt) {
    var successInner = document.querySelector('.success__inner');
    var successModaTitle = document.querySelector('.success__title');
    if (evt.target === successInner || evt.target === successModaTitle) {
      return;
    } else {
      var successClose = main.querySelector('.success');
      main.removeChild(successClose);
      document.removeEventListener('click', closeSuccessFormHandler);
      document.removeEventListener('keydown', closeSuccessHandler);
    }
  };

  var closeSuccessHandler = function (evt) {
    if (evt.keyCode === window.utils.ESCAPE_KEYCODE) {
      closeSuccessFormHandler(evt);
    }
  };

  var closeErrorHandler = function (evt) {
    if (evt.keyCode === window.utils.ESCAPE_KEYCODE) {
      closeErrorFormHandler(evt);
    }
  };

  var closeErrorFormHandler = function (evt) {
    var errorModalTemplate = main.querySelector('.error');
    var errorModalInner = document.querySelector('.error__inner');
    var errorModalTitle = document.querySelector('.error___title');
    if (evt.target === errorModalInner || evt.target === errorModalTitle) {
      return;
    } else {
      main.removeChild(errorModalTemplate);
      document.removeEventListener('click', closeErrorFormHandler);
      document.removeEventListener('keydown', closeErrorHandler);
    }
  };
})();
