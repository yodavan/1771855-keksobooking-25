const housingType = document.querySelector('#housing-type');
const housingPrice = document.querySelector('#housing-price');
const housingRooms = document.querySelector('#housing-rooms');
const housingGuests = document.querySelector('#housing-guests');
const housingFeatures = document.querySelector('#housing-features');
const first = housingFeatures.querySelector('#filter-wifi');
const second = housingFeatures.querySelector('#filter-dishwasher');
const third = housingFeatures.querySelector('#filter-parking');
const fourth = housingFeatures.querySelector('#filter-washer');
const fifth = housingFeatures.querySelector('#filter-elevator');
const sixth = housingFeatures.querySelector('#filter-conditioner');


const PRICE = {
  'low': 10000,
  'high': 50000,
};

//Функция сравнения значений
const getComparisonOfValues = ( item, element, address ) => {
  if ( element.value === 'any' ) {
    return item;
  }

  return ( String( address ) === element.value );
};

//Сортировка стоимости
const filterPrice = ( item ) => {
  if ( housingPrice.value === 'any' ) {
    return item;
  }

  if ( housingPrice.value === 'middle' ) {
    return ( item.offer.price > PRICE[ 'low' ] && item.offer.price < PRICE[ 'high' ] );
  }

  if ( housingPrice.value === 'low' ) {
    return ( item.offer.price < PRICE[ 'low' ] );
  }

  if ( housingPrice.value === 'high' ) {
    return ( item.offer.price > PRICE[ 'high' ] );
  }
};

const filterFeatures = ( element, item ) => {
  if ( element.checked ) {
    if ( item.offer.features !== undefined ) {
      const i = item.offer.features.some( ( el ) => el === element.value );
      if ( i ) {
        return item;
      }
    }
  } else {
    return item;
  }
};

const filterMap = ( array ) => array
  .filter(( item ) => getComparisonOfValues( item, housingType, item.offer.type ))
  .filter(( item ) => filterPrice( item ))
  .filter(( item ) => getComparisonOfValues( item, housingRooms, item.offer.rooms ))
  .filter(( item ) => getComparisonOfValues( item, housingGuests, item.offer.guests ))
  .filter(( item ) => filterFeatures( first, item ))
  .filter(( item ) => filterFeatures( second, item ))
  .filter(( item ) => filterFeatures( third, item ))
  .filter(( item ) => filterFeatures( fourth, item ))
  .filter(( item ) => filterFeatures( fifth, item ))
  .filter(( item ) => filterFeatures( sixth, item ));

const onClickType = ( element ) => {
  housingType.addEventListener( 'change', () => {
    element();
  });
};

const onHousingPrice = ( element ) => {
  housingPrice.addEventListener( 'change', () => {
    element();
  });
};

const onHousingRooms = ( element ) => {
  housingRooms.addEventListener( 'change', () => {
    element();
  });
};

const onHousingGuests = ( element ) => {
  housingGuests.addEventListener( 'change', () => {
    element();
  });
};

const onHousingFeatures = ( element ) => {
  housingFeatures.addEventListener( 'change', () => {
    element();
  });
};

export { filterMap, onClickType, onHousingPrice, onHousingRooms, onHousingGuests, onHousingFeatures };
