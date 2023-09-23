// import React from 'react';
// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchListings, getListings } from '../../store/listings';
// import ListingIndexItem from './ListingIndexItem';
// import { ReactComponent as ListIcon } from "../../assets/images/list_icon.svg";
// import { ReactComponent as MapIcon } from "../../assets/images/map_icon.svg";
// import Map from "../Map";
// import LoadingPage from "../../util/LoadingPage";

// const ListingIndex = () => {
//     const dispatch = useDispatch();
//     const listings = useSelector(getListings);
//     const [loading, setLoading] = useState(true);
//     const [toggleMap, setToggleMap] = useState(false);

//     useEffect(() => {
//         dispatch(fetchListings());
//     }, [dispatch]);

//     const locations = listings.map(listing => {
//         let locationAdjective = "";
//         switch (listing.unique_type) {
//             case "Mountains":
//                 locationAdjective = "in the mountains";
//                 break;
//             case "Island":
//                 locationAdjective = "on the island";
//                 break;
//             default:
//                 locationAdjective = "near the " + listing.unique_type;
//                 break;
//         }

//         const activityStatement = listing.unique_activities === "National Park"
//             ? "Go to a National Park nearby!"
//             : "Go " + listing.unique_activities + " nearby!";

//         return {
//             id: listing.id,
//             title: listing.lister_name + "'s " + listing.rental_type + " " + locationAdjective,
//             place: listing.city + ', ' + listing.country,
//             price: listing.night_price,
//             activities: activityStatement,
//             location: {
//                 lat: parseFloat(listing.latitude),
//                 lng: parseFloat(listing.longitude)
//             }
//         };
//     });

//     return (
//         <div className="container">
//             {toggleMap ? (
//                 <div className="index-map-wrapper">
//                     <Map listings={locations} />
//                 </div>
//             ) : (
//                 <div className="featured-listings">
//                     <ul className="featured-listings-ul">
//                         {listings.map(listing => <ListingIndexItem key={listing.id} listing={listing} />)}
//                     </ul>
//                 </div>
//             )}

//             <button className="map-toggle" onClick={() => setToggleMap(prev => !prev)}>
//                 <div>{toggleMap ? "Show list" : "Show map"}</div>
//                 <div className="toggle-map-svg">
//                     {toggleMap ? <ListIcon /> : <MapIcon />}
//                 </div>
//             </button>
//         </div>
//     );
// };

// export default ListingIndex;


import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchListings } from '../../store/listings';
import ListingIndexItem from './ListingIndexItem';
import { ReactComponent as ListIcon } from "../../assets/images/list_icon.svg";
import { ReactComponent as MapIcon } from "../../assets/images/map_icon.svg";
import MapContainer from "../Map"
import { useSelector } from 'react-redux';
import { getListings } from '../../store/listings';
import "./ListingIndex.css";
import LoadingPage from "../../util/LoadingPage"

const ListingIndex = () => {
    const dispatch = useDispatch();
    const [toggleMap, setToggleMap] = useState(false);
    const listings = useSelector(getListings);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dispatch(fetchListings()).then(() => setLoading(false));
      }, [dispatch]);
    

    useEffect(() => {
        document.title = `WaterBnB | Find your next adventure!`;
    }, []);

    if (loading) return <LoadingPage />; 

    return (
        <div className="container">
            {toggleMap ? (
                <div className="index-map-wrapper">
                    <MapContainer />
                </div>
            ) : (
                <div className="featured-listings">
                    <ul className="featured-listings-ul">
                        {listings.map(listing => <ListingIndexItem key={listing.id} listing={listing} />)}
                    </ul>
                </div>
            )}
            <button className="map-toggle" onClick={() => setToggleMap(prev => !prev)}>
                <div>{toggleMap ? "Show list" : "Show map"}</div>
                <div className="toggle-map-svg">
                    {toggleMap ? <ListIcon /> : <MapIcon />}
                </div>
            </button>
        </div>
    );
};

export default ListingIndex;
