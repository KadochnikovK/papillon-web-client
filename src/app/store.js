import { configureStore } from '@reduxjs/toolkit';
import personsListReducer from '../features/personsList/personsListSlice';
import personeReducer from '../features/persone/personeSlice' 

export default configureStore({
  reducer: {
    personsList: personsListReducer,
    persone: personeReducer
  },
});