import {GridsterItemInterface} from './gridsterItem.interface';
// import {GridsterDraggable} from './gridsterDraggable.service';
// import {GridsterResizable} from './gridsterResizable.service';
import {GridsterComponentInterface} from './gridster.interface';

export abstract class GridsterItemComponentInterface {
  item: GridsterItemInterface;
  $item: GridsterItemInterface;
  top: number;
  left: number;
  width: number;
  height: number;
  // drag: GridsterDraggable;
  // resize: GridsterResizable;
  notPlaced: boolean;
  updateOptions: () => void;
  itemChanged: () => void;
  setSize: () => void;
  checkItemChanges: (newValue: GridsterItemInterface, oldValue: GridsterItemInterface) => void;
  canBeDragged: () => boolean;
  canBeResized: () => boolean;
  el: any;
  gridster: GridsterComponentInterface;
}
