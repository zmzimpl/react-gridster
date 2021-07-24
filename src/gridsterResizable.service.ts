import {GridsterComponentInterface} from './gridster.interface';
import {GridsterItemComponentInterface} from './gridsterItem.interface';
import {GridsterPush} from './gridsterPush.service';
import {GridsterPushResize} from './gridsterPushResize.service';
import {GridsterResizeEventType, MouseEvent2} from './gridsterResizeEventType.interface';


export class GridsterResizable {
  gridsterItem: GridsterItemComponentInterface;
  gridster: GridsterComponentInterface;
  lastMouse: {
    clientX: number,
    clientY: number
  };
  itemBackup: number[];
  resizeEventScrollType: GridsterResizeEventType;
  directionFunction!: (e: { clientX: number; clientY: number; }) => void;
  dragFunction!: (event: MouseEvent) => void;
  dragStopFunction!: (event: MouseEvent2) => void;
  resizeEnabled!: boolean;
  mousemove!: () => void;
  mouseup!: () => void;
  mouseleave!: () => void;
  cancelOnBlur!: () => void;
  touchmove!: () => void;
  touchend!: () => void;
  touchcancel!: () => void;
  push!: GridsterPush;
  pushResize!: GridsterPushResize;
  minHeight!: number;
  minWidth!: number;
  offsetTop!: number;
  offsetLeft!: number;
  diffTop!: number;
  diffLeft!: number;
  diffRight!: number;
  diffBottom!: number;
  margin!: number;
  originalClientX!: number;
  originalClientY!: number;
  top!: number;
  left!: number;
  bottom!: number;
  right!: number;
  width!: number;
  height!: number;
  newPosition!: number;

  constructor(gridsterItem: GridsterItemComponentInterface, gridster: GridsterComponentInterface) {
    this.gridsterItem = gridsterItem;
    this.gridster = gridster;
    this.lastMouse = {
      clientX: 0,
      clientY: 0
    };
    this.itemBackup = [0, 0, 0, 0];
    this.resizeEventScrollType = {w: false, e: false, n: false, s: false};
  }

  toggle(): void {
    
  }
}
