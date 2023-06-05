import csrfFetch from "./csrf";


export const RECEIVE_LISTINGS = 'listings/receiveListings'
export const RECEIVE_LISTING = 'listings/receiveListing'
export const RECEIVE_LISTING_DETAILS = 'listings/RECEIVE_LISTING_DETAILS'


export const receiveListings = (listings) => {
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
   
  

    console.log(dispatch(receiveListings(data.listings)))
}

export const fetchListing = (listingId) => async (dispatch) => {
    const res = await fetch(`/api/listings/${listingId}`)
    const data = await res.json();
  

    dispatch(receiveListing(data.listing))
}

export const fetchListingsType = (unique_type) => async dispatch => {
    const res = await csrfFetch(`/api/listings/unique_type/${unique_type}`)

    
    let data = await res.json()


    dispatch(receiveListings(data.listings))
}

export const fetchListingsActivity = (activity_type) => async dispatch => {
    const res = await csrfFetch(`/api/listings/activity_type/${activity_type}`)

    
    let data = await res.json()


    dispatch(receiveListings(data.listings))
}


const listingsReducer = (state = {}, action) => {
    const newState = {...state}
    switch(action.type) {
        case RECEIVE_LISTINGS:
            
            return action.listings
        
        case RECEIVE_LISTING:
            newState[action.listing.id] = action.listing
            
            return newState

            case RECEIVE_LISTING_DETAILS:
                const newListingStuff = action.payload ? action.payload.listing : null;
                return {...newState, ...newListingStuff}
              
        default:
            return newState

    }
}


export default listingsReducer