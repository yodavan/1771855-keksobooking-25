/* global noUiSlider:readonly */
import { inputPrice, getValueInput, typeHouse, MIN_PRICE } from './validation-form.js';

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

typeHouse.addEventListener( 'change', ( evt ) => {

  if ( MIN_PRICE[ evt.target.value ] > inputPrice.value ) {
    return sliderElement.noUiSlider.set( MIN_PRICE[ evt.target.value ] );
  }

});

export { sliderElement };
