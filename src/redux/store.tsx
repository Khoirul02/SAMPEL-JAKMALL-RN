import {configureStore, combineReducers} from '@reduxjs/toolkit';
import listReducer from './list/listSlice';
import {thunk} from 'redux-thunk';
import {createLogger} from 'redux-logger';
const logger = createLogger();
const rootReducers = combineReducers({
  list: listReducer,
});
export const store = configureStore({
  reducer: rootReducers,
  devTools: true,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(thunk, logger),
});
