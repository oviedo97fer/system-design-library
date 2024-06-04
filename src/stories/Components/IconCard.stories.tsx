import React from "react";
import { Meta, StoryFn } from "@storybook/react";

import { IconCard } from "../../index";

export default {
	title: "Components/IconCard",
	component: IconCard,
} as Meta;

export const Default: StoryFn = ({ ...args }) => {
	return <IconCard title="test" description="desc" icon={<i>🦁</i>} {...args} />;
};
