import * as React from 'react';
import { GridsterConfig } from './gridsterConfig.interface';
import { GridsterConfigS } from './gridsterConfigS.interface';
interface Props {
    options: GridsterConfig;
}
export declare class Gridster extends React.Component<Props> {
    $options: GridsterConfigS;
    columns: number;
    rows: number;
    curWidth: number;
    curHeight: number;
    curColWidth: number;
    curRowHeight: number;
    mobile: boolean;
    constructor(props: Props);
    componentDidMount(): void;
    /**
     * 设置画布整体大小
     */
    setGridSize(): void;
    setOptions(): void;
    optionsChanged(): void;
    calculateLayout(): void;
    updateGrid(): void;
    render(): JSX.Element;
}
export {};
