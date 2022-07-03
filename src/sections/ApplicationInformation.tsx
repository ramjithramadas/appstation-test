import { Box, Button, Grid, Typography } from "@mui/material";
import { useContext } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import TextField from "../components/common/TextField";
import { FormContext } from "../contexts/FormContext";
import { RightArrow } from "../utils/svgs";
import { ApplicationInfoFormData } from "../utils/types";

interface Props {
    handleNext: () => void;
}

const ApplicationInformation = ({ handleNext }: Props) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<ApplicationInfoFormData>({
        mode: "onChange",
    });

    const { setApplicationInformation } = useContext(FormContext);

    const onSubmit = (data: any) => {
        // console.log("data::", data);
        setApplicationInformation(data);
        handleNext();
    };

    return (
        <Box p={4}>
            <Box>
                <Typography variant="h6" color="primary.dark">
                    Application Information
                </Typography>
                <Typography variant="subtitle1">
                    A sub-heading is a mini-headline given to a subsection or
                    paragraph within a main piece of writing.
                </Typography>
            </Box>
            <Box mt={4}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} lg={4}>
                            <Typography variant="subtitle1">Name</Typography>
                            <TextField
                                type="text"
                                name="name"
                                register={register("name", {
                                    required: true,
                                })}
                                errors={errors?.name}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} lg={4}>
                            <Typography variant="subtitle1">
                                Email Address
                            </Typography>
                            <TextField
                                type="email"
                                name="email"
                                register={register("email", {
                                    required: true,
                                    pattern: {
                                        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                        message: "Please enter a valid email",
                                    },
                                })}
                                errors={errors?.email}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} lg={4}>
                            <Typography variant="subtitle1">
                                Mobile Number
                            </Typography>
                            <TextField
                                type="number"
                                name="mobile"
                                register={register("mobile", {
                                    required: true,
                                })}
                                errors={errors?.mobile}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} lg={4}>
                            <Typography variant="subtitle1">Address</Typography>
                            <TextField
                                type="text"
                                name="address"
                                register={register("address", {
                                    required: true,
                                })}
                                errors={errors?.address}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} lg={4}>
                            <Typography variant="subtitle1">City</Typography>
                            <TextField
                                type="text"
                                name="city"
                                register={register("city", {
                                    required: true,
                                })}
                                errors={errors?.city}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} lg={4}>
                            <Typography variant="subtitle1">Country</Typography>
                            <TextField
                                type="text"
                                name="country"
                                register={register("country", {
                                    required: true,
                                })}
                                errors={errors?.country}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} lg={4}>
                            <Typography variant="subtitle1">Pincode</Typography>
                            <TextField
                                type="number"
                                name="pin"
                                register={register("pin", {
                                    required: true,
                                })}
                                errors={errors?.pin}
                            />
                        </Grid>
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

export default ApplicationInformation;
