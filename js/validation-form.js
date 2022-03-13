const inputPrice = document.querySelector( '#price' );
const inputTitle = document.querySelector( '#title' );

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

inputPrice.addEventListener('input', () => getValueInput( inputPrice ));

inputTitle.addEventListener('input', () => getLengthString( inputTitle ));

// Отключить кнопку в зависимости от выбора
const SELECTION_VALUE = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0'],
};

const roomNumber = document.querySelector( '#room_number' );
const optionsRoom = roomNumber.querySelectorAll( 'option' );

const getDisabledElements = (element, item) => {
  const isNecessary = element.some(( someItem ) => someItem === item.value);

  if ( !isNecessary ) {
    item.disabled = true;
  } else {
    item.disabled = false;
    item.selected = true;
  }
};

const capscity = document.querySelector( '#capacity' );
const options = capscity.querySelectorAll( 'option' );

optionsRoom.forEach(( itemRoom ) => {
  if (itemRoom.selected) {
    options.forEach(( item ) => getDisabledElements( SELECTION_VALUE[itemRoom.value], item ));
  }
});

roomNumber.addEventListener('change', (evt) => {
  options.forEach(( item ) => getDisabledElements( SELECTION_VALUE[evt.target.value], item ));
});

// Значение выбирается в зависимости от значения другой кнопки
const timeIn = document.querySelector( '#timein' );
const timeOut = document.querySelector( '#timeout' );

const onSwitchData = ( evt, element ) => {
  const options = element.querySelectorAll( 'option' );

  options.forEach(( item ) => {
    if ( evt.target.value === item.value ) {
      item.selected = true;
    }
  })
}

timeIn.addEventListener('change', ( evt ) => onSwitchData( evt, timeOut ));

timeOut.addEventListener('change', ( evt ) => onSwitchData( evt, timeIn ));

// Меняет значение placeholder и min в зависимости от выбора категории
const typeHouse = document.querySelector( '#type' );
const typeOptions = typeHouse.querySelectorAll( 'option' );

const MIN_PRICE = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};

const onReplacingValue = ( element ) => {
  inputPrice.placeholder = element;
  inputPrice.min = element;
};

typeOptions.forEach(( itemType ) => {
  if ( itemType.selected ) {
    onReplacingValue(MIN_PRICE[ itemType.value ]);
  }
});

typeHouse.addEventListener('change', ( evt ) => {
  inputPrice.value = '';
  onReplacingValue(MIN_PRICE[ evt.target.value ]);
});
