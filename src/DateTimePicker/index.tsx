import React, { forwardRef } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker as MuiDateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import * as dayjs from "dayjs";
import { Dayjs } from "dayjs";
import "dayjs/plugin/utc";
import { CustomInput, TextfieldInputProps } from "../Input";
import utc from 'dayjs/plugin/utc';

export interface Props {
	label?: string;
	name?: string;
	value?: string | null;
	onChange?: (value: string) => void;
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

const DateTimePicker: React.FC<Props> = ({
	label = "",
	name = "",
	value = "",
	onChange = () => {},
	language = "en",
	disabled = false,
	variant = "outlined",
	size,
	required,
	readOnly = false,
	format = "L LTS",
	sx,
	withoutFormat = false,
	...props
}) => {
	return (
		<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={language}>
			<MuiDateTimePicker
				value={value ? dayjs.utc(value) : null}
				onChange={(newValue: Dayjs | null) => {
					if (newValue) {
						const formattedValue = withoutFormat
							? newValue.format("YYYY-MM-DDTHH:mm:ss.SSS[Z]")
							: newValue.format(format);
						onChange(formattedValue);
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
					textField: CustomInputRef
				}}
				{...props}
			/>
		</LocalizationProvider>
	);
};

export default DateTimePicker;
