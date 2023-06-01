import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchListings } from '../../store/listings';
import { getListings } from '../../store/listings';
import ListingIndexItem from './ListingIndexItem';


const ListingIndex = () => {
    const dispatch = useDispatch();
    const listings = useSelector(getListings)

    useEffect(() => {
        dispatch(fetchListings())
    }, [])


    const locations = []

    for (let i = 0; i < listings.length; i++) {
        let locationAdjective = "";
        if (listings[i].unique_type === "Mountains") {
            locationAdjective = "in the mountains";
        } else if (listings[i].unique_type === "Island") {
            locationAdjective = "on the island";
        } else {
            locationAdjective = "near the " + listings[i].unique_type;
        }

        let activityStatement = "";

        if (listings[i].unique_activities === "National Park") {
            activityStatement = "Go to a National Park nearby!";
        } else {
            activityStatement = "Go " + listings[i].unique_activities + " nearby!";
        }
    
        locations.push({
            id: listings[i].id,
            title: listings[i].lister_name+"'s " + listings[i].rental_type + " " + locationAdjective,
            place: listings[i].city + ', ' + listings[i].country,
            price: listings[i].night_price,
            activities: activityStatement,
            location: {
                lat: parseFloat(listings[i].latitude),
                lng: parseFloat(listings[i].longitude)
            }
        })
    }
    
    const featuredListingItems = listings.map((listing) => {
        return <ListingIndexItem key={listing.id} listing={listing} />;
    });


    return (
        <div className="featured-listings">
            <ul className="featured-listings-ul">
                {featuredListingItems}
            </ul>
        </div>
    );
}

export default ListingIndex;