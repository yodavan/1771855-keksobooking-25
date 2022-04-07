import './validation-form.js';
import './map-hotels.js';
import './page-states.js';
import './slider.js';
import './form-submit.js';
import './view-photos.js'
import { getHotelMap } from './map-hotels.js';
import { setHotelFormSubmit, getInitialState } from './form-submit.js';
import { getData } from './api.js';

getData(getHotelMap);

setHotelFormSubmit(getInitialState);
