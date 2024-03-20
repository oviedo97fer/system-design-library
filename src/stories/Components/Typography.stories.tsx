import React from "react";
import { Meta, StoryFn } from "@storybook/react";

import { Typography } from "../../index";

export default {
  title: "Components/Typography",
  component: Typography,
} as Meta;

export const Default: StoryFn = ({ ...args }) => {
  return (
    <Typography text="test" iconPosition="end" icon={<i>🦁</i>} {...args} />
  );
};
