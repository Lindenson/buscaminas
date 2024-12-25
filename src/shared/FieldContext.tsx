import React, {createContext, useContext} from "react";

import {Field} from "@/entities/game/field.ts";

interface FieldContextProps {
    field: Field;
    setField: (newField: Field) => void;
}

interface ProviderProps {
    children: React.ReactNode;
    initialField: Field;
}

const FieldContext = createContext<FieldContextProps | null>(null);

export const useFieldContext = () => {
    const context = useContext(FieldContext);
    if (!context) {
        throw new Error("useFieldContext must be used within a FieldProvider");
    }
    return context;
};


export const FieldProvider: React.FC<ProviderProps> = ({children, initialField}) => {
    const [field, setField] = React.useState<Field>(initialField);

    return (
        <FieldContext.Provider value={{field, setField}}>
            {children}
        </FieldContext.Provider>
    );
};
