import { MemoryRouter } from "react-router-dom";

import FormUser from ".";

export default {
  title: "components/FormUser",
  component: FormUser,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export const withoutProps = {};

export const withData = {
  args: {
    formData: {
      firstName: "foo",
      lastName: "bar",
      email: "foo@bar.com",
      phone: "06223355225",
    },
  },
};

export const diableEditing = {
  args: {
    formData: {
      firstName: "foo",
      lastName: "bar",
      email: "foo@bar.com",
      phone: "06223355225",
    },
    disable: true,
  },
};

// export const withoutProps = {};
