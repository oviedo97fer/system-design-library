import React from "react";
import { styled, Theme } from "@mui/system";
import { alpha } from "@mui/material/styles";
import { FormControl, InputLabel, InputAdornment, FormHelperText } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import MuiTextField, { TextFieldProps } from "@mui/material/TextField";

interface Props {
    label?: string;
    isPassword?: boolean;
    helperText?: string;
    error?: boolean;
    sx?: any;
    InputProps?: any;
    isDate?: boolean;
}
interface MyTheme extends Theme {
    transitions: {
        create: (props: string | string[]) => string;
    };
}
export const CustomInput = styled(MuiTextField, { skipSx: false })<Props>(({ theme }: { theme: Theme } & Props) => ({
    "label + &": {
        marginTop: theme.spacing(3)
    },
    "& .MuiOutlinedInput-root": {
        transition: (theme as MyTheme).transitions.create(["border-color", "background-color", "box-shadow"]),
        backgroundColor: theme.palette.mode === "light" ? "#ffffff" : "#1A2027",
        fontSize: 14,
        "& fieldset": {
            borderColor: theme.palette.mode === "light" ? "#c0c2c5" : "#2D3843"
        },
        "&:hover fieldset": {
            borderColor: "#B2BAC2"
        },
        "&.Mui-focused fieldset": {
            boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
            borderColor: theme.palette.primary.main
        }
    },
    "& .MuiInputBase-input": {
        borderRadius: 4,
        position: "relative",

        padding: "10px 10px 7px"
    },
    "& .Mui-disabled": {
        backgroundColor: "#eaeaf1"
    }
}));

export type TextfieldInputProps = Props & Omit<TextFieldProps, keyof Props>;

const Input = (props: TextfieldInputProps) => {
    const { label, id, type, isPassword, fullWidth, helperText, error, sx, ...other } = props;

    console.log({ other });
    const [inputType, setInputType] = React.useState(isPassword ? "password" : props.type);

    const IconEndAdornment = React.memo(() => (
        <InputAdornment
            position="end"
            data-testid="input-adornment"
            onClick={() => setInputType(inputType === "password" ? "text" : "password")}
            sx={{
                position: "absolute",
                right: 15
            }}
        >
            {inputType === "password" ? <VisibilityOffIcon /> : <VisibilityIcon />}
        </InputAdornment>
    ));

    return (
        <FormControl variant="standard" fullWidth={fullWidth} error={error} sx={sx}>
            <InputLabel shrink htmlFor={id}>
                {label}
            </InputLabel>
            <CustomInput
                id={id}
                type={inputType}
                InputProps={{
                    ...(isPassword && {
                        endAdornment: <IconEndAdornment />
                    }),
                    ...other.InputProps
                }}
                {...other}
            />
            <FormHelperText>{helperText}</FormHelperText>
        </FormControl>
    );
};

export default Input;
