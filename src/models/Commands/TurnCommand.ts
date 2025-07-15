import { logError } from "src/utils/helpers";
import { TurnDirection } from "src/utils/interfaces";
import { COMMANDS } from "src/models/Commands/common/Command.constants";
import {
  ICommand,
  ICommandContext,
} from "src/models/Commands/common/Command.interfaces";
import { CommandBase } from "src/models/Commands/common/Command";

/**Command: LEfT or RIGHT*/
export class TurnCommand extends CommandBase implements ICommand {
  private params: TurnDirection;

  constructor(commandContext: ICommandContext) {
    super(commandContext);
    this.params = commandContext.command.match(
      COMMANDS.TURN.regex
    )?.[1] as TurnDirection;
  }

  execute() {
    if (!this.commandContext.robot.turn(this.params)) {
      logError("Unable to turn.");
    }
  }
}
