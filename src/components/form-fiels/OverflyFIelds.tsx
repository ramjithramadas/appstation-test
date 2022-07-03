import { Box, Button, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import TextField from "../common/TextField";
import Upload from "../common/Upload";

interface FormData {
    completeATSroute: string;
}

interface OverflyFieldsProps {
    register: any;
    errors: any;
}

const OverflyFields = ({ register, errors }: OverflyFieldsProps) => {
    const [fileName, setFileName] = useState("");

    const getFile = (e: any) => {
        setFileName(e.target.files[0].name);
    };
    const removeFile = (e: any) => {
        setFileName("");
    };

    return (
        <Grid container spacing={2} pt={2}>
            <Grid item xs={12} sm={6} lg={4}>
                <Typography variant="subtitle1">Complete ATS Route</Typography>
                <TextField
                    type="text"
                    name="completeATSroute"
                    register={register("completeATSroute", {
                        required: true,
                    })}
                    errors={errors?.completeATSroute}
                />
            </Grid>
        </Grid>
    );
};

export default OverflyFields;
