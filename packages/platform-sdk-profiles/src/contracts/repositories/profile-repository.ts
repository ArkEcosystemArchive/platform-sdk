import { IProfile, IProfileExportOptions } from "../profiles/profile";

export interface IProfileRepository {
	fill(profiles: object): void;
	all(): Record<string, IProfile>;
	first(): IProfile;
	last(): IProfile;
	keys(): string[];
	values(): IProfile[];
	findById(id: string): IProfile;
	findByName(name: string): IProfile | undefined;
	create(name: string): IProfile;
	import(data: string, password?: string): Promise<IProfile>;
	export(profile: IProfile, options?: IProfileExportOptions, password?: string): string;
	has(id: string): boolean;
	forget(id: string): void;
	flush(): void;
	count(): number;
	toObject(): Record<string, object>;
}
