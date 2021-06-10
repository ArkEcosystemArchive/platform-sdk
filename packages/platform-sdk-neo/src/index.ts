import { manifest } from "./manifest";
import { schema } from "./coin.schema";
import { ServiceProvider } from "./coin.provider";
import { DataTransferObjects } from "./coin.dtos";

export const NEO = {
	dataTransferObjects: DataTransferObjects, // @TODO: consistent casing to avoid alias
	manifest,
	schema,
	ServiceProvider,
};
