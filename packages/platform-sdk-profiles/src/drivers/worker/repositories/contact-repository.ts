import { v4 as uuidv4 } from "uuid";
import { IContact, IContactAddress, IContactAddressInput, IContactRepository, IProfile } from "../../../contracts";

import { Contact } from "../contacts/contact";
import { pqueue } from "../../../helpers/queue";
import { DataRepository } from "../../../repositories/data-repository";

export class ContactRepository implements IContactRepository {
	//
}
