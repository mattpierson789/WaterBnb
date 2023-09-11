import "./ListingMarker.css";
import ImageLoader from "../../util/ImageLoader";
import { useNavigate } from "react-router-dom"; 
import { ReactComponent as Star } from "../../assets/images/star.svg";

const MarkerInfoCard = ({ listing, onClick }) => {


  const handleCardClick = () => {

  };

  const handleClick = () => {
    onClick(listing.id);
  };

  return (
    <div className="marker-info-card">
      <div className="info-card-content">
        <button className="close-info-card" onClick={handleClick}>
          &times;
        </button>
        <div className="info-card-img-container" onClick={handleCardClick}>
          <ImageLoader
            className={"info-card-img"}
            src={listing.photos[0]}
            alt={"map listing info card photo"}
          />
        </div>
        <div className="info-card-detail-container" onClick={handleCardClick}>
        <div className="info-card-title">
            {listing.title}
          </div>
          <div className="info-card-location">
            {listing.city}, {listing.country}
          </div>
          <div className="info-card-rating">
            <div className="review-star">
              <Star />
            </div>
            <div className="info-card-rating-score">
              {/* {listing.ratings.overallRating} */}
            </div>
          </div>
          <div className="info-card-price">
          <span> ${listing.nightPrice} night</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ListingMarker = ({ listing, isActive, onClick }) => {
  const handleClick = () => {
    onClick(listing.id);
  };
  return (
    <div
      className={`list-map-marker ${isActive ? "active-marker" : ""}`}
      onClick={handleClick}
    >
      <div>${listing.nightPrice}</div>
      {isActive && <MarkerInfoCard listing={listing} onClick={onClick} />}
    </div>
  );
};

export default ListingMarker;