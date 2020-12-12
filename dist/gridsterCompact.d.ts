import { GridsterComponentInterface } from './gridster.interface';
import { GridsterItemInterface } from './gridsterItem.interface';
export declare class GridsterCompact {
    private gridster;
    constructor(gridster: GridsterComponentInterface);
    destroy(): void;
    checkCompact(): void;
    checkCompactItem(item: GridsterItemInterface): void;
    checkCompactUp(): void;
    moveUpTillCollision(item: GridsterItemInterface): boolean;
    checkCompactLeft(): void;
    checkCompactRight(): void;
    moveLeftTillCollision(item: GridsterItemInterface): boolean;
    moveRightTillCollision(item: GridsterItemInterface): boolean;
}
