import { useSelector, useDispatch } from "react-redux";

export const useSettings = () => {
  const settings = useSelector((state) => state.settings.data);

  return { settings };
};
