import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { GreenTick, TickWithCircle } from "../utils/svgs";
import ApplicationInformation from "./ApplicationInformation";
import AdditionalInformation from "./AdditionalInformation";
import PurposeAndDocuments from "./PurposeAndDocuments";
import Summary from "./Summary";
import { FormContext } from "../contexts/FormContext";

const steps = [
    "Application Information",
    "Purpose and Documents",
    "Additional Information",
    "Summary",
];

function CustomStepIcon(props: any) {
    const { active, completed, className, icon } = props;

    // console.log(props, "pppppp");

    const icons: Array<string> = ["01", "02", "03", "04"];

    return (
        <>
            {completed ? (
                //   <TickWithCircle />
                <Box
                    sx={{
                        height: 40,
                        width: 40,
                        display: "grid",
                        placeItems: "center",
                        borderRadius: "50%",
                        backgroundColor: "white",
                    }}
                >
                    <GreenTick />
                </Box>
            ) : (
                <Box
                    sx={{
                        height: 40,
                        width: 40,
                        display: "grid",
                        placeItems: "center",
                        borderRadius: "50%",
                        backgroundColor: "white",
                    }}
                >
                    <Typography color="primary.dark">0{icon}</Typography>
                </Box>
            )}
        </>
    );
}

export default function Form() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set<number>());
    const {
        applicationInformation,
        purposeAndDocuments,
        additionalInformation,
    } = React.useContext(FormContext);

    const isStepOptional = (step: number) => {
        return step === 1;
    };

    const isStepSkipped = (step: number) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    // console.log("applicationInformation context::", applicationInformation);
    // console.log("purposeAndDocuments context::", purposeAndDocuments);
    // console.log("additionalInformation context::", additionalInformation);

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <Box sx={{ width: "100%" }}>
            <Stepper
                activeStep={activeStep}
                sx={{
                    flexDirection: { xs: "column", md: "unset" },
                    alignItems: { xs: "start", md: "center" },
                }}
            >
                {steps.map((label, index) => {
                    const stepProps: { completed?: boolean } = {};
                    const labelProps: {
                        optional?: React.ReactNode;
                    } = {};
                    if (isStepOptional(index)) {
                        labelProps.optional = (
                            <Typography variant="caption">Optional</Typography>
                        );
                    }
                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }
                    return (
                        <Step
                            key={label}
                            {...stepProps}
                            sx={{
                                bgcolor:
                                    activeStep === index
                                        ? "primary.dark"
                                        : activeStep > index
                                        ? "primary.main"
                                        : "secondary.light",
                                borderRadius: "1.75rem",
                                paddingRight: "1rem",
                                height: "52px",
                                display: "grid",
                                placeItems: "center",
                                width: { xs: "100%", md: "unset" },
                                justifyContent: {
                                    xs: "start",
                                    md: "center",
                                },
                            }}
                        >
                            <StepLabel StepIconComponent={CustomStepIcon}>
                                <Typography
                                    color={
                                        activeStep >= index
                                            ? "common.white"
                                            : "primary.dark"
                                    }
                                    variant="subtitle1"
                                >
                                    {label}
                                </Typography>
                            </StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            {activeStep === steps.length ? (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        All steps completed - you&apos;re finished
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                        <Box sx={{ flex: "1 1 auto" }} />
                        <Button onClick={handleReset}>Reset</Button>
                    </Box>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <Box sx={{ pt: 2 }}>
                        {activeStep === 0 ? (
                            <ApplicationInformation handleNext={handleNext} />
                        ) : activeStep === 1 ? (
                            <PurposeAndDocuments handleNext={handleNext} />
                        ) : activeStep === 2 ? (
                            <AdditionalInformation handleNext={handleNext} />
                        ) : (
                            <Summary />
                        )}
                    </Box>
                </React.Fragment>
            )}
        </Box>
    );
}
