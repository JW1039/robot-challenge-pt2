import { Robot } from "src/models/Robot";
import { TurnDirections } from "src/utils/constants";
import { Facing, IGrid } from "src/utils/interfaces";

describe("Robot", () => {
  let robot: Robot;
  let mockGrid: jest.Mocked<IGrid>;

  beforeEach(() => {
    robot = new Robot();
    mockGrid = {
      getEntityPosition: jest.fn(),
      isPositionValid: jest.fn(),
      moveEntity: jest.fn(),
      placeEntity: jest.fn(),
      removeEntity: jest.fn(),
    } as any;
  });

  describe("place", () => {
    it("places robot on valid position", () => {
      // Arrange
      mockGrid.isPositionValid.mockReturnValue(true);
      mockGrid.placeEntity.mockReturnValue(true);

      // Act
      const result = robot.place({ x: 1, y: 2 }, Facing.EAST, mockGrid);

      // Assert
      expect(result).toBe(true);
      expect(mockGrid.removeEntity).toHaveBeenCalledWith(robot);
      expect(mockGrid.placeEntity).toHaveBeenCalledWith({ x: 1, y: 2 }, robot);
    });

    it("does not place robot on invalid position", () => {
      // Arrange
      mockGrid.isPositionValid.mockReturnValue(false);

      // Act
      const result = robot.place({ x: 5, y: 5 }, Facing.SOUTH, mockGrid);

      // Assert
      expect(result).toBe(false);
      expect(mockGrid.placeEntity).not.toHaveBeenCalled();
    });
  });

  describe("report", () => {
    it("returns position and direction when placed", () => {
      // Arrange
      mockGrid.getEntityPosition.mockReturnValue({ x: 0, y: 0 });
      mockGrid.isPositionValid.mockReturnValue(true);
      robot.place({ x: 0, y: 0 }, Facing.WEST, mockGrid);

      // Act & Assert
      expect(robot.report()).toBe("0,0,WEST");
    });

    it("returns not placed message if not on grid", () => {
      // Act & Assert
      expect(robot.report()).toBe("Robot is not placed on the grid.");
    });
  });

  describe("turn", () => {
    beforeEach(() => {
      robot.place({ x: 1, y: 2 }, Facing.NORTH, mockGrid);
      mockGrid.getEntityPosition.mockReturnValue({ x: 1, y: 2 });
    });

    it("turns right", () => {
      // Act
      robot.turn(TurnDirections.RIGHT);

      // Assert
      expect(robot.report()).toBe("1,2,EAST");
    });

    it("turns left", () => {
      // Act
      robot.turn(TurnDirections.LEFT);

      // Assert
      expect(robot.report()).toBe("1,2,WEST");
    });

    it("wraps direction correctly", () => {
      // Act
      robot.turn(TurnDirections.LEFT); // WEST
      robot.turn(TurnDirections.LEFT); // SOUTH
      robot.turn(TurnDirections.LEFT); // EAST
      robot.turn(TurnDirections.LEFT); // NORTH

      // Assert
      expect(robot.report()).toBe("1,2,NORTH");
    });
  });

  describe("move", () => {
    beforeEach(() => {
      robot.place({ x: 1, y: 1 }, Facing.NORTH, mockGrid);
      mockGrid.getEntityPosition.mockReturnValue({ x: 1, y: 1 });
    });

    it("moves north if valid", () => {
      // Arrange
      mockGrid.isPositionValid.mockReturnValue(true);
      mockGrid.moveEntity.mockReturnValue(true);

      // Act
      const result = robot.move();

      // Assert
      expect(result).toBe(true);
      expect(mockGrid.moveEntity).toHaveBeenCalledWith(
        { x: 1, y: 1, direction: Facing.NORTH },
        { x: 1, y: 2 }
      );
    });

    it("does not move if new position is invalid", () => {
      // Arrange
      mockGrid.isPositionValid.mockReturnValue(false);

      // Act
      const result = robot.move();

      // Assert
      expect(result).toBe(false);
      expect(mockGrid.moveEntity).not.toHaveBeenCalled();
    });

    it("moves east", () => {
      // Arrange
      robot.turn(TurnDirections.RIGHT);
      mockGrid.getEntityPosition.mockReturnValue({ x: 1, y: 1 });
      mockGrid.isPositionValid.mockReturnValue(true);
      mockGrid.moveEntity.mockReturnValue(true);

      // Act
      const result = robot.move();

      // Assert
      expect(result).toBe(true);
      expect(mockGrid.moveEntity).toHaveBeenCalledWith(
        { x: 1, y: 1, direction: Facing.EAST },
        { x: 2, y: 1 }
      );
    });
  });

  describe("getCharacter", () => {
    it("returns correct character for each direction", () => {
      // Arrange
      mockGrid.getEntityPosition.mockReturnValue({ x: 0, y: 0 });

      // Act & Assert
      robot.place({ x: 0, y: 0 }, Facing.NORTH, mockGrid);
      expect(robot.getCharacter()).toBe("↑");
      robot.turn(TurnDirections.RIGHT);
      expect(robot.getCharacter()).toBe("→");
      robot.turn(TurnDirections.RIGHT);
      expect(robot.getCharacter()).toBe("↓");
      robot.turn(TurnDirections.RIGHT);
      expect(robot.getCharacter()).toBe("←");
    });
  });

  describe("middleware", () => {
    it("prevents move if not placed", () => {
      // Act & Assert
      expect(robot.move()).toBe(false);
    });

    it("prevents turn if not placed", () => {
      // Act & Assert
      expect(robot.turn(TurnDirections.LEFT)).toBe(false);
    });
  });
});
