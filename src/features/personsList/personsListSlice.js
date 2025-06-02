import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import getPersons from "./api/personsListApi";

export const fetchPersons = createAsyncThunk("personsList/fetchPersons", async (_, { rejectWithValue, getState }) => {
  try {
    const state = getState();
    const dataBase = state.settings.data?.dataBase?.url;
    
    const data = await getPersons(dataBase);
    return data;
  } catch (error) {
    console.error("Ошибка при попытке получить данные карт: ", error);
    return rejectWithValue(error.message);
  }
});

const handlePending = (state) => {
  state.loading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const personsListSlice = createSlice({
  name: "personsList",
  initialState: {
    loading: false,
    data: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPersons.pending, handlePending)
      .addCase(fetchPersons.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.reverse();
      })
      .addCase(fetchPersons.rejected, handleRejected);
  },
});

export default personsListSlice.reducer;
