import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import AddIcon from "@mui/icons-material/Add";

import { ActionButton } from "../../index";

export default {
    title: "Components/ActionButton",
    component: ActionButton
} as Meta;

export const Default: StoryFn = ({ ...args }) => {
    return (
        <ActionButton
            onClick={() => console.log("CLICK")}
            helperText="Text"
            icon={<AddIcon />}
            color="error"
            variant="outlined"
            {...args}
        />
    );
};
