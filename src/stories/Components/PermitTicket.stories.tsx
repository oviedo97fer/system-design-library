import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import PermitTicket from "../../PermitTicket";

export default {
    title: "Components/PermitTicket",
    component: PermitTicket
} as Meta;

export const Default: StoryFn = (args) => {
    return (
        <PermitTicket
            plate={"TEST123"}
            paymentData={{
                billing: {
                    startDate: "2024-09-05T01:00:00Z",
                    step: {
                        endDate: "2024-09-06T02:00:00Z",
                        duration: 1500,
                        amount: 0,
                        amountPlusVat: 0,
                        amountWithoutBonification: 0,
                        realAmount: 0,
                        bonification: 1,
                        vat: 0,
                        fee: 0,
                        feePlusVat: 0,
                        total: 0,
                        time: 1500,
                        timeBalanceUsed: 0
                    },
                    payWith: 0
                },
                operation: {
                    id: "350036",
                    startDate: "2024-09-05T01:00:00Z",
                    step: {
                        endDate: "2024-09-06T02:00:00Z",
                        duration: 1500,
                        amount: 0,
                        amountPlusVat: 0,
                        amountWithoutBonification: 0,
                        realAmount: 0,
                        bonification: 1,
                        vat: 0,
                        fee: 0,
                        feePlusVat: 0,
                        total: 0,
                        time: 1500,
                        timeBalanceUsed: 0
                    },
                    balance: 0,
                    timeBalance: 0,
                    creditCardPan: "**** 1234",
                    layout: 2
                },
                status: 3,
                deferred: false
            }}
            {...args}
        />
    );
};
