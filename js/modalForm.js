'use strict';

(function () {
  var ESCAPE_KEYCODE = 27;

  var main = document.querySelector('main');
  var messageModal;
  window.modalForm = {
    showSuccessMessage: function () {
      window.modalForm.createMessageModal('#success', '.success');
    },
    showErrorMessage: function (errorMessageText) {
      window.modalForm.createMessageModal('#error', '.error', errorMessageText);
    },
    createMessageModal: function (element, state, errorMessageText) {
      var messageTemplate = document.querySelector(element).content.querySelector(state);
      var message = messageTemplate.cloneNode(true);
      var messageTitle = message.querySelector(state + '__title');
      var fragment = document.createDocumentFragment();

      if (state === '.error') {
        messageTitle.textContent = errorMessageText;
      }

      fragment.appendChild(message);
      main.appendChild(fragment);
      messageModal = main.querySelector(state);

      document.addEventListener('keydown', closeModalEscPress);
      document.addEventListener('click', closeModalClickBody);
    }
  };

  var closeModal = function () {
    main.removeChild(messageModal);
    document.removeEventListener('keydown', closeModalEscPress);
    document.removeEventListener('click', closeModalClickBody);
  };

  var closeModalEscPress = function (evt) {
    if (evt.keyCode === ESCAPE_KEYCODE) {
      evt.preventDefault();
      closeModal();
    }
  };

  var closeModalClickBody = function (evt) {
    closeModal(evt);
  };
})();
