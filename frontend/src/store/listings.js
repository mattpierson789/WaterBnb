import csrfFetch from "./csrf";
import { receiveHost } from "./hosts";
import { receiveReservations } from "./reservations";
import { receiveReviews } from "./reviews";


export const RECEIVE_LISTINGS = 'listings/receiveListings'
export const RECEIVE_LISTING = 'listings/receiveListing'
export const RECEIVE_RANDOM_LISTING = 'listings/receiveRandomListing'
export const RECEIVE_LISTING_DETAILS = 'listings/RECEIVE_LISTING_DETAILS'


export const receiveListings = (listings) => {
    // debugger
  return {type: RECEIVE_LISTINGS, 
    listings}
}

export const receiveListing = (listing) => {
    return {type: RECEIVE_LISTING,
    listing}
}

export const receiveRandomListing = (listing) => {
    return { type: RECEIVE_RANDOM_LISTING, listing }
}

const receiveListingDetails = (listing) => ({
    type: RECEIVE_LISTING_DETAILS,
    listing
})

export const TOGGLE_LOADING = 'TOGGLE_LOADING';

export const toggleLoading = () => ({
    type: TOGGLE_LOADING,
});


export const getListings = (state) => state.listings ? Object.values(state.listings) : [];

export const getListing = (listingId) => (state) => {
    return state.listings[listingId] || null;
  };
// debugger



export const fetchListings = () => async (dispatch) => {
    const res = await csrfFetch('/api/listings');
    const data = await res.json();
   
  

    dispatch(receiveListings(data.listings))
    dispatch(receiveReservations(data.reservations))
    // debugger
}

export const fetchListing = (listingId) => async (dispatch) => {
    const res = await fetch(`/api/listings/${listingId}`)
    const data = await res.json();
  
    // debugger
    dispatch(receiveListing(data.listing))
    dispatch(receiveHost(data.host));
    dispatch(receiveReservations(data.reservations))
    dispatch(receiveReviews(data.reviews, data.listing.id))
    // debugger
}

export const fetchListingsType = (unique_type) => async dispatch => {
    const res = await csrfFetch(`/api/listings/unique_type/${unique_type}`)

    debugger
    let data = await res.json()
    debugger


    dispatch(receiveListings(data.listings))

}


export const fetchRentalType = (rental_type) => async dispatch => {
    const res = await csrfFetch(`/api/listings/rental_type/${rental_type}`)

    debugger
    let data = await res.json()
    debugger


    dispatch(receiveListings(data.listings))

}

export const fetchRandomListing = () => async dispatch => {
    try {
        const res = await fetch('/api/listings/random');
        if (!res.ok) throw res;
        const data = await res.json();
        debugger
        dispatch(receiveRandomListing(data)) // Dispatching the actual listing object
    } catch (error) {
        console.error('Error fetching random listing:', error);
    }
};



export const fetchPetsAllowedListings = () => async dispatch => {
    try {
      const res = await fetch('/api/listings/pets_allowed');
      if (!res.ok) throw res;
      let data = await res.json();
      debugger
      dispatch(receiveListings(data.listings));
    } catch (error) {
      console.error('Error fetching pets allowed listings:', error);
    }
  };
  
  


export const fetchListingsActivity = (unique_activity) => async dispatch => {
    const res = await csrfFetch(`/api/listings/unique_activity/${unique_activity}`)

    // debugger
    let data = await res.json()
    // debugger


    dispatch(receiveListings(data.listings))
}
const listingsReducer = (state = {}, action) => {
    const newState = {...state}
    switch(action.type) {
        case RECEIVE_LISTINGS:
            if (action.listings !== undefined) {
                return action.listings;
            } else {
                return state; 
            }

        case RECEIVE_LISTING:
            newState[action.listing.id] = action.listing
            return newState;

        case RECEIVE_RANDOM_LISTING:
            debugger
            if (action.listing !== undefined) {
                return action.listing;
            }
            return state;

        case RECEIVE_LISTING_DETAILS:
            const newListingStuff = action.payload ? action.payload.listing : null;
            return {...newState, ...newListingStuff};

        case TOGGLE_LOADING:
            return {
                ...state,
                loading: !state.loading,
            };
            
        default:
            return newState;
    }
}


export default listingsReducer



