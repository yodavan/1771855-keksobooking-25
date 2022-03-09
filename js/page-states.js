const getInactiveStatePage = () => {
  const formPage = document.querySelector( '.ad-form' );
  const fieldsetFormPage = formPage.querySelectorAll( 'fieldset' );
  const mapFilters = document.querySelector( '.map__filters' );
  const select = mapFilters.querySelectorAll( 'select' );
  const fieldsetMapFilters = mapFilters.querySelector( 'fieldset' );

  select.forEach( ( item ) => {
    item.disabled = true;
  });
  fieldsetFormPage.forEach( ( item ) => {
    item.disabled = true;
  });

  fieldsetMapFilters.disabled = true;
  formPage.classList.add( 'ad-form--disabled' );
  mapFilters.classList.add( 'map__filters--disabled' );
};

const getActiveStatePage = () => {
  const formPage = document.querySelector( '.ad-form' );
  const fieldsetFormPage = formPage.querySelectorAll( 'fieldset' );
  const mapFilters = document.querySelector( '.map__filters' );
  const select = mapFilters.querySelectorAll( 'select' );
  const fieldsetMapFilters = mapFilters.querySelector( 'fieldset' );

  fieldsetFormPage.forEach( ( item ) => {
    item.disabled = false;
  });
  select.forEach( ( item ) => {
    item.disabled = false;
  });

  fieldsetMapFilters.disabled = false;
  formPage.classList.remove( 'ad-form--disabled' );
  mapFilters.classList.remove( 'map__filters--disabled' );
};

export { getInactiveStatePage, getActiveStatePage };
