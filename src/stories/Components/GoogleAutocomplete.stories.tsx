import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import GoogleAutocomplete from "../../GoogleAutocomplete";

export default {
    title: "Components/GoogleAutocomplete",
    component: GoogleAutocomplete
} as Meta;

export const Default: StoryFn = (args) => {
    return (
        <GoogleAutocomplete
            id="autocomplete-fetching"
            label="Search.."
            placeholder="Type to search..."
            loadingText="Loading options dude..."
            googleMapsApiKey="AIzaSyDBPBW1NFp6WP2j_A4vCiUNtYN1zWhn5L0"
            onChange={(value) => console.log("RESULT: ", value)}
            noResultsText="no_results"
            {...args}
        />
    );
};
