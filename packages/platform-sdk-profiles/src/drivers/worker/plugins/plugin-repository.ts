import { Except } from "type-fest";
import { v4 as uuidv4 } from "uuid";
import { IPluginRepository } from "../../../contracts";

import { DataRepository } from "../../../repositories/data-repository";
import { PluginRegistry } from "./plugin-registry";

interface Plugin {
	id: string;
	name: string;
	version: string;
	isEnabled: boolean;
	permissions: string[];
	urls: string[];
}

export class PluginRepository implements IPluginRepository {
	//
}
