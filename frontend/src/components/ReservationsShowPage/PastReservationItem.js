import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createReview } from '../../store/reviews';
import { useState } from 'react';
import StarRating from '../StarRating';


function PastReservationItem({ reservation }) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);

  const [rating, setRating] = useState(5);
  const [cleanliness, setCleanliness] = useState(5);
  const [value, setValue] = useState(5);
  const [accuracy, setAccuracy] = useState(5);
  const [checkIn, setCheckIn] = useState(5);
  const [communication, setCommunication] = useState(5);
  const [body, setBody] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    dispatch(createReview({
      rating,
      cleanliness,
      value,
      accuracy,
      checkIn,
      communication,
      body,
      reservationId: reservation.id 
    })).catch(async (res) => {
      let data;
      try {
        data = await res.clone().json();
      } catch {
        data = await res.text();
        if (data.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      }
    });
  };

  return (
  <div className="reservation-container">
    <div className="reservation-info">
      <h3>{reservation.start_date}</h3>
      <p>{reservation.listingTitle}</p>
      <div id='solid-line'></div>
      <p>
        {reservation.start_date} - {reservation.end_date}
      </p>
      <div id='vertical-line'></div>
    </div>

    <div className='review-container'>
      <img id="lighthouse" src="https://mp-waterbnb-seeds.s3.amazonaws.com/Screen+Shot+2023-06-08+at+2.46.27+PM.png" />
      <h2>Rate and Review!</h2>
      <div className="rating-section">
        <div className="rating-row">
          <label htmlFor="rating">Rating</label>
          <StarRating rating={rating} setRating={setRating} />
        </div>

        <div className="rating-row">
          <label htmlFor="cleanliness">Cleanliness</label>
          <StarRating rating={cleanliness} setRating={setCleanliness} />
        </div>

        <div className="rating-row">
          <label htmlFor="value">Value</label>
          <StarRating rating={value} setRating={setValue} />
        </div>

        <div className="rating-row">
          <label htmlFor="accuracy">Accuracy</label>
          <StarRating rating={accuracy} setRating={setAccuracy} />
        </div>

        <div className="rating-row">
          <label htmlFor="checkIn">Check-In</label>
          <StarRating rating={checkIn} setRating={setCheckIn} />
        </div>

        <div className="rating-row">
          <label htmlFor="communication">Communication</label>
          <StarRating rating={communication} setRating={setCommunication} />
        </div>
      </div>

      <div className="review-row">
        <label htmlFor="body">Review</label>
        <textarea id="body" placeholder="Write your review here!" value={body} onChange={e => setBody(e.target.value)} required></textarea>
      </div>

      <button type='submit'>Submit Review</button>
    </div>
  </div>
);
  }
  

export default PastReservationItem;
