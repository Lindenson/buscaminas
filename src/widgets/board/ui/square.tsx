import {checkVictory, openOrExplode} from "@/processes";
import {useFieldContext} from "@/shared/FieldContext.tsx";
import {useDialogContext} from "@/shared/DialogContext.tsx";
import {useScreenContext} from "@/shared/ScreenContext.tsx";

function Square(props: { x: number; y: number }) {

    const { cellSize } = useScreenContext();
    const gameContext = useFieldContext();
    let cell = gameContext.field[props.x][props.y];
    const dialogContext = useDialogContext();

    const handleClick = () => {
        const clonedField = [...gameContext.field];
        const loose = openOrExplode(cell.x, cell.y, clonedField, dialogContext.setDead);
        if (!loose) {
            const won = checkVictory(clonedField, dialogContext.setWin);
            if (!won) {
                //update game model and rerender
                cell = clonedField[props.x][props.y];
                gameContext.setField(clonedField);
            }
        }
    };

    return (
        <div
            className="flex items-center justify-center border-solid border border-red-900"
            style={{width: `${cellSize}px`, height: `${cellSize}px`}}
            onClick={handleClick}
        >
            {cell.isVisible && (
                <p className="text-red text-sm">
                    {cell.isMine ? (
                        <img src="/bomb.png" width={cellSize}/>
                    ) : (
                        cell.neighboursMined
                    )}
                </p>
            )}
        </div>
    );
}

export default Square;