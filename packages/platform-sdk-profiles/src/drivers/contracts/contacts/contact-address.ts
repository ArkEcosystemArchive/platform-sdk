import { Coins, Contracts } from "@arkecosystem/platform-sdk";

import { container } from "../../../environment/container";
import { makeCoin } from "../../../environment/container.helpers";
import { Identifiers } from "../../../environment/container.models";
import { KnownWalletService } from "../services/known-wallet-service";
import { Avatar } from "../services/avatar";
import { ContactAddressProps } from "./contact-address.models";

export interface IContactAddress {
    make(data: ContactAddressProps): Promise<ContactAddress>;
    id(): string;
    coin(): string;
    network(): string;
    name(): string;
    address(): string;
    avatar(): string;
    isDelegate(): boolean;
    isKnown(): boolean;
    isOwnedByExchange(): boolean;
    isOwnedByTeam(): boolean;
    isMultiSignature(): boolean;
    isSecondSignature(): boolean;
    hasSyncedWithNetwork(): boolean;
    toObject(): ContactAddressProps;
    setName(value: string): void;
    setAddress(name: string): void;
    syncIdentity(): Promise<void>;
}
