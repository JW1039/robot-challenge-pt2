export const cleanInput = (input: string): string => {
  return input.trim().toUpperCase();
};

export const logError = (message: string): void => {
  console.log(`-- ERROR: ${message} --`);
};
