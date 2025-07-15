import { Coordinates, Facing, IGrid, IRobot } from "src/utils/interfaces";

export interface ICommand {
  execute(): void;
}

export interface ICommandInterpreter {
  interpret(command: string): void;
  getCommands(): ICommand[];
}

export interface ICommandContext {
  robot: IRobot;
  grid: IGrid;
  command: string;
}
