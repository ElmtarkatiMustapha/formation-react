import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

import useDispatchAction from "../useDispatchAction";
import { fetchUserRequest } from "../../business/usersReducer/actions";
import { users_keys } from "./useUsers";

const useFetchUser = (id) => {
  const { data, isLoading, error } = useQuery({
    queryKey: users_keys.details(id),
    queryFn: async () => {
      console.log(
        "____________ FETCHING USER " + id + "_______________________",
      );
      const response = await fetch(`/api/users/${id}`);
      if (!response.ok) throw new Error("error fetching user : " + id);

      return await response.json();
    },
    retry: 2,
    retryDelay: 100,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return { user: data, loading: isLoading, error: error?.message };
};

export default useFetchUser;
