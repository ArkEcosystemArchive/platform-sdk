import { injectable } from "inversify";
import { ipcRenderer } from "electron";
import { IProfile, IProfileExportOptions, IProfileRepository } from "../../../contracts";

import { Profile } from "../profiles/profile";
import { Exceptions } from "@arkecosystem/platform-sdk";

@injectable()
export class ProfileRepository implements IProfileRepository {

	public constructor() {
	}

	public fill(profiles: object): void {
		ipcRenderer.invoke("ProfileRepository.fill", profiles || {})
			.then(() => {
				console.log("ProfileRepository.fill");
			});
	}

	public all(): Record<string, IProfile> {
		let a = {};
		ipcRenderer.invoke("ProfileRepository.all", {})
			.then( (r) => {
				console.log("ProfileRepository.all", 'r', r);
				return a = r;
			});
		return a;
	}

	public first(): IProfile {
		let a;
		ipcRenderer.invoke("ProfileRepository.first", {})
			.then( (r) => {
				console.log("ProfileRepository.first", 'r', r);
				return a = r;
			});
		return a;
	}

	public last(): IProfile {
		let a;
		ipcRenderer.invoke("ProfileRepository.last", {})
			.then( (r) => {
				console.log("ProfileRepository.last", 'r', r);
				return a = r;
			});
		return a;
	}

	public keys(): string[] {
		let a;
		ipcRenderer.invoke("ProfileRepository.keys", {})
			.then( (r) => {
				console.log("ProfileRepository.keys", 'r', r);
				return a = r;
			});
		return a;
	}

	public values(): IProfile[] {
		let a = [];
		ipcRenderer.invoke("ProfileRepository.values", {})
			.then( (r) => {
				console.log('ProfileRepository.values', 'r', r);
				return a = r;
			});
		return a;
	}

	public findById(id: string): IProfile {
		let a;
		ipcRenderer.invoke("ProfileRepository.findById", { id })
			.then( (r) => {
				console.log('ProfileRepository.findById', 'r', r);
				return a = r;
			});
		return a;
	}

	public findByName(name: string): IProfile | undefined {
		throw new Exceptions.NotImplemented("ProfileRepository", "findByName");
	}

	public async create(name: string): Promise<IProfile> {
		return ipcRenderer.invoke("ProfileRepository.create", name)
			.then((r) => {
				console.log("ProfileRepository.create", "r", JSON.stringify(r, null, 2));
				return r;
			});
	}

	public async import(data: string, password?: string): Promise<Profile> {
		throw new Exceptions.NotImplemented("ProfileRepository", "import");
	}

	public export(profile: IProfile, options: IProfileExportOptions, password?: string): string {
		throw new Exceptions.NotImplemented("ProfileRepository", "export");
	}

	public has(id: string): boolean {
		throw new Exceptions.NotImplemented("ProfileRepository", "has");
	}

	public forget(id: string): void {
		throw new Exceptions.NotImplemented("ProfileRepository", "forget");
	}

	public flush(): void {
		ipcRenderer.invoke("ProfileRepository.flush", {})
			.then(() => {
				console.log("ProfileRepository.flush");
			});
	}

	public count(): number {
		// return ipcRenderer.invoke("ProfileRepository.count").then(r => r), {};
		let a: number = 0;
		ipcRenderer.invoke("ProfileRepository.count", {})
			.then( (r) => {
				console.log("ProfileRepository.count", 'r', r);
				return a = r;
			});
		return a;
	}

	public toObject(): Record<string, object> {
		throw new Exceptions.NotImplemented("ProfileRepository", "toObject");
	}
}
