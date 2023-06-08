import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createReview } from '../../store/reviews';
import { useState } from 'react';

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
    <div>
      <div id="past-trip-container"></div>

      <div>
        <h3>{reservation.start_date}</h3>
        <p>{reservation.listingTitle}</p>
        <div id='solid-line'></div>
        <p>
          {reservation.start_date} - {reservation.end_date}
        </p>
        <div id='vertical-line'></div>
      </div>

      <div id='review-container'>
        <h2>Rate and Review!</h2>
        <h3>{reservation.start_date}</h3>
        <form id='reviewform' onSubmit={handleSubmit}>
          <label>Rating</label>
          <input type='number' min='1' max='5' placeholder='1-5' value={rating} onChange={e => setRating(e.target.value)} required></input>
          <input type='number' min='1' max='5' placeholder='1-5' value={cleanliness} onChange={e => setCleanliness(e.target.value)} required></input>
          <input type='number' min='1' max='5' placeholder='1-5' value={value} onChange={e => setValue(e.target.value)} required></input>
          <input type='number' min='1' max='5' placeholder='1-5' value={accuracy} onChange={e => setAccuracy(e.target.value)} required></input>
          <input type='number' min='1' max='5' placeholder='1-5' value={checkIn} onChange={e => setCheckIn(e.target.value)} required></input>
          <input type='number' min='1' max='5' placeholder='1-5' value={communication} onChange={e => setCommunication(e.target.value)} required></input>

          <label>Review</label>
          <input type='text' placeholder='Write your review here!' value={body} onChange={e => setBody(e.target.value)} required></input>
          <button type='submit'>Submit Review</button>
        </form>
      </div>
    </div>
  );
}

export default PastReservationItem;
