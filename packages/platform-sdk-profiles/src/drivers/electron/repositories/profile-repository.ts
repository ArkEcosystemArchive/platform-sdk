import { injectable } from "inversify";
import { ipcRenderer } from "electron";
import { IProfile, IProfileExportOptions, IProfileRepository } from "../../../contracts";

import { Profile } from "../profiles/profile";
import { Exceptions } from "@arkecosystem/platform-sdk";

@injectable()
export class ProfileRepository implements IProfileRepository {
	public constructor() {}

	public async fill(profiles: object): Promise<void> {
		const result = await ipcRenderer.invoke("ProfileRepository.fill", profiles || {});
		console.log("ProfileRepository.fill");
		return result;
	}

	public async all(): Promise<Record<string, IProfile>> {
		const result = await ipcRenderer.invoke("ProfileRepository.all", {});
		console.log("ProfileRepository.all", "result", result);
		return result;
	}

	public async first(): Promise<IProfile> {
		const result = await ipcRenderer.invoke("ProfileRepository.first", {});
		console.log("ProfileRepository.first", "result", result);
		return result;
	}

	public async last(): Promise<IProfile> {
		const result = await ipcRenderer.invoke("ProfileRepository.last", {});
		console.log("ProfileRepository.last", "result", result);
		return result;
	}

	public async keys(): Promise<string[]> {
		const result = await ipcRenderer.invoke("ProfileRepository.keys", {});
		console.log("ProfileRepository.keys", "result", result);
		return result;
	}

	public async values(): Promise<IProfile[]> {
		const result = await ipcRenderer.invoke("ProfileRepository.values", {});
		console.log("ProfileRepository.values", "result", result);
		return result;
	}

	public async findById(id: string): Promise<IProfile> {
		const result = await ipcRenderer.invoke("ProfileRepository.findById", { id });
		console.log("ProfileRepository.findById", "result", result);
		return result;
	}

	public async findByName(name: string): Promise<IProfile | undefined> {
		throw new Exceptions.NotImplemented("ProfileRepository", "findByName");
	}

	public async create(name: string): Promise<IProfile> {
		return ipcRenderer.invoke("ProfileRepository.create", name);
	}

	public async import(data: string, password?: string): Promise<Profile> {
		throw new Exceptions.NotImplemented("ProfileRepository", "import");
	}

	public async export(profile: IProfile, options: IProfileExportOptions, password?: string): Promise<string> {
		throw new Exceptions.NotImplemented("ProfileRepository", "export");
	}

	public async has(id: string): Promise<boolean> {
		throw new Exceptions.NotImplemented("ProfileRepository", "has");
	}

	public async forget(id: string): Promise<void> {
		throw new Exceptions.NotImplemented("ProfileRepository", "forget");
	}

	public async flush(): Promise<void> {
		const result = await ipcRenderer.invoke("ProfileRepository.flush", {});
		console.log("ProfileRepository.flush");
		return result;
	}

	public async count(): Promise<number> {
		const result = await ipcRenderer.invoke("ProfileRepository.count", {});
		console.log("ProfileRepository.count", "result", result);
		return result;
	}

	public async toObject(): Promise<Record<string, object>> {
		throw new Exceptions.NotImplemented("ProfileRepository", "toObject");
	}
}
