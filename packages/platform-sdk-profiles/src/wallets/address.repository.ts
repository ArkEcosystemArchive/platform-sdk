import { BigNumber } from "@arkecosystem/platform-sdk-support";

import { Address } from "./address";

export class AddressRepository {
	readonly #storage: Set<Address> = new Set<Address>();

	public balance(): BigNumber {
		return [...this.#storage.values()].reduce(
			(accumulator: BigNumber, address: Address) => accumulator.plus(address.balance()),
			BigNumber.ZERO,
		);
	}
}
