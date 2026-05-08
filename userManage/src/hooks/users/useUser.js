import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addUserRequest } from "../../business/usersReducer/actions";
import useDispatchAction from "../useDispatchAction";
import { users_keys } from "./useUsers";

export const useEditUser = () => {
  const queryClient = useQueryClient();

  const { mutate, status } = useMutation({
    mutationFn: async ({ id, formData }) => {
      const response = await fetch(`/api/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      queryClient.setQueryData(users_keys.details(id), formData);

      queryClient.setQueryData(users_keys.list(), (old) => {
        return old.map((user) => (user.id === id ? formData : user));
      });
    },
    onSuccess: async () => {},
  });

  return { updateUser: mutate };
};

export const useAddUser = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async (user) => {
      const response = await fetch("http://localhost:8181/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      const createdUser = await response.json();
      queryClient.setQueryData(users_keys.list(), (old) => [
        ...(old || []),
        createdUser,
      ]);

      return true;
    },
  });

  return { addUser: mutate };
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async (id) => {
      const isDeleted = await fetch(`http://localhost:8181/api/users/${id}`, {
        method: "DELETE",
      });

      if (!isDeleted) {
        throw new Error("Failed to delete user");
      }

      queryClient.setQueryData(users_keys.list(), (old) =>
        (old || []).filter((user) => user.id !== id),
      );
    },
  });

  return { deteleUser: mutate };
};

const useUser = () => {
  const addUserRequestAction = useDispatchAction(addUserRequest);

  const addUser = async (user) => {
    addUserRequestAction(user);

    return true;
  };

  return { addUser };
};

export default useUser;
