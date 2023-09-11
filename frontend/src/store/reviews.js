// import csrfFetch from "./csrf";

// const RECEIVE_REVIEW = "reviews/receiveReview";
// const RECEIVE_REVIEWS = "reviews/receiveReviews";
// const REMOVE_REVIEW = "reviews/removeReview";

// export const getReservationReview = (reservationId) => (state) => {
//   const reservationReview = Object.values(state.reviews).find(
//     (review) => review.reservationId === reservationId
//   );
//   return reservationReview;
// };

// export const getListingReviews = (listingId) => (state) => {
//   const listingReviews = Object.values(state.reviews).filter(
//     (review) => review.listingId === listingId
//   );
//   return listingReviews;
// };

// export const receiveReview = (review, listingId) => {
//   return {
//     type: RECEIVE_REVIEW,
//     review, listingId
    
//   };
// };

// export const receiveReviews = (reviews) => {
//   return {
//     type: RECEIVE_REVIEWS,
//     reviews,
//   };
// };

// export const removeReview = (reviewId) => {
//   return {
//     type: REMOVE_REVIEW,
//     reviewId,
//   };
// };

// export const fetchReview = (reservationId) => async (dispatch) => {
//   try {
//     const res = await csrfFetch(`/api/reservations/${reservationId}/review`);
//     if (res.ok) {
//       const data = await res.json();
//       debugger
//       if (data) {
//         dispatch(receiveReview(data));
//       }
//     } else {
//       throw res;
//     }
//   } catch (errors) {
//     return;
//   }
// };

// export const fetchListingReviews = (listingId) => async (dispatch) => {
//   const res = await csrfFetch(`/api/listings/${listingId}/reviews`);

//   if (res.ok) {
//     const data = await res.json();
//     dispatch(receiveReviews(data));
//     debugger
//   } else {
//     throw res;
//   }

//   return res;
// };

// export const createReview = (review) => async (dispatch) => {
//   const res = await csrfFetch(
//     `/api/reservations/${review.reservationId}/reviews`,
//     {
//       method: "POST",
//       body: JSON.stringify({ review: review }),
//     }
//   );
//   if (res.ok) {
//     const data = await res.json();
//     debugger
//     dispatch(receiveReview(data.review));
//   } else {
//     throw res;
//   }

//   return res;
// };

// export const updateReview = (review) => async (dispatch) => {
//   const res = await csrfFetch(`/api/reviews/${review.id}`, {
//     method: "PATCH",
//     body: JSON.stringify({ review: review }),
//   });
//   if (res.ok) {
//     const data = await res.json();
//     dispatch(receiveReview(data.review));
//   } else {
//     throw res;
//   }

//   return res;
// };

// export const deleteReview = (reviewId) => async (dispatch) => {
//   const res = await csrfFetch(`/api/reviews/${reviewId}`, {
//     method: "DELETE",
//   });

//   if (res.ok) {
//     dispatch(removeReview(reviewId));
//   } else {
//     throw res;
//   }

//   return res;
// };

// const reviewsReducer = (state = {}, action) => {
//   Object.freeze(state);
//   const newState = { ...state };
//   switch (action.type) {
//     case RECEIVE_REVIEW:
//       if(action.review.listingId !== undefined) {
//         // If the listingId doesn't exist in the state yet, create an empty object for it
//         if(!newState[action.review.listingId]) {
//           newState[action.review.listingId] = {};
//         }

//         // Add the review to the correct listingId
//         newState[action.review.listingId][action.review.id] = action.review;
//       }
//       return newState;

//     case RECEIVE_REVIEWS:
//       // Assuming action.reviews is an array. Convert it to a nested object.
//       action.reviews.forEach(review => {
//         if (review.listingId !== undefined) {
//           if (!newState[review.listingId]) {
//             newState[review.listingId] = {};
//           }
//           newState[review.listingId][review.id] = review;
//         }
//       });
//       return newState;

//     case REMOVE_REVIEW:
//       // This might need more logic if you want to remove reviews nested under listingId
//       delete newState[action.reviewId];
//       return newState;

//     default:
//       return state;
//   }
// };

// export default reviewsReducer;

import csrfFetch from "./csrf";

const RECEIVE_REVIEW = "reviews/receiveReview";
const RECEIVE_REVIEWS = "reviews/receiveReviews";
const REMOVE_REVIEW = "reviews/removeReview";

export const getReservationReview = (reservationId) => (state) => {
  const reservationReview = Object.values(state.reviews).find(
    (review) => review.reservationId === reservationId
  );
  return reservationReview;
};

export const getListingReviews = (listingId) => (state) => {
  const listingReviews = Object.values(state.reviews).filter(
    (review) => review.listingId === listingId
  );
  return listingReviews;
};

export const receiveReview = (review) => {
  return {
    type: RECEIVE_REVIEW,
    review,
  };
};

export const receiveReviews = (reviews) => {
  return {
    type: RECEIVE_REVIEWS,
    reviews,
  };
};

export const removeReview = (reviewId) => {
  return {
    type: REMOVE_REVIEW,
    reviewId,
  };
};
export const fetchReview = (reservationId) => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/reservations/${reservationId}/review`);
    if (res.ok) {
      const data = await res.json();
      if (data.review) {
        dispatch(receiveReview(data.review));
      }
    } else {
      throw res;
    }
  } catch (errors) {
    return;
  }
};

export const fetchListingReviews = (listingId) => async (dispatch) => {
  const res = await csrfFetch(`/api/listings/${listingId}/reviews`);

  if (res.ok) {
    const data = await res.json();
    dispatch(receiveReviews(data.reviews));
  } else {
    throw res;
  }

  return res;
};

export const createReview = (review) => async (dispatch) => {
  const res = await csrfFetch(
    `/api/reservations/${review.reservationId}/reviews`,
    {
      method: "POST",
      body: JSON.stringify({ review: review }),
    }
  );
  if (res.ok) {
    const data = await res.json();
    dispatch(receiveReview(data.review));
  } else {
    throw res;
  }

  return res;
};

export const updateReview = (review) => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews/${review.id}`, {
    method: "PATCH",
    body: JSON.stringify({ review: review }),
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(receiveReview(data.review));
  } else {
    throw res;
  }

  return res;
};

export const deleteReview = (reviewId) => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    dispatch(removeReview(reviewId));
  } else {
    throw res;
  }

  return res;
};

export const reviewsReducer = (state = {}, action) => {
  Object.freeze(state);
  const newState = { ...state };
  switch (action.type) {
    case RECEIVE_REVIEW:
      if(action.review.listingId !== undefined) {
        if(!newState[action.review.listingId]) {
          newState[action.review.listingId] = {};
        }
        newState[action.review.listingId][action.review.id] = action.review;
      }
      return newState;

    case RECEIVE_REVIEWS:
      action.reviews.forEach(review => {
        if (review.listingId !== undefined) {
          if (!newState[review.listingId]) {
            newState[review.listingId] = {};
          }
          newState[review.listingId][review.id] = review;
        }
      });
      return newState;

    case REMOVE_REVIEW:
      delete newState[action.reviewId];
      return newState;

    default:
      return state;
  }
};

export default reviewsReducer;
