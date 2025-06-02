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
} from "../features/persone/personeSlice";
import { fetchPersons } from "../features/personsList/personsListSlice";
import { createFingerprint } from "../helpers/fingerprints";
import { useSelector, useDispatch } from "react-redux";

export const usePersone = () => {
  const dispatch = useDispatch();

  const state = useSelector((state) => state.persone);
  const persone = state.data;
  const isExistPersone = persone.text.employee_id;
  const isEditing = state.isEditing;
  const loading = state.loading;

  const hasChanges = useSelector(selectHasAnyChanges);
  const changedTextFields = useSelector(selectChangedTextFields);
  const changedFingerprints = useSelector(selectChangedFingerprints);

  const editPersone = () => {
    dispatch(startEditing());
  };

  const createPersone = () => {
    dispatch(resetPersone());
    dispatch(startEditing());
  };

  const cancelEditingPersone = () => dispatch(cancelEditing());

  const changeTextField = (e, key) => {
    dispatch(updateTextField({ field: key, value: e.target.value }));
  };

  const changeFingerprint = (tag, image) => dispatch(updateFingerprint(createFingerprint(tag, image)));

  const savePersone = async () => {
    if (!persone.text.employee_id) {
      await dispatch(create(persone.text));
      await dispatch(fetchPersons());
      dispatch(stopEditing());
    } else {
      await dispatch(saveChanges({ text: changedTextFields, fingerprints: changedFingerprints }));
      await dispatch(fetchPersons());
      dispatch(stopEditing());
    }
  };

  return { persone, isExistPersone, isEditing, loading, hasChanges, changedTextFields, changedFingerprints, editPersone, createPersone, changeTextField, savePersone, changeFingerprint, cancelEditingPersone };
};
