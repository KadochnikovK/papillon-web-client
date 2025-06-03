import {
  startEditing,
  resetPersone,
  cancelEditing,
  selectHasAnyChanges,
  selectChangedTextFields,
  selectChangedFingerprints,
  updateTextField,
  updateFingerprint,
  stopEditing,
  saveChanges,
  create,
  fetchFingers,
  fetchEyes,
  fetchText,
} from "../features/persone/personeSlice";
import { activePerson, changeActive } from "../features/personsList/personsListSlice";

import { createFingerprint } from "../helpers/fingerprints";
import { useSelector, useDispatch } from "react-redux";

export const usePersone = () => {
  const dispatch = useDispatch();

  const state = useSelector((state) => state.persone);
  const persone = state.data;
  const isExistPersone = persone.text.employee_id;
  const isEditing = state.isEditing;
  const personsLoading = state.loading;
  const personsError = state.error;

  const hasChanges = useSelector(selectHasAnyChanges);
  const changedTextFields = useSelector(selectChangedTextFields);
  const changedFingerprints = useSelector(selectChangedFingerprints);

  const editPersone = () => {
    dispatch(startEditing());
  };

  const onResetPersone = () => {
    dispatch(resetPersone());
  };

  const createPersone = () => {
    dispatch(resetPersone());
    dispatch(startEditing());
  };

  const cancelEditingPersone = () => dispatch(cancelEditing());

  const changeTextField = (e, key) => {
    dispatch(updateTextField({ field: key, value: e.target.value }));
  };

  const getPersonsData = (id) => {
    dispatch(fetchFingers(id));
    dispatch(fetchEyes(id));
    dispatch(fetchText(id));
  };

  const changeFingerprint = (tag, image) => dispatch(updateFingerprint(createFingerprint(tag, image)));

  const savePersone = async () => {
    if (!persone.text.employee_id) {
      const id = await dispatch(create(persone.text)).then(data => data.payload.employee_id)
      console.log(id);
      if (id) {
        dispatch(changeActive({ id }));
      }

      dispatch(stopEditing());
    } else {
      await dispatch(saveChanges({ text: changedTextFields, fingerprints: changedFingerprints }));
      dispatch(stopEditing());
    }
  };

  return {
    persone,
    isExistPersone,
    isEditing,
    personsLoading,
    personsError,
    hasChanges,
    changedTextFields,
    changedFingerprints,
    editPersone,
    onResetPersone,
    createPersone,
    changeTextField,
    savePersone,
    changeFingerprint,
    cancelEditingPersone,
    getPersonsData,
  };
};
