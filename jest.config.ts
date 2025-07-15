import type { Config } from "jest";

const config: Config = {
  verbose: true,
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/src/$1",
  },
  globals: {
    transform: {
      "^.+\\.tsx?$": "ts-jest",
    },
  },
};

export default config;
