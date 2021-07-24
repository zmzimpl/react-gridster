
import {GridsterComponentInterface} from './gridster.interface';
import { GridsterItemComponentInterface } from './gridsterItem.interface';
import { GridsterPush } from './gridsterPush.service';
import { GridsterSwap } from './gridsterSwap.service';

export class GridsterDraggable {
  gridsterItem: GridsterItemComponentInterface;
  gridster: GridsterComponentInterface;
  lastMouse: {
    clientX: number,
    clientY: number
  };
  offsetLeft!: number;
  offsetTop!: number;
  margin!: number;
  diffTop!: number;
  diffLeft!: number;
  originalClientX!: number;
  originalClientY!: number;
  top!: number;
  left!: number;
  height!: number;
  width!: number;
  positionX!: number;
  positionY!: number;
  positionXBackup!: number;
  positionYBackup!: number;
  enabled!: boolean;
  dragStartFunction!: (event: MouseEvent) => void;
  dragFunction!: (event: MouseEvent) => void;
  dragStopFunction!: (event: MouseEvent) => void;
  mousemove!: () => void;
  mouseup!: () => void;
  mouseleave!: () => void;
  cancelOnBlur!: () => void;
  touchmove!: () => void;
  touchend!: () => void;
  touchcancel!: () => void;
  mousedown!: () => void;
  touchstart!: () => void;
  push!: GridsterPush;
  swap!: GridsterSwap;
  path: Array<{ x: number, y: number }>;
  collision: GridsterItemComponentInterface | boolean = false;

  constructor(gridsterItem: GridsterItemComponentInterface, gridster: GridsterComponentInterface) {
    this.gridsterItem = gridsterItem;
    this.gridster = gridster;
    this.lastMouse = {
      clientX: 0,
      clientY: 0
    };
    this.path = [];
  }

  toggle(): void {
    
  }
}
