/* global noUiSlider:readonly */
import { inputPrice, getValueInput, typeHouse, MIN_PRICE } from './validation-form.js';
import { resetButton } from './map-hotels.js';

const sliderElement = document.querySelector('.ad-form__slider');

inputPrice.value = 15000;

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100000,
  },
  start: 15000,
  step: 100,
  connect: 'lower',
  format: {
    to: function (value) {
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

sliderElement.noUiSlider.on('update', () => {
  inputPrice.value = sliderElement.noUiSlider.get();
  getValueInput( inputPrice );
});

typeHouse.addEventListener('change', (evt) => {
  if (evt.target.checked) {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: MIN_PRICE[evt.target.value],
      }
    });
  } else {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100000,
      },
      step: 100
    });
    sliderElement.noUiSlider.set(15000);
  }
});

resetButton.addEventListener('click', () => {
  inputPrice.setAttribute('value', '15000');
});
