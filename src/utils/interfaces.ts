import { TurnDirections } from "src/utils/constants";

export interface IGrid {
  isPositionValid(coordinates: Coordinates): boolean;
  moveEntity(start: Coordinates, end: Coordinates): boolean;
  placeEntity(coordinates: Coordinates, entity: IGridEntity): boolean;
  removeEntity(entity: IGridEntity): boolean;
  getEntityPosition(entity: IGridEntity): Coordinates | undefined;
  printGrid(): string;
}

export interface IRobot extends IGridEntity {
  turn(direction: TurnDirection): boolean;
  move(): boolean;
  place(coordinates: Coordinates, direction: Facing, grid: IGrid): boolean;
  report(): string;
}

export type Row = IGridEntity[];
export type Grid = Row[];

export type TurnDirection =
  (typeof TurnDirections)[keyof typeof TurnDirections];

export enum Facing {
  NORTH,
  EAST,
  SOUTH,
  WEST,
}

export interface IGridEntity {
  getCharacter(): string;
}

export interface Coordinates {
  x: number;
  y: number;
}

export interface Position extends Coordinates {
  direction: Facing;
}
