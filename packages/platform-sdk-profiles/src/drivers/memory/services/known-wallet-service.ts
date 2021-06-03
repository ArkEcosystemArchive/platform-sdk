import { Services } from "@arkecosystem/platform-sdk";

import { pqueue } from "../../../helpers/queue";
import { IKnownWalletService, IProfile } from "../../../contracts";
import { injectable } from "inversify";

type KnownWalletRegistry = Record<string, Services.KnownWallet[]>;

@injectable()
export class KnownWalletService implements IKnownWalletService {
	readonly #registry: KnownWalletRegistry = {};

	/** {@inheritDoc IKnownWalletService.syncAll} */
	public async syncAll(profile: IProfile): Promise<void> {
		const promises: (() => Promise<void>)[] = [];

		for (const [coin, networks] of profile.coins().entries()) {
			for (const network of networks) {
				promises.push(async () => {
					try {
						this.#registry[network] = await profile.coins().get(coin, network).knownWallets().all();
					} catch (error) {
						// Do nothing if it fails. It's not critical functionality.
					}
				});
			}
		}

		await pqueue(promises);
	}

	/** {@inheritDoc IKnownWalletService.network} */
	public name(network: string, address: string): string | undefined {
		return this.#findByAddress(network, address)?.name;
	}

	/** {@inheritDoc IKnownWalletService.network} */
	public is(network: string, address: string): boolean {
		return this.#findByAddress(network, address) !== undefined;
	}

	/** {@inheritDoc IKnownWalletService.network} */
	public isExchange(network: string, address: string): boolean {
		return this.#hasType(network, address, "exchange");
	}

	/** {@inheritDoc IKnownWalletService.network} */
	public isTeam(network: string, address: string): boolean {
		return this.#hasType(network, address, "team");
	}

	#findByAddress(network: string, address: string): Services.KnownWallet | undefined {
		const registry: Services.KnownWallet[] = this.#registry[network];

		if (registry === undefined) {
			return undefined;
		}

		return registry.find((wallet: Services.KnownWallet) => wallet.address === address);
	}

	#hasType(network: string, address: string, type: string): boolean {
		return this.#findByAddress(network, address)?.type === type;
	}
}
