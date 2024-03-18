"use client";
import React from "react";
import { makeStyles } from "@mui/styles";
import {
  ListItemButton,
  ListItemText,
  ListItemButtonProps,
  Box,
} from "@mui/material";

interface Props {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
}

const useStyles = makeStyles((theme) => ({
  root: (props: Props & Omit<ListItemButtonProps, keyof Props>) => ({
    textTransform: "capitalize",
    padding: ".5em 1.5em",
    gap: "1em",
    border: `1px solid ${
      props.selected ? theme.palette.primary.main : theme.palette.text.disabled
    }`,
    borderRadius: ".5em",
    boxShadow: props.selected
      ? `0px 0px 5px 1px ${theme.palette.primary.main}`
      : "unset",
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
  }),
}));

const PaymentMethodCard = (
  props: Props & Omit<ListItemButtonProps, keyof Props>
) => {
  const { title, description, icon, ...other } = props;
  const classes = useStyles(props);
  return (
    <ListItemButton className={classes.root} {...other}>
      <Box className="cardIcon">{icon}</Box>
      <ListItemText primary={title} secondary={description} />
    </ListItemButton>
  );
};

export default PaymentMethodCard;
