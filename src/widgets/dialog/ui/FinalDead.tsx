import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useDialogContext} from "@/shared/DialogContext.tsx";

function FinalDead() {

    const context = useDialogContext();

    const handleCloseDialog = () => {
        window.location.reload();
    };

    return (
        <>
            <Dialog className="opacity-80"
                open={context.dead}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" className="bg-red-800 text-white">
                    {"¡Mierda!"}
                </DialogTitle>
                <DialogContent className="bg-red-800 text-white">
                    <DialogContentText id="alert-dialog-description">
                        <p className="text-white">Maldita sea, te volaste en una mina.</p>
                        <p className="text-white">Intentar otra vez</p>
                    </DialogContentText>
                </DialogContent>
                <DialogActions className="bg-red-800">
                <Button onClick={handleCloseDialog}><span className="text-white">Volver</span></Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default FinalDead;
