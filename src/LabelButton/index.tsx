import React from "react";
import { styled, Theme, lighten } from "@mui/system";
import { ButtonBase, Stack, Typography } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { ButtonBaseProps } from "@mui/material";

interface LabelButtonProps extends Omit<ButtonBaseProps, "onClick"> {
    onClick: () => void;
    buttonText?: string;
    disabled?: boolean;
}

const CustomLabelButton = styled(ButtonBase, {
    shouldForwardProp: (prop) => prop !== "onClick" && prop !== "buttonText"
})<LabelButtonProps>(({ theme, disabled }: { theme: Theme } & LabelButtonProps) => ({
    width: "fit-content",
    border: "none",
    outline: "none",
    padding: theme.spacing(0.8),
    borderRadius: theme.shape.borderRadius,
    "& .iconContainer": {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: lighten(disabled ? theme.palette.disabled.main : theme.palette.primary.main, 0.75),
        borderRadius: theme.shape.borderRadius,
        padding: theme.spacing(1),
        color: disabled ? theme.palette.disabled.main : theme.palette.primary.main
    },
    "& .text": {
        paddingRight: theme.spacing(1),
        color: disabled ? theme.palette.disabled.main : theme.palette.primary.main
    }
}));

const LabelButton: React.FC<LabelButtonProps> = ({ onClick, buttonText, disabled = false, ...otherProps }) => {
    return (
        <CustomLabelButton onClick={onClick} disabled={disabled} {...otherProps}>
            <Stack direction="row" spacing={2} alignItems="center">
                <Stack className="iconContainer">
                    <AddOutlinedIcon fontSize="small" />
                </Stack>
                <Typography variant="body2" className="text">
                    {buttonText}
                </Typography>
            </Stack>
        </CustomLabelButton>
    );
};

export default LabelButton;
