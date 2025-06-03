import { fetchPersons, toggleSelection, clearSelected, selectAll, changeActive } from "../features/personsList/personsListSlice";
import { useSelector, useDispatch } from "react-redux";

export const usePersonsList = () => {
  const dispatch = useDispatch();

  const state = useSelector((state) => state.personsList);
  const personsList = state.data || [];
  const personsListLoading = state.loading;
  const personsListError = state.error;
  const selectedPersons = state.selected || [];
  const activePerson = state.active || null;

  // Преобразуем Set в массив если нужно
  const hasSelected = state.selected.length > 0;
  const indeterminate = hasSelected && state.selected.length < state.data.length;

  const isItemSelected = (id) => state.selected.includes(id);

  const fetchPersonsList = () => {
    dispatch(fetchPersons());
  };

  const onChangeSelection = (id, isSelected = false) => {
    dispatch(toggleSelection({ id, isSelected }));
  };

  const onClearSelection = () => {
    dispatch(clearSelected());
  };

  const onSelectAll = () => {
    dispatch(selectAll());
  };

  const onChangeActive = (id = null) => {
    dispatch(changeActive({ id }));
  };

  if (personsListError) {
    throw new Error(personsListError);
  }

  return {
    selectedPersons,
    personsList,
    personsListLoading,
    personsListError,
    activePerson,
    hasSelected,
    indeterminate,
    fetchPersonsList,
    onChangeSelection,
    onSelectAll,
    onClearSelection,
    onChangeActive,
    isItemSelected,
  };
};
