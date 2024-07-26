import React from "react";
import { Meta, StoryFn } from "@storybook/react";

import { MarkdownRender } from "../../index";

export default {
    title: "Components/MarkdownRender",
    component: MarkdownRender
} as Meta;

export const Default: StoryFn = ({ ...args }) => {
    return (
        <MarkdownRender text="**Proof of Residency** (Only one option of residency proof is required):\u00A0\n\n**Current rental lease, including:**\n\n**- Applicant's name.**\n**- Property address** where applicant is applying for the permit (including apartment or unit number).\n**- Start and end term dates** of the lease\n  \n    - An addendum or renewal form will be accepted with the new term dates and signatures of the applicant and the landlord.\n\n- **Signatures** of the applicant and landlord\n\n**Please note:** No altered leases will be accepted. You do not have to submit the entire lease, only pages with relevant information.\n\n**Current utility bill:**\n\n- The bill must include the** applicant's name and property address** where applicant is applying for the permit.\n- You must upload the **full page version of the light, gas, or cable/internet bill**, with the payment tab attached. Screenshots and electronic versions are accepted.\n- **The service address must match the mailing address where you are applying for an RPP permit.**\n- **We do not accept water (PWSA/PGH20), sewer, cell phone, or property tax bills.**\n- Mortgage documents or mortgage insurance documents are not accepted as they prove ownership, but not residency.\u2028\n\n**Sublease:**\n\n- This document must state the property address of residence, duration of stay, and from whom you are subleasing.\u00A0 The original lease agreement, signed by the landlord, will also need to be provided to show the sublessor is an approved resident at that address.\n- Any tenant to tenant sublease, that does not involve the property owner, must be notarized.\u2028\n\n**Business Permits:**\n\n- [This form](https://apps.pittsburghpa.gov/ppa/BUSINESS-EMPLOYEE-RPP-4-10-14.pdf)\u00A0must be signed and notarized by you and the business owner, in addition to the lease or utility\u00A0bill.\n" {...args}/>
    );
};
