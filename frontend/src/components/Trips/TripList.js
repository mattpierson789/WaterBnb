// import TripItem from "./TripItem";
// import "./TripList.css";
// import empty from "../../assets/images/empty.jpg";

// const TripsList = ({ trips, type }) => {
//   let header;
//   switch (type) {
//     case "past":
//       header = "Where you've been";
//       break;
//     case "current":
//       header = "Your current trips";
//       break;
//     case "future":
//       header = "Where you're going next !";
//       break;
//     default:
//       header = "Booked trips";
//   }

//   const tripItems = trips.map((trip, i) => (
//     <div className="trip-item-container" key={trip.id}>
//       <TripItem trip={trip} type={type} />
//     </div>
//   ));

//   const emptyList =
//     <div className="empty-list">
//       <img src={empty} alt="empty-list-gif" />
//       <div>No Trips ...  get to booking!</div>
//     </div>

//   return (
//     <div className="trip-list-container">
//       <div className="trip-list-header">
//         <h2>{header}</h2>
//       </div>
//       {trips.length === 0 ? (
//         emptyList
//       ) : (
//         <div className="trip-list-grid">{tripItems}</div>
//       )}
//     </div>
//   );
// };

// export default TripsList;


import TripItem from "./TripItem";
import "./TripList.css";
import empty from "../../assets/images/empty.jpg";
import { deleteReservation } from "../../store/reservations";
import { useDispatch } from "react-redux";

const TripsList = ({ trips, type, setRefreshTrips }) => {
    let header;
    switch (type) {
        case "past":
            header = "Where you've been";
            break;
        case "whereYouAreGoing":
            header = "Where you are going";
            break;
        default:
            header = "Booked trips";
    }

    const filteredTrips = trips.filter(trip => trip.photos && trip.photos.length > 0);
    const dispatch = useDispatch();

    const tripItems = filteredTrips.map((trip, i) => (
      <div className="trip-item-container" key={trip.id || i}>
          <TripItem trip={trip} type={type} setRefreshTrips={setRefreshTrips} />
      </div>
  ));
  

    const emptyList = 
        <div className="empty-list">
            <img src={empty} alt="empty-list-gif" />
            <div>No Trips ...  get to booking!</div>
        </div>;

const handleDelete = (reservationId) => {
    dispatch(deleteReservation(reservationId))
    .then(() => {
        setRefreshTrips(true);
    });
}

    return (
        <div className="trip-list-container">
            <div className="trip-list-header">
                <h2>{header}</h2>
            </div>
            {filteredTrips.length === 0 ? (
                emptyList
            ) : (
                <div className="trip-list-grid">{tripItems}</div>
            )}
        </div>
    );
};

export default TripsList;

