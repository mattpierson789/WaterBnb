import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchListingReviews, getListingReviews } from "../../store/reviews";
import { ReactComponent as Star } from "../../assets/images/star.svg";
import "./ReviewShow.css";
import { randomRGB } from "../../util/util";

const ReviewShow = ({ listing }) => {
  const dispatch = useDispatch();
  
  const listingReviews = useSelector(getListingReviews(listing.id));
  const ratingTitle = ["cleanliness", "accuracy", "communication", "location", "checkIn", "value"];

  useEffect(() => {
    dispatch(fetchListingReviews(listing.id));
  }, [dispatch, listing.id]);

  if (!listingReviews) return null;
  
  // Calculating the average ratings
  let averageRatings = {};
  ratingTitle.forEach(title => {
    let sum = listingReviews.reduce((acc, review) => acc + review[title], 0);
    averageRatings[title] = (sum / listingReviews.length).toFixed(2);
  });
  
  const ratingFields = ratingTitle.map((rating) => (
    <div className="rating-field-item" key={rating}>
      <div className="rating-field-left field-name">
        {rating.charAt(0).toUpperCase() + rating.slice(1)}
      </div>
      <div className="rating-field-right">
        <div className="rating-bar outter">
          <div
            className="rating-bar inner"
            style={{ width: `${(averageRatings[rating] / 5) * 100}%` }}
          ></div>
        </div>
        <div className="rating-field-average">{averageRatings[rating]}</div>
      </div>
    </div>
  ));
  
  const reviewCards = listingReviews.map((review) => {
    return (
      <div className="review-card-item" key={review.id}>
        <div className="review-user-field">
          <div className="review-user-left">
            <img src={review.reviewerProfilePicture} alt={`${review.reviewer}'s profile`} className="profile-picture" />
          </div>
          <div className="review-user-right">
            <div className="review-user-name">{review.reviewerFirstName} {review.reviewerLastName}</div>
          </div>
        </div>
        <div className="review-body-field">
          <div>{review.body}</div>
        </div>
      </div>
    );
  });
  
  const overallRating = (Object.values(averageRatings).reduce((a, b) => a + parseFloat(b), 0) / ratingTitle.length).toFixed(2);

  return (
    <div className="listing-review-container">
 <div className="listing-review-header">
  <div className="listing-rating">
    <div className="review-star">
      <Star />
    </div>
    <div className="listing-rating-score">
      {overallRating}
    </div>
  </div>
  <div id="listing-num-reviews">
    <span id="num-reviews">{listingReviews.length} reviews</span>
  </div>
</div>

      <div className="listing-average-ratings">{ratingFields}</div>
      <div className="listing-review-cards">{reviewCards}</div>
    </div>
  );
};

export default ReviewShow;
