import { useMemo } from "react";
import {
  GoogleMap,
  useLoadScript,
  OverlayView,
  Circle,
} from "@react-google-maps/api";
import LoadingPage from "../../util/LoadingPage";
import "./Map.css";
import mapStyles from "./MapStyles";
import { ReactComponent as HomeIcon } from "../../assets/images/home_icon.svg";
import { useRef, useCallback, useEffect } from "react";

const TripsMap = ({ center, zoom, pastTrips = [] }) => {
  const { isLoaded } = useLoadScript({
      googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY
  });

  const mapRef = useRef(); // <-- Moved before any condition

  const onMapLoad = useCallback((map) => {
      mapRef.current = map;
  }, []);

  useEffect(() => {
    if (mapRef.current && pastTrips.length > 0) {
        const bounds = new window.google.maps.LatLngBounds();
        pastTrips.forEach((trip) => {
            bounds.extend(new window.google.maps.LatLng(parseFloat(trip.listing.listing.latitude), parseFloat(trip.listing.listing.longitude)));
        });
        mapRef.current.fitBounds(bounds);
    }
}, [pastTrips]);

  const defaultCenter = center ? center : { lat: 0, lng: 0 };
  const mapCenter = useMemo(() => defaultCenter, [center]);

  if (!isLoaded) return <LoadingPage />;

  const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    streetViewControl: true,
    streetViewControlOptions: {
      position: window.google.maps.ControlPosition.TOP_RIGHT,
    },
    zoomControl: true,
    zoomControlOptions: {
      position: window.google.maps.ControlPosition.RIGHT_TOP,
    },
    fullscreenControl: true,
    fullscreenControlOptions: {
      position: window.google.maps.ControlPosition.RIGHT_BOTTOM,
    },
    minZoom: 2,
    maxZoom: 16,
  };

  const circleOptions = {
    strokeColor: "#FF0000",
    strokeOpacity: 0.1,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
  };


  return (
    <GoogleMap
      zoom={zoom ? zoom : (center ? 14 : 2)}
      center={mapCenter}
      mapContainerClassName="map-container"
      options={options}
      onLoad={onMapLoad}
    >
      {center && (
        <>
          <Circle center={center} radius={450} options={circleOptions} />
          <OverlayView
            position={center}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div className="overlay-home-icon">
              <HomeIcon />
            </div>
          </OverlayView>
        </>
      )}

      {pastTrips.map((trip) => {
        const latitude = parseFloat(trip.listing.listing.latitude);
        const longitude = parseFloat(trip.listing.listing.longitude);
        return (
          <OverlayView
            key={trip.id}
            position={{ lat: latitude, lng: longitude }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div style={{ background: 'blue', borderRadius: '50%', width: '20px', height: '20px' }}></div>
          </OverlayView>
        );
      })}
    </GoogleMap>
  );
};

export default TripsMap;
