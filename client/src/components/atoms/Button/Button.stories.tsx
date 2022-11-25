import { ComponentStory, ComponentMeta, StoryObj } from "@storybook/react";
import { within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

// A
export const Toggle: StoryObj = () => {
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

Toggle.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.click(canvas.getByRole("button"));
};

Toggle.storyName = "ToggleBtn";
