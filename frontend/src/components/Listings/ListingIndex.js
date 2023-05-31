import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchListings } from '../../store/listings';
import ListingIndexItem from './ListingIndexItem';



const ListingIndex = () => {
    const dispatch = useDispatch();
    const listings = useSelector(getListings)

    useEffect(() => {
        dispatch(fetchListings())
    }, [])


    const locations = []

    for (let i = 0; i < listings.length; i++) {
        locations.push({
            id: listings[i].id,
            title: listings[i].listerName+"'s " + listings[i].rental_type + " near the " + listings[i].unique_type,
            place: listings[i].city + ', ' + listings[i].country,
            price: listings[i].night_price,
            activities: listings[i].unique_activities,
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