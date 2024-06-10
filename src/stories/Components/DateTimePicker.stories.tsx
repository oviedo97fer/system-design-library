import React from "react";
import { Meta, StoryFn } from "@storybook/react";

import { DateTimePicker } from "../../index";

export default {
	title: "Components/DateTime",
	component: DateTimePicker,
} as Meta;

export const Default: StoryFn = ({ ...args }) => {
	return (
		<DateTimePicker
			label=""
			name=""
			value=""
			language="en"
			disabled={false}
			variant="standard"
			size="small"
			required
			readOnly
			format="L LTS"
			{...args}
		/>
	);
};
