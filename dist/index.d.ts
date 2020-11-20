import * as React from 'react';
export declare type gridTypes = 'fit' | 'scrollVertical' | 'scrollHorizontal' | 'fixed' | 'verticalFixed' | 'horizontalFixed';
export interface GridsterConfig {
    gridType: gridTypes;
}
interface Props {
    options: GridsterConfig;
}
export declare class Gridster extends React.Component<Props> {
    constructor(props: Props);
    render(): JSX.Element;
}
export {};
