import React from "react";
import { Meta, StoryFn } from "@storybook/react";

import { Button } from "../../index";

export default {
  title: "Components/Button",
  component: Button,
} as Meta;

export const Default: StoryFn = ({ ...args }) => {
  return (
    <Button variant="contained" {...args}>
      Button
    </Button>
  );
};
