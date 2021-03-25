import { pqueue } from "../helpers/queue";
import { Profile } from "../profiles/profile";
import { ContactAddressRepository } from "../repositories/contact-address-repository";
import { Avatar } from "../services/avatar";
import { ContactStruct } from "./contact.models";
import { ContactAddressInput } from "./contact-address.models";

export interface IContact {
    restore(addresses: object[]): Promise<void>;
    id(): string;
    name(): string;
    addresses(): ContactAddressRepository;
    isStarred(): boolean;
    toggleStarred(): void;
    setAvatar(value: string): void;
    setName(name: string): void;
    setAddresses(addresses: ContactAddressInput[]): Promise<void>;
    avatar(): string;
    toObject(): ContactStruct;
}
