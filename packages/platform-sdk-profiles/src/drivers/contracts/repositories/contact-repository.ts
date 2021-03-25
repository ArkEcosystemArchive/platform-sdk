import { v4 as uuidv4 } from "uuid";

import { Contact } from "../contacts/contact";
import { ContactAddress } from "../contacts/contact-address";
import { ContactAddressInput } from "../contacts/contact-address.models";
import { pqueue } from "../helpers/queue";
import { Profile } from "../profiles/profile";
import { DataRepository } from "./data-repository";

export interface IContactRepository {
    all(): Record<string, Contact>;
    first(): Contact;
    last(): Contact;
    keys(): string[];
    values(): Contact[];
    create(name: string): Contact;
    fill(contacts: object): Promise<void>;
    findById(id: string): Contact;
    update(id: string, data: { name?: string; addresses?: ContactAddressInput[] }): Promise<void>;
    forget(id: string): void;
    flush(): void;
    count(): number;
    findByAddress(value: string): Contact[];
    findByCoin(value: string): Contact[];
    findByNetwork(value: string): Contact[];
    toObject(): Record<string, object>;
}
