import React from "react";
import { Theme } from "@mui/system";
import { styled } from "@mui/material/styles";
import { Button as MuiButton, ButtonProps as MuiButtonProps } from "@mui/material";
import { LoadingButton } from "@mui/lab";

interface Props {
    loading?: boolean;
    isSuccess?: boolean;
    error?: string;
    fitContent?: boolean;
    sx?: any;
}

const CustomButton = styled(LoadingButton, { skipSx: false })(
    ({
        theme,
        isSuccess,
        error,
        fitContent = true,
        sx
    }: { theme: Theme } & Props & Omit<MuiButtonProps, keyof Props>) => ({
        borderRadius: 25,
        textTransform: "none",
        boxShadow: "none",
        width: fitContent ? "fit-content" : "100%",
        ...(error && {
            borderColor: theme.palette.error.main,
            color: theme.palette.error.main,

            "&:hover": {
                background: theme.palette.error.main,
                color: theme.palette.background.default,
                borderColor: theme.palette.error.main
            }
        }),
        "&.Mui-disabled": isSuccess && {
            background: theme.palette.success.main,
            color: theme.palette.background.default
        },
        ...sx
    })
) as typeof MuiButton;

const Button = (props: Props & Omit<MuiButtonProps, keyof Props>) => {
    return <CustomButton disabled={props.loading || props.isSuccess || props.disabled} {...props} />;
};

export default Button;
