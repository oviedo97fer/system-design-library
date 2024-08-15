import React, { forwardRef } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
    DatePicker as MuiDatePicker,
    LocalizationProvider,
    DatePickerProps,
    PickerValidDate,
    PickersDay
} from "@mui/x-date-pickers";
import * as dayjs from "dayjs";
import { Dayjs } from "dayjs";
import "dayjs/plugin/utc";
import { CustomInput, TextfieldInputProps } from "../Input";
import utc from "dayjs/plugin/utc";
import { PickersDayProps } from "@mui/lab";
import { pickersDayClasses } from "@mui/x-date-pickers";
import { styled } from "@mui/system";

export interface DatePickerBaseProps extends DatePickerProps<PickerValidDate, boolean> {}

export interface Props extends DatePickerBaseProps {
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
    // shouldDisableDate?: () => boolean;
    [key: string]: any;
}


dayjs.extend(utc);

const CustomInputRef = forwardRef<HTMLInputElement, TextfieldInputProps>((props, ref) => {
    return <CustomInput ref={ref} {...props} />;
});

const CustomPickerDay = styled(PickersDay, { skipSx: false })<PickersDayProps<dayjs.Dayjs>>(({ sx }) => ({
    ...sx,
    [`&.${pickersDayClasses.today}`]: {
        opacity: 0.8,
        backgroundColor: "secondary.main"
    },
    [`&.${pickersDayClasses.disabled}`]: {
        opacity: 0.5,
        backgroundColor: "disabled.secondary"
    }
})) as typeof PickersDay;

const DatePicker: React.FC<Props> = ({
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
    format = "L",
    sx,
    withoutFormat = false,
    ...props
}) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={language}>
            <MuiDatePicker
                value={value ? dayjs.utc(value) : null}
                onChange={(newValue: Dayjs | null) => {
                    if (newValue) {
                        const formattedValue = withoutFormat
                            ? newValue.format("YYYY-MM-DDTHH:mm:ss.SSS[Z]")
                            : newValue.format(format);
                        onChangeDate(newValue.format(formattedValue));
                    }
                }}
                disableHighlightToday
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
                showDaysOutsideCurrentMonth
                slots={{
                    textField: CustomInputRef,
                    day: CustomPickerDay
                }}
                sx={{
                    "& .Mui-disabled": {
                        border: "1px solid red"
                    }
                }}
                {...props}
            />
        </LocalizationProvider>
    );
};

export default DatePicker;
