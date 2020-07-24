'use strict';

(function () {
  console.log('1' + document.querySelector('.picture'));
  var COMMENTS_MESSAGES = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  var COMMENTS_NAMES = [
    'Артем',
    'Антон',
    'Ольга',
    'Ирина',
    'Василий',
    'Яков',
    'Петр'
  ];

  window.data = {
    PHOTOS_QUANTITY: 25,
    generatePhotos: function (num) {
      var photos = [];
      for (var i = 0; i < num; i++) {
        photos.push({
          'url': 'photos/' + (i + 1) + '.jpg',
          'description': 'Описание к фотографии #' + i,
          'likes': window.utils.generateRandomInt(15, 200),
          'comments': window.data.generateComments(window.utils.generateRandomInt(1, 4))
        });
      }
      return photos;
    },
    generateComments: function (num) {
      var comments = [];
      for (var i = 0; i < num; i++) {
        comments.push({
          'avatar': 'img/avatar-' + window.utils.generateRandomInt(1, 6) + '.svg',
          'message': COMMENTS_MESSAGES[window.utils.generateRandomInt(0, 5)],
          'name': COMMENTS_NAMES[window.utils.generateRandomInt(0, 6)]
        });
      }

      return comments;
    }
  };
})();
