import { Coordinates, Grid, IGridEntity, IGrid } from "src/utils/interfaces";
import { EmptyGridEntity } from "src/models/EmptyGridEntity";

export class Table implements IGrid {
  private grid: Grid;
  private emptyGridEntity = new EmptyGridEntity();

  constructor(rows: number, columns: number) {
    this.emptyGridEntity = new EmptyGridEntity();
    this.grid = Array.from({ length: rows }, () =>
      Array.from({ length: columns }, () => this.emptyGridEntity)
    );
  }

  /**Convert coordinates to list index*/
  private coordinatesToIndex(coordinates: Coordinates): Coordinates {
    return {
      x: coordinates.x,
      y: this.grid.length - 1 - coordinates.y,
    };
  }

  /**Check if cell X entity is empty*/
  private isCellEmpty(entity: IGridEntity): boolean {
    return entity === this.emptyGridEntity;
  }

  /**Check if given X and Y position is within bounds*/
  isPositionValid(coordinates: Coordinates): boolean {
    const { x, y } = this.coordinatesToIndex(coordinates);
    return y >= 0 && y < this.grid.length && x >= 0 && x < this.grid[0].length;
  }

  /**Get X and Y position of given Z entity*/
  getEntityPosition(entity: IGridEntity): Coordinates | undefined {
    const row = this.grid.findIndex((row) => row.includes(entity));
    if (row < 0) return;
    const column = this.grid[row].findIndex((cell) => cell === entity);
    return this.coordinatesToIndex({ x: column, y: row });
  }

  /**Remove an entity from the grid given Z entity*/
  removeEntity(entity: IGridEntity): boolean {
    let position = this.getEntityPosition(entity);
    if (!position) return false;
    position = this.coordinatesToIndex(position);
    this.grid[position.y][position.x] = this.emptyGridEntity;
    return true;
  }

  /**Move an entity from A start position to B end position*/
  moveEntity(start: Coordinates, end: Coordinates): boolean {
    start = this.coordinatesToIndex(start);
    end = this.coordinatesToIndex(end);

    if (!this.isPositionValid(start) || !this.isPositionValid(end))
      return false;

    const entity = this.grid[start.y][start.x];
    this.grid[start.y][start.x] = this.emptyGridEntity;
    this.grid[end.y][end.x] = entity;
    return true;
  }

  /**Place X entity in Y position if valid*/
  placeEntity(coordinates: Coordinates, entity: IGridEntity): boolean {
    if (!this.isPositionValid(coordinates)) return false;

    const { x, y } = this.coordinatesToIndex(coordinates);
    if (!this.isCellEmpty(this.grid[y][x])) return false;
    this.grid[y][x] = entity;
    return true;
  }

  /**Return a visual representation of the current grid as a string*/
  printGrid(): string {
    return this.grid
      .map((row) => row.map((cell) => cell.getCharacter()).join(" "))
      .join("\n");
  }
}
