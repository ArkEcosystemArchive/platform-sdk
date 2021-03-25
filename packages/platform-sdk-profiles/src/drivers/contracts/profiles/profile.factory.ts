import { IProfile } from "./profile";

export interface IProfileFactory {
    fromName(name: string): IProfile;
}
