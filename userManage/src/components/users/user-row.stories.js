import { UserRow } from "./UserRow";

export default {
  title: "components/userRow",
  component: UserRow,
};

export const withUser = {
  args: {
    user: {
      firstName: "foo",
      lastName: "bar",
      email: "foo@bar.com",
      phone: "06223355225",
    },
    handleShowUserDetails: () => {},
    handleDeleteUser: () => {},
  },
};
