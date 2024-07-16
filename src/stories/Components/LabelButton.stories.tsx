import React from "react";
import { Meta, StoryFn } from "@storybook/react";

import { LabelButton } from "../../index";

export default {
    title: "Components/LabelButton",
    component: LabelButton
} as Meta;

export const Default: StoryFn = ({ ...args }) => {
    return <LabelButton onClick={() => ""} buttonText="Label" {...args} />;
};
