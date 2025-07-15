import { ICommandContext } from "src/models/Commands/common/Command.interfaces";

export class CommandBase {
  protected commandContext: ICommandContext;
  constructor(commandContext: ICommandContext) {
    this.commandContext = commandContext;
  }
}
