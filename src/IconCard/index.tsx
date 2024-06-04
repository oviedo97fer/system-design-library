import React from "react";
import { styled, Theme } from "@mui/system";
import { ListItemButton, ListItemText, ListItemButtonProps, Box } from "@mui/material";

interface Props {
	title?: string;
	description?: string;
	icon?: React.ReactNode;
}

const CustomCard = styled(ListItemButton, {
	skipSx: false,
})<Props>(({ theme, selected }: { theme: Theme } & Props & Omit<ListItemButtonProps, keyof Props>) => ({
	textTransform: "capitalize",
	padding: ".5em 1.5em",
	gap: "1em",
	border: `1px solid ${selected ? theme.palette.primary.main : theme.palette.text.disabled}`,
	borderRadius: ".5em",
	boxShadow: selected ? `0px 0px 5px 1px ${theme.palette.primary.main}` : "unset",
	"&.Mui-selected": {
		background: "#FFF",
	},
	"&.Mui-selected:hover": {
		"& .cardIcon": { background: "unset" },
	},
	"& .cardIcon": {
		borderRadius: ".5em",
		padding: ".7em",
		transition: ".3s ease",
		background: theme.palette.background.light,
	},
})) as typeof ListItemButton;

const IconCard = (props: Props & Omit<ListItemButtonProps, keyof Props>) => {
	const { title, description, icon, ...other } = props;
	return (
		<CustomCard {...other}>
			<Box className="cardIcon">{icon}</Box>
			<ListItemText primary={title} secondary={description} color="primary" />
		</CustomCard>
	);
};

export default IconCard;
