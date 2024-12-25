import React, {createContext, useContext} from "react";

interface DialogContextProps {
    win: boolean;
    setWin: (newDead: boolean) => void;
    dead: boolean;
    setDead: (newDead: boolean) => void;
}

interface ProviderProps {
    children: React.ReactNode;
}

const DialogContext = createContext<DialogContextProps | null>(null);

export const useDialogContext = () => {
    const context = useContext(DialogContext);
    if (!context) {
        throw new Error("useFieldContext must be used within a FieldProvider");
    }
    return context;
};


export const DialogProvider: React.FC<ProviderProps> = ({children}) => {
    const [win, setWin] = React.useState<boolean>(false);
    const [dead, setDead] = React.useState<boolean>(false);

    return (
        <DialogContext.Provider value={{win, setWin, dead, setDead}}>
            {children}
        </DialogContext.Provider>
    );
};
