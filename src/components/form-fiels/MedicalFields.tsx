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
    setValue?: any;
}

const MedicalFields = ({
    register,
    errors,
    setValue,
}: TechnicalFieldsProps) => {
    const [uploadFields, setUploadFieldData] = useState([
        {
            id: "letterFromHospital",
            slug: "Letter from Hospital",
            value: "",
            additionalFields: [],
        },
        {
            id: "passengerDetails",
            slug: "Passenger Details",
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
            {uploadFields.map((field, index) => (
                <Grid
                    item
                    xs={12}
                    sm={6}
                    lg={4}
                    position="relative"
                    key={field.id}
                >
                    <Typography variant="subtitle1">{field.slug}</Typography>
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
        </Grid>
    );
};

export default MedicalFields;
