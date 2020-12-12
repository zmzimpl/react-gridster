import { GridsterItemInterface } from './gridsterItem.interface';
import { GridsterComponentInterface } from './gridster.interface';
export declare abstract class GridsterItemComponentInterface {
    item: GridsterItemInterface;
    $item: GridsterItemInterface;
    top: number;
    left: number;
    width: number;
    height: number;
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
