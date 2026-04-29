import { useEffect } from "react";
import { useSelector } from "react-redux";

import {
  fetchUsersError,
  fetchUsersRequest,
  fetchUsersSuccess,
} from "../../business/usersReducer/actions";
import useDispatchAction from "../useDispatchAction";

const useUsers = () => {
  const {
    data: users,
    loading,
    error,
  } = useSelector(({ users: { data, loading, error } }) => ({
    data,
    loading,
    error,
  }));

  const fetchUsersRequestAction = useDispatchAction(fetchUsersRequest);
  const fetchUsersSuccessAction = useDispatchAction(fetchUsersSuccess);
  const fetchUsersErrorAction = useDispatchAction(fetchUsersError);

  const fetchUsers = async () => {
    // dispatch(fetchUsersRequest());
    fetchUsersRequestAction();
    try {
      const response = await fetch("http://localhost:8181/api/users");
      const data = await response.json();

      // dispatch(fetchUsersSuccess(data));
      fetchUsersSuccessAction(data);
    } catch (error) {
      // dispatch(fetchUsersError(error));
      fetchUsersErrorAction(error);
    }
  };

  useEffect(() => {
    if ((users || []).length === 0) {
      fetchUsers();
    }
  }, []);

  return { users, loading, error };
};

export default useUsers;
