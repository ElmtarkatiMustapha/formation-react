import Button from ".";

export default {
  title: "components/Button",
  component: Button,
};

export const withoutProps = {};

const defaultProps = {
  label: "save user",
  name: "save",
  color: "",
  handleClick: () => {},
  role: "button",
  disabled: false,
};

export const enabledbtn = {
  args: defaultProps,
};

export const disabledBtn = {
  args: {
    ...defaultProps,
    disabled: true,
  },
};
