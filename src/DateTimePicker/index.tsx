import React, { forwardRef } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker as MuiDateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import Input, { TextfieldInputProps } from "../Input";

export interface Props {
	label?: string;
	name?: string;
	value?: string | null;
	onChange?: (name: string, value: string) => void;
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

const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

const CustomInputRef = forwardRef<HTMLInputElement, TextfieldInputProps>((props, ref) => {
	return <Input ref={ref} {...props} isDate />;
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
						onChange(name, formattedValue);
					}
				}}
				onError={(error: any) => console.log(error)}
				disabled={disabled}
				format={format}
				disableOpenPicker={readOnly}
				slotProps={{
					openPickerIcon: {
						sx: {
							fontSize: 16,
						},
					},
					textField: {
						variant,
						name,
						label,
						fullWidth: true,
						hiddenLabel: true,
						size,
						required,
						sx,
					},
				}}
				slots={{
					textField: CustomInputRef,
				}}
				{...props}
			/>
		</LocalizationProvider>
	);
};

export default DateTimePicker;
