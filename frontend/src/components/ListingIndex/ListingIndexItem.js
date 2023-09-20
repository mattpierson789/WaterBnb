import React from 'react';
import { Link } from 'react-router-dom';
import './ListingIndexItem.css';

const ListingIndexItem = ({ listing }) => {
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

  return (
    <div className="listing-index-item2">
      <Link className="index-show-element" to={`/listings/${listing.id}`}>
        <div className="listing-index-item-image-container">
          <img
            className="listing-index-item-image"
            src={listing.photos[0]}
            alt=""
          />
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
            {' '}
            {listing.sleeps / 2} {listing.sleeps / 2 > 1 ? 'beds' : 'bed'}{' '}
          </span>
          <br />
          <span id="price">
            <span id="price-number">${listing.nightPrice}</span> night
          </span>
        </div>
      </Link>
    </div>
  );
};

export default ListingIndexItem;