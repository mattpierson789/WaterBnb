import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Trips.css";
import { fetchReservations, getReservations } from "../../store/reservations";
import adventure from "../../assets/images/adventure.jpg";
import TripsList from "./TripList";
import LoadingPage from "../../util/LoadingPage";
import { useModal } from "../../context/ModalContext";
import UpdateReservationModal from "../ReservationForm/UpdateReservationForm";
import ReviewForm from "../ReviewForm/index.js";
import TripsMap from "../Map/TripsMap";

const TripsIndex = () => {
    const { toggleEditModal, toggleReviewModal } = useModal();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.session.user);
    const trips = useSelector(getReservations);
    const [refreshTrips, setRefreshTrips] = useState(false);


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

    useEffect(() => {
        if (refreshTrips) {
            dispatch(fetchReservations());
            setRefreshTrips(false);  
        }
    }, [refreshTrips, dispatch]);
    

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
                            <TripsMap pastTrips={pastTrips} />
                        </div>
                    </div>
                    <div className="divisor">
                        <hr />
                        <TripsList trips={combinedTrips} type={"whereYouAreGoing"} setRefreshTrips={setRefreshTrips} />
                        <TripsList trips={pastTrips} type={"past"} setRefreshTrips={setRefreshTrips} />
                    </div>
                    {toggleReviewModal && <ReviewForm />}
                    {toggleEditModal && <UpdateReservationModal />}
                </div> 
            </div>
        );
        
};

export default TripsIndex;
