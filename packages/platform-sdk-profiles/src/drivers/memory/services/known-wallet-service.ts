import { Contracts } from "@arkecosystem/platform-sdk";

import { pqueue } from "../../../helpers/queue";
import { IKnownWalletService } from "../../../contracts";
import { injectable } from "inversify";
import { State } from "../../../environment/state";

type KnownWalletRegistry = Record<string, Contracts.KnownWallet[]>;

@injectable()
export class KnownWalletService implements IKnownWalletService {
	readonly #registry: KnownWalletRegistry = {};

	public async syncAll(): Promise<void> {
		const promises: (() => Promise<void>)[] = [];

		for (const [coin, networks] of State.profile().coins().entries()) {
			for (const network of networks) {
				promises.push(async () => {
					try {
						this.#registry[network] = await State.profile().coins()
							.get(coin, network)
							.knownWallets()
							.all();
					} catch (error) {
						// Do nothing if it fails. It's not critical functionality.
					}
				});
			}
		}

		await pqueue(promises);
	}

	public name(network: string, address: string): string | undefined {
		return this.findByAddress(network, address)?.name;
	}

	public is(network: string, address: string): boolean {
		return this.findByAddress(network, address) !== undefined;
	}

	public isExchange(network: string, address: string): boolean {
		return this.hasType(network, address, "exchange");
	}

	public isTeam(network: string, address: string): boolean {
		return this.hasType(network, address, "team");
	}

	private findByAddress(network: string, address: string): Contracts.KnownWallet | undefined {
		const registry: Contracts.KnownWallet[] = this.#registry[network];

		if (registry === undefined) {
			return undefined;
		}

		return registry.find((wallet: Contracts.KnownWallet) => wallet.address === address);
	}

	private hasType(network: string, address: string, type: string): boolean {
		return this.findByAddress(network, address)?.type === type;
	}
}
