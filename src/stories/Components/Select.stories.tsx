import React from "react";
import { Meta, StoryFn } from "@storybook/react";

import { Select } from "../../index";

export default {
    title: "Components/Select",
    component: Select
} as Meta;

export const Default: StoryFn = ({ ...args }) => {
    return <Select variant="outlined" label="Select" {...args} options={[]} fullWidth />;
};
