import { logError } from "src/utils/helpers";
import { Position, Facing } from "src/utils/interfaces";
import { COMMANDS } from "src/models/Commands/common/Command.constants";
import {
  ICommand,
  ICommandContext,
} from "src/models/Commands/common/Command.interfaces";
import { CommandBase } from "src/models/Commands/common/Command";

/**Command: PLACE X,Y,Direction*/
export class PlaceCommand extends CommandBase implements ICommand {
  private params: Position;

  constructor(commandContext: ICommandContext) {
    super(commandContext);
    const [, x, y, facing] = commandContext.command.match(
      COMMANDS.PLACE.regex
    )!;
    this.params = {
      x: Number(x),
      y: Number(y),
      direction: Facing[facing as keyof typeof Facing],
    };
  }

  execute() {
    if (
      !this.commandContext.robot.place(
        { x: this.params.x, y: this.params.y },
        this.params.direction,
        this.commandContext.grid
      )
    ) {
      logError("Invalid placement coordinates or direction.");
    }
  }
}
