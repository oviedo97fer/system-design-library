import React, { forwardRef } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
    TimePicker as MuiTimePicker,
    LocalizationProvider,
    TimePickerProps,
    PickerValidDate
} from "@mui/x-date-pickers";
import * as dayjs from "dayjs";
import { Dayjs } from "dayjs";
import "dayjs/plugin/utc";
import { CustomInput, TextfieldInputProps } from "../Input";
import utc from "dayjs/plugin/utc";
import { styled } from "@mui/system";
import { ExtendButtonBase, MenuItem, MenuItemTypeMap } from "@mui/material";

export type TimePickerBaseProps = TimePickerProps<PickerValidDate, boolean>;

export interface Props extends TimePickerBaseProps {
    label?: string;
    name?: string;
    onChangeDate?: (value: string) => void;
    language?: string;
    disabled?: boolean;
    variant?: "standard" | "outlined" | "filled";
    size?: "small" | "medium";
    required?: boolean;
    readOnly?: boolean;
    format?: string;
    sx?: object;
    withoutFormat?: boolean;
    [key: string]: any;
}

dayjs.extend(utc);

const CustomInputRef = forwardRef<HTMLInputElement, TextfieldInputProps>((props, ref) => {
    return <CustomInput ref={ref} {...props} isDate />;
});

const CustomDigitalClockItem = styled(MenuItem, { skipSx: false })<ExtendButtonBase<MenuItemTypeMap<{}, "li">>>(({
    sx
}) => {
    return {
        ...sx
    };
});

const TimePicker: React.FC<Props> = ({
    label = "",
    name = "",
    value = "",
    onChangeDate = () => {},
    language = "en",
    disabled = false,
    variant = "outlined",
    size,
    required,
    readOnly = false,
    format = "LTS",
    sx,
    withoutFormat = false,
    ...props
}) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={language}>
            <MuiTimePicker
                value={value ? dayjs.utc(value) : null}
                onChange={(newValue: Dayjs | null) => {
                    if (newValue) {
                        const formattedValue = withoutFormat
                            ? newValue.format("YYYY-MM-DDTHH:mm:ss.SSS[Z]")
                            : newValue.format(format);
                        onChangeDate(formattedValue);
                    }
                }}
                onError={(error: any) => console.log(error)}
                disabled={disabled}
                format={format}
                disableOpenPicker={readOnly}
                slotProps={{
                    openPickerIcon: {
                        sx: {
                            fontSize: 16
                        }
                    },
                    textField: {
                        variant,
                        name,
                        fullWidth: true,
                        hiddenLabel: true,
                        size,
                        required,
                        label,
                        sx
                    }
                }}
                slots={{
                    textField: CustomInputRef,
                    digitalClockItem: CustomDigitalClockItem
                }}
                {...props}
            />
        </LocalizationProvider>
    );
};

export default TimePicker;
