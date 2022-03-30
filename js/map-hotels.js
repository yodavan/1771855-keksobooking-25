import { getActiveStatePage } from './page-states.js';
import { createHotelCard } from './creates-similar-cards.js';

const map = L.map( 'map-canvas' )
  .on('load', () => {
    getActiveStatePage();
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

mainPinMarker.on('moveend', ( evt ) => {
  document.querySelector( '#address' ).value = evt.target.getLatLng();
});

const pinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [ 40, 40 ],
  iconAnchor: [ 20, 40 ],
});

const getHotelMap = ( arrayHotels ) => {
  arrayHotels.forEach(( item ) => {
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
      .addTo( map )
      .bindPopup( createHotelCard( item ));
  });
};

export { getHotelMap, mainPinMarker, map };
