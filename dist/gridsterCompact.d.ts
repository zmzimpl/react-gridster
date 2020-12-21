import { GridsterComponentInterface } from './Gridster.interface';
import { GridsterItemInterface } from './GridsterItem.interface';
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
