'use strict'

var PHOTOS_QUANTITY = 25;
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

var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
var pictures = document.querySelector('.pictures');
var arrPhotos = generatePhotos(PHOTOS_QUANTITY);
var fragment = document.createDocumentFragment();

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generatePhotos(num) {
  var photos = [];
  for(var i = 0; i < num; i++) {
    photos[i] = {
      'url': 'photos/' + (i + 1) + '.jpg',
      'description': 'Описание к фотографии #' + i,
      'likes': getRandomInt(15, 200),
      'comments': generateComments(getRandomInt(1, 4))
    };
  }

  return photos;
}

function generateComments(num) {
  var comments = [];
  for(var i = 0; i < num; i++) {
    comments[i] = {
      avatar: 'img/avatar-' + getRandomInt(1, 6) + '.svg',
      message: COMMENTS_MESSAGES[getRandomInt(0, 5)],
      name: COMMENTS_NAMES[getRandomInt(0, 6)]
    };
  }

  return comments;
}

function renderPhotos(photo) {
  var photoElement = pictureTemplate.cloneNode(true);
  var photoImg = photoElement.querySelector('img');
  var photoLikes = photoElement.querySelector('.picture__likes');
  var photoComments = photoElement.querySelector('.picture__comments');

  photoImg.src = photo.url;
  photoLikes.textContent = photo.likes;
  photoComments.textContent = photo.comments.length;
  return photoElement;
}

for (var i = 0; i < arrPhotos.length; i++) {
  fragment.appendChild(renderPhotos(arrPhotos[i]));
}
pictures.appendChild(fragment);
