import StartPage from "@/pages/StartPage.tsx";
import {FieldProvider} from "@/shared/FieldContext.tsx";
import {DialogProvider} from "@/shared/DialogContext.tsx";
import {initGame} from "@/processes";
import {ScreenProvider} from "@/shared/ScreenContext.tsx";

function App() {
    return (
        <>
            <FieldProvider initialField={initGame()}>
                <DialogProvider>
                    <ScreenProvider>
                        <StartPage/>
                    </ScreenProvider>
                </DialogProvider>
            </FieldProvider>
        </>
    )
}

export default App
