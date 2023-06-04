// import React, { useEffect, useRef, useState } from 'react';
// import { Wrapper } from '@googlemaps/react-wrapper';
// import { useParams, useNavigate } from 'react-router-dom';

// const ListingMap = ({ listings, mapOptions = {}, mapEventHandlers = {}, markerEventHandlers = {} }) => {
//   const [map, setMap] = useState(null);
//   const mapRef = useRef(null);
//   const markers = useRef({});
//   const navigate = useNavigate();
//   const { listingId } = useParams();

//   useEffect(() => {
//     if (!map) {
//       setMap(
//         new window.google.maps.Map(mapRef.current, {
//           mapId: 'a5603dc640688f92',
//           center: {
//             lat: 37.773972,
//             lng: -122.431297,
//           },
//           zoom: 12,
//           clickableIcons: false,
//           disableDefaultUI: true,
//           ...mapOptions,
//         })
//       );
//     }
//   }, [mapRef, map, mapOptions]);

//   useEffect(() => {
//     if (map) {
//       const listeners = Object.entries(mapEventHandlers).map(([event, handler]) =>
//         window.google.maps.event.addListener(map, event, (...args) => handler(...args, map))
//       );

//       return () => listeners.forEach((listener) => window.google.maps.event.removeListener(listener));
//     }
//   }, [map, mapEventHandlers]);

//   useEffect(() => {
//     if (map && Array.isArray(listings)) {
//       listings.forEach((listing) => {
//         if (markers.current[listing.id]) return;

//         let marker;
//         if (listingId == null) {
//           marker = new window.google.maps.Marker({
//             map,
//             position: new window.google.maps.LatLng(listing.lat, listing.long),
//             label: {
//               text: `$${listing.nightPrice}`,
//               fontWeight: 'bold',
//               color: 'black',
//             },
//           });
//         } else {
//           marker = new window.google.maps.Marker({
//             map,
//             position: new window.google.maps.LatLng(listing.lat, listing.long),
//           });
//         }

//         Object.entries(markerEventHandlers).forEach(([event, handler]) => {
//           marker.addListener(event, () => handler(listing));
//         });
//         markers.current[listing.id] = marker;
//       });

//       Object.entries(markers.current).forEach(([listingId, marker]) => {
//         if (markers.current && listings.some((listing) => listing.id.toString() === listingId)) return;

//         marker.setMap(null);
//         delete markers.current[listingId];
//       });
//     }
//   }, [listings, map, markerEventHandlers]);

//   return <div ref={mapRef} className="map">Map</div>;
// };

// const ListingMapWrapper = (props) => {
//   return (
//     <Wrapper apiKey={process.env.REACT_APP_MAPS_API_KEY} libraries={['places']}>
//       <ListingMap {...props} />
//     </Wrapper>
//   );
// };

// export default ListingMapWrapper;

import React, { useEffect, useRef, useState } from 'react';
import { Wrapper } from '@googlemaps/react-wrapper';

const ListingMap = ({ listings }) => {
  const [map, setMap] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (!map) {
      setMap(new window.google.maps.Map(mapRef.current, {
        center: { lat: 37.773972, lng: -122.431297 },
        zoom: 12,
      }));
    }
  }, [map]);

  useEffect(() => {
    if (map && Array.isArray(listings)) {
      listings.forEach((listing) => {
        const marker = new window.google.maps.Marker({
          map,
          position: new window.google.maps.LatLng(listing.lat, listing.long),
        });
      });
    }
  }, [listings, map]);

  return <div ref={mapRef} className="map">Map</div>;
};

const ListingMapWrapper = (props) => {
  return (
    <Wrapper apiKey={process.env.REACT_APP_MAPS_API_KEY} libraries={['places']}>
      <ListingMap {...props} />
    </Wrapper>
  );
};

export default ListingMapWrapper;

