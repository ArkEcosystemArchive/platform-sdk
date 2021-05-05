import { Coins } from "@arkecosystem/platform-sdk";

import { IContactAddress, IContactAddressData } from "../../../contracts";
import { State } from "../../../environment/state";
import { ContactAddress } from "./contact-address";

export class ContactAddressFactory {
	public static async make(data: IContactAddressData): Promise<IContactAddress> {
		// @TODO: we need access to the profile to create a coin instance here but
		// ideally the instance could be passed in as `data.coin`

		const instance: Coins.Coin = State.profile().coins().push(data.coin, data.network);

		if (!instance.hasBeenSynchronized()) {
			await instance.__construct();
		}

		const result: ContactAddress = new ContactAddress(data, instance);

		await result.syncIdentity();

		return result;
	}
}
