import { IRobot, IGrid } from "src/utils/interfaces";
import {
  ICommandInterpreter,
  ICommand,
  ICommandContext,
} from "src/models/Commands/common/Command.interfaces";
import { COMMANDS } from "src/models/Commands/common/Command.constants";

export class CommandInterpreter implements ICommandInterpreter {
  private commands: ICommand[] = [];
  private robot: IRobot;
  private grid: IGrid;

  constructor(robot: IRobot, grid: IGrid) {
    this.robot = robot;
    this.grid = grid;
  }

  /**Handle a command as string, and execute if valid*/
  interpret(command: string): void {
    const commandContext: ICommandContext = {
      robot: this.robot,
      grid: this.grid,
      command: command,
    };

    let commandInstance: ICommand | undefined;

    for (const [, matcher] of Object.entries(COMMANDS)) {
      const match = command.match(matcher.regex);
      if (match) {
        commandInstance = new matcher.command(commandContext);
        break;
      }
    }

    // push command to history and execute
    if (commandInstance) {
      this.commands.push(commandInstance);
      commandInstance.execute();
      console.log(this.grid.printGrid());
    } else {
      console.error("Type 'HELP' for available commands.");
    }
  }

  getCommands(): ICommand[] {
    return this.commands;
  }
}
