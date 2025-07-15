import {
  ICommand,
  ICommandContext,
} from "src/models/Commands/common/Command.interfaces";
import { CommandBase } from "src/models/Commands/common/Command";

/**Command: REPORT*/
export class ReportCommand extends CommandBase implements ICommand {
  constructor(commandContext: ICommandContext) {
    super(commandContext);
  }

  execute() {
    console.log(this.commandContext.robot.report());
  }
}
