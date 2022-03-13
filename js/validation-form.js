const INPUT_PRICE = document.querySelector( '#price' );
const INPUT_TITLE = document.querySelector( '#title' );

const getValueInput = ( element ) => {
  if ( element.value < +element.min ) {
    element.setCustomValidity( `Увеличьте минимум на ${ +element.min - element.value } руб.` );
  } else if ( element.value > +element.max ) {
    element.setCustomValidity( `Уменьшите минимум на ${ element.value - +element.max } руб.` );
  } else {
    element.setCustomValidity( '' );
  }

  element.reportValidity();
};

const getLengthString = ( element ) => {
  if ( element.value.length < +element.minLength ) {
    element.setCustomValidity( `Увеличьте минимум на ${ +element.minLength - element.value.length } символов` );
  } else if ( element.value.length > +element.maxLength ) {
    element.setCustomValidity( `Уменьшите минимум на ${ element.value.length - +element.maxLength } символов` );
  } else {
    element.setCustomValidity( '' );
  }

  element.reportValidity();
};

INPUT_PRICE.addEventListener('input', () => getValueInput( INPUT_PRICE ));

INPUT_TITLE.addEventListener('input', () => getLengthString( INPUT_TITLE ));

// Отключить кнопку в зависимости от выбора
const SELECTION_VALUE = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0'],
};

const ROOM_NUMBER = document.querySelector( '#room_number' );
const OPTIONS_ROOM = ROOM_NUMBER.querySelectorAll( 'option' );

const getDisabledElements = (element, item) => {
  const isNecessary = element.some(( someItem ) => someItem === item.value);

  if ( !isNecessary ) {
    item.disabled = true;
  } else {
    item.disabled = false;
    item.selected = true;
  }
};

OPTIONS_ROOM.forEach(( itemRoom ) => {
  if (itemRoom.selected) {
    const capscity = document.querySelector( '#capacity' );
    const options = capscity.querySelectorAll( 'option' );

    options.forEach(( item ) => getDisabledElements( SELECTION_VALUE[itemRoom.value], item ));
  }
});

ROOM_NUMBER.addEventListener('change', (evt) => {
  const capscity = document.querySelector( '#capacity' );
  const options = capscity.querySelectorAll( 'option' );

  options.forEach(( item ) => getDisabledElements( SELECTION_VALUE[evt.target.value], item ));
});
