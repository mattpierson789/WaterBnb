import React from 'react';
import { Link } from 'react-router-dom';
import './ListingIndexItem.css';


const ListingIndexItem = (props) => {
    const listing = props.listing;

    if (listing.id)

        return (

            <div className="listing-index-item">
                <Link className="index-show-element" to={`/listings/${listing.id}`}>
            <div className="listing-index-item-image-container">
                <img className="listing-index-item-image" src={`https://mp-waterbnb-seeds.s3.amazonaws.com/OceanBeach1`} alt="" /> 

            </div>
            <div>

             <div className="listing-test" > 
            <span id='title'>{listing.city}, {listing.country}</span>
            </div>

            <span id='location'>{listing.lister_name}'s {listing.rental_type} near the {listing.unique_type}</span>
            <br />

            <span id='beds'> {listing.sleeps} beds </span>
            <br />
                    
             <span id='price'><span id='price-number'>${listing.night_price}</span>/night</span>

             </div>  

                </Link>
            </div>

        )

    }

export default ListingIndexItem;