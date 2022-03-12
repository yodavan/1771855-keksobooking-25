const INPUT_PRICE = {
  inputItem: document.querySelector( '#price' ),
  min: 0,
  max: 100000,
  value: 'руб.'
};

const INPUT_TITLE = {
  inputItem: document.querySelector( '#title' ),
  min: 30,
  max: 100,
  value: 'символов'
};

const getValueInput = ( element ) => {
  if ( element.inputItem.value < element.min ) {
    element.inputItem.setCustomValidity( `Увеличьте минимум на ${ element.min - element.inputItem.value } ${ element.value }` );
  } else if ( element.inputItem.value > element.max ) {
    element.inputItem.setCustomValidity( `Уменьшите минимум на ${ element.inputItem.value - element.max } ${ element.value }` );
  } else {
    element.inputItem.setCustomValidity( '' );
  }

  element.inputItem.reportValidity();
};

const getLengthString = ( element ) => {
  if ( element.inputItem.value.length < element.min ) {
    element.inputItem.setCustomValidity( `Увеличьте минимум на ${ element.min - element.inputItem.value.length } ${ element.value }` );
  } else if ( element.inputItem.value.length > element.max ) {
    element.inputItem.setCustomValidity( `Уменьшите минимум на ${ element.inputItem.value.length - element.max } ${ element.value }` )
  } else {
    element.inputItem.setCustomValidity( '' );
  }

  element.inputItem.reportValidity();
};

INPUT_PRICE.inputItem.addEventListener('input', () => {
  getValueInput( INPUT_PRICE );
});

INPUT_TITLE.inputItem.addEventListener('input', () => {
  getLengthString( INPUT_TITLE );
});

// Отключить кнопку в зависимости от выбора
const SELECTION_VALUE = {
  1: ["1"],
  2: ["1", "2"],
  3: ["1", "2", "3"],
  100: ["0"],
}

const ROOM_NUMBER = document.querySelector( '#room_number' );
const OPTIONS_ROOM = ROOM_NUMBER.querySelectorAll( 'option' );

const getDisabledElements = (element, item) => {
  const isNecessary = element.some(( someItem ) => {
    return someItem === item.value;
  })

  if ( !isNecessary ) {
    item.disabled = true
  } else {
    item.disabled = false;
    item.selected = true;
  }
};

OPTIONS_ROOM.forEach(( itemRoom ) => {
  if (itemRoom.selected) {
    const capscity = document.querySelector( '#capacity' );
    const options = capscity.querySelectorAll( 'option' );

    options.forEach(( item ) => {
      getDisabledElements( SELECTION_VALUE[itemRoom.value], item );
    })
  }
});

ROOM_NUMBER.addEventListener('change', (evt) => {
  const capscity = document.querySelector( '#capacity' );
  const options = capscity.querySelectorAll( 'option' );

  options.forEach(( item ) => {
    getDisabledElements( SELECTION_VALUE[evt.target.value], item );
  });
});
