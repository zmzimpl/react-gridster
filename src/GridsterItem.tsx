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
  checkItemChanges!: (newValue: GridsterItem, oldValue: GridsterItem) => void
  canBeDragged!: () => boolean
  canBeResized!: () => boolean
  bringToFront!: (offset: number) => void
  sendToBack!: (v: number) => void
  el!: HTMLDivElement
  gridster!: ReactGridster
  renderer: Renderer = new Renderer();
  init: boolean = false

  elRef: React.RefObject<HTMLDivElement>

  constructor(props: GridsterItemProp) {
    super(props)
    this.item = this.props.item;
    this.elRef = React.createRef()
    this.el = this.elRef.current as HTMLDivElement;
    this.$item = {
      cols: -1,
      rows: -1,
      x: -1,
      y: -1
    }
    this.updateOptions();
    this.drag = new GridsterDraggable(this, this.gridster)
    this.resize = new GridsterResizable(this, this.gridster)
  }

  componentDidMount(): void {
    this.el = this.elRef.current as HTMLDivElement
  }

  componentDidUpdate(): void {
    this.gridster = this.props.gridster;
    this.gridster.addItem(this);
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
      this.gridster.options.itemChangeCallback(this.item, this);
    }
    // this.itemChange.next({ item: this.item, itemComponent: this });
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

    console.log(top);
    console.log(left);
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

  render() {
    return (
      <div
        className={styles.gridsterItem}
        ref={this.elRef as React.RefObject<HTMLDivElement>}
      >
        {this.props.children}
        <div
          className={styles.gridsterItemResizableHandler + ' ' + styles.handleS}
        ></div>
        <div
          className={styles.gridsterItemResizableHandler + ' ' + styles.handleE}
        ></div>
        <div
          className={styles.gridsterItemResizableHandler + ' ' + styles.handleN}
        ></div>
        <div
          className={styles.gridsterItemResizableHandler + ' ' + styles.handleW}
        ></div>
        <div
          className={
            styles.gridsterItemResizableHandler + ' ' + styles.handleSE
          }
        ></div>
        <div
          className={
            styles.gridsterItemResizableHandler + ' ' + styles.handleNE
          }
        ></div>
        <div
          className={
            styles.gridsterItemResizableHandler + ' ' + styles.handleSW
          }
        ></div>
        <div
          className={
            styles.gridsterItemResizableHandler + ' ' + styles.handleNW
          }
        ></div>
      </div>
    )
  }
}
