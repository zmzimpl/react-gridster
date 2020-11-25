import * as React from 'react';
import { GridsterConfig } from './gridsterConfig.interface';
import { GridsterConfigS } from './gridsterConfigS.interface';
import { GridsterRenderer } from './gridsterRenderer';
import { GridsterItem } from './gridsterItem.interface';
import { GridsterItemComponentInterface } from './gridsterItemComponent.interface';
import { Renderer } from './utils/renderer';
import { GridsterEmptyCell } from './gridsterEmptyCell';
import { GridsterCompact } from './gridsterCompact';
interface Props {
    options: GridsterConfig;
}
export declare class Gridster extends React.Component<Props> {
    calculateLayoutDebounce: () => void;
    movingItem: GridsterItem | null;
    previewStyle: () => void;
    el: any;
    $options: GridsterConfigS;
    options: GridsterConfig;
    mobile: boolean;
    curWidth: number;
    curHeight: number;
    grid: Array<GridsterItemComponentInterface>;
    columns: number;
    rows: number;
    curColWidth: number;
    curRowHeight: number;
    gridColumns: never[];
    gridRows: never[];
    windowResize: (() => void) | null;
    dragInProgress: boolean;
    emptyCell: GridsterEmptyCell;
    compact: GridsterCompact;
    gridRenderer: GridsterRenderer;
    renderer: Renderer;
    constructor(props: Props);
    componentDidUpdate(): void;
    componentDidMount(): void;
    static checkCollisionTwoItems(item: GridsterItem, item2: GridsterItem): boolean;
    findItemWithItem(item: GridsterItem): GridsterItemComponentInterface | boolean;
    findItemsWithItem(item: GridsterItem): Array<GridsterItemComponentInterface>;
    checkCollision(item: GridsterItem): GridsterItemComponentInterface | boolean;
    checkGridCollision(item: GridsterItem): boolean;
    checkCollisionForSwaping(item: GridsterItem): GridsterItemComponentInterface | boolean;
    pixelsToPositionX(x: number, roundingMethod: Function, noLimit?: boolean): number;
    pixelsToPositionY(y: number, roundingMethod: Function, noLimit?: boolean): number;
    positionXToPixels(x: number): number;
    positionYToPixels(y: number): number;
    addItem(itemComponent: GridsterItemComponentInterface): void;
    removeItem(itemComponent: GridsterItemComponentInterface): void;
    setGridDimensions(): void;
    /**
     * 设置画布整体大小
     */
    setGridSize(): void;
    setOptions(): void;
    optionsChanged(): void;
    calculateLayout(): void;
    updateGrid(): void;
    checkIfToResize(): boolean;
    onResize(): void;
    resize(): void;
    render(): JSX.Element;
}
export {};
