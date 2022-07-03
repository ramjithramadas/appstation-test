import { Box, Button, Grid, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { RightArrow } from "../utils/svgs";
import TextField from "../components/common/TextField";
import { FormContext } from "../contexts/FormContext";
import Upload from "../components/common/Upload";
import AddButton from "../components/common/AddButton";

interface FormData {
    additionalDetails: string;
    additionalAttachment: any;
}

interface Props {
    handleNext: () => void;
}

const AdditionalInformation = ({ handleNext }: Props) => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    }: any = useForm<FormData>({
        mode: "onChange",
    });
    const { setAdditionalInformation } = useContext(FormContext);
    const [uploadFields, setUploadFieldData] = useState([
        {
            id: "additionalAttachment",
            slug: "Additional Attachment",
            value: "",
            additionalFields: [],
        },
    ]);

    const onSubmit = (data: any) => {
        // console.log("data::", data);
        setAdditionalInformation(data);
        handleNext();
    };

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

    return (
        <Box p={4}>
            <Box>
                <Typography variant="h6" color="primary.dark">
                    Additional Information
                </Typography>
                <Typography variant="subtitle1">
                    A sub-heading is a mini-headline given to a subsection or
                    paragraph within a main piece of writing.
                </Typography>
            </Box>
            <Box mt={4}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={10}>
                            <Typography variant="subtitle1">
                                Additional Details
                            </Typography>
                            <TextField
                                type="text"
                                name="name"
                                register={register("additionalDetails")}
                                fullWidth={true}
                                multiline={true}
                                rows={5}
                            />
                        </Grid>

                        {uploadFields.map((field, index) => (
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
                                    register={register("additionalAttachment", {
                                        required: true,
                                    })}
                                    errors={errors.additionalAttachment}
                                />
                                {field.additionalFields && (
                                    <AddButton
                                        onClick={handleAddNewField(
                                            index,
                                            field.id
                                        )}
                                    />
                                )}
                                {field.additionalFields &&
                                    field.additionalFields.map(
                                        (
                                            additionalField: any,
                                            additionalFieldindex: any
                                        ) => (
                                            <Box
                                                key={
                                                    field +
                                                    "" +
                                                    additionalFieldindex
                                                }
                                                pt={1}
                                            >
                                                <Upload
                                                    name={additionalField.id}
                                                    placeholder="Choose file"
                                                    value={
                                                        additionalField.value
                                                    }
                                                    getFile={getFile(
                                                        index,
                                                        additionalFieldindex
                                                    )}
                                                    removeFile={removeFile(
                                                        index,
                                                        additionalFieldindex
                                                    )}
                                                    register={register(
                                                        additionalField.id,
                                                        {
                                                            required: true,
                                                        }
                                                    )}
                                                    errors={
                                                        errors[
                                                            additionalField.id
                                                        ]
                                                    }
                                                />
                                            </Box>
                                        )
                                    )}
                            </Grid>
                        ))}
                    </Grid>
                    <Box mt={4}>
                        <Button
                            type="submit"
                            variant="contained"
                            endIcon={<RightArrow />}
                        >
                            Next
                        </Button>
                    </Box>
                </form>
            </Box>
        </Box>
    );
};

export default AdditionalInformation;
