import { logError } from "src/utils/helpers";
import {
  ICommand,
  ICommandContext,
} from "src/models/Commands/common/Command.interfaces";
import { CommandBase } from "src/models/Commands/common/Command";

/**Command: MOVE*/
export class MoveCommand extends CommandBase implements ICommand {
  constructor(commandContext: ICommandContext) {
    super(commandContext);
  }

  execute() {
    if (!this.commandContext.robot.move()) {
      logError("You cannot move out of bounds.");
    }
  }
}
