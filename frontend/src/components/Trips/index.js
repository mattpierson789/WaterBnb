// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import "./Trips.css";
// import { fetchReservations, getReservations } from "../../store/reservations";
// import wave from "../../assets/images/wave.svg";
// import adventure from "../../assets/images/adventure.jpg";
// import TripsList from "./TripList";
// import LoadingPage from "../../util/LoadingPage";
// import { useModal } from "../../context/ModalContext";
// import UpdateReservationModal from "../ReservationForm/UpdateReservationForm";
// import ReviewForm from "../ReviewForm/index.js";

// const TripsIndex = () => {
//     console.log("I'm Here")
//     const { toggleEditModal, toggleReviewModal } = useModal();
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const currentUser = useSelector((state) => state.session.user);
//     const trips = useSelector(getReservations);
  
//     // Initialize state variables and effects at the top level of the component
//     const [mousePositions, setMousePositions] = useState({
//       search: { x: 0, y: 0 },
//     });
  
//     useEffect(() => {
//       document.title = `WaterBnB | Your Trips`;
//     }, []);
  
//     useEffect(() => {
//       console.log(currentUser)
//       if (!currentUser) {
//         navigate("/user/trips");
//       } else {
//         dispatch(fetchReservations());
//         console.log("I'm Here3")
//         navigate("/user/trips")
//       }
//     }, [dispatch, currentUser]);
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

//   if (!trips) return <LoadingPage />;


// const pastTrips = Object.values(trips).filter(
//     (trip) => new Date(trip.endDate) < new Date()
//   );
//   const currentTrips = Object.values(trips).filter((trip) => {
//     const endDate = new Date(trip.endDate);
//     const startDate = new Date(trip.startDate);
//     const today = new Date();
//     return startDate <= today && endDate >= today;
//   });
//   const futureTrips = Object.values(trips).filter(
//     (trip) => new Date(trip.startDate) > new Date()

//   );

//   console.log(pastTrips)
// console.log(futureTrips)
// console.log(currentTrips)
  
//   const bannerCard =
//     futureTrips.length > 0 ? (
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
//               <h2>Hi {currentUser ? currentUser.firstName : 'Guest'}, welcome back!</h2>
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
//         <div className="divisor">
//           <hr />
//         </div>
//         <TripsList trips={currentTrips} type={"current"} />
//         <div className="divisor">
//           <hr />
//         </div>
//         <TripsList trips={futureTrips} type={"future"} />
//         <div className="divisor">
//           <hr />
//         </div>
//         <TripsList trips={pastTrips} type={"past"} />
//       </div>
//       {toggleReviewModal && <ReviewForm />}
//       {toggleEditModal && <UpdateReservationModal />}
//     </div>
//   );
// };

// export default TripsIndex;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Trips.css";
import { fetchReservations, getReservations } from "../../store/reservations";
import wave from "../../assets/images/wave.svg";
import adventure from "../../assets/images/adventure.jpg";
import TripsList from "./TripList";
import LoadingPage from "../../util/LoadingPage";
import { useModal } from "../../context/ModalContext";
import UpdateReservationModal from "../ReservationForm/UpdateReservationForm";
import ReviewForm from "../ReviewForm/index.js";
import MapContainer from "../Map";

const TripsIndex = () => {
    const { toggleEditModal, toggleReviewModal } = useModal();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.session.user);
    const trips = useSelector(getReservations);

    const [mousePositions, setMousePositions] = useState({
        search: { x: 0, y: 0 },
    });

    useEffect(() => {
        document.title = `WaterBnB | Your Trips`;
    }, []);

    useEffect(() => {
        if (currentUser) {
            dispatch(fetchReservations());
            navigate("/user/trips");
        }
    }, [dispatch, currentUser]);

    const handleMouseMove = (event, element) => {
        const rect = event.target.getBoundingClientRect();
        const mouseX = ((event.clientX - rect.left) / rect.width) * 100;
        const mouseY = ((event.clientY - rect.top) / rect.height) * 100;
        setMousePositions((prevMousePositions) => ({
            ...prevMousePositions,
            [element]: { x: mouseX, y: mouseY },
        }));
    };

    const handleClickSearch = () => {
        navigate("/");
    };

    if (!trips) return <LoadingPage />;

    const pastTrips = Object.values(trips).filter(
        (trip) => new Date(trip.endDate) < new Date()
    );

    const combinedTrips = Object.values(trips).filter((trip) => {
        return new Date(trip.startDate) > new Date() || new Date(trip.endDate) >= new Date();
    });

    const bannerCard =
        combinedTrips.length > 0 ? (
            <div className="banner-container">
                <div className="banner-first">
                    You have {combinedTrips.length} current or  upcoming trips!
                </div>
                {/* <div className="banner-second">
                    Find more upcoming trips!
                </div> */}
            </div>
        ) : (
            <div className="banner-container">
                <div className="banner-first">No trips booked...yet!</div>
                <div className="banner-second">
                    Time to dust off your bags and start planning your next adventure
                </div>
            </div>
        );

    return (
        <div className="trips-index-page">
            <div className="trips-index-container">
                <div className="trips-page-header">
                    <h1>Trips</h1>
                </div>
                <div className="search-trips-box">
                    <div className="search-trips left">
                     
                        <div className="banner-card">{bannerCard}</div>
                        <button
                            className="trip-search-btn"
                            onClick={handleClickSearch}
                            style={{
                                backgroundPosition: `calc((100 - ${mousePositions.search.x}) * 1%) calc((100 - ${mousePositions.search.y}) * 1%)`,
                            }}
                            onMouseMove={(e) => handleMouseMove(e, "search")}
                        >
                            Find your Next Adventure!
                        </button>
                    </div>
                    <div className="search-trips right">
        <MapContainer pastTrips={pastTrips} />
    </div>
                </div>
                <div className="divisor">
                    <hr />
                </div>
                <TripsList trips={combinedTrips} type={"whereYouAreGoing"} />
                <div className="divisor">
                    <hr />
                </div>
                <TripsList trips={pastTrips} type={"past"} />
            </div>
            {toggleReviewModal && <ReviewForm />}
            {toggleEditModal && <UpdateReservationModal />}
        </div>
    );
};

export default TripsIndex;

