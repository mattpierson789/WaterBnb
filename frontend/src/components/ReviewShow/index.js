import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchListingReviews, getListingReviews } from "../../store/reviews";
import { ReactComponent as Star } from "../../assets/images/star.svg";
import "./ReviewShow.css";

const ReviewShow = ({ listing }) => {
  const [profilePictures, setProfilePictures] = useState({});
  
  const assignRandomProfilePicture = () => {
    const profile_picture_links = [
      "https://t3.ftcdn.net/jpg/00/64/67/52/240_F_64675209_7ve2XQANuzuHjMZXP3aIYIpsDKEbF5dD.jpg",
      "https://i.pinimg.com/originals/46/72/f8/4672f876389036583190d93a71aa6cb2.jpg",
      "https://i.pinimg.com/originals/f1/da/a7/f1daa70c9e3343cebd66ac2342d5be3f.jpg",
      "https://tdsknutsford.com/wp-content/uploads/2015/08/icon-profile-yellow.png",
      "https://i.pinimg.com/236x/dc/83/30/dc8330010f904860bb5f81e66cd02f5c.jpg?nii=t",
      "https://i.pinimg.com/originals/91/2c/e1/912ce19bfeadb1e9e2b7cee8f0a4f1bc.jpg",
      "https://i.pinimg.com/originals/bd/70/22/bd702201a2b6d8960734f60f34a22754.jpg",
      "https://i.pinimg.com/originals/c0/c2/16/c0c216b3743c6cb9fd67ab7df6b2c330.jpg",
    ];
    return profile_picture_links[Math.floor(Math.random() * profile_picture_links.length)];
  };
  
  const dispatch = useDispatch();
  const listingReviews = useSelector(getListingReviews(listing.id));
  const ratingTitle = ["cleanliness", "accuracy", "communication", "location", "checkIn", "value"];
  
  useEffect(() => {
    dispatch(fetchListingReviews(listing.id));
  }, [dispatch, listing.id]);
  
  // useEffect(() => {
  //   if (listingReviews) {
  //     const pictures = {};
  //     listingReviews.forEach(review => {
  //       pictures[review.id] = assignRandomProfilePicture();
  //     });
  //     setProfilePictures(pictures);
  //   }
  // }, [listingReviews]);

  useEffect(() => {
    if (listingReviews && Object.keys(profilePictures).length === 0) {
      const pictures = {};
      listingReviews.forEach(review => {
        pictures[review.id] = assignRandomProfilePicture();
      });
      setProfilePictures(pictures);
    }
  }, [listingReviews, profilePictures]);
  
  if (!listingReviews) return null;
  
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
  
  const reviewCards = listingReviews.map((review) => (
    <div className="review-card-item" key={review.id}>
      <div className="review-user-field">
        <div className="review-user-left">
          <img
            src={profilePictures[review.id] || review.reviewerProfilePicture}
            alt={`${review.reviewer}'s profile`}
            className="profile-picture"
          />
        </div>
        <div className="review-user-right">
          <div className="review-user-name">{review.reviewerFirstName} {review.reviewerLastName}</div>
        </div>
      </div>
      <div className="review-body-field">
        <div>{review.body}</div>
      </div>
    </div>
  ));
  
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
