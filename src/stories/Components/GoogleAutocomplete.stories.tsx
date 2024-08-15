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
            currentAddressValue={{
                streetNumber: "5944",
                street: "Alder Street",
                postalCode: "15232",
                state: "Pennsylvania",
                city: "Pittsburgh",
                googleValue: {
                    description: "5944 Alder Street, Pittsburgh, PA, USA",
                    matched_substrings: [
                        {
                            length: 4,
                            offset: 0
                        },
                        {
                            length: 5,
                            offset: 5
                        }
                    ],
                    place_id: "ChIJEy5f5wzyNIgRj-C2mZI6VX4",
                    reference: "ChIJEy5f5wzyNIgRj-C2mZI6VX4",
                    structured_formatting: {
                        main_text: "5944 Alder Street",
                        main_text_matched_substrings: [
                            {
                                length: 4,
                                offset: 0
                            },
                            {
                                length: 5,
                                offset: 5
                            }
                        ],
                        secondary_text: "Pittsburgh, PA, USA"
                    },
                    terms: [
                        {
                            offset: 0,
                            value: "5944"
                        },
                        {
                            offset: 5,
                            value: "Alder Street"
                        },
                        {
                            offset: 19,
                            value: "Pittsburgh"
                        },
                        {
                            offset: 31,
                            value: "PA"
                        },
                        {
                            offset: 35,
                            value: "USA"
                        }
                    ],
                    types: ["geocode", "premise"]
                }
            }}
            {...args}
        />
    );
};
