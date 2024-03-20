import React from "react";
import { Meta, StoryFn } from "@storybook/react";

import { PaymentMethodCard } from "../../../index";

export default {
  title: "Components/PaymentMethodCard",
  component: PaymentMethodCard,
} as Meta;

export const Default: StoryFn = ({ ...args }) => {
  return (
    <PaymentMethodCard
      title="test"
      description="desc"
      icon={<i>🦁</i>}
      {...args}
    />
  );
};
