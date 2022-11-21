import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useState } from "react";
import Input from "./Input";

export default {
  title: "Input",
  component: Input,
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Standard = () => {
  const [text, setText] = useState("");

  return (
    <Input
      type="text"
      value={text}
      onChange={(e) => setText(e.currentTarget.value)}
      name="text"
    />
  );
};
