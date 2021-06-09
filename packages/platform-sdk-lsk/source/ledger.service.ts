import { Coins, Contracts, IoC, Services } from "@arkecosystem/platform-sdk";
import { BIP44 } from "@arkecosystem/platform-sdk-crypto";
import { CommHandler, DposLedger, LedgerAccount, SupportedCoin } from "dpos-ledger-api";

import { WalletData } from "./wallet.dto";

const chunk = <T>(value: T[], size: number) =>
	Array.from({ length: Math.ceil(value.length / size) }, (v, i) => value.slice(i * size, i * size + size));

const createRange = (start: number, size: number) => Array.from({ length: size }, (_, i) => i + size * start);

@IoC.injectable()
export class LedgerService extends Services.AbstractLedgerService {
	@IoC.inject(IoC.BindingType.ConfigRepository)
	private readonly configRepository!: Coins.ConfigRepository;

	@IoC.inject(IoC.BindingType.DataTransferObjectService)
	private readonly dataTransferObjectService!: Services.DataTransferObjectService;

	@IoC.inject(IoC.BindingType.ClientService)
	private readonly clientService!: Services.ClientService;

	#ledger: Services.LedgerTransport;
	#transport!: DposLedger;

	public async connect(transport: Services.LedgerTransport): Promise<void> {
		this.#ledger = await transport.open();
		this.#transport = new DposLedger(new CommHandler(this.#ledger));
	}

	public async disconnect(): Promise<void> {
		await this.#ledger.close();
	}

	public async getVersion(): Promise<string> {
		const { version } = await this.#transport.version();

		return version;
	}

	public async getPublicKey(path: string): Promise<string> {
		const { publicKey } = await this.#getPublicKeyAndAddress(path);

		return publicKey;
	}

	public async signTransaction(path: string, payload: Buffer): Promise<string> {
		const signature: Buffer = await this.#transport.signTX(this.#getLedgerAccount(path), payload);

		return signature.toString("hex");
	}

	public async signMessage(path: string, payload: Buffer): Promise<string> {
		const signature: Buffer = await this.#transport.signMSG(this.#getLedgerAccount(path), payload);

		return signature.slice(0, 64).toString("hex");
	}

	// @TODO: discover wallets until they 404
	public async scan(options?: { useLegacy: boolean; startPath?: string }): Promise<Services.LedgerWalletList> {
		const pageSize = 5;
		const page = 0;
		const slip44 = this.configRepository.get<number>("network.constants.slip44");

		const addressCache: Record<string, { address: string; publicKey: string }> = {};
		const wallets: Contracts.WalletData[] = [];

		const addresses: string[] = [];

		let initialAccountIndex = 0;

		if (options?.startPath) {
			initialAccountIndex = BIP44.parse(options.startPath).account + 1;
		}

		// Scan Ledger
		for (const accountIndexIterator of createRange(page, pageSize)) {
			const accountIndex = initialAccountIndex + accountIndexIterator;

			const path = BIP44.stringify({
				coinType: slip44,
				account: accountIndex,
			});
			const { publicKey, address } = await this.#getPublicKeyAndAddress(path);

			addresses.push(address);

			addressCache[path] = { address, publicKey };
		}

		// Scan Network
		const promises: Promise<void>[] = [];

		for (const address of addresses) {
			promises.push(this.#fetchWallet(address, wallets));
		}

		await Promise.all(promises);

		// Create a mapping of paths and wallets that have been found.
		const { cold, used } = this.mappingOfPathsToWallets(addressCache, wallets);

		return { ...used, ...cold };
	}

	private mappingOfPathsToWallets(addressCache: Record<string, { address: string; publicKey: string }>, wallets: Contracts.WalletData[]) {
		const cold: Services.LedgerWalletList = {};
		const used: Services.LedgerWalletList = {};

		for (const [path, { address, publicKey }] of Object.entries(addressCache)) {
			const matchingWallet: Contracts.WalletData | undefined = wallets.find(
				(wallet: Contracts.WalletData) => wallet.address() === address
			);

			if (matchingWallet === undefined) {
				if (Object.keys(cold).length > 0) {
					continue;
				}

				cold[path] = this.dataTransferObjectService.wallet({
					address,
					publicKey,
					balance: 0
				})
			} else {
				used[path] = matchingWallet;
			}
		}

		return { ...used, ...cold };
	}

	async #getPublicKeyAndAddress(
		path: string,
	): Promise<{
		publicKey: string;
		address: string;
	}> {
		return this.#transport.getPubKey(this.#getLedgerAccount(path));
	}

	#getLedgerAccount(path: string): LedgerAccount {
		return new LedgerAccount().coinIndex(SupportedCoin.LISK).account(BIP44.parse(path).account);
	}

	async #fetchWallet(address: string, wallets: Contracts.WalletData[]): Promise<void> {
		try {
			const wallet: Contracts.WalletData = await this.clientService.wallet(address);

			if (wallet.address()) {
				wallets.push(wallet);
			}
		} catch {
			return undefined;
		}
	}
}
