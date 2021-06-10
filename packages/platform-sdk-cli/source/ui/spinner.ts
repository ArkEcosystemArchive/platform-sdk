import ora from "ora";

export const useSpinner = (message: string): ora.Ora => ora(message).start();
