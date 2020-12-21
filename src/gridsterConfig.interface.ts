import {GridsterItemInterface} from './GridsterItem.interface';
import {GridsterItemComponentInterface} from './GridsterItemComponent.interface';
import {GridsterComponentInterface} from './Gridster.interface';

export type gridTypes = 'fit' | 'scrollVertical' | 'scrollHorizontal' | 'fixed' | 'verticalFixed' | 'horizontalFixed';
export type displayGrids = 'always' | 'onDrag&Resize' | 'none';
export type compactTypes =
  'none'
  | 'compactUp'
  | 'compactLeft'
  | 'compactUp&Left'
  | 'compactLeft&Up'
  | 'compactRight'
  | 'compactUp&Right'
  | 'compactRight&Up';

export enum GridType {
  Fit = 'fit',
  ScrollVertical = 'scrollVertical',
  ScrollHorizontal = 'scrollHorizontal',
  Fixed = 'fixed',
  VerticalFixed = 'verticalFixed',
  HorizontalFixed = 'horizontalFixed'
}

export enum DisplayGrid {
  Always = 'always',
  OnDragAndResize = 'onDrag&Resize',
  None = 'none'
}

export enum CompactType {
  None = 'none',
  CompactUp = 'compactUp',
  CompactLeft = 'compactLeft',
  CompactUpAndLeft = 'compactUp&Left',
  CompactLeftAndUp = 'compactLeft&Up',
  CompactRight = 'compactRight',
  CompactUpAndRight = 'compactUp&Right',
  CompactRightAndUp = 'compactRight&Up',
}

export interface GridsterConfig {
  gridType?: gridTypes;
  fixedColWidth?: number;
  fixedRowHeight?: number;
  keepFixedHeightInMobile?: boolean;
  keepFixedWidthInMobile?: boolean;
  setGridSize?: boolean;
  compactType?: compactTypes;
  mobileBreakpoint?: number;
  minCols?: number;
  maxCols?: number;
  minRows?: number;
  maxRows?: number;
  defaultItemCols?: number;
  defaultItemRows?: number;
  maxItemCols?: number;
  maxItemRows?: number;
  minItemCols?: number;
  minItemRows?: number;
  minItemArea?: number;
  maxItemArea?: number;
  margin?: number;
  outerMargin?: boolean;
  outerMarginTop?: number | null;
  outerMarginRight?: number | null;
  outerMarginBottom?: number | null;
  outerMarginLeft?: number | null;
  useTransformPositioning?: boolean;
  scrollSensitivity?: number | null;
  scrollSpeed?: number;
  initCallback?: (gridster: GridsterComponentInterface) => void;
  destroyCallback?: (gridster: GridsterComponentInterface) => void;
  gridSizeChangedCallback?: (gridster: GridsterComponentInterface) => void;
  itemChangeCallback?: (item: GridsterItemInterface, itemComponent: GridsterItemComponentInterface) => void;
  itemResizeCallback?: (item: GridsterItemInterface, itemComponent: GridsterItemComponentInterface) => void;
  itemInitCallback?: (item: GridsterItemInterface, itemComponent: GridsterItemComponentInterface) => void;
  itemRemovedCallback?: (item: GridsterItemInterface, itemComponent: GridsterItemComponentInterface) => void;
  itemValidateCallback?: (item: GridsterItemInterface) => boolean;
  draggable?: Draggable;
  resizable?: Resizable;
  swap?: boolean;
  swapWhileDragging?: boolean;
  pushItems?: boolean;
  disablePushOnDrag?: boolean;
  disablePushOnResize?: boolean;
  disableAutoPositionOnConflict?: boolean;
  pushDirections?: PushDirections;
  pushResizeItems?: boolean;
  displayGrid?: displayGrids;
  disableWindowResize?: boolean;
  disableWarnings?: boolean;
  scrollToNewItems?: boolean;
  disableScrollHorizontal?: boolean;
  disableScrollVertical?: boolean;
  enableEmptyCellClick?: boolean;
  enableEmptyCellContextMenu?: boolean;
  enableEmptyCellDrop?: boolean;
  enableEmptyCellDrag?: boolean;
  enableOccupiedCellDrop?: boolean;
  emptyCellClickCallback?: (event: MouseEvent, item: GridsterItemInterface) => void;
  emptyCellContextMenuCallback?: (event: MouseEvent, item: GridsterItemInterface) => void;
  emptyCellDropCallback?: (event: MouseEvent, item: GridsterItemInterface) => void;
  emptyCellDragCallback?: (event: MouseEvent, item: GridsterItemInterface) => void;
  emptyCellDragMaxCols?: number;
  emptyCellDragMaxRows?: number;
  ignoreMarginInRow?: boolean;
  api?: {
    resize?: () => void,
    optionsChanged?: () => void,
    getNextPossiblePosition?: (newItem: GridsterItemInterface) => boolean,
    getFirstPossiblePosition?: (item: GridsterItemInterface) => GridsterItemInterface,
    getLastPossiblePosition?: (item: GridsterItemInterface) => GridsterItemInterface,
  };

  [propName: string]: any;
}

export interface DragBase {
  enabled?: boolean;
  stop?: (item: GridsterItemInterface, itemComponent: GridsterItemComponentInterface, event: MouseEvent) => Promise<any> | void;
  start?: (item: GridsterItemInterface, itemComponent: GridsterItemComponentInterface, event: MouseEvent) => void;
  delayStart?: number;
}

export interface Draggable extends DragBase {
  ignoreContentClass?: string;
  ignoreContent?: boolean;
  dragHandleClass?: string;
  dropOverItems?: boolean;
  dropOverItemsCallback?: (source: GridsterItemInterface, target: GridsterItemInterface, grid?: GridsterComponentInterface) => void;
  dropOverItemStack?: boolean, 	// ����Item������һ��Item���з�Ŀ��Item�Ĵ�С������ʱҪ��֤dropOverItemStackΪfalse
  dropOverItemSplit?: boolean	// ����Item�ѵ����������ɲ��֣�����ʱҪ��֤dropOverItemSplitΪfalse
}

export interface Resizable extends DragBase {
  handles?: {
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
