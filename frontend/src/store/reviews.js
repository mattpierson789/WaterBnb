import {csrfFetch} from "./csrf";

export const RECEIVE_REVIEWS = 'reviews/receiveReviews';
export const RECEIVE_REVIEW = 'reviews/receiveReview';
export const REMOVE_REVIEW = 'reviews/removeReview';

export const receiveReviews = (reviews) => ({
  type: RECEIVE_REVIEWS,
  reviews,
});

export const receiveReview = (review) => ({
  type: RECEIVE_REVIEW,
  review,
});

export const removeReview = (reviewId) => ({
  type: REMOVE_REVIEW, 
  reviewId
})

export const getReviews = (state) => state.reviews ? Object.values(state.reviews) : [];

export const getReview = (reviewId) => (state) => state.reviews ? state.reviews[reviewId] : null;

export const fetchReviews = () => async (dispatch) => {
  const res = await csrfFetch('/api/reviews');
  const data = await res.json();
  dispatch(receiveReviews(data.reviews));
};

export const fetchReview = (reviewId) => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews/${reviewId}`);
  const data = await res.json();
  dispatch(receiveReview(data.review));
};

export const createReview = (review) => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews`, {
    method: 'POST', 
    body: JSON.stringify(review),
    headers: { 'Content-Type': 'application/json'}
  
  })

  const data = await res.json();
  dispatch(receiveReview(data))
}

export const updateReview = (review) => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews/${review.id}`, {
    method: 'PATCH', 
    body: JSON.stringify(review),
    headers: { 'Content-Type': 'application/json'}
  })

  const data = await res.json();
  dispatch(receiveReview(data))
}

export const deleteReview = (reviewId) => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: 'DELETE', 
  })

  if (res.ok) {
    dispatch(removeReview(reviewId));
  }
}

const reviewsReducer = (state = {}, action) => {
  const newState = { ...state };
  switch (action.type) {
    case RECEIVE_REVIEWS:
      return action.reviews;

    case RECEIVE_REVIEW:
      newState[action.review.id] = action.review;
      return newState;

    case REMOVE_REVIEW:
      delete newState[action.reviewId]
      return newState

    default:
      return newState;
  }
};

export default reviewsReducer;
