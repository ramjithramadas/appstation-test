import type { NextPage } from "next";
import Head from "next/head";
import Button from "@mui/material/Button";
import Form from "../src/sections/Form";
import { FormProvider } from "../src/contexts/FormContext";
import { Box } from "@mui/system";

const Home: NextPage = () => {
    return (
        <FormProvider>
            <Head>
                <title>Appstation | Form</title>
                <meta name="description" content="Application form" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <Box sx={{ padding: { xs: "2%", md: "5%", xl: "5% 10%" } }}>
                    <Form />
                </Box>
            </main>
        </FormProvider>
    );
};

export default Home;
