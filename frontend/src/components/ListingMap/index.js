// import React, { useEffect, useRef, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { getListing } from '../../store/listings';

// const ListingMapWrapper = ({ listingId }) => {
//   const listing = useSelector(state => getListing(state, listingId));
//   const { latitude, longitude } = listing;

//   const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=12&size=600x400&markers=color:red%7C${latitude},${longitude}&key=process.env.REACT_APP_GOOGLE_MAPS_API_KEY`;

//   return <img src={mapUrl} alt="Map" />;
// };

// export default ListingMapWrapper;





























// import { Wrapper } from '@googlemaps/react-wrapper';

// const ListingMap = ({ listings }) => {
//   const [map, setMap] = useState(null);
//   const mapRef = useRef(null);

//   useEffect(() => {
//     if (!map) {
//       setMap(new window.google.maps.Map(mapRef.current, {
//         center: { lat: 37.773972, lng: -122.431297 },
//         zoom: 12,
//       }));
//     }
//   }, [map]);

//   useEffect(() => {
//     if (map && Array.isArray(listings)) {
//       listings.forEach((listing) => {
//         const marker = new window.google.maps.Marker({
//           map,
//           position: new window.google.maps.LatLng(listing.lat, listing.long),
//         });
//       });
//     }
//   }, [listings, map]);

//   return <div ref={mapRef} className="map">Map</div>;
// };


