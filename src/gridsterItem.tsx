import React from "react";
import { GridsterItem, GridsterItemComponentInterface } from "./gridsterItem.interface";
import styles from './GridsterItem.css'

interface GridsterItemProp {
    item: GridsterItem;
}


export class ReactGridsterItem extends React.Component<GridsterItemProp> implements GridsterItemComponentInterface {

    constructor(props: GridsterItemProp) {
        super(props);
    }

    render() {
        return (
            <div className={styles.gridsterItem}>
                { this.props.children }
                <div className={styles.gridsterItemResizableHandler + ' ' + styles.handleS}></div>
                <div className={styles.gridsterItemResizableHandler + ' ' + styles.handleE}></div>
                <div className={styles.gridsterItemResizableHandler + ' ' + styles.handleN}></div>
                <div className={styles.gridsterItemResizableHandler + ' ' + styles.handleW}></div>
                <div className={styles.gridsterItemResizableHandler + ' ' + styles.handleSE}></div>
                <div className={styles.gridsterItemResizableHandler + ' ' + styles.handleNE}></div>
                <div className={styles.gridsterItemResizableHandler + ' ' + styles.handleSW}></div>
                <div className={styles.gridsterItemResizableHandler + ' ' + styles.handleNW}></div>
            </div>
        )
    }
}
