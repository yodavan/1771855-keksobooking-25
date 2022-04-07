const inputPrice = document.querySelector( '#price' );
const inputTitle = document.querySelector( '#title' );
const roomNumber = document.querySelector( '#room_number' );
const capscity = document.querySelector( '#capacity' );
const typeHouse = document.querySelector( '#type' );
const typeOptions = typeHouse.querySelectorAll( 'option' );

const MIN_PRICE = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};
const ROOM_VALUE = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0'],
};
const CAPCITY_VALUE = {
  1: ['1', '2', '3'],
  2: ['2', '3'],
  3: ['3'],
  0: ['100'],
};

const getValueInput = ( element ) => {
  if ( element.value < +element.min ) {
    element.style.border = ('2px solid red');
    element.setCustomValidity( `Увеличьте минимум на ${ +element.min - element.value } руб.` );
  } else if ( element.value > +element.max ) {
    element.style.border = ('2px solid red');
    element.setCustomValidity( `Уменьшите минимум на ${ element.value - +element.max } руб.` );
  } else {
    element.style.border = ('2px solid green');
    element.setCustomValidity( '' );
  }

  element.reportValidity();
};

const getLengthString = ( element ) => {
  if ( element.value.length < +element.minLength ) {
    element.style.border = ('2px solid red');
    element.setCustomValidity( `Увеличьте минимум на ${ +element.minLength - element.value.length } символов` );
  } else if ( element.value.length > +element.maxLength ) {
    element.style.border = ('2px solid red');
    element.setCustomValidity( `Уменьшите минимум на ${ element.value.length - +element.maxLength } символов` );
  } else {
    element.style.border = ('2px solid green');
    element.setCustomValidity( '' );
  }

  element.reportValidity();
};

inputPrice.addEventListener('input', () => getValueInput( inputPrice ));

inputTitle.addEventListener('input', () => getLengthString( inputTitle ));

// Отключить кнопку в зависимости от выбора
const getElementList = ( element, select, selectSecond ) => {
  const isNecessary = element.some(( someItem ) => someItem === select.value);

  if ( !isNecessary ) {
    selectSecond.setCustomValidity( 'Выберите другой вариант' );
  }
  else {
    selectSecond.setCustomValidity( '' );
  }

  selectSecond.reportValidity();
};

roomNumber.addEventListener('change', (evt) => {
  getElementList( ROOM_VALUE[evt.target.value], capscity, capscity );
});

capscity.addEventListener('change', (evt) => {
  getElementList( CAPCITY_VALUE[evt.target.value], roomNumber, capscity );
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
  });
};

timeIn.addEventListener('change', ( evt ) => onSwitchData( evt, timeOut ));

timeOut.addEventListener('change', ( evt ) => onSwitchData( evt, timeIn ));

// Меняет значение placeholder и min в зависимости от выбора категории
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
  if ( inputPrice.value === '' ) {
    return onReplacingValue(MIN_PRICE[ evt.target.value ]);
  }
  onReplacingValue(MIN_PRICE[ evt.target.value ]);
  getValueInput( inputPrice );
});

export { inputPrice, inputTitle, getValueInput };
