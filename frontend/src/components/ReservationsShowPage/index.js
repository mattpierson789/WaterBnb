import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReservations } from '../../store/reservations';
import moment from 'moment';
import UpcomingReservationItem from './UpcomingReservationItem';
import PastReservationItem from './PastReservationItem';
import './ReservationShowPage.css';
import StarRating from '../StarRating';

export const ReservationsShowPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchReservations());
  }, [dispatch]);

  const reservationsSelector = (state) =>
    state.reservations ? Object.values(state.reservations) : [];

  const reservations = useSelector(reservationsSelector);

  const reservationsFilter = () => {
    const past = [];
    const upcoming = [];

    if (reservations) {
      const currentDate = new Date();

      reservations.forEach((reservation) => {
        const endDate = new Date(reservation.endDate);

        if (endDate instanceof Date && !isNaN(endDate)) {
          if (endDate < currentDate) {
            past.push(reservation);
            console.log(reservation)
          } else {
            upcoming.push(reservation);
          }
        } else {
          console.log('Invalid endDate:', reservation.endDate);
        }
      });
    }

console.log(past)
console.log(upcoming)
    return { past, upcoming };
   
  };

  const { past, upcoming } = reservationsFilter();


  return (
    <div id='my_trips-container'>
      <h1>Upcoming Trips</h1>
      <div id='upcoming-trips-container'>
        <ul id='upcoming-trips'>
          {upcoming.map((reservation) => (
            <UpcomingReservationItem key={reservation.id} reservation={reservation} />
          ))}
        </ul>
      </div>
      <h1>Past Trips</h1>
      <div id='past-trips-container'>
        <ul>
          {past.map((reservation) => (
            <PastReservationItem key={reservation.id} reservation={reservation} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ReservationsShowPage;





// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import moment from 'moment';
// import { fetchReservations } from '../../store/reservations';
// import "../Trips/Trips.css";
// import wave from "../../assets/images/wave.svg";
// import adventure from "../../assets/images/adventure.jpg";
// import TripsList from "../Trips/TripList";
// import LoadingPage from "../../util/LoadingPage";
// import { useModal } from "../../context/ModalContext";
// import UpdateReservationModal from "../ReservationForm/UpdateReservationForm";
// import ReviewForm from "../ReviewForm/index.js";
// import StarRating from '../StarRating';
// import UpcomingReservationItem from './UpcomingReservationItem';
// import PastReservationItem from './PastReservationItem';

// const TripsShow = () => {
//   const { toggleEditModal, toggleReviewModal } = useModal();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const currentUser = useSelector((state) => state.session.currentUser);
//   const trips = useSelector((state) => state.reservations ? Object.values(state.reservations) : []);
//   const [mousePositions, setMousePositions] = useState({ search: { x: 0, y: 0 } });
  
//   useEffect(() => { document.title = `WaterBnB | User Trips`; }, []);
  
//   useEffect(() => {
//     if (currentUser) {
//       dispatch(fetchReservations());
//     }
//   }, [dispatch, currentUser]);

//   if (!currentUser) {
//     navigate("/");
//     return null;
//   }

//   const handleMouseMove = (event, element) => {
//     const rect = event.target.getBoundingClientRect();
//     const mouseX = ((event.clientX - rect.left) / rect.width) * 100;
//     const mouseY = ((event.clientY - rect.top) / rect.height) * 100;

//     setMousePositions((prevMousePositions) => ({
//       ...prevMousePositions,
//       [element]: { x: mouseX, y: mouseY },
//     }));
//   };

//   const handleClickSearch = () => {
//     navigate("/");
//   };

//   const pastTrips = trips?.filter((trip) => new Date(trip.endDate) < new Date());
//   const currentTrips = trips?.filter((trip) => {
//     const endDate = new Date(trip.endDate);
//     const startDate = new Date(trip.startDate);
//     const today = new Date();
//     return startDate <= today && endDate >= today;
//   });
//   const futureTrips = trips?.filter((trip) => new Date(trip.startDate) > new Date());

//   const bannerCard =
//     futureTrips?.length > 0 ? (
//       <div className="banner-container">
//         <div className="banner-first">
//           You have {futureTrips.length} upcoming trips!
//         </div>
//         <div className="banner-second">
//           Find more upcoming trips!
//         </div>
//       </div>
//     ) : (
//       <div className="banner-container">
//         <div className="banner-first">No trips booked...yet!</div>
//         <div className="banner-second">
//           Time to dust off your bags and start planning your next adventure
//         </div>
//       </div>
//     );

//   return (
//     <div className="trips-index-page">
//       <div className="trips-index-container">
//         <div className="trips-page-header">
//           <h1>Trips</h1>
//           <h3>
//             You booked a total of <span id="trips-count">{trips.length}</span> trips so far!
//           </h3>
//         </div>
//         <div className="search-trips-box">
//           <div className="search-trips left">
//             <div className="hello">
//               <div className="wave-img">
//                 <img src={wave} alt="hand wave" width="48" height="48" />
//               </div>
//               <h2>Hi {currentUser.firstName}, welcome back!</h2>
//             </div>
//             <div className="banner-card">{bannerCard}</div>
//             <button
//               className="trip-search-btn"
//               onClick={handleClickSearch}
//               style={{
//                 backgroundPosition: `calc((100 - ${mousePositions.search.x}) * 1%) calc((100 - ${mousePositions.search.y}) * 1%)`,
//               }}
//               onMouseMove={(e) => handleMouseMove(e, "search")}
//             >
//               Start searching
//             </button>
//           </div>
//           <div className="search-trips right">
//             <img src={adventure} alt="adventure" />
//           </div>
//         </div>
//         <div className="divisor"><hr /></div>
//         <TripsList trips={currentTrips} type={"current"} />
//         <div className="divisor"><hr /></div>
//         <TripsList trips={futureTrips} type={"future"} />
//         <div className="divisor"><hr /></div>
//         <TripsList trips={pastTrips} type={"past"} />
//       </div>
//       <div id='my_trips-container'>
//         <h1>Upcoming Trips</h1>
//         <div id='upcoming-trips-container'>
//           <ul id='upcoming-trips'>
//             {futureTrips.map((reservation) => (
//               <UpcomingReservationItem key={reservation.id} reservation={reservation} />
//             ))}
//           </ul>
//         </div>
//         <h1>Past Trips</h1>
//         <div id='past-trips-container'>
//           <ul>
//             {pastTrips.map((reservation) => (
//               <PastReservationItem key={reservation.id} reservation={reservation} />
//             ))}
//           </ul>
//         </div>
//       </div>
//       {toggleReviewModal && <ReviewForm />}
//       {toggleEditModal && <UpdateReservationModal />}
//     </div>
//   );
// };

// export default TripsShow;
