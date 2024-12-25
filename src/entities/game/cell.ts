export type Cell = {
    isMine: boolean;
    isVisible: boolean;
    x: number;
    y: number;
    neighboursMined: number;
};