import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import { getFingers, getEyes, getText, createPerson, updateFingers, updateEyes, updateTextFields } from "./api/personeApi";
import { hasArrayChanged } from "../../utils/diffUtils";

const textTemplate = {
  address: "",
  country_code: "",
  employee_id: "",
  first_name: "",
  last_name: "",
  surname: "",
  title: "",
};

const handlePending = (state) => {
  state.loading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

export const create = createAsyncThunk("person/create", async (personData, { rejectWithValue, getState }) => {
  try {
    const state = getState();
    const dataBase = state.settings.data.dataBase.url;
    const response = await createPerson(dataBase, personData);
    console.log(response);
    return response;
  } catch (error) {
    console.error("Ошибка при создании персоны:", error);
    return rejectWithValue(error.message);
  }
});

export const saveChanges = createAsyncThunk("person/saveChanges", async (changes, { rejectWithValue, getState }) => {
  try {
    const state = getState();
    const dataBase = state.settings.data?.dataBase?.url;
    const text = state.persone.data.text;
    const { fingerprints, eyes } = changes;
    console.log("data", text);
    const id = text.employee_id;
    const promises = [];

    if (text && Object.keys(text).length > 0) {
      promises.push(updateTextFields(dataBase, text));
    }

    if (fingerprints) {
      fingerprints.forEach((fingerprint) => {
        promises.push(updateFingers(dataBase, { user_id: id, ...fingerprint }));
      });
    }

    if (eyes) {
      promises.push(updateEyes(dataBase, eyes));
    }

    await Promise.all(promises);
    return "Everything Done";
  } catch (error) {
    console.error("Ошибка при сохранении изменений:", error);
    return rejectWithValue(error.message);
  }
});

// Оптимизированные асинхронные запросы
const createApiThunk = (name, apiCall) =>
  createAsyncThunk(`person/${name}`, async (data, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      console.log("состояние", state.settings);
      const dataBase = state.settings.data.dataBase.url;
      return await apiCall(dataBase, data);
    } catch (error) {
      console.error(`Ошибка при получении ${name}:`, error);
      return rejectWithValue(error.message);
    }
  });

export const fetchFingers = createApiThunk("fetchFingers", getFingers);
export const fetchEyes = createApiThunk("getEyes", getEyes);
export const fetchText = createApiThunk("getText", getText);

const initialState = {
  data: {
    text: { ...textTemplate },
    photos: [],
    fingerprints: [],
    eyes: [],
  },
  originalData: {
    text: { ...textTemplate },
    photos: [],
    fingerprints: [],
    eyes: [],
  },
  dirtyFields: {
    text: {},
    fingerprints: {},
    eyes: false,
  },
  isEditing: false,
  error: null,
  loading: false,
};

const personeSlice = createSlice({
  name: "persone",
  initialState,
  reducers: {
    updateTextField: (state, { payload: { field, value } }) => {
      state.data.text[field] = value;
      state.dirtyFields.text[field] = true;
    },

    updateMultipleTextFields: (state, { payload }) => {
      state.data.text = { ...state.data.text, ...payload };
      Object.keys(payload).forEach((field) => {
        state.dirtyFields.text[field] = true;
      });
    },

    updateFingerprint: (state, { payload }) => {
      const currentIndex = state.data.fingerprints.findIndex((fingerprint) => fingerprint.tag === payload.tag);
      // console.log('получен палец: ', payload)
      if (currentIndex !== -1) {
        state.data.fingerprints[currentIndex] = payload;
      } else {
        state.data.fingerprints.push(payload);
      }
      state.dirtyFields.fingerprints[payload.tag] = true;
    },

    updateMultipleFingerprints: (state, { payload }) => {
      state.data.fingerprints = [...state.data.fingerprints, ...payload];
      payload.forEach((element) => {
        // console.log('получен палец: ', element)
        const currentIndex = state.data.fingerprints.findIndex((fingerprint) => fingerprint.tag === payload.tag);

        if (currentIndex !== -1) {
          state.data.fingerprints[currentIndex] = payload;
        } else {
          state.data.fingerprints.push(element);
        }
      });
      state.dirtyFields.fingerprints[payload.tag] = true;
    },

    resetPersone: (state) => {
      state.data = JSON.parse(JSON.stringify(initialState.data));
      state.originalData = JSON.parse(JSON.stringify(initialState.originalData));
      state.dirtyFields = { ...initialState.dirtyFields };
    },

    startEditing: (state) => {
      state.isEditing = true;
      state.originalData = JSON.parse(JSON.stringify(state.data));
      state.dirtyFields = { ...initialState.dirtyFields };
    },

    cancelEditing: (state) => {
      state.isEditing = false;
      Object.entries(state.originalData).forEach(([key, value]) => {
        state.data[key] = JSON.parse(JSON.stringify(value));
      });
      state.dirtyFields = { ...initialState.dirtyFields };
    },
    stopEditing: (state) => {
      state.isEditing = false;
    },
  },
  extraReducers: (builder) => {
    const handleFulfilled =
      (key) =>
      (state, { payload }) => {
        state.loading = false;
        state.data[key] = payload;
        state.originalData[key] = payload;
        state.dirtyFields[key] = false;
      };

    builder
      .addCase(fetchFingers.pending, handlePending)
      .addCase(fetchFingers.fulfilled, handleFulfilled("fingerprints"))
      .addCase(fetchFingers.rejected, handleRejected)

      .addCase(fetchEyes.pending, handlePending)
      .addCase(fetchEyes.fulfilled, handleFulfilled("eyes"))
      .addCase(fetchEyes.rejected, handleRejected)

      .addCase(fetchText.pending, handlePending)
      .addCase(fetchText.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data.text = { ...textTemplate, ...payload };
        state.originalData.text = { ...textTemplate, ...payload };
        state.dirtyFields.text = {};
      })
      .addCase(fetchText.rejected, handleRejected)
      .addCase(create.pending, handlePending)
      .addCase(create.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.isEditing = false;
        state.originalData = JSON.parse(JSON.stringify(state.data));
        state.dirtyFields = { ...initialState.dirtyFields };
      })
      .addCase(create.rejected, handleRejected);
  },
});

