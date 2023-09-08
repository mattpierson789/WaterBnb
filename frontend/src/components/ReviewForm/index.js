import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/ModalContext";
import format from "date-fns/format";
import { convertToDate } from "../../util/util";
import "./ReviewForm.css";
import { ReactComponent as Star } from "../../assets/images/star.svg";
import { useState } from "react";
import StarRating from "./StarRating";
import { createReview, updateReview } from "../../store/reviews";
import { useEffect } from "react";

const ReviewForm = () => {
  const dispatch = useDispatch();
  const formatDate = (date) => {
    if (date && !isNaN(new Date(date).getTime())) {
        return format(date, "MMM dd, yy");
    }
    return "";  
};

  const { setToggleReviewModal, tripData, setTripData } = useModal();
  const startDate = tripData?.reservation?.startDate ? convertToDate(tripData.reservation.startDate) : null;
const endDate = tripData?.reservation?.endDate ? convertToDate(tripData.reservation.endDate) : null;
  const tripRange = `${formatDate(startDate)} - ${formatDate(endDate)}`;
  const reservedTrips = useSelector((state) => state.listings) 
  // const tripId = useSelector(state) => state.reservations.id
  const header = !!tripData.reviewData.id
    ? "Update Review"
    : "Write a new Review";

  const buttonTxt = !!tripData.reviewData.id ? "Update Review" : "Post Review";

  const reviewFunction = !!tripData.reviewData.id ? updateReview : createReview;

  const [rating, setRating] = useState({
    accuracy: tripData.reviewData.accuracy,
    checkIn: tripData.reviewData.checkIn,
    cleanliness: tripData.reviewData.cleanliness,
    communication: tripData.reviewData.communication,
    location: tripData.reviewData.location,
    value: tripData.reviewData.value,
  });
  const [body, setBody] = useState(tripData.reviewData.body);
  const [message, setMessage] = useState(null);
  const ratingFields = [
    "accuracy",
    "checkIn",
    "cleanliness",
    "communication",
    "location",
    "value",
  ];

  const handleClose = (e) => {
    e.preventDefault();
    setTripData(null);
    setToggleReviewModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...tripData.reviewData, ...rating, body: body };
    dispatch(reviewFunction(payload)).then(() => {
      setMessage(
        <div className="save-success-bg">
          <div className="save-success-content">
            <span>Save Successful !</span>
            <span>Closing in 3 seconds...</span>
            <button onClick={handleClose} className="res-btn close">
              Close Now
            </button>
          </div>
        </div>
      );
      window.setTimeout(() => {
        setToggleReviewModal(false);
      }, 3000);
    });
  };

  const handleChange = (field, i) => {
    const newRating = { ...rating };
    newRating[field] = i;
    setRating(newRating);
  };
  useEffect(() => {}, [dispatch]);

  debugger

  return (
    <div className="review-modal-bg">
      <div className="review-modal-wrapper">
        {message}
        <div className="review-modal-head">
          <button onClick={handleClose} id="close-btn">
            <div>X</div>
          </button>
          <h1 className="review-modal-title">{header}</h1>
          <div></div>
        </div>
        <div className="review-modal-content">
          <div className="review-reserve-info">
            <div className="review-reserve-info-left">
              <h2>Trip Details: </h2>
              <div className="review-trip-details">
                <span className="review-listing-title">
                  {reservedTrips.description}
                </span>
                <span className="review-listing-location">
                  {reservedTrips.city}, {reservedTrips.state}
                </span>
                <div className="review-listing-rating">
                  Overall Rating: <Star />
                  {tripData.ratings.overallRating}
                </div>
                <span className="review-listing-host">
                  Hosted by: {tripData.host.name} {tripData.host.name}
                </span>
              </div>
              <div className="review-reserve-details">
                <span className="review-reservation-dates">{tripRange}</span>
                <span>Guests: {tripData.reservation.num_guests}</span>
              </div>
            </div>
            <div className="review-reserve-info-right">
              <img src={tripData.listing.photos[0]} alt="" />
            </div>
          </div>
          <div className="review-form-container">
            <form className="review-form" onSubmit={handleSubmit}>
              {ratingFields.map((field, i) => {
                return (
                  <StarRating
                    fieldRating={rating[field]}
                    fieldTitle={field}
                    key={i}
                    handleChange={handleChange}
                  />
                );
              })}
              <textarea
                className="review-form-body"
                placeholder="Write your review here ..."
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
              <div className="review-form-btn">
                <button
                  className="res-btn review"
                  id="review-modal-btn"
                  type="submit"
                >
                  {buttonTxt}
                </button>
                <button
                  className="res-btn review"
                  id="review-modal-btn"
                  onClick={handleClose}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;