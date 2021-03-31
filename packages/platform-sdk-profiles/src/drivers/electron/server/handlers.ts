import { Events } from "../events";
import { Environment } from "../../../environment/env";
import { IProfile } from "../../../contracts";

const { ipcMain } = require("electron");

export class Handlers {

	public constructor(env: Environment) {

		ipcMain.handle(Events.ProfileFactory.fromName, async (event, { name }) => {
			const profile: IProfile = env.profiles().findByName(name) || env.profiles().create(name);
			event.reply(Events.ProfileFactory.fromName, profile.toObject());
		});

		ipcMain.handle(Events.ProfileFactory.fromId, async (event, { id }) => {
			const profile: IProfile = env.profiles().findById(id);
			event.reply(Events.ProfileFactory.fromId, profile.toObject());
		});

	}
}
