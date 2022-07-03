/* eslint-disable react/no-unescaped-entities */
import { Box, Button, Grid, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import InputLabel from "@mui/material/InputLabel";
import { RightArrow } from "../utils/svgs";
import Select from "../components/common/Select";
import Upload from "../components/common/Upload";
import OverflyFields from "../components/form-fiels/OverflyFIelds";
import BusinessFields from "../components/form-fiels/BusinessFields";
import TechnicalFields from "../components/form-fiels/TechnicalFields";
import MedicalFields from "../components/form-fiels/MedicalFields";
import TrainingFields from "../components/form-fiels/TrainingFields";
import CargoFields from "../components/form-fiels/CargoFields";
import { FormContext } from "../contexts/FormContext";

interface FormData {
    purpose: string;
}
interface Props {
    handleNext: () => void;
}

const PurposeAndDocuments = ({ handleNext }: Props) => {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<FormData>({
        mode: "onChange",
    });
    const { setPurposeAndDocuments } = useContext(FormContext);

    const onSubmit = (data: any) => {
        console.log("data::", data);
        setPurposeAndDocuments(data);
        handleNext();
    };

    return (
        <Box p={4}>
            <Box>
                <Typography variant="h6" color="primary.dark">
                    Purpose and Documents
                </Typography>
                <Typography variant="subtitle1">
                    A sub-heading is a mini-headline given to a subsection or
                    paragraph within a main piece of writing. They're smaller
                    than the main headline but larger than the paragraph text of
                    the article.
                </Typography>
            </Box>
            <Box pt={4}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} lg={4}>
                            <InputLabel
                                id="purpose-dropdown"
                                sx={{ color: "common.black" }}
                            >
                                Purpose
                            </InputLabel>
                            <Select
                                name="purpose"
                                labelId="purpose-dropdown"
                                label="Purpose"
                                options={[
                                    "Overfly",
                                    "Business",
                                    "Cargo",
                                    "Technical",
                                    "Medical",
                                    "Training",
                                ]}
                                register={register("purpose", {
                                    required: true,
                                })}
                                errors={errors?.purpose}
                            />
                        </Grid>
                    </Grid>

                    {watch("purpose")?.toLocaleLowerCase() === "overfly" ? (
                        <OverflyFields register={register} errors={errors} />
                    ) : watch("purpose")?.toLocaleLowerCase() === "cargo" ? (
                        <CargoFields
                            register={register}
                            errors={errors}
                            setValue={setValue}
                        />
                    ) : watch("purpose")?.toLocaleLowerCase() === "business" ? (
                        <BusinessFields
                            register={register}
                            errors={errors}
                            setValue={setValue}
                        />
                    ) : watch("purpose")?.toLocaleLowerCase() ===
                      "technical" ? (
                        <TechnicalFields
                            register={register}
                            errors={errors}
                            watch={watch}
                            setValue={setValue}
                        />
                    ) : watch("purpose")?.toLocaleLowerCase() === "medical" ? (
                        <MedicalFields
                            register={register}
                            errors={errors}
                            setValue={setValue}
                        />
                    ) : watch("purpose")?.toLocaleLowerCase() === "training" ? (
                        <TrainingFields register={register} errors={errors} />
                    ) : null}

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

export default PurposeAndDocuments;
