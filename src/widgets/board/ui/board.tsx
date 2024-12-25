import {useMemo, useState} from "react";
import { useNavigate } from "react-router-dom";
import Slider from "@mui/material/Slider";
import Square from "./square.tsx";
import FinalDead from "@/widgets/dialog/ui/FinalDead.tsx";
import FinalWin from "@/widgets/dialog/ui/FinalWin.tsx";
import {useFieldContext} from "@/shared/FieldContext.tsx";
import {defaultSize, initGame, querysized} from "@/processes";
import {useScreenContext} from "@/shared/ScreenContext.tsx";


function Board() {

    const context = useFieldContext();
    const [size, setSize] = useState(querysized());
    const { cellSize } = useScreenContext();
    const navigate = useNavigate();


    const handleChange = (newSize: number): void => {
        const fieldCreated = initGame(newSize);
        context.setField(fieldCreated);
        setSize(newSize);
        navigate(`#size=${newSize}`, { replace: true });
    };

    const grid = useMemo(() => {
        return context.field.map((row, x) =>
            row.map((_, y) => <Square key={`${x}-${y}`} x={x} y={y}/>)
        );
    }, [context.field]);

    const gridStyle = useMemo(
        () => ({
            gridTemplateColumns: `repeat(${size}, ${cellSize}px)`,
            gridTemplateRows: `repeat(${size}, ${cellSize}px)`,
        }),
        [size, cellSize]
    );

    return (
        <>
            <div className="flex items-center justify-center m-auto w-1/3">
                <Slider
                    orientation="horizontal"
                    defaultValue={querysized()}
                    valueLabelDisplay="auto"
                    onChangeCommitted={(_, newSize) =>
                        handleChange(newSize as number)}
                    min={5}
                    max={defaultSize}
                />
            </div>
            <div className="flex items-center justify-center p-4">
                <FinalDead/>
                <FinalWin/>
                <div className="grid gap-0 border-solid border border-red-800" style={gridStyle}>
                    {grid}
                </div>
            </div>
        </>
    );
}

export default Board;
