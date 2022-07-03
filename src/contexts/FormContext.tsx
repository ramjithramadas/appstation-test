import { createContext, ReactNode, useState } from "react";

interface FormProps {
    children: ReactNode;
}

interface FormContextProps {
    applicationInformation: any;
    setApplicationInformation: any;
    purposeAndDocuments: any;
    setPurposeAndDocuments: any;
    additionalInformation: any;
    setAdditionalInformation: any;
}

const FormContext = createContext<FormContextProps>({
    applicationInformation: {},
    setApplicationInformation: (data: any) => data,
    purposeAndDocuments: {},
    setPurposeAndDocuments: (data: any) => data,
    additionalInformation: {},
    setAdditionalInformation: (data: any) => data,
});

const FormProvider = ({ children }: FormProps) => {
    const [applicationInformation, setApplicationInformation] = useState({});
    const [purposeAndDocuments, setPurposeAndDocuments] = useState({});
    const [additionalInformation, setAdditionalInformation] = useState({});

    return (
        <FormContext.Provider
            value={{
                applicationInformation,
                setApplicationInformation,
                purposeAndDocuments,
                setPurposeAndDocuments,
                additionalInformation,
                setAdditionalInformation,
            }}
        >
            {children}
        </FormContext.Provider>
    );
};

export { FormProvider, FormContext };
