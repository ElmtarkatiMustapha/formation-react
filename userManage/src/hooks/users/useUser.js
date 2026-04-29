import {
  addUserError,
  addUserRequest,
  addUserSuccess,
} from "../../business/usersReducer/actions";
import useDispatchAction from "../useDispatchAction";

const useUser = () => {
  const addUserRequestAction = useDispatchAction(addUserRequest);
  const addUserSuccessAction = useDispatchAction(addUserSuccess);
  const addUserErrorAction = useDispatchAction(addUserError);

  const addUser = async (user) => {
    addUserRequestAction();

    try {
      const response = await fetch("http://localhost:8181/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        addUserSuccessAction(user);
      } else {
        addUserErrorAction("An error occurred", "error");
        return false;
      }
    } catch (error) {
      addUserErrorAction(error.message || "An error occurred", "error");
      return false;
    }

    return true;
  };

  return { addUser };
};

export default useUser;
