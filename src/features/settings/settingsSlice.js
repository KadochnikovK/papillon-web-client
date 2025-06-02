import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSettings = createAsyncThunk("settings/fetchSettings", async () => {
  // Здесь должен быть код для получения настроек, например, запрос к API
  // В данном примере просто возвращаем начальное состояние
  return {
    fingerprintsScanner: {
      url: "/",
      user: "admin",
      password: "admin",
    },
    eyesScanner: {
      url: "/",
      user: "admin",
      password: "admin",
    },
    flatbedScanner: {
      url: "/",
      user: "admin",
      password: "admin",
    },
    figerprintsMap: {
      url: "/",
    },
    dataBase: {
      url: "http://kadochnikov.papillon.ru:8000",
    },
    mapAreas: {
      pages: [
        {
          unit: "mm",
          areas: [
            {
              type: "palm",
              height: 95,
              width: 108.5,
              top: true,
              x: 0,
              y: 195.5,
              value: 11,
            },
            {
              type: "palm",
              height: 95,
              width: 105.5,
              top: true,
              x: 108.5,
              y: 195.5,
              value: 12,
            },
            {
              type: "big",
              height: 30,
              width: 36,
              background: true,
              x: 71.5,
              y: 195.5,
              value: 13,
            },
            {
              type: "big",
              height: 30,
              width: 35.5,
              background: true,
              x: 108.5,
              y: 195.5,
              value: 14,
            },
            {
              type: "finger",
              height: 30,
              width: 35.5,
              x: 9,
              y: 91,
              value: 0,
            },
            {
              type: "finger",
              height: 30,
              width: 37.5,
              x: 45,
              y: 91,
              value: 1,
            },
            {
              type: "finger",
              height: 30,
              width: 35.5,
              x: 83,
              y: 91,
              value: 2,
            },
            {
              type: "finger",
              height: 30,
              width: 37.5,
              x: 118.5,
              y: 91,
              value: 3,
            },
            {
              type: "finger",
              height: 30,
              width: 37.5,
              x: 157,
              y: 91,
              value: 4,
            },
            {
              type: "finger",
              height: 30,
              width: 35.5,
              x: 9,
              y: 147,
              value: 5,
            },
            {
              type: "finger",
              height: 30,
              width: 37.5,
              x: 45,
              y: 147,
              value: 6,
            },
            {
              type: "finger",
              height: 30,
              width: 35.5,
              x: 83,
              y: 147,
              value: 7,
            },
            {
              type: "finger",
              height: 30,
              width: 37.5,
              x: 118.5,
              y: 147,
              value: 8,
            },
            {
              type: "finger",
              height: 30,
              width: 37.5,
              x: 157,
              y: 147,
              value: 9,
            },
          ],
        },
      ],
    },
  };
});

const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    data: null,
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default settingsSlice.reducer;
