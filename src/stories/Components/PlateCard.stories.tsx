import React from "react";
import { Meta, StoryFn } from "@storybook/react";

import { PlateCard } from "../../index";

export default {
  title: "Components/PlateCard",
  component: PlateCard,
} as Meta;

export const Default: StoryFn = ({ ...args }) => {
  return <PlateCard view="create" closable {...args} onDelete={() => ""} />;
};
