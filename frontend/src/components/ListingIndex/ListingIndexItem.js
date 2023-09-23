import React from 'react';
import { Link } from 'react-router-dom';
import './ListingIndexItem.css';
import {useState} from 'react';

const ListingIndexItem = ({ listing }) => {
  debugger
  let locationAdjective = '';

  if (listing.uniqueType === 'Mountains') {
    locationAdjective = 'in the mountains';
  } else if (listing.uniqueType === 'Island') {
    locationAdjective = 'on the island';
  } else {
    locationAdjective = 'near the ' + listing.uniqueType;
  }

  let activityStatement = '';

  if (listing.uniqueActivities === 'National Park') {
    activityStatement = 'Go to a National Park nearby!';
  } else {
    activityStatement = 'Go ' + listing.uniqueActivities + ' nearby!';
  }

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = (e) => {
    e.stopPropagation(); // Stops the event from propagating to the parent <Link>
    if (currentImageIndex < listing.photos.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };
  
  const prevImage = (e) => {
    e.stopPropagation(); // Stops the event from propagating to the parent <Link>
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  return (
    <div className="listing-index-item2">
      <div className="listing-index-item-image-container">
        <Link className="index-show-element" to={`/listings/${listing.id}`}>
        <img
        className="listing-index-item-image"
        src={listing.photos ? listing.photos[currentImageIndex] : 'path_to_placeholder_image'}
        alt=""
    />
        </Link>
        <button className="arrow left-arrow" onClick={prevImage}></button>
        <button className="arrow right-arrow" onClick={nextImage}></button>
      </div>
    
      <div>
        <div className="listing-test">
          <span id="title">
            {listing.city}, {listing.country}
          </span>
        </div>
        <span id="location">
          {listing.rentalType} {locationAdjective} hosted by {listing.listerName}
        </span>
        <br />
        <span id="beds">
          {listing.sleeps / 2} {listing.sleeps / 2 > 1 ? 'beds' : 'bed'}
        </span>
        <br />
        <span id="price">
          <span id="price-number">${listing.nightPrice}</span> night
        </span>
      </div>
    </div>
  );
  
  
};

export default ListingIndexItem;