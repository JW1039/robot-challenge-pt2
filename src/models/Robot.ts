import { TurnDirections } from "src/utils/constants";
import {
  Coordinates,
  Facing,
  IGrid,
  IRobot,
  Position,
  TurnDirection,
} from "src/utils/interfaces";

export class Robot implements IRobot {
  private grid?: IGrid;
  private direction: Facing;

  constructor() {
    this.direction = Facing.NORTH;
  }

  /**Ensure that grid and position are defined and valid before performing actions*/
  private middleware(fn: (...args: any[]) => any, ...args: any[]): any {
    if (!this.grid || !this.getPosition()) return false;
    return fn(...args);
  }

  /**Get current robot position (x, y and direction)*/
  private getPosition(): Position | undefined {
    const position = this.grid?.getEntityPosition(this);
    if (!position) return;
    return { ...position, direction: this.direction };
  }

  /**Turn robot (left or right). Will loop through North, East, South and West*/
  turn(direction: TurnDirection): boolean {
    return this.middleware(() => {
      const newDirection =
        this.direction + (direction === TurnDirections.RIGHT ? 1 : -1);
      if (newDirection in Facing) {
        this.direction = newDirection;
      } else {
        // wrap back around
        this.direction =
          newDirection > Facing.WEST ? Facing.NORTH : Facing.WEST;
      }
      return true;
    });
  }

  /**Move robot forward in the direction it is facing*/
  move(): boolean {
    return this.middleware(() => {
      // this is not undefined as middleware has asserted
      const position = this.getPosition()!;
      let newPosition: Coordinates = { x: position.x, y: position.y };

      switch (this.direction) {
        case Facing.NORTH:
          newPosition.y += 1;
          break;
        case Facing.EAST:
          newPosition.x += 1;
          break;
        case Facing.SOUTH:
          newPosition.y -= 1;
          break;
        case Facing.WEST:
          newPosition.x -= 1;
          break;
      }

      if (this.grid?.isPositionValid(newPosition)) {
        return this.grid.moveEntity(position, newPosition);
      }
      return false;
    });
  }

  /**Places a robot at X coordinates on Z grid facing Y direction*/
  place(coordinates: Coordinates, direction: Facing, grid: IGrid): boolean {
    this.grid = grid;
    if (this.grid.isPositionValid(coordinates)) {
      this.direction = direction;
      this.grid.removeEntity(this); // remove from previous position if exists
      return this.grid.placeEntity(coordinates, this);
    }
    return false;
  }

  /**Returns a string containing the current X,Y,Direction*/
  report() {
    const position = this.getPosition();
    if (!position) return "Robot is not placed on the grid.";
    return `${position.x},${position.y},${Facing[position.direction]}`;
  }

  /**Get the character to display on the grid*/
  getCharacter() {
    switch (this.direction) {
      case Facing.NORTH:
        return "↑";
      case Facing.EAST:
        return "→";
      case Facing.SOUTH:
        return "↓";
      case Facing.WEST:
        return "←";
      default:
        // this default cannot be reached as direction is assigned in the constructor
        /* istanbul ignore next */
        return "?";
    }
  }
}
