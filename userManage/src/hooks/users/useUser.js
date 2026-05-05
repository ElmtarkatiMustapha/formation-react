import { addUserRequest } from "../../business/usersReducer/actions";
import useDispatchAction from "../useDispatchAction";

const useUser = () => {
  const addUserRequestAction = useDispatchAction(addUserRequest);

  const addUser = async (user) => {
    addUserRequestAction(user);

    return true;
  };

  return { addUser };
};

export default useUser;
