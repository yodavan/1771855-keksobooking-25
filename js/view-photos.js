const FILE_TYPES = [ 'png', 'jpeg', 'jpg' ];

const previewWrapper = document.querySelector('.ad-form-header__preview');
const photoAvatar = previewWrapper.querySelector('img');
const inputAvatar = document.querySelector('#avatar');
const inputHotel = document.querySelector('#images');
const photoHotelWrapper = document.querySelector('.ad-form__photo');


inputAvatar.addEventListener('change', () => {
  const file = inputAvatar.files[0];
  const fileName = file.name.toLowerCase();

  const isNecessary = FILE_TYPES.some(( item ) => fileName.endsWith(item));
  if ( isNecessary ) {
    photoAvatar.src = URL.createObjectURL(file);
  }
});

inputHotel.addEventListener('change', () => {
  const file = inputHotel.files[0];
  const fileName = file.name.toLowerCase();

  const photoHotel = document.createElement('img');
  photoHotel.setAttribute('alt', 'Фото номера');
  photoHotel.setAttribute('width', '70');
  photoHotel.setAttribute('height', '70');

  photoHotelWrapper.appendChild(photoHotel);

  const isNecessary = FILE_TYPES.some(( item ) => fileName.endsWith(item));
  if ( isNecessary ) {
    photoHotel.src = URL.createObjectURL(file);
  }
});

const resetPhoto = () => {
  photoAvatar.src = 'img/muffin-grey.svg';
  photoHotelWrapper.querySelectorAll('img').forEach(( item ) => {
    item.remove();
  });
};

export { resetPhoto };
