import { useState, useEffect } from "react";
import useDispatchAction from "../useDispatchAction";
import { fetchUserRequest } from "../../business/usersReducer/actions";
import { useSelector } from "react-redux";

const useFetchUser = (userId) => {
  const {
    data: user,
    loading,
    error,
  } = useSelector((store) => store.users.selected_user);
  const fetchuserAction = useDispatchAction(fetchUserRequest);

  useEffect(() => {
    if (userId) fetchuserAction(userId);
  }, [userId]);

  return { user, loading, error };
};

export default useFetchUser;
