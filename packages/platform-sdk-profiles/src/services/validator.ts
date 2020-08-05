import { Coins } from "@arkecosystem/platform-sdk";

import { makeCoin } from "../environment/container.helpers";

export class Validator {
	public async address(coin: string, network: string, address: string): Promise<boolean> {
		const instance: Coins.Coin = await makeCoin(coin, network);

		return instance.identity().address().validate(address);
	}
}
