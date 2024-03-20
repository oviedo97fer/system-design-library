import React from "react";
import { Meta, StoryFn } from "@storybook/react";

import { Input } from "../../../index";

export default {
  title: "Components/Input",
  component: Input,
} as Meta;

export const Default: StoryFn = ({ ...args }) => {
  return <Input {...args} />;
};
