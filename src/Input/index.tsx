import React from "react";
import { makeStyles } from "@mui/styles";
import { alpha } from "@mui/material/styles";
import {
  FormControl,
  InputLabel,
  InputBase,
  InputBaseProps,
} from "@mui/material";

interface Props {
  label?: string;
  variant?: "standard" | "filled" | "outlined";
}

const useStyles = makeStyles((theme) => ({
  root: (props: Props & Omit<InputBaseProps, keyof Props>) => ({
    "& .MuiFormLabel-root": {
      fontSize: "1.5em",
      color: theme.palette.text.primary,
    },
    "& .MuiInputBase-input": {
      marginTop: theme.spacing(4),
      borderRadius: 4,
      position: "relative",
      border: "1px solid",
      borderColor: theme.palette.background.light,
      fontSize: 16,
      width: "auto",
      padding: "10px 12px",
      transition: theme.transitions.create([
        "border-color",
        "background-color",
        "box-shadow",
      ]),
      "&:focus": {
        boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.primary.main,
      },
    },
  }),
}));

const Input = (props: Props & Omit<InputBaseProps, keyof Props>) => {
  const { label, id, variant = "standard", ...other } = props;
  const classes = useStyles(props);
  return (
    <FormControl className={classes.root} variant={variant}>
      <InputLabel shrink htmlFor={id}>
        {label}
      </InputLabel>
      <InputBase id={id} {...other} />
    </FormControl>
  );
};

export default Input;
