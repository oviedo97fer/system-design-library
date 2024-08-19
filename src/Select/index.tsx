import React from "react";
import { styled } from "@mui/system";
import { SelectProps, Select as MuiSelect, MenuItem } from "@mui/material";

interface Option {
    label?: string;
    value?: number;
}
interface Props {
    options: Array<Option>;
    label?: string;
    holderLabel?: string;
    noOptionsLabel?: string;
    sx?: any;
}

const CustomSelect = styled(MuiSelect, { skipSx: false })<Props>(() => ({}));

const Select = (props: Props & Omit<SelectProps, keyof Props>) => {
    const { label, id, fullWidth, options, holderLabel, noOptionsLabel, sx, ...other } = props;

    return (
        <CustomSelect
            //  input={<Input label={label} />}
            fullWidth={fullWidth}
            options={options}
            displayEmpty
            renderValue={!other.value ? () => holderLabel : undefined}
            {...other}
        >
            {options.map(({ value, label }, idx) => (
                <MenuItem key={idx} value={value}>
                    {label}
                </MenuItem>
            ))}
            {options.length === 0 && <MenuItem disabled>{noOptionsLabel}</MenuItem>}
        </CustomSelect>
    );
};

export default Select;
