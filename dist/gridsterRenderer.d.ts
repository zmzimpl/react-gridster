import { GridsterComponentInterface } from './gridster.interface';
import { GridsterItemInterface } from './gridsterItem.interface';
import { Renderer } from './utils/renderer';
export declare class GridsterRenderer {
    private gridster;
    constructor(gridster: GridsterComponentInterface);
    destroy(): void;
    updateItem(el: any, item: GridsterItemInterface, renderer: Renderer): void;
    updateGridster(): void;
    getGridColumnStyle(i: number): {
        width: string;
        height: string;
        constructor: Function;
        toString(): string;
        toLocaleString(): string;
        valueOf(): Object;
        hasOwnProperty(v: string | number | symbol): boolean;
        isPrototypeOf(v: Object): boolean;
        propertyIsEnumerable(v: string | number | symbol): boolean;
    };
    getGridRowStyle(i: number): {
        width: string;
        height: string;
        constructor: Function;
        toString(): string;
        toLocaleString(): string;
        valueOf(): Object;
        hasOwnProperty(v: string | number | symbol): boolean;
        isPrototypeOf(v: Object): boolean;
        propertyIsEnumerable(v: string | number | symbol): boolean;
    };
    getLeftPosition(d: number): Object;
    getTopPosition(d: number): Object;
    clearCellPosition(renderer: Renderer, el: any): void;
    setCellPosition(renderer: Renderer, el: any, x: number, y: number): void;
    getLeftMargin(): number;
    getTopMargin(): number;
}
