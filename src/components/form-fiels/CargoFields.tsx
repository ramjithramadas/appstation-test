import { Box, Button, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import AddButton from "../common/AddButton";
import TextField from "../common/TextField";
import Upload from "../common/Upload";

interface FormData {
    crewDetails: string;
}

interface BusinessFieldsProps {
    register: any;
    errors: any;
    setValue?: any;
}

const CargoFields = ({ register, errors, setValue }: BusinessFieldsProps) => {
    const [uploadFields, setUploadFieldData] = useState([
        {
            id: "copyOfCR",
            slug: "Copy of CR",
            value: "",
        },
        {
            id: "healthCertificate",
            slug: "Health Certificate",
            value: "",
            additionalFields: [],
        },
        {
            id: "signatureCard",
            slug: "Signature Card",
            value: "",
            additionalFields: [],
        },
        {
            id: "consigneeLetter",
            slug: "Consignee Letter",
            value: "",
            additionalFields: [],
        },
        {
            id: "airworthinessCertificates",
            slug: "Airworthiness Certificates",
            value: "",
            additionalFields: [],
        },
        {
            id: "airOperatorCertificates",
            slug: "Air Operator Certificates",
            value: "",
            additionalFields: [],
        },
        {
            id: "aircraftInsuranceCertificates",
            slug: "Aircraft Insurance Certificates",
            value: "",
            additionalFields: [],
        },
        { id: "noiseCertificates", slug: "Noise Certificates", value: "" },
        {
            id: "aircraftRegistrationCertificates",
            slug: "Aircraft Registration Certificates",
            value: "",
        },
        {
            id: "airwayBill",
            slug: "Airway Bill",
            value: "",
        },
        {
            id: "insuranceCertificate",
            slug: "Insurance Certificate",
            value: "",
        },
        {
            id: "importPermit",
            slug: "Import Permit",
            value: "",
        },
        {
            id: "dangerousGood",
            slug: "Dangerous Good",
            value: "",
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
    const handleAddNewField = (i: any, field: any) => () => {
        const temp: any = [...uploadFields];
        const tempVal = [...temp[i].additionalFields];
        tempVal.push({
            id: field + "" + i,
            slug: field,
            value: "",
        });
        temp[i].additionalFields = tempVal;
        setUploadFieldData(temp);
    };
    console.log(uploadFields, "uploadFields");

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
                    {field.additionalFields && (
                        <AddButton
                            onClick={handleAddNewField(index, field.id)}
                        />
                    )}
                    {field.additionalFields &&
                        field.additionalFields.map(
                            (
                                additionalField: any,
                                additionalFieldindex: any
                            ) => (
                                <Box
                                    key={field + "" + additionalFieldindex}
                                    pt={1}
                                >
                                    <Upload
                                        name={additionalField.id}
                                        placeholder="Choose file"
                                        value={additionalField.value}
                                        getFile={getFile(
                                            index,
                                            additionalFieldindex
                                        )}
                                        removeFile={removeFile(
                                            index,
                                            additionalFieldindex
                                        )}
                                        register={register(additionalField.id, {
                                            required: true,
                                        })}
                                        errors={errors[additionalField.id]}
                                    />
                                </Box>
                            )
                        )}
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

export default CargoFields;
