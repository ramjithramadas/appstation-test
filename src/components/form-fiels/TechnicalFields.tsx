import {
    Box,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Grid,
    Typography,
} from "@mui/material";
import { useState } from "react";
import TextField from "../common/TextField";
import Upload from "../common/Upload";

interface TechnicalFieldsProps {
    register: any;
    errors: any;
    watch?: any;
    setValue?: any;
}

const TechnicalFields = ({
    register,
    errors,
    watch,
    setValue,
}: TechnicalFieldsProps) => {
    const [uploadFields, setUploadFieldData] = useState([
        {
            id: "maintenanceConfirmation",
            slug: " Maintenance Confirmation",
            value: "",
            additionalFields: [],
        },
        {
            id: "crewDetails",
            slug: "Crew Details",
            value: "",
            additionalFields: [],
        },
        {
            id: "hotelConfirmation",
            slug: "Hotel Confirmation",
            value: "",
            additionalFields: [],
        },
    ]);

    const getFile =
        (i: any, additionalFieldIndex: any = null) =>
        (e: any) => {
            const temp: any = [...uploadFields];

            if (additionalFieldIndex !== null) {
                temp[i].additionalFields[additionalFieldIndex].value =
                    e.target.files[0].name;

                setValue(
                    temp[i].additionalFields[additionalFieldIndex].id,
                    e.target.files[0].name
                );
            } else {
                temp[i].value = e.target.files[0].name;
                setValue(temp[i].id, e.target.files[0].name);
            }
            setUploadFieldData(temp);
        };
    const removeFile =
        (i: any, additionalFieldIndex: any = null) =>
        (e: any) => {
            const temp: any = [...uploadFields];
            if (additionalFieldIndex !== null) {
                temp[i].additionalFields[additionalFieldIndex].value = "";
                setValue(temp[i].additionalFields[additionalFieldIndex].id, "");
            } else {
                temp[i].value = "";
                setValue(temp[i].id, "");
            }
            setUploadFieldData(temp);
        };

    return (
        <Grid container spacing={2} pt={2}>
            {uploadFields
                .filter((_arr, i) => i < 2)
                .map((field, index) => (
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        lg={4}
                        position="relative"
                        key={field.id}
                    >
                        <Typography variant="subtitle1">
                            {field.slug}
                        </Typography>
                        <Upload
                            name={field.id}
                            placeholder="Choose file"
                            value={field.value}
                            getFile={getFile(index)}
                            removeFile={removeFile(index)}
                            register={register(field.id, {
                                required: true,
                            })}
                            errors={errors[field.id]}
                        />
                    </Grid>
                ))}
            <Grid item xs={12}>
                <FormGroup
                    sx={(theme) => ({
                        padding: "0 0",
                        [theme.breakpoints.down("md")]: {
                            padding: theme.spacing(2, 0),
                        },
                    })}
                >
                    <FormControlLabel
                        sx={{ display: "flex", justifyContent: "start" }}
                        control={
                            <Checkbox
                                id="crewDisembarkation"
                                name="crewDisembarkation"
                            />
                        }
                        label={
                            <Typography variant="subtitle1">
                                Crew Disembarkation
                            </Typography>
                        }
                        id="crewDisembarkation"
                        {...register("crewDisembarkation")}
                    />
                </FormGroup>
            </Grid>
            {watch("crewDisembarkation") && (
                <>
                    {uploadFields
                        .filter((_arr, i) => i >= 2)
                        .map((field, index) => (
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                lg={4}
                                position="relative"
                                key={field.id}
                            >
                                <Typography variant="subtitle1">
                                    {field.slug}
                                </Typography>
                                <Upload
                                    name={field.id}
                                    placeholder="Choose file"
                                    value={field.value}
                                    // +2 added, since we looped already 2 elements
                                    getFile={getFile(index + 2)}
                                    removeFile={removeFile(index + 2)}
                                    register={register(field.id, {
                                        required: true,
                                    })}
                                    errors={errors[field.id]}
                                />
                            </Grid>
                        ))}
                    <Grid item xs={12} sm={6} lg={4}>
                        <Typography variant="subtitle1">
                            Ground Handling Confirmation
                        </Typography>
                        <TextField
                            type="text"
                            name="groundHandlingConfirmation"
                            register={register("groundHandlingConfirmation", {
                                required: true,
                            })}
                            errors={errors?.groundHandlingConfirmation}
                        />
                    </Grid>
                </>
            )}
        </Grid>
    );
};

export default TechnicalFields;
