import React from 'react'
import { useSelector } from 'react-redux'
import { getListing } from '../../store/listings'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { fetchListing } from '../../store/listings'
import { useParams } from 'react-router-dom'
import './ListingShow.css'
import ReservationForm from '../ReservationForm'


const ListingShow = () => {

    const {listingId} = useParams()  
   
    const dispatch = useDispatch()

    const listing = useSelector(getListing(listingId))
    
    useEffect(() => { 

        dispatch(fetchListing(listingId))

    }, [listingId])

    if (!listing) {
        return null 

    }

    let locationAdjective = "";
    if (listing.unique_type === "Mountains") {
        locationAdjective = "in the mountains";
    } else if (listing.unique_type === "Island") {
        locationAdjective = "on the island";
    } else {
        locationAdjective = "near the " + listing.unique_type.toLowerCase();
    }

debugger

    return (

        // Listings Pictures // Needs to be dynamic

        <>
        <div className='top-break'></div>
        <h1>{listing.title}</h1>

        <span id="location-title"> {listing.city}, {listing.country} </span>

            <div id='listing-show-main-image'>

                {/* <img id='listing-image-main' src={listing.photos[0]}/> */}

                <img id='listing-image-main' src='https://mp-waterbnb-seeds.s3.amazonaws.com/OceanBeach1'/>

                <div id='listing-show-small-images-container'>

                    {/* <img id='listing-image-small' src={listing.photos[1]} />
                    <img id='listing-image-small' src={listing.photos[2]} />
                    <img id='listing-image-small' src={listing.photos[3]} />
                    <img id='listing-image-small' src={listing.photos[4]} /> */}

                    <img id='listing-image-small' src='https://mp-waterbnb-seeds.s3.amazonaws.com/OceanBeach1' />
                    <img id='listing-image-small' src='https://mp-waterbnb-seeds.s3.amazonaws.com/OceanBeach1' />
                    <img id='listing-image-small' src='https://mp-waterbnb-seeds.s3.amazonaws.com/OceanBeach1' />
                    <img id='listing-image-small' src= 'https://mp-waterbnb-seeds.s3.amazonaws.com/OceanBeach1' />


                </div>

            </div>
            
            
            {/* Listing Title Details */}
           
            <div id='listing-show-title-details'>

            <h2> {listing.rental_type} {locationAdjective} hosted by {listing.lister_name} </h2>
            <img id='prof-pic' src={listing.lister_id.profile_picture} />  {/* Not sure how to do this. */}
                
            </div>

    {/* Listing Description Details*/}

            <div id='listing-show-description-details'>

            <span> {listing.max_guests} guests · {listing.bedrooms} {listing.bedrooms > 1 ? "bedrooms" : "bedroom"} · {listing.sleeps} {listing.sleeps > 1 ? "beds" : "bed"} · {listing.bathrooms} {listing.bathrooms > 1 ? "baths" : "bath"}</span>

            <div className='break'></div>

            <span>{listing.description}</span>

            <div className='break'></div>

            </div>


{/* Reservation Form Container*/}
{/* Seperate Component*/}

            <div id='reservation-form-container'>

            <ReservationForm listing={listing} />

            </div>


{/* Amenities Container*/}

<div id='amenities'>

    <h2> What this place offers </h2>

    <ul className='amenities-item'>
    {listing.kitchen ? <li><img src={'https://mp-waterbnb-seeds.s3.amazonaws.com/Amenities/kitchen.png'}/>Kitchen</li> : ''}
    {listing.parking ? <li><img src={'https://mp-waterbnb-seeds.s3.amazonaws.com/Amenities/parking.png'}/>Parking</li> : ''}
    {listing.wifi ? <li><img src={'https://mp-waterbnb-seeds.s3.amazonaws.com/Amenities/wifi.png'}/>Wifi</li> : ''}
    {listing.petsAllowed ? <li><img src={'https://mp-waterbnb-seeds.s3.amazonaws.com/Index+Filters/pets.png'}/>Pets allowed</li> : ''}
    {listing.selfCheckIn ? <li><img src={'https://mp-waterbnb-seeds.s3.amazonaws.com/Amenities/checkin.png'}/>Self Check-in</li> : ''}
    </ul>

</div>
<div className='break'></div>


{/* Listing Reviews Container */}

<h2>Reviews</h2>


{/* Listing Map Container*/}
{/* Seperate Component*/}

<h2>Where you'll be </h2>

<span> {listing.city}, {listing.country} </span>

</>

    )

}

export default ListingShow;