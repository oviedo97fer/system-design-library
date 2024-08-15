import React, { useState, useEffect, useMemo, useRef } from "react";
import Autocomplete, { AutocompleteProps } from "@mui/material/Autocomplete";
import { debounce } from "@mui/material/utils";
import { Box, FormControl, Grid, InputLabel, TextField, Typography } from "@mui/material";
import { styled } from "@mui/system";
import LocationOnIcon from "@mui/icons-material/LocationOn";

interface MainTextMatchedSubstrings {
    offset: number;
    length: number;
}
interface StructuredFormatting {
    main_text: string;
    secondary_text: string;
    main_text_matched_substrings?: readonly MainTextMatchedSubstrings[];
}

interface PlaceType {
    place_id: string;
    reference: string;
    description: string;
    structured_formatting: StructuredFormatting;
}

interface PlaceDetails {
    html_attributions: string[];
    address_components: AddressComponent[];
}

type AddressComponent = {
    long_name: string;
    short_name: string;
    types: string[];
};

interface AddressAutocompleteProps
    extends Omit<AutocompleteProps<PlaceType, boolean, boolean, false>, "renderInput" | "options" | "onChange"> {
    id: string;
    label?: string;
    placeholder: string;
    helperText?: string;
    loadingText?: string;
    required?: boolean;
    error?: boolean;
    options?: PlaceType[];
    googleMapsApiKey: string;
    onChange: (value: AddressResult | null) => void;
    onClearSelection?: () => void;
    noResultsText?: string;
    searchText?: string;
    notFound?: boolean;
    externalLoading?: boolean;
    currentAddressValue?: AddressResult;
}

interface AddressResult {
    streetNumber: string;
    street: string;
    postalCode: string;
    state: string;
    city: string;
    googleValue: PlaceType | null;
}

const autocompleteService = { current: null };
const placesService = { current: null };

