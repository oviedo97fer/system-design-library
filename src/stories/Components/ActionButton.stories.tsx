import React from "react";
import { Meta, StoryFn } from "@storybook/react";

import { ActionButton } from "../../index";

export default {
    title: "Components/ActionButton",
    component: ActionButton
} as Meta;

export const Default: StoryFn = ({ ...args }) => {
    return <ActionButton onClick={() => ""} helperText="Text" icon={<i>🦁</i>} {...args} />;
};
