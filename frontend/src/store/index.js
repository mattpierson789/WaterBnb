import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';
import listingsReducer from './listings';
import reviewsReducer from './reviews';
import * as listingActions from './listings'
import * as sessionActions from './session'
import * as reservationActions from './reservations'
import reservationsReducer from './reservations';

const rootReducer = combineReducers({
    session: sessionReducer,
    listings: listingsReducer,
    reservations: reservationsReducer,
    reviews: reviewsReducer

});

let enhancer;

if (process.env.NODE_ENV === 'production') {

    enhancer = applyMiddleware(thunk);
}
else {

    const logger = require('redux-logger').default;
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
    window.listingActions = listingActions
    window.sessionActions = sessionActions
    window.reservationActions = reservationActions

}

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
}

export default configureStore;