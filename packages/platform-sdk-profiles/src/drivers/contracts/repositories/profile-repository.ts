import { v4 as uuidv4 } from "uuid";

import { Profile } from "../profiles/profile";
import { ProfileFactory } from "../profiles/profile.factory";
import { ProfileExportOptions } from "../profiles/profile.models";
import { DataRepository } from "./data-repository";

export interface IProfileRepository {
    fill(profiles: object): void;
    all(): Record<string, Profile>;
    first(): Profile;
    last(): Profile;
    keys(): string[];
    values(): Profile[];
    findById(id: string): Profile;
    findByName(name: string): Profile | undefined;
    create(name: string): Profile;
    import(data: string, password: string): Promise<Profile>;
    export(profile: Profile, options: ProfileExportOptions, password: string): string;
    has(id: string): boolean;
    forget(id: string): void;
    flush(): void;
    count(): number;
    toObject(): Record<string, object>;
}
