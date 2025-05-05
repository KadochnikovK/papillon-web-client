import { configureStore } from '@reduxjs/toolkit';
import personsListReducer from '../features/personsList/personsListSlice';

export default configureStore({
  reducer: {

    personsList: personsListReducer,
  },
});