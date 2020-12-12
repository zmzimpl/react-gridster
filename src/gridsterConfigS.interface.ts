import {compactTypes, displayGrids, gridTypes} from './gridsterConfig.interface';
import {GridsterItemInterface} from './gridsterItem.interface';
import {GridsterComponentInterface} from './gridster.interface';

export interface GridsterConfigS {
  gridType: gridTypes;
  fixedColWidth: number;
  fixedRowHeight: number;
  keepFixedHeightInMobile: boolean;
  keepFixedWidthInMobile: boolean;
  setGridSize: boolean;
  compactType: compactTypes;
  mobileBreakpoint: number;
  minCols: number;
  maxCols: number;
  minRows: number;
  maxRows: number;
  defaultItemCols: number;
  defaultItemRows: number;
  maxItemCols: number;
  maxItemRows: number;
  minItemCols: number;
  minItemRows: number;
  minItemArea: number;
  maxItemArea: number;
  margin: number;
  outerMargin: boolean;
  outerMarginTop: number | null;
  outerMarginRight: number | null;
  outerMarginBottom: number | null;
  outerMarginLeft: number | null;
  useTransformPositioning: boolean;
  scrollSensitivity: number;
  scrollSpeed: number;
  draggable: Draggable;
  resizable: Resizable;
  swap: boolean;
  swapWhileDragging: boolean;
  pushItems: boolean;
  disablePushOnDrag: boolean;
  disablePushOnResize: boolean;
  disableAutoPositionOnConflict: boolean;
  pushDirections: PushDirections;
  pushResizeItems: boolean;
  displayGrid: displayGrids;
  disableWindowResize: boolean;
  disableWarnings: boolean;
  scrollToNewItems: boolean;
  disableScrollHorizontal?: boolean;
  disableScrollVertical?: boolean;
  enableEmptyCellClick: boolean;
  enableEmptyCellContextMenu: boolean;
  enableEmptyCellDrop: boolean;
  enableEmptyCellDrag: boolean;
  enableOccupiedCellDrop: boolean;
  emptyCellDragMaxCols: number;
  emptyCellDragMaxRows: number;
  ignoreMarginInRow: boolean;
  api: {
    resize: () => void,
    optionsChanged: () => void,
    getNextPossiblePosition: (newItem: GridsterItemInterface) => boolean,
    getFirstPossiblePosition: (item: GridsterItemInterface) => GridsterItemInterface,
    getLastPossiblePosition: (item: GridsterItemInterface) => GridsterItemInterface,
  };

  [propName: string]: any;
}

export interface DragBase {
  enabled: boolean;
  delayStart: number;

  [propName: string]: any;
}

export interface Draggable extends DragBase {
  ignoreContentClass: string;
  ignoreContent: boolean;
  dragHandleClass: string;
  dropOverItems: boolean;
  dropOverItemsCallback: (source: GridsterItemInterface, target: GridsterItemInterface, grid?: GridsterComponentInterface) => void;
  dropOverItemStack?: boolean, 
  dropOverItemSplit?: boolean
}

export interface Resizable extends DragBase {
  handles: {
    s: boolean,
    e: boolean,
    n: boolean,
    w: boolean,
    se: boolean,
    ne: boolean,
    sw: boolean,
    nw: boolean
  };
}

export interface PushDirections {
  north: boolean;
  east: boolean;
  south: boolean;
  west: boolean;
}
