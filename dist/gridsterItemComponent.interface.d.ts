import { GridsterItemInterface } from './GridsterItem.interface';
import { GridsterComponentInterface } from './Gridster.interface';
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
