import React from "react";
import { Theme } from "@mui/system";
import { styled } from "@mui/material/styles";
import {
  Button as MuiButton,
  CircularProgress,
  ButtonProps as MuiButtonProps,
} from "@mui/material";

interface Props {
  isLoading?: boolean;
  isSuccess?: boolean;
  error?: string;
  fitContent?: boolean;
  sx?: any;
}

const CustomButton = styled(MuiButton, { skipSx: false })(
  ({
    theme,
    isSuccess,
    error,
    fitContent,
    sx
  }: { theme: Theme } & Props & Omit<MuiButtonProps, keyof Props>) => ({
    borderRadius: 25,
    textTransform: "none",
    boxShadow: "none",
    width: fitContent ? "fit-content" : "100%",
    ...(error && { background: theme.palette.error.main }),
    "&.Mui-disabled": isSuccess && {
      background: theme.palette.success.main,
      color: theme.palette.background.default,
    },
    ...sx,
  })
) as typeof MuiButton;

const Button = (props: Props & Omit<MuiButtonProps, keyof Props>) => {
  return (
    <CustomButton
      disabled={props.isLoading || props.isSuccess || props.disabled}
      {...props}
    >
      {props.isLoading ? (
        <CircularProgress size={25} />
      ) : props.error ? (
        props.error
      ) : (
        props.children
      )}
    </CustomButton>
  );
};

export default Button;
