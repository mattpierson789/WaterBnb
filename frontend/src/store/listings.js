import csrfFetch from "./csrf";


export const RECEIVE_LISTINGS = 'listings/receiveListings'
export const RECEIVE_LISTING = 'listings/receiveListing'


export const receiveListings = (listings) => ({
    type: RECEIVE_LISTINGS,
    listings
})

export const receiveListing = (listing) => ({
    type: RECEIVE_LISTING,
    listing
})


export const getListings = (state) => state.listings ? Object.values(state.listings) : [];

export const getListing = (listingId) => (state) => state.listings ? state.listings[listingId] : null



export const fetchListings = () => async (dispatch) => {
    const res = await csrfFetch('/api/listings');
    const data = await res.json();
   

    console.log(dispatch(receiveListings(data)))
}

export const fetchListing = (listingId) => async (dispatch) => {
    const res = await fetch(`/api/listings/${listingId}`)
    const data = await res.json();

    dispatch(receiveListing(data))
}

export const fetchListingsType = (props) => async dispatch => {
    const res = await csrfFetch(`/api/listings/${props}`)

    let data = await res.json()
    dispatch(receiveListings(data))
}


const listingsReducer = (state = {}, action) => {
    const newState = {...state}
    switch(action.type) {
        case RECEIVE_LISTINGS:
            return {...newState,...action.listings}
        
        case RECEIVE_LISTING:
            newState[action.listing.id] = action.listing
            return newState
        default:
            return newState
    }
}


export default listingsReducer