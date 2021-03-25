/* istanbul ignore file */

import { Contracts } from "@arkecosystem/platform-sdk";
import semver from "semver";

import { container } from "../../../environment/container";
import { Identifiers } from "../../../environment/container.models";
import { RegistryPlugin } from "./plugin-registry.models";

export interface IPluginRegistry {
    all(): Promise<RegistryPlugin[]>;
    size(pkg: RegistryPlugin): Promise<number>;
    downloads(pkg: RegistryPlugin): Promise<number>;
}
