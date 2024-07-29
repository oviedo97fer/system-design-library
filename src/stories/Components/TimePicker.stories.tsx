import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import TimePicker, { Props } from "../../TimePicker";
import dayjs from "dayjs";

export default {
    title: "Components/TimePicker",
    component: TimePicker,
    argTypes: {
        onChangeDate: { action: "changed" }
    }
} as Meta;

const Template: StoryFn<Props> = (args) => <TimePicker {...args} />;

export const Default = Template.bind({});
Default.args = {
    name: "datetime",
    value: dayjs(),
    language: "en",
    disabled: false,
    variant: "outlined",
    size: "small",
    required: false,
    readOnly: false,
    format: "LTS",
    withoutFormat: false,
    minutesStep: 30,
    shouldDisableTime: (time) => {
        let blackoutDates = [
            dayjs().add(1, "hour"),
            dayjs().add(3.5, "hour"),
            dayjs().add(4, "hour"),
            dayjs().add(5.5, "hour"),
            dayjs().add(7, "hour")
        ];
        return blackoutDates.some((blockTime) => {
            console.log("TIME: ", blockTime.format(), time.format());
            return blockTime.isSame(time, "hour");
        });
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
    format: "LTS"
};
