import { v4 as uuidv4 } from "uuid";

import { Profile } from "./profile";
import { ProfileSetting } from "./profile.models";

export interface IProfileFactory {
    fromName(name: string): Profile;
}
