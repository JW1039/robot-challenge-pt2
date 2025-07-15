export const integrationTestCases = [
  {
    name: "PLACE 0,0,NORTH → MOVE → REPORT",
    commands: ["PLACE 0,0,NORTH", "MOVE", "REPORT"],
    expected: "0,1,NORTH",
  },
  {
    name: "PLACE 0,0,NORTH → LEFT → REPORT",
    commands: ["PLACE 0,0,NORTH", "LEFT", "REPORT"],
    expected: "0,0,WEST",
  },
  {
    name: "PLACE 1,2,EAST → MOVE, MOVE, LEFT, MOVE, REPORT",
    commands: ["PLACE 1,2,EAST", "MOVE", "MOVE", "LEFT", "MOVE", "REPORT"],
    expected: "3,3,NORTH",
  },
  {
    name: "PLACE 0,0,SOUTH → MOVE → REPORT (should not move off table)",
    commands: ["PLACE 0,0,SOUTH", "MOVE", "REPORT"],
    expected: "0,0,SOUTH",
  },
  {
    name: "PLACE 4,4,EAST → MOVE → REPORT (should not move off table)",
    commands: ["PLACE 4,4,EAST", "MOVE", "REPORT"],
    expected: "4,4,EAST",
  },
  {
    name: "PLACE 2,2,SOUTH → RIGHT, MOVE, REPORT",
    commands: ["PLACE 2,2,SOUTH", "RIGHT", "MOVE", "REPORT"],
    expected: "1,2,WEST",
  },
  {
    name: "PLACE 1,1,WEST → MOVE, LEFT, MOVE, REPORT",
    commands: ["PLACE 1,1,WEST", "MOVE", "LEFT", "MOVE", "REPORT"],
    expected: "0,0,SOUTH",
  },
  {
    name: "PLACE 0,0,NORTH → MOVE, MOVE, MOVE, MOVE, MOVE, REPORT (should stop at edge)",
    commands: [
      "PLACE 0,0,NORTH",
      "MOVE",
      "MOVE",
      "MOVE",
      "MOVE",
      "MOVE",
      "REPORT",
    ],
    expected: "0,4,NORTH",
  },
  {
    name: "PLACE 0,0,NORTH → RIGHT, MOVE, MOVE, MOVE, MOVE, MOVE, REPORT (should stop at edge)",
    commands: [
      "PLACE 0,0,NORTH",
      "RIGHT",
      "MOVE",
      "MOVE",
      "MOVE",
      "MOVE",
      "MOVE",
      "REPORT",
    ],
    expected: "4,0,EAST",
  },
  {
    name: "PLACE 0,0,NORTH → PLACE 2,2,EAST → MOVE, REPORT (should use latest PLACE)",
    commands: ["PLACE 0,0,NORTH", "PLACE 2,2,EAST", "MOVE", "REPORT"],
    expected: "3,2,EAST",
  },
  {
    name: "PLACE 0,0,NORTH → LEFT, LEFT, LEFT, LEFT, REPORT (full rotation)",
    commands: ["PLACE 0,0,NORTH", "LEFT", "LEFT", "LEFT", "LEFT", "REPORT"],
    expected: "0,0,NORTH",
  },
  {
    name: "PLACE 0,0,NORTH → RIGHT, RIGHT, RIGHT, RIGHT, REPORT (full rotation)",
    commands: ["PLACE 0,0,NORTH", "RIGHT", "RIGHT", "RIGHT", "RIGHT", "REPORT"],
    expected: "0,0,NORTH",
  },
  {
    name: "PLACE 0,0,NORTH → MOVE, PLACE 1,1,SOUTH, MOVE, REPORT",
    commands: ["PLACE 0,0,NORTH", "MOVE", "PLACE 1,1,SOUTH", "MOVE", "REPORT"],
    expected: "1,0,SOUTH",
  },
  {
    name: "PLACE 0,0,NORTH → REPORT (initial position)",
    commands: ["PLACE 0,0,NORTH", "REPORT"],
    expected: "0,0,NORTH",
  },
  {
    name: "PLACE 0,0,NORTH → MOVE, LEFT, MOVE, REPORT",
    commands: ["PLACE 0,0,NORTH", "MOVE", "LEFT", "MOVE", "REPORT"],
    expected: "0,1,WEST",
  },
] as const;
