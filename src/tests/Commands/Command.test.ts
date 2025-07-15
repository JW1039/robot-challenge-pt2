import { CommandInterpreter } from "src/models/CommandInterpreter";
import { Facing, IRobot, IGrid } from "src/utils/interfaces";
import { TurnDirections } from "src/utils/constants";

const mockPrintGrid = jest.fn();
const mockConsoleLog = jest.spyOn(console, "log").mockImplementation(() => {});
const mockConsoleError = jest
  .spyOn(console, "error")
  .mockImplementation(() => {});

const createMockRobot = (): jest.Mocked<IRobot> => ({
  place: jest.fn().mockReturnValue(true),
  turn: jest.fn().mockReturnValue(true),
  move: jest.fn().mockReturnValue(true),
  report: jest.fn().mockReturnValue("0,0,NORTH"),
  getCharacter: jest.fn().mockReturnValue("R"),
});

const createMockGrid = (): jest.Mocked<IGrid> => ({
  isPositionValid: jest.fn().mockReturnValue(true),
  moveEntity: jest.fn().mockReturnValue(true),
  placeEntity: jest.fn().mockReturnValue(true),
  removeEntity: jest.fn().mockReturnValue(true),
  getEntityPosition: jest.fn().mockReturnValue({ x: 0, y: 0 }),
  printGrid: mockPrintGrid,
});

describe("CommandInterpreter", () => {
  let robot: jest.Mocked<IRobot>;
  let grid: jest.Mocked<IGrid>;
  let interpreter: CommandInterpreter;

  beforeEach(() => {
    // Arrange
    jest.clearAllMocks();
    robot = createMockRobot();
    grid = createMockGrid();
    interpreter = new CommandInterpreter(robot, grid);
  });

  describe("PLACE", () => {
    it("should execute command and print grid", () => {
      // Act
      interpreter.interpret("PLACE 1,2,NORTH");
      // Assert
      expect(robot.place).toHaveBeenCalledWith(
        { x: 1, y: 2 },
        Facing.NORTH,
        grid
      );
      expect(mockPrintGrid).toHaveBeenCalled();
      expect(interpreter.getCommands()).toHaveLength(1);
    });

    it("should log error on command failure", () => {
      // Act
      robot.place.mockReturnValue(false);
      interpreter.interpret("PLACE 1,2,NORTH");
      // Assert
      expect(robot.place).toHaveBeenCalledWith(
        { x: 1, y: 2 },
        Facing.NORTH,
        grid
      );
      expect(mockPrintGrid).toHaveBeenCalled();
      expect(mockConsoleLog).toHaveBeenCalledWith(
        "-- ERROR: Invalid placement coordinates or direction. --"
      );
      expect(interpreter.getCommands()).toHaveLength(1);
    });
  });

  describe("MOVE", () => {
    it("should execute command and print grid", () => {
      // Act
      interpreter.interpret("MOVE");
      // Assert
      expect(robot.move).toHaveBeenCalled();
      expect(mockPrintGrid).toHaveBeenCalled();
      expect(interpreter.getCommands()).toHaveLength(1);
    });
  });

  describe("TURN", () => {
    it("should execute LEFT command and print grid", () => {
      // Act
      interpreter.interpret("LEFT");
      // Assert
      expect(robot.turn).toHaveBeenCalledWith(TurnDirections.LEFT);
      expect(mockPrintGrid).toHaveBeenCalled();
      expect(interpreter.getCommands()).toHaveLength(1);
    });

    it("should execute RIGHT command and print grid", () => {
      // Act
      interpreter.interpret("RIGHT");
      // Assert
      expect(robot.turn).toHaveBeenCalledWith(TurnDirections.RIGHT);
      expect(mockPrintGrid).toHaveBeenCalled();
      expect(interpreter.getCommands()).toHaveLength(1);
    });

    it("should log error on command failure", () => {
      // Arrange
      robot.turn.mockReturnValue(false);

      // Act
      interpreter.interpret("RIGHT");
      // Assert
      expect(robot.turn).toHaveBeenCalledWith(TurnDirections.RIGHT);
      expect(mockPrintGrid).toHaveBeenCalled();
      expect(interpreter.getCommands()).toHaveLength(1);
      expect(mockConsoleLog).toHaveBeenCalledWith(
        "-- ERROR: Unable to turn. --"
      );
    });
  });

  describe("REPORT", () => {
    it("should execute REPORT command and print grid", () => {
      // Act
      interpreter.interpret("REPORT");
      // Assert
      expect(robot.report).toHaveBeenCalled();
      expect(mockPrintGrid).toHaveBeenCalled();
      expect(interpreter.getCommands()).toHaveLength(1);
    });
  });

  describe("HELP", () => {
    it("should execute HELP command and print grid", () => {
      // Act
      interpreter.interpret("HELP");
      // Assert
      expect(mockPrintGrid).toHaveBeenCalled();
      expect(interpreter.getCommands()).toHaveLength(1);
    });
  });

  describe("Other", () => {
    it("should log error for unknown command", () => {
      // Act
      interpreter.interpret("UNKNOWN");
      // Assert
      expect(mockConsoleError).toHaveBeenCalledWith(
        "Type 'HELP' for available commands."
      );
      expect(interpreter.getCommands()).toHaveLength(0);
    });

    it("should not add command if regex does not match", () => {
      // Act
      interpreter.interpret("INVALIDCOMMAND");
      // Assert
      expect(interpreter.getCommands()).toHaveLength(0);
    });

    it("should store all executed commands", () => {
      // Act
      interpreter.interpret("PLACE 0,0,NORTH");
      interpreter.interpret("MOVE");
      interpreter.interpret("LEFT");
      // Assert
      expect(interpreter.getCommands()).toHaveLength(3);
    });
  });
});
