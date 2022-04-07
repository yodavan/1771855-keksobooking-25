import { getActiveForm } from './page-states.js';
import { createHotelCard } from './creates-similar-cards.js';
import { filterMap } from './filter.js';

const map = L.map( 'map-canvas' )
  .on('load', () => {
    getActiveForm();
  })

  .setView({
    lat: 35.692429,
    lng: 139.776915,
  }, 12);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo( map );

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [ 52, 52 ],
  iconAnchor: [ 26, 52 ],
});

const mainPinMarker = L.marker(
  {
    lat: 35.692429,
    lng: 139.776915,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo( map );

//Значение по умолчанию input address
const addressHotel = document.querySelector( '#address' );

const getDefaultAddress = () => {
  addressHotel.value = `lat: ${mainPinMarker._latlng.lat.toFixed(5)} lng: ${mainPinMarker._latlng.lng.toFixed(5)}`;
};

getDefaultAddress();

mainPinMarker.on('moveend', ( evt ) => {
  addressHotel.value = `lat: ${evt.target.getLatLng().lat.toFixed(5)} lng: ${evt.target.getLatLng().lng.toFixed(5)}`;
});

const pinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [ 40, 40 ],
  iconAnchor: [ 20, 40 ],
});

const NUMBER_OF_ELEMENTS = 10;

const markerGroup = L.layerGroup().addTo( map );

const getHotelMap = ( arrayHotels ) => {

  markerGroup.clearLayers();

  filterMap(arrayHotels)
    .slice(0, NUMBER_OF_ELEMENTS)
    .forEach(( item ) => {
      const { location: { lat, lng } } = item;

      const marker = L.marker(
        {
          lat,
          lng
        },
        {
          pinIcon,
        },
      );

      marker
        .addTo( markerGroup )
        .bindPopup( createHotelCard( item ));
    });
};

export { getHotelMap, mainPinMarker, map, getDefaultAddress };
