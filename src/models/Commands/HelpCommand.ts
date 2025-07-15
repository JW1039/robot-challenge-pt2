import {
  ICommand,
  ICommandContext,
} from "src/models/Commands/common/Command.interfaces";
import { CommandBase } from "src/models/Commands/common/Command";

/**Command: HELP*/
export class HelpCommand extends CommandBase implements ICommand {
  constructor(commandContext: ICommandContext) {
    super(commandContext);
  }

  execute() {
    console.log("\nExample usage:");
    console.log("PLACE 1,2,EAST");
    console.log("MOVE");
    console.log("MOVE");
    console.log("LEFT");
    console.log("MOVE");
    console.log("REPORT");
    console.log("Output: 3,3,NORTH");
  }
}
