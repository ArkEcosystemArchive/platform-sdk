import { v4 as uuidv4 } from "uuid";

import { ContactAddress } from "../contacts/contact-address";
import { ContactAddressInput } from "../contacts/contact-address.models";
import { DataRepository } from "./data-repository";

export interface IContactAddressRepository {
    all(): Record<string, ContactAddress>;
    first(): ContactAddress;
    last(): ContactAddress;
    keys(): string[];
    values(): ContactAddress[];
    create(data: ContactAddressInput): Promise<ContactAddress>;
    fill(addresses: any[]): Promise<void>;
    findById(id: string): ContactAddress;
    findByAddress(value: string): ContactAddress[];
    findByCoin(value: string): ContactAddress[];
    findByNetwork(value: string): ContactAddress[];
    update(id: string, data: Record<string, string>): void;
    forget(id: string): void;
    flush(): void;
    count(): number;
    toArray(): object[];
}
