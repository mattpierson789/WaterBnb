import React from 'react';
import { Link } from 'react-router-dom';


const ListingIndexItem = (props) => {
    const listing = props.listing;

    if (listing.id)

        return (

            <div className="listing-index-item">
                <Link className="index-show-element" to={`/listings/${listing.id}`}>
            <div className="listing-index-item-image-container">
                <img className="listing-index-item-image" src={`https://waterbnb-seeds.s3.amazonaws.com/${listing.id}_0a.png`} alt="" />
            </div>
            <div>
            <span id='title'>{listing.city}, {listing.country}</span>
            </div>

            <span id='location'>{listing.listerName}'s {listing.rental_type} near the {listing.unique_type}</span>

            <span id='beds'> {listing.sleeps} beds </span>
                    
             <span id='price'><span id='price-number'>${listing.night_price}</span>/night</span>

                </Link>
            </div>

        )

    }

export default ListingIndexItem;