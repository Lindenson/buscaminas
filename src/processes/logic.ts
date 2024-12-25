import {Cell} from "@/entities/game/cell.ts";
import {Field} from "@/entities/game/field.ts";


export function countNeighbours(f: Field) {
    const size = f.length;
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const neighbours: Cell[] = getNeighbours(f, i, j);
            f[i][j].neighboursMined = neighbours
                .map((c) => c.isMine ? 1 : 0 as number)
                .reduce((a, x) => a + x);
        }
    }
}

export function createField(size: number): Field {
    return Array(size)
        .fill(null)
        .map((_, i) =>
            Array(size)
                .fill(null)
                .map((_, j) => {
                    return {
                        isMine: putBomb(),
                        isVisible: false,
                        x: i,
                        y: j,
                        neighboursMined: 0,
                    } as Cell;
                }),
        );
}

export function openOrExplode(x: number, y: number, f: Field, explodeCallback: (value: boolean) => void): boolean {
    const currentCell = f[x][y];
    if (currentCell.isVisible) return false;
    currentCell.isVisible = true;
    if (currentCell.isMine) {
        openAll(f);
        explodeCallback(true);
        return true;
    } else {
        if (currentCell.neighboursMined == 0) {
            const neighbours = getNeighbours(f, x, y);
            for (const cell of neighbours) {
                if (cell.isVisible) continue;
                openOrExplode(cell.x, cell.y, f, explodeCallback);
            }
        }
        return false;
    }
}

function openAll(f: Field): void {
    f.forEach((r) => {
        r.forEach((cell) => {
            cell.isVisible = true;
        })
    })
}

export function checkVictory(f: Field, finishCallback: (value: boolean) => void): boolean {
    for (let i = 0; i < f.length; i++) {
        for (let j = 0; j < f[i].length; j++) {
            if (!(f[i][j].isMine || f[i][j].isVisible)) {
                finishCallback(false);
                return false;
            }
        }
    }
    openAll(f);
    finishCallback(true);
    return true;
}

function putBomb(): boolean {
    const mineBoxResult = Math.round(Math.random() * 10);
    return mineBoxResult == 5;
}


function getNeighbours(f: Field, i: number, j: number): Cell[] {
    const size = f.length;
    const neighbours: Cell[] = [];
    if (i == 0 && j == 0) {
        neighbours.push(f[0][1]);
        neighbours.push(f[1][1]);
        neighbours.push(f[1][0]);
    } else if (i == 0 && j == size - 1) {
        neighbours.push(f[0][size - 2]);
        neighbours.push(f[1][size - 2]);
        neighbours.push(f[size - 2][0]);
    } else if (i == size - 1 && j == 0) {
        neighbours.push(f[size - 2][0]);
        neighbours.push(f[size - 2][1]);
        neighbours.push(f[0][size - 2]);
    } else if (i == size - 1 && j == size - 1) {
        neighbours.push(f[size - 1][size - 2]);
        neighbours.push(f[size - 2][size - 2]);
        neighbours.push(f[size - 2][size - 1]);
    } else {
        for (let zi = i - 1; zi < i + 2; zi++) {
            for (let zj = j - 1; zj < j + 2; zj++) {
                if (zi >= size || zj >= size || zi < 0 || zj < 0) continue;
                if (zi == i && zj == j) continue;
                neighbours.push(f[zi][zj]);
            }
        }
    }
    return neighbours;
}