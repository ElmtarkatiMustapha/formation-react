import { useDispatch } from "react-redux";

const useDispatchAction = (action) => {
  const dispatch = useDispatch();

  const dispatchedAction = (...args) => {
    dispatch(action(...args));
  };

  return dispatchedAction;
};

export default useDispatchAction;
