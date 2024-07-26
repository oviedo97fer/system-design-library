import React from "react";
import { Meta, StoryFn } from "@storybook/react";

import { MarkdownRender } from "../../index";

export default {
    title: "Components/MarkdownRender",
    component: MarkdownRender
} as Meta;

export const Default: StoryFn = ({ ...args }) => {
    return (
        <MarkdownRender
            text="By tapping 'Create account' or 'Login' you agree to our [Conditions of Use.](link:#) Learn how we process your data in our [Privacy Policy and Cookies Policy.](link:#)"
            {...args}
        />
    );
};
