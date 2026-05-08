import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import {
  fetchUsersError,
  fetchUsersRequest,
  fetchUsersSuccess,
} from "../../business/usersReducer/actions";
import useDispatchAction from "../useDispatchAction";

export const users_keys = {
  list: () => ["users"],
  details: (id) => ["users", "details", id],
};

const useUsers = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: users_keys.list(),
    queryFn: async () => {
      console.log("___fetching users ____ use query");
      const response = await fetch("http://localhost:8181/api/users");

      if (!response.ok) throw new Error("error fetching users");

      return await response.json();
    },
    retry: 2,
    retryDelay: 100,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return { users: data, isLoading, error };
};

export default useUsers;
