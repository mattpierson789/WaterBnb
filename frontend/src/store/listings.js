import csrfFetch from "./csrf";
import { receiveHost } from "./hosts";
import { receiveReservations } from "./reservations";


export const RECEIVE_LISTINGS = 'listings/receiveListings'
export const RECEIVE_LISTING = 'listings/receiveListing'
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

const receiveListingDetails = (listing) => ({
    type: RECEIVE_LISTING_DETAILS,
    listing
})


export const getListings = (state) => state.listings ? Object.values(state.listings) : [];

export const getListing = (listingId) => (state) => state.listings ? state.listings[listingId] : null



export const fetchListings = () => async (dispatch) => {
    const res = await csrfFetch('/api/listings');
    const data = await res.json();
   
  

    dispatch(receiveListings(data.listings))
    dispatch(receiveReservations(data.reservations))
    debugger
}

export const fetchListing = (listingId) => async (dispatch) => {
    const res = await fetch(`/api/listings/${listingId}`)
    const data = await res.json();
  
    debugger
    dispatch(receiveListing(data.listing))
    dispatch(receiveHost(data.host));
    dispatch(receiveReservations(data.reservations))
    debugger
}

export const fetchListingsType = (unique_type) => async dispatch => {
    const res = await csrfFetch(`/api/listings/unique_type/${unique_type}`)

    
    let data = await res.json()


    dispatch(receiveListings(data.listings))
}

export const fetchListingsActivity = (unique_activity) => async dispatch => {
    const res = await csrfFetch(`/api/listings/unique_activity/${unique_activity}`)

    // debugger
    let data = await res.json()
    // debugger


    dispatch(receiveListings(data.listings))
}

const listingsReducer = (state = {}, action) => {
    debugger
    const newState = {...state}
    switch(action.type) {
        case RECEIVE_LISTINGS:
            
            if (action.listings !== undefined) {
                debugger
                return action.listings;
            } else {
                return state; 
            }

        case RECEIVE_LISTING:
            debugger
            newState[action.listing.id] = action.listing
            return newState;

        case RECEIVE_LISTING_DETAILS:
            const newListingStuff = action.payload ? action.payload.listing : null;
            return {...newState, ...newListingStuff};
            
        default:
            return newState;
    }
}


export default listingsReducer



