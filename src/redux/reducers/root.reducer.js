import { combineReducers } from 'redux';

import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage'; 

import pixel from './pixel.reducers';

// whitelisted reducer's redux state will be persisted e.g. across a browser refresh
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['']
}

// multiple combined reducers in various places will be composed together
const rootReducer = combineReducers({ 
    pixelDB: pixel, 
});

export default persistReducer(persistConfig, rootReducer);