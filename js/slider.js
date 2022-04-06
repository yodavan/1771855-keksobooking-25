/* global noUiSlider:readonly */
import { inputPrice, getValueInput } from './validation-form.js';

const sliderElement = document.querySelector( '.ad-form__slider' );

inputPrice.value = 5000;

noUiSlider.create( sliderElement, {
  range: {
    min: 0,
    max: 100000,
  },
  start: 5000,
  step: 100,
  connect: 'lower',
  format: {
    to: function ( value ) {
      return value.toFixed( 0 );
    },
    from: function ( value ) {
      return parseFloat( value );
    },
  },
});

sliderElement.noUiSlider.on( 'update', () => {
  inputPrice.value = sliderElement.noUiSlider.get();
  getValueInput( inputPrice );
});

export { sliderElement };
