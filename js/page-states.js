const formPage = document.querySelector( '.ad-form' );
const fieldsetFormPage = formPage.querySelectorAll( 'fieldset' );
const mapFilters = document.querySelector( '.map__filters' );
const select = mapFilters.querySelectorAll( 'select' );
const fieldsetMapFilters = mapFilters.querySelector( 'fieldset' );

const getActiveForm = () => {
  fieldsetFormPage.forEach( ( item ) => {
    item.disabled = false;
  });

  formPage.classList.remove( 'ad-form--disabled' );
};

const getActiveMap = () => {
  select.forEach( ( item ) => {
    item.disabled = false;
  });

  fieldsetMapFilters.disabled = false;
  mapFilters.classList.remove( 'map__filters--disabled' );
};

export { getActiveMap, getActiveForm, formPage };
