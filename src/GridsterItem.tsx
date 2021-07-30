import React from 'react'
import {
  GridsterItem,
  GridsterItemComponentInterface
} from './gridsterItem.interface'
import styles from './GridsterItem.css'
import { GridsterDraggable } from './gridsterDraggable.service'
import { GridsterResizable } from './gridsterResizable.service'
import { Renderer } from './utils/renderer'
import { ReactGridster } from './gridster'
import { GridsterUtils } from './gridsterUtils.service'

interface GridsterItemProp {
  item: GridsterItem
  gridster: ReactGridster
}

export class ReactGridsterItem
  extends React.Component<GridsterItemProp>
  implements GridsterItemComponentInterface
{
  item!: GridsterItem
  $item!: GridsterItem
  top!: number
  left!: number
  width!: number
  height!: number
  drag!: GridsterDraggable
  resize!: GridsterResizable
  notPlaced!: boolean
  el!: HTMLDivElement
  gridster!: ReactGridster
  renderer: Renderer = new Renderer()
  init: boolean = false

  elRef: React.RefObject<HTMLDivElement>

  constructor(props: GridsterItemProp) {
    super(props)
    this.item = this.props.item
    this.elRef = React.createRef()
    this.el = this.elRef.current as HTMLDivElement
    this.$item = {
      cols: -1,
      rows: -1,
      x: -1,
      y: -1
    }
    this.updateOptions()
  }

  componentDidMount(): void {
    this.el = this.elRef.current as HTMLDivElement
  }

  componentDidUpdate(): void {
    this.gridster = this.props.gridster
    this.gridster.addItem(this);
    this.drag = new GridsterDraggable(this, this.gridster)
    this.resize = new GridsterResizable(this, this.gridster)
    this.updateOptions()

    if (!this.init) {
      this.gridster.calculateLayoutDebounce()
    }
    console.log(this.gridster)
  }

  shouldComponentUpdate(nextProps: GridsterItemProp) {
    return nextProps.gridster !== this.gridster
  }

  itemChanged(): void {
    if (this.gridster.options.itemChangeCallback) {
      this.gridster.options.itemChangeCallback(this.item, this)
    }
    // this.itemChange.next({ item: this.item, itemComponent: this });
  }

  checkItemChanges(newValue: GridsterItem, oldValue: GridsterItem): void {
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
    const gridDragEnabled = this.gridster.$options.draggable.enabled;
    const itemDragEnabled = this.$item.dragEnabled === undefined ? gridDragEnabled : this.$item.dragEnabled;
    return !this.gridster.mobile && gridDragEnabled && itemDragEnabled;
  }

  canBeResized(): boolean {
    const gridResizable = this.gridster.$options.resizable.enabled;
    const itemResizable = this.$item.resizeEnabled === undefined ? gridResizable : this.$item.resizeEnabled;
    return !this.gridster.mobile && gridResizable && itemResizable;
  }

  bringToFront(offset: number): void {
    if (offset && offset <= 0) {
      return;
    }
    const layerIndex = this.getLayerIndex();
    const topIndex = this.gridster.$options.maxLayerIndex;
    if (layerIndex < topIndex) {
      const targetIndex = offset ? layerIndex + offset : topIndex;
      this.item.layerIndex = this.$item.layerIndex = targetIndex > topIndex ? topIndex : targetIndex;
    }
  }

  sendToBack(offset: number): void {
    if (offset && offset <= 0) {
      return;
    }
    const layerIndex = this.getLayerIndex();
    if (layerIndex > 0) {
      const targetIndex = offset ? layerIndex - offset : 0;
      this.item.layerIndex = this.$item.layerIndex = targetIndex < 0 ? 0 : targetIndex;
    }
  }

  private getLayerIndex(): number {
    if (this.item.layerIndex !== undefined) {
      return this.item.layerIndex;
    }
    if (this.gridster.$options.defaultLayerIndex !== undefined) {
      return this.gridster.$options.defaultLayerIndex;
    }
    return 0;
  }

  updateOptions(): void {
    this.$item = GridsterUtils.merge(this.$item, this.item, {
      cols: undefined,
      rows: undefined,
      x: undefined,
      y: undefined,
      layerIndex: undefined,
      dragEnabled: undefined,
      resizeEnabled: undefined,
      compactEnabled: undefined,
      maxItemRows: undefined,
      minItemRows: undefined,
      maxItemCols: undefined,
      minItemCols: undefined,
      maxItemArea: undefined,
      minItemArea: undefined
    })
  }

  setSize(): void {
    this.renderer.setStyle(this.el, 'display', this.notPlaced ? '' : 'block')
    this.gridster.gridRenderer.updateItem(this.el, this.$item, this.renderer)
    this.updateItemSize()
  }

  updateItemSize(): void {
    const top = this.$item.y * this.gridster.curRowHeight
    const left = this.$item.x * this.gridster.curColWidth

    const width =
      this.$item.cols * this.gridster.curColWidth -
      this.gridster.$options.margin
    const height =
      this.$item.rows * this.gridster.curRowHeight -
      this.gridster.$options.margin

    this.top = top
    this.left = left

    if (!this.init && width > 0 && height > 0) {
      this.init = true
      if (this.item.initCallback) {
        this.item.initCallback(this.item, this)
      }
      if (this.gridster.options.itemInitCallback) {
        this.gridster.options.itemInitCallback(this.item, this)
      }
      //   this.itemInit.next({ item: this.item, itemComponent: this })
      if (this.gridster.$options.scrollToNewItems) {
        this.el.scrollIntoView(false)
      }
    }
    if (width !== this.width || height !== this.height) {
      this.width = width
      this.height = height
      if (this.gridster.options.itemResizeCallback) {
        this.gridster.options.itemResizeCallback(this.item, this)
      }
      //   this.itemResize.next({ item: this.item, itemComponent: this })
    }
  }

  dragStartDelay(e: any): void {
    this.resize.dragStartDelay(e);
  }

  render() {
    return (
      <div
        className={'gridsterItem ' + styles.gridsterItem}
        ref={this.elRef as React.RefObject<HTMLDivElement>}
      >
        {this.props.children}
        <div onMouseDown={this.dragStartDelay.bind(this)} className={'gridsterItemResizableHandler handleS'}></div>
        <div onMouseDown={this.dragStartDelay.bind(this)} className={'gridsterItemResizableHandler handleE'}></div>
        <div onMouseDown={this.dragStartDelay.bind(this)} className={'gridsterItemResizableHandler handleN'}></div>
        <div onMouseDown={this.dragStartDelay.bind(this)} className={'gridsterItemResizableHandler handleW'}></div>
        <div onMouseDown={this.dragStartDelay.bind(this)} className={'gridsterItemResizableHandler handleSE'}></div>
        <div onMouseDown={this.dragStartDelay.bind(this)} className={'gridsterItemResizableHandler handleNE'}></div>
        <div onMouseDown={this.dragStartDelay.bind(this)} className={'gridsterItemResizableHandler handleSW'}></div>
        <div onMouseDown={this.dragStartDelay.bind(this)} className={'gridsterItemResizableHandler handleNW'}></div>
      </div>
    )
  }
}
