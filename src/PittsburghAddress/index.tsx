import React, { useState } from "react";
import { InputLabel } from "@mui/material";
import { styled } from "@mui/system";
import GoogleAutocomplete, { AddressAutocompleteProps, AddressResult } from "../GoogleAutocomplete";

interface QueryAddressesArguments {
    streetNumber: string;
    street: string;
    exactMatch?: boolean;
    uses?: ResidencyUses;
    companyId?: string | null;
}
export interface AddressUnit {
    designator?: any;
    unit: string;
}

export interface Address {
    postalCode?: string | null;
    state?: string | null;
    city?: string | null;
    street?: string | null;
    streetNumber?: string | null;
    unit?: AddressUnit;
}

export interface QueryAddressResult {
    address: Address;
    /**
     *
     *
     * 0 = None
     *
     * 1 = Household
     *
     * 2 = Business
     *
     * 2147483647 = All
     */
    uses: ResidencyUses;
    /** @format int64 */
    zoneId: string | null;
}

export enum ResidencyUses {
    None = 0,
    Household = 1,
    Business = 2,
    All = 2147483647
}

interface PittsburghAddressProps extends AddressAutocompleteProps {
    onClearSelection: () => void;
    onRequestAddress: (
        args: QueryAddressesArguments,
        callback: {
            onSuccess: (data: { data: QueryAddressResult[] }) => void;
        }
    ) => void;
    onValidateAddress?: (addressResult: QueryAddressResult[], newValueSelected: AddressResult) => void;
    setError?: (error: { type: string; message: string }) => void;
    addressType?: ResidencyUses;
}

const PittsburghAddress: React.FC<PittsburghAddressProps> = ({
    onChange,
    onClearSelection,
    onRequestAddress,
    onValidateAddress = () => {},
    setError = () => {},
    addressType = ResidencyUses.All,
    externalLoading,
    ...props
}) => {
    const [loading, setLoading] = useState(false);

    const onValidate = (addressResult: QueryAddressResult[], newValueSelected: AddressResult) => {
        // Si el array está vacío se toma como 404
        if (!addressResult.length) {
            setError({
                type: "required",
                message: "address_not_found"
            });
            return;
        }

        // Chequear el uso de uses bitflag
        let filteredResults = [] as QueryAddressResult[];

        filteredResults = addressResult.filter((result) => {
            switch (addressType) {
                case ResidencyUses.Household:
                    // Filtrar solo direcciones de tipo 'Household'
                    return (result.uses & ResidencyUses.Household) !== 0;

                case ResidencyUses.Business:
                    // Filtrar solo direcciones de tipo 'Business'
                    return (result.uses & ResidencyUses.Business) !== 0;

                case ResidencyUses.All:
                    // Filtrar por todas las direcciones (Household o Business)
                    return (result.uses & (ResidencyUses.Household | ResidencyUses.Business)) !== 0;

                default:
                    // Si el addressType no coincide con ninguno, devuelves todos o ninguno según lo que necesites
                    return false;
            }
        });

        if (!filteredResults.length) {
            setError({
                type: "required",
                message: "address_not_valid_for_this_use"
            });
            return;
        }

        // Continues validation
        onValidateAddress(filteredResults, newValueSelected);
    };

    return (
        <GoogleAutocomplete
            {...props}
            externalLoading={loading || externalLoading}
            onChange={(newValue) => {
                setLoading(true);
                if (newValue) {
                    onClearSelection();

                    //  setNewValueSelected(newValue);
                    onRequestAddress(
                        {
                            street: newValue.street,
                            streetNumber: newValue.streetNumber
                            // uses: addressType
                        },
                        {
                            onSuccess: (data) => {
                                onValidate(data.data, newValue);
                                setLoading(false);
                            }
                        }
                    );
                }
            }}
        />
    );
};

export default PittsburghAddress;

export const CustomInputLabel = styled(InputLabel)(({ theme }) => ({
    color: theme.palette.text.primary,
    fontWeight: 600
}));
