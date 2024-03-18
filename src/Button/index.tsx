import React from "react";
import { makeStyles } from "@mui/styles";
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
  CircularProgress,
} from "@mui/material";

interface Props {
  isLoading?: boolean;
  isSuccess?: boolean;
  error?: string;
}

const useStyles = makeStyles((theme) => ({
  root: (props: Props & Omit<MuiButtonProps, keyof Props>) => ({
    borderRadius: 25,
    textTransform: "none",
    boxShadow: "none",
    background: props.error
      ? theme.palette.error.main
      : props.style?.background,
    "&.Mui-disabled": {
      background: props.isSuccess
        ? theme.palette.success.main
        : props.style?.background,
      color: props.isSuccess
        ? theme.palette.background.default
        : props.style?.color,
    },
  }),
}));

const Button = (props: Props & Omit<MuiButtonProps, keyof Props>) => {
  const { error, children, isLoading, isSuccess, disabled, ...other } = props;
  const classes = useStyles(props);
  return (
    <MuiButton
      className={classes.root}
      disabled={isLoading || isSuccess || disabled}
      {...other}
    >
      {isLoading ? <CircularProgress size={25} /> : error ? error : children}
    </MuiButton>
  );
};

export default Button;
