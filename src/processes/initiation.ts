import {countNeighbours, createField} from "@/processes/logic.ts";
import {Field} from "@/entities/game/field.ts";
import {querysized} from "@/processes";

export function initGame(startSize?: number): Field {
    if (!startSize) { startSize = querysized();}
    const fieldCreated = createField(startSize);
    countNeighbours(fieldCreated);
    return fieldCreated;
}
