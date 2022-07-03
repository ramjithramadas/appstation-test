import { makeStyles, styled, TextField as MuiTextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { Close, FileIcon } from "../../utils/svgs";

interface TextFieldProps {
    id?: string;
    type: string;
    name: string;
    value?: string | number;
    placeholder?: string;
    fullWidth?: boolean;
    multiline?: boolean;
    rows?: number;
    errors?: {
        message?: string;
        type?: string;
    };
    disabled?: boolean;
    register?: any;
    upload?: boolean;
    removeFile?: any;
    sx?: any;
}

const TextField = ({
    id,
    type,
    name,
    fullWidth,
    errors,
    register,
    upload,
    removeFile,
    disabled,
    sx,
    ...rest
}: TextFieldProps) => {
    //   console.log(errors);

    return (
        <MuiTextField
            id={id}
            label=""
            type={type}
            name={name}
            variant="outlined"
            fullWidth={fullWidth ? true : false}
            InputLabelProps={{
                style: {
                    paddingLeft: 4,
                    paddingRight: 4,
                },
            }}
            disabled={disabled ? true : false}
            inputProps={{
                style: {
                    height: 44,
                    width: 276,
                    padding: "0 14px",
                },
            }}
            sx={sx}
            {...(upload && {
                InputProps: {
                    startAdornment: (
                        <InputAdornment position="start">
                            {FileIcon}
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment position="start">
                            <Close close={removeFile} />
                        </InputAdornment>
                    ),
                },
            })}
            error={errors?.type ? true : false}
            {...register}
            {...rest}
        />
    );
};

export default TextField;
