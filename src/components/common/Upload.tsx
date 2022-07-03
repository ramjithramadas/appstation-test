import { Box, Button } from "@mui/material";
import { useRef } from "react";
import React from "react";
import TextField from "./TextField";
import { Close } from "../../utils/svgs";

interface UploadProps {
    value?: string;
    name: string;
    placeholder?: string;
    label?: string;
    fullWidth?: boolean;
    accept?: string;
    register?: any;
    getFile?: (file: any) => void;
    removeFile?: (file?: any) => void;
    errors?: {
        message?: string;
        type?: string;
    };
}

export default function Upload({
    value,
    name,
    placeholder,
    label,
    fullWidth,
    register,
    errors,
    accept = "image/*",
    removeFile,
    getFile,
}: UploadProps) {
    const inputRef: any = useRef(null);
    const handleOpen = () => {
        inputRef?.current?.click();
    };
    // console.log(register);
    
    return (
        <Box display="flex" sx={{ height: 44, width: 300 }}>
            <TextField
                type="text"
                value={value}
                placeholder={placeholder}
                name={name}
                errors={errors}
                fullWidth={fullWidth ? true : false}
                upload={Boolean(value)}
                removeFile={removeFile}
                register={register}
                sx={{
                    ".MuiOutlinedInput-root": {
                        height: "100%",
                        borderRadius: "unset",
                        svg: { cursor: "pointer" },
                    },
                    ...(Boolean(value)
                        ? { input: { padding: "0 !important" } }
                        : undefined),
                }}
            />
            <input
                accept={accept}
                hidden
                id="raised-button-file"
                type="file"
                onChange={getFile}
                ref={inputRef}
            />
            <label htmlFor="raised-button-file">
                <Button
                    component="button"
                    onClick={handleOpen}
                    sx={{
                        backgroundColor: "secondary.main",
                        color: "common.white",
                        height: "100%",
                        fontSize: 14,
                        textTransform: "none",
                        transition: "0.5s ease-in-out",
                        borderRadius: "0 6px 6px 0",
                        width: 88,
                        ":hover": {
                            backgroundColor: "secondary.main", // theme.palette.primary.main
                            color: "common.white",
                        },
                    }}
                >
                    Upload
                </Button>
            </label>
        </Box>
    );
}
