import { GridsterItem, GridsterItemSplitMode } from './gridsterItem.interface';
import { GridsterComponentInterface } from './gridster.interface';
import { GridsterItemComponentInterface } from './gridsterItemComponent.interface';
export declare class GridsterEmptyCell {
    private gridster;
    initialItem: GridsterItem | null;
    emptyCellClick: Function | null;
    emptyCellClickTouch: Function | null;
    emptyCellContextMenu: Function | null;
    emptyCellDrop: Function | null;
    emptyCellDrag: Function | null;
    emptyCellDragTouch: Function | null;
    emptyCellMMove: Function;
    emptyCellMMoveTouch: Function;
    emptyCellUp: Function;
    emptyCellUpTouch: Function;
    emptyCellMove: Function | null;
    emptyCellExit: Function | null;
    constructor(gridster: GridsterComponentInterface);
    destroy(): void;
    updateOptions(): void;
    emptyCellClickCb(e: any): void;
    emptyCellContextMenuCb(e: any): void;
    emptyCellDragDrop(e: any): void;
    emptyCellDragOver(e: any): void;
    emptyCellMouseDown(e: any): void;
    emptyCellMouseMove(e: any): void;
    emptyCellMouseUp(e: any): void;
    getValidItemFromEvent(e: any, oldItem?: GridsterItem | null): GridsterItem | undefined;
    /** 分裂单元格 */
    splitItem(item: GridsterItem, overItem: GridsterItemComponentInterface, mode: GridsterItemSplitMode): void;
    /** 找出参照物 */
    checkdReferenceItem(checkItem: GridsterItem, pos: string): GridsterItemComponentInterface | undefined;
    fitByReferenceItem(updateItem: GridsterItem, leftReferenceItem: GridsterItemComponentInterface, rightReferenceItem: GridsterItemComponentInterface): boolean;
}