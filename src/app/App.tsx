import StartPage from "@/pages/StartPage.tsx";
import {FieldProvider} from "@/shared/FieldContext.tsx";
import {DialogProvider} from "@/shared/DialogContext.tsx";
import {initGame} from "@/processes";
import {ScreenProvider} from "@/shared/ScreenContext.tsx";
import {BrowserRouter} from "react-router-dom";

function App() {

    return (
        <>
            <BrowserRouter>
                <DialogProvider>
                    <ScreenProvider>
                        <FieldProvider initialField={initGame()}>
                            <StartPage/>
                        </FieldProvider>
                    </ScreenProvider>
                </DialogProvider>
            </BrowserRouter>
        </>
    )
}

export default App
