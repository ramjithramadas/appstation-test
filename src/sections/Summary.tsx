import { useContext } from "react";
import { FormContext } from "../contexts/FormContext";
import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Grid,
    Typography,
} from "@mui/material";
import { RightArrow } from "../utils/svgs";
import { camelCaseToTitle } from "../utils/camelCaseToTitle";
import { useForm } from "react-hook-form";

const Summary = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "onChange",
        defaultValues: {
            agreement: false,
        },
    });
    const {
        applicationInformation,
        purposeAndDocuments,
        additionalInformation,
    } = useContext(FormContext);
    console.log(
        applicationInformation,
        purposeAndDocuments,
        additionalInformation
    );

    const onSubmit = () => {
        alert("SUCCESS!!");
    };

    return (
        <Box p={4}>
            <Box>
                <Typography variant="h6" color="primary.dark">
                    Summary
                </Typography>
                <Typography variant="subtitle1">
                    A sub-heading is a mini-headline given to a subsection or
                    paragraph within a main piece of writing.
                </Typography>
            </Box>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box mt={6}>
                    <Grid container spacing={2}>
                        <Grid item xs={10}>
                            <Typography variant="h6" color="primary.dark">
                                Application Information
                            </Typography>
                        </Grid>

                        {Object.keys(applicationInformation).map(
                            (item: any) => (
                                <>
                                    <Grid item xs={10} md={5}>
                                        <Typography variant="body1">
                                            {camelCaseToTitle(item)}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={10} md={5}>
                                        <Typography variant="body1">
                                            {applicationInformation[item]}
                                        </Typography>
                                    </Grid>
                                </>
                            )
                        )}
                    </Grid>
                </Box>
                <Box mt={6}>
                    <Grid container spacing={2}>
                        <Grid item xs={10}>
                            <Typography variant="h6" color="primary.dark">
                                Purpose And Documents
                            </Typography>
                        </Grid>

                        {Object.keys(purposeAndDocuments).map((item: any) => (
                            <>
                                <Grid item xs={10} md={5}>
                                    <Typography variant="body1">
                                        {camelCaseToTitle(item)}
                                    </Typography>
                                </Grid>
                                <Grid item xs={10} md={5}>
                                    <Typography variant="body1">
                                        {purposeAndDocuments[item].toString()}
                                    </Typography>
                                </Grid>
                            </>
                        ))}
                    </Grid>
                </Box>
                <Box mt={6}>
                    <Grid container spacing={2}>
                        <Grid item xs={10}>
                            <Typography variant="h6" color="primary.dark">
                                Additional Information
                            </Typography>
                        </Grid>

                        {Object.keys(additionalInformation).map((item: any) => (
                            <>
                                <Grid item xs={10} md={5}>
                                    <Typography variant="body1">
                                        {camelCaseToTitle(item)}
                                    </Typography>
                                </Grid>
                                <Grid item xs={10} md={5}>
                                    <Typography variant="body1">
                                        {additionalInformation[item]}
                                    </Typography>
                                </Grid>
                            </>
                        ))}
                    </Grid>
                </Box>
                <Box mt={6}>
                    <Grid item xs={12}>
                        <FormGroup>
                            <FormControlLabel
                                sx={{
                                    display: "flex",
                                    justifyContent: "start",
                                }}
                                control={
                                    <Checkbox id="agreement" name="agreement" />
                                }
                                label={
                                    <Typography variant="subtitle1">
                                        Agreement
                                    </Typography>
                                }
                                id="agreement"
                                {...register("agreement", {
                                    required:'*please agree to proceed'
                                })}
                            />
                        </FormGroup>
                        {errors?.agreement && (
                            <Typography
                                variant="subtitle2"
                                sx={{ color: "red" }}
                            >
                                {errors?.agreement?.message}
                            </Typography>
                        )}
                    </Grid>
                </Box>
                <Box mt={4} display="flex">
                    <Button variant="contained">cancel</Button>

                    <Button
                        type="submit"
                        variant="contained"
                        endIcon={<RightArrow />}
                        sx={{ ml: 2 }}
                    >
                        Save
                    </Button>
                </Box>
            </form>
        </Box>
    );
};

export default Summary;
