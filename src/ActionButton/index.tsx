import React from "react";
import { styled, Theme, lighten } from "@mui/system";
import { LoadingButton, LoadingButtonProps } from "@mui/lab";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";

interface Props extends Omit<LoadingButtonProps, "onClick"> {
    loading?: boolean;
    isSuccess?: boolean;
    error?: string;
    fitContent?: boolean;
    sx?: any;
    onClick: () => void;
    helperText?: string;
    color?: "primary" | "error";
    variant?: "outlined" | "contained";
    withouthTooltip?: boolean;
    icon?: React.ReactNode;
}

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }: { theme: Theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
        color: theme.palette.common.white,
        "&::before": {
            backgroundColor: theme.palette.common.white,
            border: `1px solid ${theme.palette.divider}`
        }
    },
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.white,
        fontSize: 11,
        border: `1px solid ${theme.palette.divider}`,
        color: theme.palette.text.secondary
    }
}));

const CustomButton = styled(LoadingButton, {
    shouldForwardProp: (prop) =>
        prop !== "fitContent" &&
        prop !== "isSuccess" &&
        prop !== "withouthTooltip" &&
        prop !== "error" &&
        prop !== "helperText" &&
        prop !== "icon"
})<Props>(({
    theme,
    isSuccess,
    error,
    fitContent = true,
    disabled,
    variant = "contained",
    color = "primary",
    sx
}: { theme: Theme } & Props) => {
    const backgroundColor = variant === "contained" ? theme.palette[color].main : theme.palette.common.white;
    const contrastColor =
        variant === "contained" ? theme.palette.getContrastText(backgroundColor) : theme.palette[color].main;

    return {
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
        padding: theme.spacing(2),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "background-color 0.3s ease",
        backgroundColor: disabled ? lighten(backgroundColor, 0.75) : "transparent",
        "&:hover": {
            backgroundColor: backgroundColor,
            color: contrastColor
        },
        ...sx
    };
});

const Button: React.FC<Props> = ({
    onClick,
    helperText,
    disabled = false,
    withouthTooltip = false,
    loading,
    isSuccess,
    error,
    fitContent,
    sx,
    icon,
    ...otherProps
}) => {
    const handleClick = () => {
        if (!disabled && !loading && onClick) {
            onClick();
        }
    };

    return withouthTooltip ? (
        <CustomButton
            onClick={handleClick}
            disabled={disabled || loading || isSuccess}
            loading={loading}
            {...otherProps}
            sx={sx}
        >
            {icon}
        </CustomButton>
    ) : (
        <LightTooltip title={helperText} arrow placement="top">
            <CustomButton
                onClick={handleClick}
                disabled={disabled || loading || isSuccess}
                loading={loading}
                {...otherProps}
                sx={sx}
            >
                {icon}
            </CustomButton>
        </LightTooltip>
    );
};

export default Button;
