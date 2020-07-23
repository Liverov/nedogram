(function (){
  var ESCAPE_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  
  window.utils = {
    isEscEvent: function (evt, action) {
      if(evt.keyCode === ESCAPE_KEYCODE) {
        console.log('Pressed esc');
        evt.preventDefault();
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if(evt.keyCode === ENTER_KEYCODE) {
        console.log('Pressed enter');
        evt.preventDefault();
        action();
      }
    },
    generateRandomInt: function (min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  };
})();