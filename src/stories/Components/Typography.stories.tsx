import React from "react";
import { Meta, StoryFn } from "@storybook/react";

import { Typography } from "../../index";
import { Stack } from "@mui/system";

export default {
    title: "Components/Typography",
    component: Typography
} as Meta;

export const Default: StoryFn = ({ ...args }) => {
    return (
        <Stack spacing={2}>
            <Typography variant="h1" {...args}>
                H1 Text
            </Typography>
            <Typography variant="h2" {...args}>
                H2 Text
            </Typography>
            <Typography variant="h3" {...args}>
                H3 Text
            </Typography>
            <Typography variant="h4" {...args}>
                H4 Text
            </Typography>
            <Typography variant="h5" {...args}>
                H5 Text
            </Typography>
            <Typography variant="h6" {...args}>
                H6 Text
            </Typography>
            <Typography variant="subtitle1" {...args}>
                subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
            </Typography>
            <Typography variant="subtitle2" {...args}>
                subtitle2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
            </Typography>
            <Typography variant="body1">
                body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit,
                quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat
                deleniti? Eum quasi quidem quibusdam.
            </Typography>
            <Typography variant="body2">
                body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit,
                quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat
                deleniti? Eum quasi quidem quibusdam.
            </Typography>
            <Typography variant="button" display="block">
                button text
            </Typography>
            <Typography variant="caption" display="block">
                caption text
            </Typography>
            <Typography variant="overline" display="block">
                overline text
            </Typography>
            <Typography iconPosition="end" icon={<i>🦁</i>} {...args}>
                Test
            </Typography>
        </Stack>
    );
};
