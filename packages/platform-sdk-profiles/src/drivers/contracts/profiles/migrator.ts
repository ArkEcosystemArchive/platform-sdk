import semver from "semver";

import { ProfileContract, ProfileData } from "./profile.models";

export interface IMigrator {
    migrate(migrations: object, versionToMigrate: string): Promise<void>;
}
