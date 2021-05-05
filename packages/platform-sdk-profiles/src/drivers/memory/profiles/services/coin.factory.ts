import { Coins } from "@arkecosystem/platform-sdk";
import { IProfile } from "../../../../contracts";
import { container } from "../../../../environment/container";
import { Identifiers } from "../../../../environment/container.models";

export class CoinFactory {
	readonly #profile: IProfile;

	public constructor(profile: IProfile) {
		this.#profile = profile;
	}

	public make(coin: string, network: string, options: object = {}, useForce = false): Coins.Coin {
		if (this.#profile.usesCustomPeer() && this.#profile.peers().has(coin, network)) {
			return this.createDriver(
				coin,
				network,
				{
					peer: this.#profile.peers().getRelay(coin, network)?.host,
					peerMultiSignature: this.#profile.peers().getMultiSignature(coin, network)?.host,
				},
				true,
			);
		}

		return this.createDriver(coin, network);
	}

	private createDriver(coin: string, network: string, options: object = {}, useForce = false): Coins.Coin {
		if (!useForce && this.#profile.coins().has(coin, network)) {
			return this.#profile.coins().get(coin, network);
		}

		const instance = Coins.CoinFactory.make(container.get<Coins.CoinSpec>(Identifiers.Coins)[coin.toUpperCase()], {
			network,
			httpClient: container.get(Identifiers.HttpClient),
			...options,
		});

		this.#profile.data().set(`${coin}.${network}`, instance);

		return this.#profile.coins().get(coin, network);
	}
}
