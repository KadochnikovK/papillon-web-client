import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getFingers, getEyes, getText } from "./api/personeApi";

const textTemplate = {
  address: "",
  country_code: "",
  employee_id: "",
  first_name: "",
  last_name: "",
  surname: "",
  title: "",
};

export const fetchFingers = createAsyncThunk("person/fetchFingers", async (id, { rejectWithValue }) => {
  try {
    const data = await getFingers(id);
    return data;
  } catch (error) {
    console.error("Ошибка при попытке получить отпечатки пальцев: ", error);
    return rejectWithValue(error.message);
  }
});

export const fetchEyes = createAsyncThunk("person/getEyes", async (id, { rejectWithValue }) => {
  try {
    const data = await getEyes(id);
    return data;
  } catch (error) {
    console.error("Ошибка при попытке получить изображение радужки: ", error);
    return rejectWithValue(error.message);
  }
});

export const fetchText = createAsyncThunk("person/getText", async (id, { rejectWithValue }) => {
  try {
    const data = await getText(id);
    return data;
  } catch (error) {
    console.error("Ошибка при попытке получить текстовые данные: ", error);
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

const personeSlice = createSlice({
  name: "persone",
  initialState: {
    data: {
      text: { ...textTemplate },
      photos: [],
      fingerprints: [],
      eyes: [],
    },
    error: null,
    loading: false,
  },
  reducers: {
    // Редьюсер для обновления текстового поля
    updateTextField: (state, action) => {
      const { field, value } = action.payload;
      state.data.text[field] = value;
    },

    // Редьюсер для обновления нескольких полей сразу
    updateMultipleTextFields: (state, action) => {
      state.data.text = {
        ...state.data.text,
        ...action.payload,
      };
    },

    // Редьюсер для сброса к шаблону
    resetPersone: (state) => {
      state.data.text = { ...textTemplate };
      state.data.photos = {}
      state.data.fingerprints = {}
      state.data.eyes = {}
    },
  },
  extraReducers: (builder) => {
    builder
      // for fingerprints
      .addCase(fetchFingers.pending, handlePending)
      .addCase(fetchFingers.fulfilled, (state, action) => {
        state.loading = false;
        state.data.fingerprints = action.payload;
      })
      .addCase(fetchFingers.rejected, handleRejected)

      // for eyes
      .addCase(fetchEyes.pending, handlePending)
      .addCase(fetchEyes.fulfilled, (state, action) => {
        state.loading = false;
        state.data.eyes = action.payload;
      })
      .addCase(fetchEyes.rejected, handleRejected)

      // for text
      .addCase(fetchText.pending, handlePending)
      .addCase(fetchText.fulfilled, (state, action) => {
        state.loading = false;
        state.data.text = {...textTemplate, ...action.payload};
      })
      .addCase(fetchText.rejected, handleRejected);
  },
});

export const { updateTextField, updateMultipleTextFields, resetPersone } = personeSlice.actions;

export default personeSlice.reducer;
