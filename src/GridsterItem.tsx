import { GridsterItemComponentInterface } from "./GridsterItemComponent.interface";
import React from "react";
import { GridsterItemInterface } from "./GridsterItem.interface";
import { Gridster } from "./Gridster";
import { GridsterUtils } from "./GridsterUtils.service";
import { Renderer } from "./utils/renderer";
import styles from './GridsterItem.css'

interface GridsterItemProp {
    item: GridsterItemInterface;
    gridster: Gridster;
}


export class GridsterItem extends React.Component<GridsterItemProp> implements GridsterItemComponentInterface {

    item: GridsterItemInterface;
    $item: GridsterItemInterface;
    elRef: any;
    el: any;
    gridster: Gridster;
    top: number;
    left: number;
    width: number;
    height: number;
    // drag: GridsterDraggable;
    // resize: GridsterResizable;
    notPlaced: boolean;
    init: boolean;

    renderer: Renderer = new Renderer();

    constructor(props: GridsterItemProp) {
        super(props);
        this.item = this.props.item;
        this.$item = {
            cols: -1,
            rows: -1,
            x: -1,
            y: -1,
        };
        this.gridster = this.props.gridster;
        this.elRef = React.createRef();
        console.log(1);
    }

    componentWillMount() {
        this.updateOptions();
        this.gridster.addItem(this);
    }

    componentDidMount() {
        this.el = this.elRef.current;
    }

    updateOptions(): void {
        this.$item = GridsterUtils.merge(this.$item, this.item, {
          cols: undefined,
          rows: undefined,
          x: undefined,
          y: undefined,
          dragEnabled: undefined,
          resizeEnabled: undefined,
          compactEnabled: undefined,
          maxItemRows: undefined,
          minItemRows: undefined,
          maxItemCols: undefined,
          minItemCols: undefined,
          maxItemArea: undefined,
          minItemArea: undefined,
        });
    }

    setSize(): void {
        this.renderer.setStyle(this.el, 'display', this.notPlaced ? '' : 'block');
        this.gridster.gridRenderer.updateItem(this.el, this.$item, this.renderer);
        this.updateItemSize();
    }

    updateItemSize() {
        const top = this.$item.y * this.gridster.curRowHeight;
        const left = this.$item.x * this.gridster.curColWidth;
        const width = this.$item.cols * this.gridster.curColWidth - this.gridster.$options.margin;
        const height = this.$item.rows * this.gridster.curRowHeight - this.gridster.$options.margin;
    
        if (!this.init && width > 0 && height > 0) {
          this.init = true;
          if (this.item.initCallback) {
            this.item.initCallback(this.item, this);
          }
          if (this.gridster.options.itemInitCallback) {
            this.gridster.options.itemInitCallback(this.item, this);
          }
          if (this.gridster.$options.scrollToNewItems) {
            this.el.scrollIntoView(false);
          }
        }
        if (width !== this.width || height !== this.height) {
          this.width = width;
          this.height = height;
          if (this.gridster.options.itemResizeCallback) {
            this.gridster.options.itemResizeCallback(this.item, this);
          }
        }
        this.top = top;
        this.left = left;
    }

    itemChanged(): void {
        if (this.gridster.options.itemChangeCallback) {
          this.gridster.options.itemChangeCallback(this.item, this);
        }
    }

    checkItemChanges(newValue: GridsterItemInterface, oldValue: GridsterItemInterface): void {
        if (newValue.rows === oldValue.rows && newValue.cols === oldValue.cols && newValue.x === oldValue.x && newValue.y === oldValue.y) {
          return;
        }
        if (this.gridster.checkCollision(this.$item)) {
          this.$item.x = oldValue.x || 0;
          this.$item.y = oldValue.y || 0;
          this.$item.cols = oldValue.cols || 1;
          this.$item.rows = oldValue.rows || 1;
          this.setSize();
        } else {
          this.item.cols = this.$item.cols;
          this.item.rows = this.$item.rows;
          this.item.x = this.$item.x;
          this.item.y = this.$item.y;
          this.gridster.calculateLayoutDebounce();
          this.itemChanged();
        }
      }
    
      canBeDragged(): boolean {
        return !this.gridster.mobile &&
          (this.$item.dragEnabled === undefined ? this.gridster.$options.draggable.enabled : this.$item.dragEnabled);
      }
    
      canBeResized(): boolean {
        return !this.gridster.mobile &&
          (this.$item.resizeEnabled === undefined ? this.gridster.$options.resizable.enabled : this.$item.resizeEnabled);
      }

      render() {
          return (
            <div ref={ this.elRef } className={styles.gridsterItem}>
                { this.props.children }
                <div className="gridster-item-resizable-handler handle-s"></div>
                <div className="gridster-item-resizable-handler handle-e"></div>
                <div className="gridster-item-resizable-handler handle-n"></div>
                <div className="gridster-item-resizable-handler handle-w"></div>
                <div className="gridster-item-resizable-handler handle-se"></div>
                <div className="gridster-item-resizable-handler handle-ne"></div>
                <div className="gridster-item-resizable-handler handle-sw"></div>
                <div className="gridster-item-resizable-handler handle-nw"></div>
            </div>
          ); 
      }
}
