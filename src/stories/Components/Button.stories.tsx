import React from "react";
import { Meta, StoryFn, StoryObj } from "@storybook/react";

import { Button } from "../../index";

export default {
    title: "Components/Button",
    component: Button
} as Meta;

export const Default: StoryFn = ({ ...args }) => {
    return (
        <Button variant="contained" {...args}>
            Button
        </Button>
    );
};

type Story = StoryObj<typeof Button>;

export const Text: Story = {
    args: {
        variant: "text",
        children: "Text Button"
    }
};
export const Contained: Story = {
    args: {
        variant: "contained",
        children: "Contained Button"
    }
};

export const Outlined: Story = {
    args: {
        variant: "outlined",
        children: "Outlined Button"
    }
};

export const ErrorBtn: Story = {
    args: {
        variant: "outlined",
        children: "Error Button",
        error: "Error on action"
    }
};
