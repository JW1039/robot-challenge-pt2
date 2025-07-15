import readLine from "src/utils/readLine";
import { Table } from "src/models/Table";
import { GRID_HEIGHT, GRID_WIDTH } from "src/utils/constants";
import { Robot } from "src/models/Robot";
import { CommandInterpreter } from "src/models/CommandInterpreter";
import { cleanInput } from "src/utils/helpers";

export async function main() {
  const grid = new Table(GRID_WIDTH, GRID_HEIGHT);
  const robot = new Robot();
  const interpreter = new CommandInterpreter(robot, grid);

  let command: string = "";

  while (cleanInput(command) !== "EXIT") {
    console.log();
    command = cleanInput(
      await readLine("Enter command (or type 'EXIT' to quit): ")
    );
    if (command === "EXIT") {
      break;
    }
    interpreter.interpret(command);
  }
}

if (require.main === module) {
  main();
}
