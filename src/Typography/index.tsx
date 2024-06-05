import React from "react";
import { styled } from "@mui/system";
import { Typography as MuiTypography, TypographyProps as MuiTypographyProps } from "@mui/material";

interface Props {
    translationFunction?: Function;
    icon?: React.ReactNode;
    iconPosition?: "start" | "end";
}

const CustomTypography = styled(MuiTypography, { skipSx: false })<Props>(() => ({})) as typeof MuiTypography;

const Typography = (props: Props & Omit<MuiTypographyProps, keyof Props>) => {
    const { children, translationFunction = (text?: string) => text, iconPosition = "start", icon, ...other } = props;
    return (
        <CustomTypography gutterBottom {...other}>
            {iconPosition === "start" && icon}
            {children}
            {iconPosition === "end" && icon}
        </CustomTypography>
    );
};

export default Typography;
