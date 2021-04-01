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

		console.log('Handlers.registerHandlers()');

		ipcMain.handle("ProfileRepository.fill", (event, { profiles }) => {
			console.log('ProfileRepository.fill');

			this.#env.profiles().fill(profiles);
		});

		ipcMain.handle("ProfileRepository.all",  (event, { }) => {
			console.log('handling ProfileRepository.all');
			return this.#env.profiles().all();
		});

		ipcMain.handle("ProfileRepository.first", (event, { }) => {
			console.log('handling ProfileRepository.first');
			return this.#env.profiles().first();
		});

		ipcMain.handle("ProfileRepository.last", (event, { }) => {
			console.log('handling ProfileRepository.last');
			return this.#env.profiles().last();
		});

		ipcMain.handle("ProfileRepository.keys", (event, { }) => {
			console.log('handling ProfileRepository.keys');
			return this.#env.profiles().keys();
		});

		ipcMain.handle("ProfileRepository.values", (event, { }) => {
			console.log('handling ProfileRepository.values');
			return this.#env.profiles().values();
		});

		ipcMain.handle("ProfileRepository.findById", (event, { id }) => {
			console.log('handling ProfileRepository.findById');
			return this.#env.profiles().findById(id);
		});

		ipcMain.handle("ProfileRepository.flush", (event, { }) => {
			console.log('handling ProfileRepository.flush');
			return this.#env.profiles().flush();
		});

		ipcMain.handle("ProfileRepository.count", (event, { }) => {
			console.log('handling ProfileRepository.count');
			// return this.#env.profiles().count();
			return 0;
		});



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
