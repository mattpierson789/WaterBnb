import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getListing, fetchListing } from '../../store/listings';
import { useParams } from 'react-router-dom';
import './ListingShow2.css';
import ReservationForm from '../ReservationForm';
import MapContainer from '../Map';
import { getReservedDates } from '../../store/reservations';
import ImageLoader from "../../util/ImageLoader";
import Amenities from './Amenities';
import Calendar from '../Calendar/Calendar';
import ReviewShow from '../ReviewShow';
import { fetchListingReviews } from '../../store/reviews'; // Importing fetchListingReviews

const ListingShow = () => {
  const { listingId } = useParams();
  const dispatch = useDispatch();
  const listing = useSelector(getListing(listingId));
  const imageType = 'landscape';
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [calendarOpen, setCalendarOpen] = useState(false);

  const blockedDates = useSelector(getReservedDates(listing?.id));

  useEffect(() => {
    dispatch(fetchListing(listingId));
  }, [listingId, dispatch]);

  useEffect(() => {
    dispatch(fetchListingReviews(listingId));  // Fetching the reviews when the component loads
  }, [listingId, dispatch]);

  useEffect(() => {
    document.title = `WaterBnB | ${listing?.title}`;
  }, [listing]);


  const imageGroup = listing ? (
    <div className="listing-img-group-container">
      <div className="img-group-left">
        <div className="img-wrapper">
          <ImageLoader
            src={listing.photos[0]}
            alt={`listing${listing.id}_1`}
          />
        </div>
      </div>
      <div className="img-group-right">
        {listing.photos.slice(1).map((photo, index) => (
          <div key={index} className="img-wrapper">
            <ImageLoader
              src={photo}
              alt={`listing${listing.id}_${index + 2}`}
            />
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div className="listing-img-group-container">
      <img
        className="listing-img-group-container"
        // src={sampleHouse}
        alt="sample"
      />
    </div>
  );

  if (!listing) {
    return null;
  }

  let locationAdjective = '';
  if (listing.uniqueType === 'Mountains') {
    locationAdjective = 'in the mountains';
  } else if (listing.uniqueType === 'Island') {
    locationAdjective = 'on the island';
  } else {
    locationAdjective = `near the ${listing.uniqueType}`;
  }

  return (
    <div className="listing-show-container">
      <main className="show-main-container">
        <div className="listing-show-description">
          <div className="top-break"></div>
          <h1>{listing.title}</h1>

          <div className="listing-rating">
            {/* <div className="review-star">
              <img src={Star} alt="Star" />
            </div> */}
            {/* <div className="listing-rating-score">
              {listing.ratings.overallRating}
            </div> */}
          </div>
          <span className="separator">&#x2022;</span>
          <div className="listing-num-reviews">
            <span>{listing.numReviews} reviews</span>
          </div>
          <span className="separator">&#x2022;</span>
          <span className="listing-location">
            {listing.city}, {listing.country}
          </span>
        </div>

        <div className="show-images">{imageGroup}</div>

        <div id="general-reservation-info">
          <div className="listing-show-reservation">
           
            <div id="listing-show-title-details">
              <h2>
                {listing.rentalType} {locationAdjective} hosted by{' '}
                {listing.listerName}
              </h2>
              {/* <img id="prof-pic" src={listing.lister_id.profile_picture} /> */}
            </div>

            <div id="listing-show-description-details">
              <span>
                {listing.maxGuests} guests · {listing.bedrooms}{' '}
                {listing.bedrooms > 1 ? 'bedrooms' : 'bedroom'} · {listing.sleeps}{' '}
                {listing.sleeps > 1 ? 'beds' : 'bed'} · {listing.bathrooms}{' '}
                {listing.bathrooms > 1 ? 'baths' : 'bath'}
              </span>
            </div>

            <div>
              <span id="description">{listing.description}</span>
              <div className="amenities">
                <h2>What this place offers</h2>
                  <Amenities listing={listing} />
               
              </div>
            </div>
          </div>
        </div>

        <div className="booking-calendar">
          <Calendar />
        </div>

        <div className="reserve-form-container">
          <div className="reserve-form">
            <ReservationForm 
             calendarOpen={calendarOpen} 
             setCalendarOpen={setCalendarOpen} 
              listing={listing}
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              blockedDates={blockedDates}
            />
          </div>
        </div>

        <div className="reviews-section">
          <ReviewShow listing={listing} />
        </div>

        <div className="map-section">
  <MapContainer
    center={{
      lat: parseFloat(listing.latitude),
      lng: parseFloat(listing.longitude),
    }}
    zoom={10}  // Adjust this value to change the zoom level
  />
</div>

      
      </main>
    </div>
    
  );
};

export default ListingShow;