// Оптимизированные селекторы
const selectData = (state) => state.persone.data;
const selectOriginal = (state) => state.persone.originalData;
const selectDirtyFields = (state) => state.persone.dirtyFields;

export const selectChangedTextFields = createSelector([selectData, selectOriginal, selectDirtyFields], (data, original, dirtyFields) => {
  const changes = {};
  Object.keys(dirtyFields.text).forEach((key) => {
    if (dirtyFields.text[key] && data.text[key] !== original.text[key]) {
      changes[key] = data.text[key];
    }
  });
  return changes;
});

export const selectChangedFingerprints = createSelector([selectData, selectOriginal, selectDirtyFields], (data, original, dirtyFields) => {
  const changes = [];

  // Проверяем измененные отпечатки
  Object.keys(dirtyFields.fingerprints).forEach((tag) => {
    if (dirtyFields.fingerprints[tag]) {
      const currentFinger = data.fingerprints.find((fingerprint) => fingerprint.tag == tag);
      const originalFinger = original.fingerprints.find((fingerprint) => fingerprint.tag == tag);

      // Если это новый отпечаток (нет в оригинале)
      if (!originalFinger) {
        changes.push(currentFinger);
      }
      // Если отпечаток был изменен
      else if (JSON.stringify(currentFinger.img_png) !== JSON.stringify(originalFinger.img_png)) {
        changes.push(currentFinger);
      }
    }
  });
  // console.log("changes", changes);
  // Также проверяем удаленные отпечатки
  // original.fingerprints.forEach((originalFinger) => {
  //   if (!data.fingerprints.some((fingerprint) => fingerprint.tag == originalFinger.tag)) {
  //     changes[originalFinger.tag] = null; // Помечаем как удаленный
  //   }
  // });
  // console.log("changes", changes);
  return changes;
});

// export const selectChangedFingerprints = createSelector([selectData, selectOriginal, selectDirtyFields], (data, original, dirtyFields) => {
//   const changes = {};

//   //допиши код

//   return changes;
// });

export const selectHasTextChanges = createSelector([selectChangedTextFields], (changes) => {
  // console.log("selectHasTextChanges!!!!!!!!!!!", changes);
  return Object.keys(changes).length > 0;
});

export const selectHasFingerprintsChanges = createSelector([selectChangedFingerprints], (changes) => {
  // console.log("selectHasFingerprintsChanges!!!!!!!!!!!", changes);
  return Object.keys(changes).length > 0;
});

// export const selectHasFingerprintsChanges = createSelector(
//   [selectData, selectOriginal, selectDirtyFields],
//   (data, original, dirtyFields) => dirtyFields.fingerprints && hasArrayChanged(data.fingerprints, original.fingerprints)
// );

export const selectHasEyesChanges = createSelector([selectData, selectOriginal, selectDirtyFields], (data, original, dirtyFields) => dirtyFields.eyes && hasArrayChanged(data.eyes, original.eyes));

export const selectHasAnyChanges = createSelector([selectHasTextChanges, selectHasFingerprintsChanges, selectHasEyesChanges], (text, fingers, eyes) => text || fingers || eyes);

export const { updateTextField, updateMultipleTextFields, updateFingerprint, updateMultipleFingerprints, resetPersone, startEditing, cancelEditing, stopEditing } = personeSlice.actions;

export default personeSlice.reducer;
