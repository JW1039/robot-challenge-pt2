import { Table } from "src/models/Table";
import { IGridEntity } from "src/utils/interfaces";

class MockGridEntity implements IGridEntity {
  private char: string;
  constructor(char: string) {
    this.char = char;
  }
  getCharacter() {
    return this.char;
  }
}

describe("Tablenpm", () => {
  let table: Table;
  const rows = 3;
  const columns = 3;

  beforeEach(() => {
    table = new Table(rows, columns);
  });

  describe("placeEntity", () => {
    it("should initialize with all cells empty", () => {
      // Act
      const gridString = table.printGrid();
      // Assert
      const expected = Array(rows)
        .fill(Array(columns).fill(".").join(" "))
        .join("\n");
      expect(gridString).toBe(expected);
    });

    it("should place an entity at a valid position", () => {
      // Arrange
      const entity = new MockGridEntity("A");
      // Act
      const result = table.placeEntity({ x: 1, y: 1 }, entity);
      // Assert
      expect(result).toBe(true);
      expect(table.printGrid().split("\n")[1].split(" ")[1]).toBe("A");
    });

    it("should not place an entity at an invalid position", () => {
      // Arrange
      const entity = new MockGridEntity("B");
      // Act & Assert
      expect(table.placeEntity({ x: -1, y: 0 }, entity)).toBe(false);
      expect(table.placeEntity({ x: 0, y: 3 }, entity)).toBe(false);
      expect(table.placeEntity({ x: 3, y: 0 }, entity)).toBe(false);
    });

    it("should not place an entity in a non-empty cell", () => {
      // Arrange
      const entity1 = new MockGridEntity("C");
      const entity2 = new MockGridEntity("D");
      // Act
      const firstPlace = table.placeEntity({ x: 0, y: 0 }, entity1);
      const secondPlace = table.placeEntity({ x: 0, y: 0 }, entity2);
      // Assert
      expect(firstPlace).toBe(true);
      expect(secondPlace).toBe(false);
    });
  });

  describe("getEntityPosition", () => {
    it("should get the correct entity position", () => {
      // Arrange
      const entity = new MockGridEntity("E");
      table.placeEntity({ x: 2, y: 0 }, entity);
      // Act
      const pos = table.getEntityPosition(entity);
      // Assert
      expect(pos).toEqual({ x: 2, y: 0 });
    });

    it("should return undefined for entity not on grid", () => {
      // Arrange
      const entity = new MockGridEntity("F");
      // Act & Assert
      expect(table.getEntityPosition(entity)).toBeUndefined();
    });

    it("should remove an entity from the grid", () => {
      // Arrange
      const entity = new MockGridEntity("G");
      table.placeEntity({ x: 1, y: 2 }, entity);
      // Act
      const removed = table.removeEntity(entity);
      // Assert
      expect(removed).toBe(true);
      expect(table.getEntityPosition(entity)).toBeUndefined();
    });
  });

  describe("removeEntity", () => {
    it("should not remove an entity not on the grid", () => {
      // Arrange
      const entity = new MockGridEntity("H");
      // Act & Assert
      expect(table.removeEntity(entity)).toBe(false);
    });
  });

  describe("moveEntity", () => {
    it("should move an entity to a valid position", () => {
      // Arrange
      const entity = new MockGridEntity("I");
      table.placeEntity({ x: 0, y: 0 }, entity);
      // Act
      const moved = table.moveEntity({ x: 0, y: 0 }, { x: 2, y: 2 });
      // Assert
      expect(moved).toBe(true);
      expect(table.getEntityPosition(entity)).toEqual({ x: 2, y: 2 });
    });

    it("should not move an entity from an invalid start or end position", () => {
      // Arrange
      const entity = new MockGridEntity("J");
      table.placeEntity({ x: 1, y: 1 }, entity);
      // Act & Assert
      expect(table.moveEntity({ x: -1, y: 1 }, { x: 2, y: 2 })).toBe(false);
      expect(table.moveEntity({ x: 1, y: 1 }, { x: 3, y: 3 })).toBe(false);
    });
  });

  describe("isPositionValid", () => {
    it("should return true for valid positions", () => {
      // Act & Assert
      expect(table.isPositionValid({ x: 0, y: 0 })).toBe(true);
      expect(table.isPositionValid({ x: 2, y: 2 })).toBe(true);
    });

    it("should return false for invalid positions", () => {
      // Act & Assert
      expect(table.isPositionValid({ x: -1, y: 0 })).toBe(false);
      expect(table.isPositionValid({ x: 0, y: 3 })).toBe(false);
      expect(table.isPositionValid({ x: 3, y: 0 })).toBe(false);
    });
  });

  describe("printGrid", () => {
    it("should reflect the current grid state", () => {
      // Arrange
      const entity = new MockGridEntity("Z");
      table.placeEntity({ x: 1, y: 1 }, entity);
      // Act
      const gridLines = table.printGrid().split("\n");
      // Assert
      expect(gridLines.length).toBe(rows);
      expect(gridLines[1].split(" ")[1]).toBe("Z");
    });
  });
});
