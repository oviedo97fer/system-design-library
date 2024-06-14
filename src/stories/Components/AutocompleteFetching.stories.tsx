import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { AutocompleteFetching } from "../../index";

export default {
	title: "Components/AutocompleteFetching",
	component: AutocompleteFetching,
} as Meta;

const fetchOptionsMock = async (query: string) => {
	return new Promise<{ label: string }[]>((resolve) => {
		setTimeout(() => {
			resolve(
				[{ label: "Option 1" }, { label: "Option 2" }, { label: "Option 3" }].filter((option) =>
					option.label.toLowerCase().includes(query.toLowerCase())
				)
			);
		}, 500);
	});
};

export const Default: StoryFn = (args) => {
	return (
		<AutocompleteFetching
			id="autocomplete-fetching"
			label="Search"
			placeholder="Type to search..."
			fetchOptions={fetchOptionsMock}
			onOptionSelected={(value) => console.log(value)}
			{...args}
		/>
	);
};
