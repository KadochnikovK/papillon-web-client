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

// const changeSelection = (state, action) => {
//   const { id, checked } = action.payload;
//   return {
//     ...state,
//     selected: checked ? [...state.selected, id].filter((item, index, self) => self.indexOf(item) === index) : state.selected.filter((item) => item !== id),
//   };
// };

const personsListSlice = createSlice({
  name: "personsList",
  initialState: {
    loading: false,
    data: [],
    selected: [],
    active: null,
    error: null,
  },
  reducers: {
    toggleSelection: (state, action) => {
      const { id, isSelected } = action.payload;
      if (isSelected) {
        if (!state.selected.includes(id)) {
          state.selected.push(id);
        }
      } else {
        state.selected = state.selected.filter((item) => item !== id);
      }
    },
    clearSelected: (state) => {
      state.selected = [];
    },
    selectAll: (state) => {
      state.selected = state.data.map((item) => item.employee_id);
    },
    changeActive: (state, action) => {
      state.active = action.payload.id;
      console.log('state.active', state.active)
    }
  },
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

export const { toggleSelection, clearSelected, selectAll, changeActive } = personsListSlice.actions;

export default personsListSlice.reducer;
