import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import DatePicker, { Props } from "../../DatePicker";
import dayjs from "dayjs";

export default {
    title: "Components/DatePicker",
    component: DatePicker,
    argTypes: {
        onChangeDate: { action: "changed" }
    }
} as Meta;

const Template: StoryFn<Props> = (args) => <DatePicker {...args} />;

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
    format: "L",
    withoutFormat: false,
    shouldDisableDate: (day) => {
        let blackoutDates = [
            dayjs().add(1, "day").format("YYYY-MM-DD"),
            dayjs().add(3, "day").format("YYYY-MM-DD"),
            dayjs().add(5, "day").format("YYYY-MM-DD"),
            dayjs().add(7, "day").format("YYYY-MM-DD")
        ];
        return blackoutDates.includes(day.format("YYYY-MM-DD"));
    },
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
