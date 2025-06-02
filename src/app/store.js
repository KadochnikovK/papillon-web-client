import { configureStore } from '@reduxjs/toolkit';
import personsListReducer from '../features/personsList/personsListSlice';
import personeReducer from '../features/persone/personeSlice' 
import settingsReducer from '../features/settings/settingsSlice'

export default configureStore({
  reducer: {
    personsList: personsListReducer,
    persone: personeReducer,
    settings: settingsReducer
  },
});