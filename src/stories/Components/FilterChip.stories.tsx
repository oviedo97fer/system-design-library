import React from "react";
import { Meta, StoryFn } from "@storybook/react";

import { FilterChip } from "../../index";

export default {
	title: "Components/FilterChip",
	component: FilterChip
} as Meta;

export const Default: StoryFn = ({ ...args }) => {
	return (
		<FilterChip
			filter={{ id: "1", name: "test", operation: "is equal to", value: "4", isActive: true }}
			handleCheckbox={() => ""}
			handleClick={() => ""}
			handleDelete={() => ""}
			{...args}
		/>
	);
};
