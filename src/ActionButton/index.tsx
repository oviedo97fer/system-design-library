import React from "react";
import { styled, Theme, lighten } from "@mui/system";
import { ButtonBase, ButtonBaseProps } from "@mui/material";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";

interface ActionButtonProps extends Omit<ButtonBaseProps, "onClick"> {
    onClick: () => void;
    helperText?: string;
    disabled?: boolean;
    icon: React.ReactNode;
    color?: "primary" | "error";
    variant?: "outlined" | "contained";
    withouthTooltip?: boolean;
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

const CustomActionButton = styled(ButtonBase, {
    shouldForwardProp: (prop) =>
        prop !== "withouthTooltip" &&
        prop !== "color" &&
        prop !== "contained" &&
        prop !== "icon" &&
        prop !== "onClick" &&
        prop !== "helperText" &&
        prop !== "variant"
})<ActionButtonProps>(({
    theme,
    disabled,
    variant = "contained",
    color = "primary"
}: { theme: Theme } & ActionButtonProps) => {
    const backgroundColor = variant === "contained" ? theme.palette[color].main : theme.palette.common.white;
    const contrastColor =
        variant === "contained" ? theme.palette.getContrastText(backgroundColor) : theme.palette[color].main;

    return {
        width: "fit-content",
        ...(variant === "outlined"
            ? { border: `1px solid ${theme.palette[color].main}` }
            : { boxShadow: `0px 0px 2px 0px ${theme.palette.divider}` }),
        outline: "none",
        padding: theme.spacing(2),
        borderRadius: theme.shape.borderRadius,
        opacity: disabled ? 0.5 : 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "background-color 0.3s ease",
        backgroundColor: disabled ? lighten(backgroundColor, 0.75) : "transparent",
        "&:hover": {
            backgroundColor: backgroundColor,
            color: contrastColor
        }
    };
});

const ActionButton: React.FC<ActionButtonProps> = ({
    onClick,
    helperText,
    disabled = false,
    withouthTooltip = false,
    ...otherProps
}) => {
    return withouthTooltip ? (
        <CustomActionButton onClick={onClick} disabled={disabled} {...otherProps}>
            {otherProps.icon}
        </CustomActionButton>
    ) : (
        <LightTooltip title={helperText} arrow placement="top">
            <CustomActionButton onClick={onClick} disabled={disabled} {...otherProps}>
                {otherProps.icon}
            </CustomActionButton>
        </LightTooltip>
    );
};

export default ActionButton;
