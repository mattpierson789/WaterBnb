import { useNavigate } from "react-router-dom";
import format from "date-fns/format";
import sampleHouse from "../../assets/images/sample_house.jpg";
import "./TripItem.css";
import { convertToDate } from "../../util/util";
import { useDispatch, useSelector } from "react-redux";
import { deleteReservation } from "../../store/reservations";
import ImageLoader from "../../util/ImageLoader";
import { useModal } from "../../context/ModalContext";
import { deleteReview, fetchReview } from "../../store/reviews";
import { useEffect } from "react";

const TripItem = ({ trip, type }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const startDate = convertToDate(trip.startDate);
    const endDate = convertToDate(trip.endDate);
    const { setToggleEditModal, setTripToUpdate, setToggleReviewModal, setTripData } = useModal();

    const review = useSelector((state) => {
        if (state.reviews && trip.reservation && trip.reservation.id) {
            return state.reviews[trip.reservation.id];
        }
        return null;
    });

    useEffect(() => {
        if (type === "past" || type === "whereYouAreGoing") {
            dispatch(fetchReview(trip.id));
        }
    }, [type, dispatch, trip.id]);

    if (!trip) {
        console.error("Trip or trip reservation is undefined");
        return null;
    }

    const handleCreateUpdate = (e, formType) => {
        e.preventDefault();
        let reviewData;
        if (formType === "update") {
            reviewData = review;
        } else {
            reviewData = {
                accuracy: 5,
                checkIn: 5,
                cleanliness: 5,
                communication: 5,
                location: 5,
                value: 5,
                body: "",
                reservationId: trip.id,
            };
        }
        const tripInfo = trip;
        tripInfo.reviewData = reviewData;
        setTripData(tripInfo);
        setToggleReviewModal(true);
    };

    const handleRemoveReview = (e, reviewId) => {
        e.preventDefault();
        dispatch(deleteReview(reviewId));
    };

    const formatDate = (date) => format(date, "MMM dd, yy");
    const tripRange = `${formatDate(startDate)} - ${formatDate(endDate)}`;
    const toListing = () => navigate(`/listings/${trip.listing.listing.id}`);
    const toUpdate = () => {
        setTripToUpdate(trip);
        setToggleEditModal(true);
    };
    const toCancel = () => dispatch(deleteReservation(trip.id));

    let buttonGroup;
    // debugger
    switch (type) {
        case "past":
            buttonGroup = review ? (
                <>
                    <button className="res-btn review" onClick={(e) => handleCreateUpdate(e, "update")}>
                        Update Review
                    </button>
                    <button className="res-btn review" onClick={(e) => handleRemoveReview(e, review.id)}>
                        Remove Review
                    </button>
                </>
            ) : (
                <button className="res-btn review" onClick={(e) => handleCreateUpdate(e, "create")}>
                    Leave a Review
                </button>
            );
            break;
        case "whereYouAreGoing":
        //   debugger
            buttonGroup = (
                <>
                    <button className="res-btn" onClick={toUpdate}>
                        Update Reservation
                    </button>
                    <button className="res-btn" onClick={toCancel}>
                        Cancel Reservation
                    </button>
                </>
            );
            break;
        default:
            buttonGroup = <></>;
    }

    return (
        <div className="trip-item">
            <div className="trip-item-left" onClick={toListing}>
                <ImageLoader
                    className={"trip-img"}
                    src={trip.photos?.length > 0 ? trip.photos[0] : 'https://mp-waterbnb-seeds.s3.amazonaws.com/OceanBeach1'}
                    alt="listing-banner-img"
                />
            </div>
            <div className="trip-item-right">
                <div className="trip-info">
                    <div className="trip-location" onClick={toListing}>
                        {trip.listing.listing.city}, {trip.listing.listing.country}
                    </div>
                    <div className="trip-title">{trip.listing.listing.title}</div>
                    <div className="trip-dates">{tripRange}</div>
                    <div className="trip-guests">Guests: {trip.numGuests}</div>
                    <div className="trip-price">Total: ${trip.totalPrice.toFixed(2)}</div>
                </div>
                <div className="button-group">{buttonGroup}</div>
            </div>
        </div>
    );
};

export default TripItem;
