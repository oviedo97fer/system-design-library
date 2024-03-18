import React from "react";
import { makeStyles } from "@mui/styles";
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

const useStyles = makeStyles((theme) => ({
  root: (props: Props & Omit<MuiTypographyProps, keyof Props>) => ({
    color: theme.palette.text.primary,
  }),
}));

const Typography = (props: Props & Omit<MuiTypographyProps, keyof Props>) => {
  const {
    children,
    text,
    translationFunction,
    iconPosition = "start",
    icon,
    ...other
  } = props;
  const classes = useStyles(props);
  const t = (text?: string) => text;
  return (
    <MuiTypography className={classes.root} {...other}>
      {iconPosition === "start" && icon}
      {t(text)}
      {iconPosition === "end" && icon}
    </MuiTypography>
  );
};

export default Typography;
