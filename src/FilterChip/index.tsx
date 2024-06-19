import React from "react";
import { Stack, Typography, IconButton, Chip, ListItem, Checkbox } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export interface Filter {
	id: string;
	name: string;
	operation: string;
	value: string;
	isActive: boolean;
}

interface FilterChipProps {
	filter: Filter;
	handleDelete: (id: string) => void;
	handleClick: (event: React.MouseEvent<HTMLButtonElement>, filter: Filter) => void;
	handleCheckbox: (id: string) => void;
	showCheckBox?: boolean;
	showDelete?: boolean;
	isEditable?: boolean;
}

const FilterChip: React.FC<FilterChipProps> = ({
	filter,
	handleDelete,
	handleClick,
	handleCheckbox,
	showCheckBox = true,
	showDelete = true,
	isEditable = true
}) => {
	const onDelete = () => handleDelete(filter.id);
	const onCheckboxChange = () => handleCheckbox(filter.id);

	return (
		<ListItem
			sx={{
				width: "fit-content",
				padding: 0,
				marginRight: 1
			}}
		>
			<Chip
				sx={{
					height: "fit-content"
				}}
				label={
					<Stack flexDirection="row" flexWrap="wrap" sx={{ gap: "0 5px" }}>
						{showCheckBox && (
							<Checkbox checked={filter.isActive} onClick={onCheckboxChange} sx={{ p: 0 }} />
						)}
						<Typography alignItems="center" display="flex">
							{filter.name}
						</Typography>
						<Typography alignItems="center" display="flex" color="text.disabled">
							{" " + filter.operation}
						</Typography>
						<Typography alignItems="center" display="flex">
							{filter.value}
						</Typography>
						{isEditable && (
							<IconButton size="small" onClick={(event) => handleClick(event, filter)}>
								<KeyboardArrowDownIcon />
							</IconButton>
						)}
					</Stack>
				}
				onDelete={showDelete ? onDelete : undefined}
			/>
		</ListItem>
	);
};

export default FilterChip;
