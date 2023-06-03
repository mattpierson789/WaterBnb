import React from 'react';
import { Link } from 'react-router-dom';
import './ListingIndexItem.css';


const ListingIndexItem = (props) => {
    const listing = props.listing;


    let locationAdjective = "";

    if (listing.unique_type === "Mountains") {
      locationAdjective = "in the mountains";
    } else if (listing.unique_type === "Island") {
      locationAdjective = "on the island";
    } else {
      locationAdjective = "near the " + listing.unique_type.toLowerCase();
    }

    if (listing.id) 
  
    return (
      <div className="listing-index-item2">
        <Link className="index-show-element" to={`/listings/${listing.id}`}>
          <div className="listing-index-item-image-container">
            <img
              className="listing-index-item-image"
              src={`https://mp-waterbnb-seeds.s3.amazonaws.com/OceanBeach1`}
              alt=""
            />
          </div>
          <div>
            <div className="listing-test">
              <span id="title">{listing.city}, {listing.country}</span>
            </div>
            <span id="location">{listing.rental_type} {locationAdjective} hosted by {listing.lister_name}</span>
            <br />
            <span id="beds"> {listing.sleeps/ 2} {listing.sleeps/ 2 > 1 ? "beds" : "bed"} </span>
            <br />
            <span id="price"><span id="price-number">${listing.night_price}</span>/night</span>
          </div>
        </Link>
      </div>
    );
  };

export default ListingIndexItem;