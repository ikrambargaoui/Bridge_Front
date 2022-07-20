import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist'
import rootReducer from "./reducers";
const initialState = {};
const middleware = [thunk];


const persistConfig = {
  key: 'primary',
  storage: storage,
  whitelist: ['Docs','userInfo','cols']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  persistedReducer,
  initialState,
  composeEnhancer(applyMiddleware(...middleware))
);
export default store;