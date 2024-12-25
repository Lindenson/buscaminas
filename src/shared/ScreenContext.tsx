import React, { createContext, useContext, useEffect, useState } from "react";

interface ScreenContextType {
    cellSize: number;
}

const ScreenContext = createContext<ScreenContextType | undefined>(undefined);

export const ScreenProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [screenHeight, setScreenHeight] = useState(window.innerHeight);
    const cellSize = screenHeight / 32;

    useEffect(() => {
        const handleResize = () => {
            setScreenHeight(window.innerHeight);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <ScreenContext.Provider value={{ cellSize }}>
            {children}
        </ScreenContext.Provider>
    );
};

export const useScreenContext = (): ScreenContextType => {
    const context = useContext(ScreenContext);
    if (!context) {
        throw new Error("useScreenContext must be used within a ScreenProvider");
    }
    return context;
};
