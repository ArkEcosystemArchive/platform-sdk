import { Events } from "../events";
import { Environment } from "../../../environment/env";
import { IProfile } from "../../../contracts";

const { ipcMain } = require("electron");

export class Handlers {
	readonly #env: Environment;

	public constructor(env: Environment) {
		this.#env = env;
	}

	public registerHandlers() {

		ipcMain.handle(Events.ProfileFactory.fromName, async (event, { name }) => {
			const profile: IProfile = this.#env.profiles().findByName(name) || this.#env.profiles().create(name);
			event.reply(Events.ProfileFactory.fromName, profile.toObject());
		});

		ipcMain.handle(Events.ProfileFactory.fromId, async (event, { id }) => {
			const profile: IProfile = this.#env.profiles().findById(id);
			event.reply(Events.ProfileFactory.fromId, profile.toObject());
		});

	}
}
