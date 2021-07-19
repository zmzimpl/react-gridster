
export abstract class GridsterItemComponentInterface {

}

export interface GridsterItem {
  x: number;
  y: number;
  rows: number;
  cols: number;
  layerIndex?: number;
  initCallback?: (item: GridsterItem, itemComponent: GridsterItemComponentInterface) => void;
  dragEnabled?: boolean;
  resizeEnabled?: boolean;
  compactEnabled?: boolean;
  maxItemRows?: number;
  minItemRows?: number;
  maxItemCols?: number;
  minItemCols?: number;
  minItemArea?: number;
  maxItemArea?: number;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [propName: string]: any;
}
