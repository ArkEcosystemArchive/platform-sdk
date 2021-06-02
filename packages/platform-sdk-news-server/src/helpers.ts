import { PrismaClient } from "../prisma/generated";

export const useDatabase = (): PrismaClient =>
	new PrismaClient({
		log: ["info", "warn", "error"],
	});

export const useLogger = () => console;
