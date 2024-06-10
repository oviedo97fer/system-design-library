import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker as MuiDateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/plugin/utc";

interface Props {
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
							: newValue.utc().format(format);
						onChange(name, formattedValue);
					}
				}}
				onError={(error: any) => console.log(error)}
				disabled={disabled}
				format={format}
				disableOpenPicker={readOnly}
				slotProps={{
					textField: {
						variant,
						name,
						label,
						fullWidth: true,
						hiddenLabel: true,
						size,
						required,
						// readOnly,
						sx,
					},
				}}
				{...props}
			/>
		</LocalizationProvider>
	);
};

export default DateTimePicker;
