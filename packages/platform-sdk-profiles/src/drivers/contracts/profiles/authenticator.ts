import { Bcrypt } from "@arkecosystem/platform-sdk-crypto";

import { MemoryPassword } from "../helpers/password";
import { ProfileContract, ProfileSetting } from "./profile.models";

export interface IAuthenticator {
    setPassword(password: string): void;
    verifyPassword(password: string): boolean;
    changePassword(oldPassword: string, newPassword: string): void;
}