const GoogleAutocomplete: React.FC<AddressAutocompleteProps> = ({
    id,
    label,
    placeholder,
    required,
    error,
    helperText,
    googleMapsApiKey,
    onClearSelection,
    noResultsText = "no_results",
    searchText = "Search..",
    notFound = false,
    externalLoading,
    currentAddressValue,
    ...props
}) => {
    const [inputValue, setInputValue] = useState<string>("");
    const [options, setOptions] = useState<readonly PlaceType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [currentValue, setCurrentValue] = useState<PlaceType | null>(null);
    const [addressResult, setAddressResult] = useState<AddressResult | null>(null);
    const loaded = useRef(false);

    if (typeof window !== "undefined" && !loaded.current) {
        if (!document.querySelector("#google-maps")) {
            loadScript(
                `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=places`,
                document.querySelector("head"),
                "google-maps"
            );
        }

        loaded.current = true;
    }

    const fetch = useMemo(
        () =>
            debounce((request: { input: string }, callback: (results?: readonly PlaceType[]) => void) => {
                (autocompleteService.current as any).getPlacePredictions(request, callback);
            }, 400),
        []
    );

    useEffect(() => {
        if (currentAddressValue) {
            // setInputValue(currentAddressValue.googleValue?.structured_formatting.main_text);
            setCurrentValue(currentAddressValue.googleValue);
        }
    }, []);

    const fetchPlaceDetails = (
        request: {
            placeId: string;
            fields: string[] | string;
        },
        callback: (result?: PlaceDetails) => void
    ) => {
        (placesService.current as any).getDetails(request, callback);
    };

    // Call to fetch data
    useEffect(() => {
        let active = true;

        if (!autocompleteService.current && (window as any).google) {
            autocompleteService.current = new (window as any).google.maps.places.AutocompleteService();
            placesService.current = new (window as any).google.maps.places.PlacesService(document.createElement("div"));
        }
        if (!autocompleteService.current || !placesService.current) {
            return undefined;
        }

        if (inputValue === "") {
            setOptions(currentValue ? [currentValue] : []);
            return undefined;
        }
        setLoading(true);
        fetch({ input: inputValue }, (results?: readonly PlaceType[]) => {
            if (active) {
                let newOptions: readonly PlaceType[] = [];

                if (currentValue) {
                    newOptions = [currentValue];
                }

                if (results) {
                    newOptions = [...newOptions, ...results];
                }
                setLoading(false);
                setOptions(newOptions);
            }
        });

        return () => {
            active = false;
        };
    }, [currentValue, inputValue, fetch]);

    useEffect(() => {
        if (addressResult) {
            props.onChange(addressResult);
        }
    }, [addressResult]);

    const getPlaceDetails = (placeId: string) => {
        setLoading(true);
        fetchPlaceDetails({ placeId, fields: ["address_component"] }, (result?: PlaceDetails) => {
            try {
                if (result) {
                    const streetNumber =
                        result.address_components.find((component) => component.types.includes("street_number"))
                            ?.long_name || "";

                    const street =
                        result.address_components.find((component) => component.types.includes("route"))?.long_name ||
                        "";

                    const city =
                        result.address_components.find((component) => component.types.includes("locality"))
                            ?.long_name || "";

                    const state =
                        result.address_components.find((component) =>
                            component.types.includes("administrative_area_level_1")
                        )?.long_name || "";

                    const postalCode =
                        result.address_components.find((component) => component.types.includes("postal_code"))
                            ?.long_name || "";

                    const addressResult = {
                        streetNumber,
                        street,
                        postalCode,
                        state,
                        city,
                        googleValue: currentValue
                    };

                    setLoading(false);
                    setAddressResult(addressResult);
                    // Manejar los detalles del lugar aquí
                } else {
                    console.log("No details found for the selected place.");
                }
            } catch (error) {
                console.log("ERROR", { error });
            }
        });
    };

    const clearSelection = () => {
        setLoading(false);
        setCurrentValue(null);
        if (typeof onClearSelection === "function") {
            onClearSelection();
        }
    };

    return (
        <FormControl fullWidth>
            {label && (
                <CustomInputLabel shrink htmlFor={id}>
                    {label}
                </CustomInputLabel>
            )}
            <Autocomplete
                id={id}
                options={options}
                loading={loading || externalLoading}
                autoComplete
                includeInputInList
                inputValue={inputValue}
                onInputChange={(_, newInputValue) => {
                    setInputValue(newInputValue);
                }}
                clearOnBlur={false}
                clearOnEscape={false}
                onError={(error) => {
                    console.log("ERROR", { error });
                }}
                value={currentValue}
                getOptionLabel={(option) => option.structured_formatting.main_text}
                getOptionKey={(option) => option.place_id}
                noOptionsText={notFound ? noResultsText : searchText}
                {...props}
                onChange={(_, newValue) => {
                    if (!newValue) {
                        // Handle empty value
                        clearSelection();
                        return;
                    }
                    const validatedAddress = newValue as PlaceType;

                    if (validatedAddress.place_id) {
                        getPlaceDetails(validatedAddress.place_id);
                    }

                    setCurrentValue(validatedAddress);
                }}
                renderInput={(params) => (
                    <TextField
                        autoFocus
                        required={required}
                        placeholder={placeholder}
                        helperText={helperText}
                        error={error}
                        inputRef={props.ref}
                        {...params}
                        id={id}
                        inputProps={{
                            ...params.inputProps,
                            autoComplete: "off"
                        }}
                        sx={{
                            marginBottom: 1,
                            ".MuiFormHelperText-root": {
                                position: "absolute",
                                bottom: -20,
                                marginLeft: 0,
                                fontSize: 11
                            }
                        }}
                    />
                )}
                renderOption={(props, option) => {
                    return (
                        <li {...props}>
                            <Grid container alignItems="center">
                                <Grid item sx={{ display: "flex", width: 44 }}>
                                    <LocationOnIcon sx={{ color: "text.secondary" }} />
                                </Grid>
                                <Grid item sx={{ width: "calc(100% - 44px)", wordWrap: "break-word" }}>
                                    <Box component="span" sx={{ fontWeight: "bold" }}>
                                        {option.structured_formatting.main_text}
                                    </Box>

                                    <Typography variant="body2" color="text.secondary">
                                        {option.structured_formatting.secondary_text}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </li>
                    );
                }}
            />
        </FormControl>
    );
};

export default GoogleAutocomplete;

export const CustomInputLabel = styled(InputLabel)(({ theme }) => ({
    color: theme.palette.text.primary,
    fontWeight: 600
}));

function loadScript(src: string, position: HTMLElement | null, id: string) {
    if (!position) {
        return;
    }

    const script = document.createElement("script");
    script.setAttribute("async", "");
    script.setAttribute("id", id);
    script.src = src;
    position.appendChild(script);
}
