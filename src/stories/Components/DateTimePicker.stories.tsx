import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import DateTimePicker, { Props } from "../../DateTimePicker";

export default {
    title: "Components/DateTimePicker",
    component: DateTimePicker,
    argTypes: {
        onChange: { action: "changed" }
    }
} as Meta;

const Template: StoryFn<Props> = (args) => <DateTimePicker {...args} />;

export const Default = Template.bind({});
Default.args = {
    name: "datetime",
    value: null,
    language: "en",
    disabled: false,
    variant: "outlined",
    size: "small",
    required: false,
    readOnly: false,
    format: "L LTS",
    withoutFormat: false,
    sx: {}
};

export const Disabled = Template.bind({});
Disabled.args = {
    ...Default.args,
    disabled: true
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
    ...Default.args,
    readOnly: true
};

export const WithCustomFormat = Template.bind({});
WithCustomFormat.args = {
    ...Default.args,
    format: "DD/MM/YYYY HH:mm"
};
