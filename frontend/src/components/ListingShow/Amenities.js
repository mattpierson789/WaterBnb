import "./Amenities.css";

const Amenities = ({ listing }) => {
  return (
    <div id="amenities">
    <ul className="amenities-item">
      {listing.kitchen ? (
        <li>
          <img src={'https://mp-waterbnb-seeds.s3.amazonaws.com/Amenities/kitchen.png'} />
          Kitchen
        </li>
      ) : null}
      {listing.parking ? (
        <li>
          <img src={'https://mp-waterbnb-seeds.s3.amazonaws.com/Amenities/parking.png'} />
          Parking
        </li>
      ) : null}
      {listing.wifi ? (
        <li>
          <img src={'https://mp-waterbnb-seeds.s3.amazonaws.com/Amenities/wifi.png'} />
          Wifi
        </li>
      ) : null}
      {listing.petsAllowed ? (
        <li>
          <img src={'https://mp-waterbnb-seeds.s3.amazonaws.com/Index+Filters/pets.png'} />
          Pets allowed
        </li>
      ) : null}
      {listing.selfCheckIn ? (
        <li>
          <img src={'https://mp-waterbnb-seeds.s3.amazonaws.com/Amenities/checkin.png'} />
          Self Check-in
        </li>
      ) : null}
    </ul>
  </div>
  );
};

export default Amenities;