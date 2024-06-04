import React from "react";
import { Meta, StoryFn } from "@storybook/react";

import { Typography } from "../../index";

export default {
	title: "Components/Typography",
	component: Typography,
} as Meta;

export const Default: StoryFn = ({ ...args }) => {
	return (
		<Typography iconPosition="end" icon={<i>🦁</i>} {...args}>
			Test
		</Typography>
	);
};
