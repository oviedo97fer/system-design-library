import React from "react";
import { Meta, StoryFn } from "@storybook/react";

import { MenuItem } from "../../index";

export default {
  title: "Components/MenuItem",
  component: MenuItem,
} as Meta;

export const Default: StoryFn = ({ ...args }) => {
  return <MenuItem text="test" icon={<i>🦁</i>} {...args} />;
};
