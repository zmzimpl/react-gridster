import { GridsterItemComponentInterface } from "./GridsterItemComponent.interface";
import React from "react";
import { GridsterItemInterface } from "./GridsterItem.interface";
import { Gridster } from "./Gridster";
import { Renderer } from "./utils/renderer";
interface GridsterItemProp {
    item: GridsterItemInterface;
    gridster: Gridster;
}
export declare class GridsterItem extends React.Component<GridsterItemProp> implements GridsterItemComponentInterface {
    item: GridsterItemInterface;
    $item: GridsterItemInterface;
    elRef: any;
    el: any;
    gridster: Gridster;
    top: number;
    left: number;
    width: number;
    height: number;
    notPlaced: boolean;
    init: boolean;
    renderer: Renderer;
    constructor(props: GridsterItemProp);
    componentWillMount(): void;
    componentDidMount(): void;
    updateOptions(): void;
    setSize(): void;
    updateItemSize(): void;
    itemChanged(): void;
    checkItemChanges(newValue: GridsterItemInterface, oldValue: GridsterItemInterface): void;
    canBeDragged(): boolean;
    canBeResized(): boolean;
    render(): JSX.Element;
}
export {};
