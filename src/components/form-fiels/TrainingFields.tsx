import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Grid,
    Typography,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import TextField from "../common/TextField";
import Upload from "../common/Upload";

interface FormData {
    crewDetails: string;
}

interface TechnicalFieldsProps {
    register: any;
    errors: any;
}

const TrainingFields = ({ register, errors }: TechnicalFieldsProps) => {
    return (
        <Grid container spacing={2} pt={2}>
            <Grid item xs={12} sm={6} lg={4}>
                <Typography variant="subtitle1">Complete ATS Route</Typography>
                <TextField
                    type="text"
                    name="completeATSRoute"
                    register={register("completeATSRoute", {
                        required: true,
                    })}
                    errors={errors?.completeATSRoute}
                />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
                <Typography variant="subtitle1">
                    Number of Touch & Go
                </Typography>
                <TextField
                    type="text"
                    name="noOfTouchAndGo"
                    register={register("noOfTouchAndGo", {
                        required: true,
                    })}
                    errors={errors?.noOfTouchAndGo}
                />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
                <Typography variant="subtitle1">Time of Training</Typography>
                <TextField
                    type="text"
                    name="timeOfTraining"
                    register={register("timeOfTraining", {
                        required: true,
                    })}
                    errors={errors?.timeOfTraining}
                />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
                <Typography variant="subtitle1">
                    Ground Handling Confirmation
                </Typography>
                <TextField
                    type="text"
                    name="groundHandlingConfirmation"
                    register={register("groundHandlingConfirmation")}
                    errors={errors?.groundHandlingConfirmation}
                />
            </Grid>
        </Grid>
    );
};

export default TrainingFields;
