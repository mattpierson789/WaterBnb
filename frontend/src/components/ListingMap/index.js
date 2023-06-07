
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
    // <Wrapper apiKey={process.env.REACT_APP_MAPS_API_KEY} libraries={['places']}>
    //   <ListingMap {...props} />
    // </Wrapper>

<img src={`https://maps.googleapis.com/maps/api/staticmap?center=San%20Francisco,CA&zoom=12&size=600x400&markers=san%20francisco,%20ca|37.811039,%20-122.477567&key=${process.env.REACT_APP_MAPS_API_KEY}`} alt="Map" />


  );
};

export default ListingMapWrapper;

