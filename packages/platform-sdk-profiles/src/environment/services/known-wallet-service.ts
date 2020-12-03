import { Contracts } from "@arkecosystem/platform-sdk";

import { pqueue } from "../../helpers/queue";
import { container } from "../container";
import { Identifiers } from "../container.models";
import { CoinService } from "./coin-service";

type KnownWalletRegistry = Record<string, Contracts.KnownWallet[]>;

export class KnownWalletService {
	private registry: KnownWalletRegistry = {};

	public async syncAll(): Promise<void> {
		const promises: (() => Promise<void>)[] = [];

		for (const coin of container.get<CoinService>(Identifiers.CoinService).values()) {
			promises.push(async () => {
				try {
					this.registry[coin.network().id()] = await coin.knownWallets().all();
				} catch (error) {
					// Do nothing if it fails. It's not critical functionality.
				}
			});
		}

		await pqueue(promises);
	}

	public name(network: string, address: string): string | undefined {
		return this.findByAddress(network, address)?.name;
	}

	public isKnown(network: string, address: string): boolean {
		return this.findByAddress(network, address) !== undefined;
	}

	public isOwnedByExchange(network: string, address: string): boolean {
		return this.hasType(network, address, "exchange");
	}

	public isOwnedByTeam(network: string, address: string): boolean {
		return this.hasType(network, address, "team");
	}

	private findByAddress(network: string, address: string): Contracts.KnownWallet | undefined {
		return this.registry[network].find((wallet: Contracts.KnownWallet) => wallet.address === address);
	}

	private hasType(network: string, address: string, type: string): boolean {
		return this.findByAddress(network, address)?.type === type;
	}
}
