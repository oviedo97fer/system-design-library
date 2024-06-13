import React, { useState, useEffect, useMemo } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { debounce } from "@mui/material/utils";
import { CircularProgress } from "@mui/material";
import Input from "../Input";

interface AutocompleteFetchingProps {
	id: string;
	label: string;
	placeholder: string;
	fetchOptions: (query: string) => Promise<OptionType[]>;
	onOptionSelected?: (option: OptionType | null) => void;
}

interface OptionType {
	label: string;
	[key: string]: any;
}

const AutocompleteFetching: React.FC<AutocompleteFetchingProps> = ({
	id,
	label,
	placeholder,
	fetchOptions,
	onOptionSelected,
}) => {
	const [inputValue, setInputValue] = useState<string>("");
	const [options, setOptions] = useState<OptionType[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	const debouncedFetch = useMemo(
		() =>
			debounce((query: string, callback: (results: OptionType[]) => void) => {
				fetchOptions(query).then(callback);
			}, 400),
		[fetchOptions]
	);

	useEffect(() => {
		if (inputValue === "") {
			setOptions([]);
			return;
		}

		setLoading(true);
		debouncedFetch(inputValue, (results: OptionType[]) => {
			setLoading(false);
			setOptions(results);
		});
	}, [inputValue, debouncedFetch]);

	return (
		<Autocomplete
			id={id}
			options={options}
			loading={loading}
			onInputChange={(_, newInputValue) => {
				setInputValue(newInputValue);
			}}
			onChange={(_, newValue) => {
				if (onOptionSelected) {
					onOptionSelected(newValue);
				}
			}}
			getOptionLabel={(option: OptionType) => option.label}
			renderInput={(params) => (
				<Input
					{...params}
					label={label}
					placeholder={placeholder}
					variant="outlined"
					InputProps={{
						...params.InputProps,
						endAdornment: (
							<>
								{loading ? <CircularProgress color="inherit" size={20} /> : null}
								{params.InputProps.endAdornment}
							</>
						),
					}}
				/>
			)}
		/>
	);
};

export default AutocompleteFetching;
