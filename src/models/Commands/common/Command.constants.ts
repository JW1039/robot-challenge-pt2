import { HelpCommand } from "src/models/Commands/HelpCommand";
import { MoveCommand } from "src/models/Commands/MoveCommand";
import { PlaceCommand } from "src/models/Commands/PlaceCommand";
import { ReportCommand } from "src/models/Commands/ReportCommand";
import { TurnCommand } from "src/models/Commands/TurnCommand";

export const COMMANDS = {
  PLACE: {
    regex: /^PLACE\s+(\d+),(\d+),(NORTH|SOUTH|EAST|WEST)$/i,
    command: PlaceCommand,
  },
  MOVE: { regex: /^MOVE$/i, command: MoveCommand },
  TURN: { regex: /^(LEFT|RIGHT)$/i, command: TurnCommand },
  REPORT: { regex: /^REPORT$/i, command: ReportCommand },
  HELP: { regex: /^HELP$/i, command: HelpCommand },
} as const;
