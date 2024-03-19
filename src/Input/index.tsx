import React from "react";
import { styled, Theme } from "@mui/system";
import { alpha } from "@mui/material/styles";
import {
  FormControl,
  InputLabel,
  InputBase,
  InputBaseProps,
} from "@mui/material";

interface Props {
  label?: string;
}
interface MyTheme extends Theme {
  transitions: {
    create: (props: string | string[]) => string;
  };
}
const CustomInput = styled(FormControl)<Props>(
  ({ theme }: { theme: Theme } & Props) => ({
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
      transition: (theme as MyTheme).transitions.create([
        "border-color",
        "background-color",
        "box-shadow",
      ]),
      "&:focus": {
        boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.primary.main,
      },
    },
  })
);

const Input = (props: Props & Omit<InputBaseProps, keyof Props>) => {
  const { label, id, ...other } = props;
  return (
    <CustomInput variant="standard">
      <InputLabel shrink htmlFor={id}>
        {label}
      </InputLabel>
      <InputBase id={id} {...other} />
    </CustomInput>
  );
};

export default Input;
