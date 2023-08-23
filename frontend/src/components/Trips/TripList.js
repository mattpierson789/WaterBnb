import TripItem from "./TripItem";
import "./TripList.css";
import empty from "../../assets/images/empty.jpg";

const TripsList = ({ trips, type }) => {
  let header;
  switch (type) {
    case "past":
      header = "Where you've been";
      break;
    case "current":
      header = "Your current trips";
      break;
    case "future":
      header = "Where you're going next !";
      break;
    default:
      header = "Booked trips";
  }

  const tripItems = trips.map((trip, i) => (
    <div className="trip-item-container" key={trip.reservation.id}>
      <TripItem trip={trip} type={type} />
    </div>
  ));

  const emptyList =
    <div className="empty-list">
      <img src={empty} alt="empty-list-gif" />
      <div>It's empty here ... nothing to see</div>
    </div>

  return (
    <div className="trip-list-container">
      <div className="trip-list-header">
        <h2>{header}</h2>
      </div>
      {trips.length === 0 ? (
        emptyList
      ) : (
        <div className="trip-list-grid">{tripItems}</div>
      )}
    </div>
  );
};

export default TripsList;