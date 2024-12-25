import {countNeighbours, createField} from "@/processes/logic.ts";
import {Field} from "@/entities/game/field.ts";
import {defaultSize} from "@/processes";

export function initGame(startSize: number = defaultSize): Field {
    const fieldCreated = createField(startSize);
    countNeighbours(fieldCreated);
    return fieldCreated;
}
