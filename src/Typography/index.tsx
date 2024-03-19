import React from "react";
import { styled, Theme } from "@mui/system";
import {
  Typography as MuiTypography,
  TypographyProps as MuiTypographyProps,
} from "@mui/material";

interface Props {
  text?: string;
  translationFunction?: Function;
  icon?: React.ReactNode;
  iconPosition?: "start" | "end";
}

const CustomTypography = styled(MuiTypography)<Props>(
  ({ theme }: { theme: Theme }) => ({
    color: theme.palette.text.primary,
  })
) as typeof MuiTypography;

const Typography = (props: Props & Omit<MuiTypographyProps, keyof Props>) => {
  const {
    children,
    text,
    translationFunction = (text?: string) => text,
    iconPosition = "start",
    icon,
    ...other
  } = props;
  return (
    <CustomTypography {...other}>
      {iconPosition === "start" && icon}
      {translationFunction(text)}
      {iconPosition === "end" && icon}
    </CustomTypography>
  );
};

export default Typography;
