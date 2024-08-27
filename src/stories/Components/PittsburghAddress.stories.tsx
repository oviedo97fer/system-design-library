import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import PittsburghAddress, { QueryAddressResult, ResidencyUses } from "../../PittsburghAddress";

export default {
    title: "Components/PittsburghAddress",
    component: PittsburghAddress
} as Meta;

const later = (delay: number, value: any) => {
    let timer: any = 0;
    let reject: any = null;
    const promise = new Promise((resolve, _reject) => {
        reject = _reject;
        timer = setTimeout(resolve, delay, value);
    });
    return {
        get promise() {
            return promise;
        },
        cancel() {
            if (timer) {
                clearTimeout(timer);
                timer = 0;
                reject();
                reject = null;
            }
        }
    };
};

export const Default: StoryFn = (args) => {
    return (
        <PittsburghAddress
            id="autocomplete-fetching"
            label="Search.."
            placeholder="Type to search..."
            loadingText="Loading options dude..."
            googleMapsApiKey="AIzaSyDBPBW1NFp6WP2j_A4vCiUNtYN1zWhn5L0"
            onChange={(value) => console.log("RESULT: ", value)}
            noResultsText="no_results"
            addressType={ResidencyUses.Business}
            setError={(error) => {
                console.log({ error });
            }}
            onRequestAddress={(_, callback) => {
                const l1 = later(3000, {
                    data: [
                       /*  {
                            address: {
                                postalCode: "15203",
                                street: "Carey Way",
                                streetNumber: "1812",
                                unit: {
                                    designator: 21,
                                    unit: ""
                                }
                            },
                            uses: 2147483647,
                            zoneId: "110811"
                        }, */
                        {
                            address: {
                                postalCode: "15413",
                                street: "Carey Way",
                                streetNumber: "1812",
                                unit: {
                                    designator: 21,
                                    unit: ""
                                }
                            },
                            uses: 0,
                            zoneId: "110811"
                        }
                    ]
                });

                l1.promise
                    .then((msg) => {
                        callback.onSuccess(msg as { data: QueryAddressResult[] });
                    })
                    .catch(() => {
                        console.log("l1 cancelled");
                    });

                // Simular una peticion de una colección despues de 2 segundos
            }}
            locationRestriction={{
                north: 41,
                south: 39.9,
                east: -79,
                west: -81
            }}
            onClearSelection={() => {}}
            {...args}
        />
    );
};
