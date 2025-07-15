import { CommandInterpreter } from "src/models/CommandInterpreter";
import { Robot } from "src/models/Robot";
import { Table } from "src/models/Table";
import { GRID_WIDTH, GRID_HEIGHT } from "src/utils/constants";
import { cleanInput } from "src/utils/helpers";
import { integrationTestCases } from "src/tests/testCases";

describe("Integration Test: main()", () => {
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  describe("E2E Scenarios", () => {
    it.each(integrationTestCases)(
      "$#. Correctly interprets: $name",
      ({ commands, expected }) => {
        // Arrange
        const grid = new Table(GRID_WIDTH, GRID_HEIGHT);
        const robot = new Robot();
        const interpreter = new CommandInterpreter(robot, grid);

        // Act
        for (const command of commands) {
          interpreter.interpret(cleanInput(command));
        }

        // Assert
        expect(consoleSpy).toHaveBeenCalledWith(expected);
      }
    );
  });
});
