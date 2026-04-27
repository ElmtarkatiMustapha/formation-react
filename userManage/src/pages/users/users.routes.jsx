import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import UserView from "./view";
import UserAdd from "./add";
import UserList from ".";
import UserEdit  from "./edit";

export function UsersRoutes() {
  return (
    <Routes>
      <Route index element={<UserList />} />
      <Route path="add" element={<UserAdd />} />
      <Route path=":id/edit" element={<UserEdit  />} />
      <Route path=":id/view" element={<UserView />} />
    </Routes>
  );
}
