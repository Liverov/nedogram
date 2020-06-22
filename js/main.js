'use strict';

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
var bigPicture = document.querySelector('.big-picture');


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generatePhotos(num) {
  var photos = [];
  for (var i = 0; i < num; i++) {
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
  for (var i = 0; i < num; i++) {
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

// Временное решение
bigPicture.classList.remove('hidden');

// Рендер большого фото первым элементом массива
renderBigPhoto(arrPhotos[0]);
function renderBigPhoto(photo) {
  var bigPicImg = bigPicture.querySelector('.big-picture__img');
  var bigPicLikes = bigPicture.querySelector('.likes-count');
  var bigPicComments = bigPicture.querySelector('.comments-count');
  var bigPicSocialComments = bigPicture.querySelector('.social__comments');
  var bigPicDescription = bigPicture.querySelector('.social__caption');

  bigPicImg.querySelector('img').src = photo.url;
  bigPicLikes.textContent = photo.likes;
  bigPicComments.textContent = photo.comments.length;


  for (var j = 0; j < photo.comments.length; j++) {
    var li = bigPicSocialComments.querySelector('li');
    var img = li.querySelector('img');
    img.src = photo.comments[j].avatar;
    img.alt = photo.comments[j].name;
    var commentMessage = li.querySelector('.social__text');
    commentMessage.textContent = photo.comments[j].message;
    bigPicSocialComments.appendChild(li);
  }

  bigPicDescription.textContent = photo.description;

}

document.querySelector('.social__comment-count').classList.add('hidden');
document.querySelector('.comments-loader').classList.add('hidden');
document.querySelector('body').classList.add('modal-open');
