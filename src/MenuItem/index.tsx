import React from "react";
import { styled, Theme } from "@mui/system";
import { MenuItem as MuiMenuItem, ListItemText, MenuItemProps as MuiMenuItemProps } from "@mui/material";

interface Props {
	text?: string;
	icon?: React.ReactNode;
	withBorder?: boolean;
}

const CustomMenuItem = styled(MuiMenuItem, {
	skipSx: false,
	shouldForwardProp: (prop) => prop !== "withBorder"
})<Props>(({ theme, withBorder, selected }: { theme: Theme } & Props & Omit<MuiMenuItemProps, keyof Props>) => ({
	textTransform: "capitalize",
	boxShadow: "none",
	padding: "1.5em 0",
	display: "flex",
	gap: ".5em",
	color: selected ? "#FFF" : "#000",
	border: withBorder ? `1px solid ${theme.palette.text.disabled}` : "unset",
	borderRadius: withBorder ? ".5em" : "unset",
	flexDirection: "column",
	"&.Mui-selected": {
		background: theme.palette.primary.main
	},
	"&.Mui-selected:hover": {
		background: theme.palette.primary.main
	}
})) as typeof MuiMenuItem;

const MenuItem = (props: Props & Omit<MuiMenuItemProps, keyof Props>) => {
	const { text, icon, ...other } = props;
	return (
		<CustomMenuItem {...other}>
			{icon}
			<ListItemText>{text}</ListItemText>
		</CustomMenuItem>
	);
};

export default MenuItem;
