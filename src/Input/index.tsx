import React from "react";
import { styled, Theme } from "@mui/system";
import { alpha } from "@mui/material/styles";
import {
  FormControl,
  InputLabel,
  InputBase,
  InputBaseProps,
  InputAdornment,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

interface Props {
  label?: string;
  isPassword?: boolean;
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
      borderColor: theme.palette.background.gray,
      fontSize: 16,
      padding: "10px 35px 10px 12px",
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
    "& .MuiInputAdornment-positionEnd": {
      position: "absolute",
      right: ".5rem",
      bottom: "1.5rem",
      cursor: "pointer",
    },
  })
);

const Input = (props: Props & Omit<InputBaseProps, keyof Props>) => {
  const { label, id, type, isPassword, fullWidth, ...other } = props;
  const [inputType, setInputType] = React.useState(
    isPassword ? "password" : props.type
  );

  const IconEndAdornment = React.memo(() => (
    <InputAdornment
      position="end"
      data-testid="input-adornment"
      onClick={() =>
        setInputType(inputType === "password" ? "text" : "password")
      }
    >
      {inputType === "password" ? <VisibilityOffIcon /> : <VisibilityIcon />}
    </InputAdornment>
  ));

  return (
    <CustomInput variant="standard" fullWidth={fullWidth}>
      <InputLabel shrink htmlFor={id}>
        {label}
      </InputLabel>
      <InputBase
        id={id}
        type={inputType}
        {...other}
        {...(isPassword && {
          endAdornment: <IconEndAdornment />,
        })}
      />
    </CustomInput>
  );
};

export default Input;
