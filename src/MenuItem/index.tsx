"use client";
import React from "react";
import { makeStyles } from "@mui/styles";
import {
  MenuItem as MuiMenuItem,
  ListItemText,
  MenuItemProps as MuiMenuItemProps,
} from "@mui/material";

interface Props {
  text?: string;
  icon?: React.ReactNode;
  withBorder?: boolean;
}

const useStyles = makeStyles((theme) => ({
  root: (props: Props & Omit<MuiMenuItemProps, keyof Props>) => ({
    textTransform: "capitalize",
    boxShadow: "none",
    padding: "1.5em 0",
    display: "flex",
    gap: ".5em",
    color: props.selected ? "#FFF" : "#000",
    border: props.withBorder
      ? `1px solid ${theme.palette.text.disabled}`
      : "unset",
    borderRadius: props.withBorder ? ".5em" : "unset",
    flexDirection: "column",
    "&.Mui-selected": {
      background: theme.palette.primary.main,
    },
    "&.Mui-selected:hover": {
      background: theme.palette.primary.main,
    },
  }),
}));

const MenuItem = (props: Props & Omit<MuiMenuItemProps, keyof Props>) => {
  const { text, icon, ...other } = props;
  const classes = useStyles(props);
  return (
    <MuiMenuItem className={classes.root} {...other}>
      {icon}
      <ListItemText>{text}</ListItemText>
    </MuiMenuItem>
  );
};

export default MenuItem;
