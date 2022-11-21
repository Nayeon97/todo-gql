import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useState } from "react";
import Button from "./Button";

export default {
  title: "Button",
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Standard = Template.bind({});

Standard.args = {
  name: "default",
  btnType: "default",
  disabled: false,
};

export const Delete = Template.bind({});
Delete.args = {
  name: "delete",
  btnType: "delete",
  disabled: false,
};

export const Edit = Template.bind({});
Edit.args = {
  name: "edit",
  btnType: "edit",
  disabled: false,
};

// export const Incomplete = Template.bind({});
// Incomplete.args = {
//   name: "incomplete",
//   btnType: "incomplete",
//   disabled: false,
// };

// export const Complete = Template.bind({});
// Complete.args = {
//   name: "complete",
//   btnType: "complete",
//   disabled: false,
// };

// Example React Hooks.
export const Toggle = () => {
  const [complete, setComplete] = useState(false);

  const onClick = () => {
    setComplete(!complete);
  };

  return (
    <Button
      name={complete ? "complete" : "incomplete"}
      onClick={onClick}
      btnType={complete ? "complete" : "incomplete"}
    />
  );
};
