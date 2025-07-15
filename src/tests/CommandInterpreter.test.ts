import { CommandInterpreter } from "src/models/CommandInterpreter";
import {
  ICommand,
  ICommandContext,
} from "src/models/Commands/common/Command.interfaces";
import { COMMANDS } from "src/models/Commands/common/Command.constants";

const mockRobot = { name: "TestBot" } as any;
const mockGrid = { printGrid: jest.fn(() => "GridPrinted") } as any;
const mockConsoleLog = jest.spyOn(console, "log").mockImplementation(() => {});

class MockCommand implements ICommand {
  execute = jest.fn();
  constructor(context: ICommandContext) {}
}

describe("CommandInterpreter", () => {
  let interpreter: CommandInterpreter;

  beforeEach(() => {
    // Arrange
    interpreter = new CommandInterpreter(mockRobot, mockGrid);
    jest.clearAllMocks();
  });

  it("should construct with robot and grid", () => {
    // Assert
    expect(interpreter).toBeInstanceOf(CommandInterpreter);
  });

  it("should add and execute a valid command", () => {
    // Arrange
    const testRegex = /^TEST$/;
    (COMMANDS as any).TEST = { regex: testRegex, command: MockCommand };

    // Act
    interpreter.interpret("TEST");

    // Assert
    const commands = interpreter.getCommands();
    expect(commands.length).toBe(1);
    expect(commands[0]).toBeInstanceOf(MockCommand);
    expect(commands[0].execute).toHaveBeenCalled();
    expect(mockGrid.printGrid).toHaveBeenCalled();
  });

  it("should log error for invalid command", () => {
    // Arrange
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    // Act
    interpreter.interpret("INVALID");

    // Assert
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Type 'HELP' for available commands."
    );
    expect(interpreter.getCommands().length).toBe(0);
    consoleErrorSpy.mockRestore();
  });
});
