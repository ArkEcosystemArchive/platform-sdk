import { Coins, Contracts, IoC, Services } from "@arkecosystem/platform-sdk";
import { BIP44 } from "@arkecosystem/platform-sdk-crypto";
import { CommHandler, DposLedger, LedgerAccount, SupportedCoin } from "dpos-ledger-api";

const createRange = (start: number, size: number) => Array.from({ length: size }, (_, i) => i + size * start);

@IoC.injectable()
export class LedgerService extends Services.AbstractLedgerService {
	@IoC.inject(IoC.BindingType.ConfigRepository)
	private readonly configRepository!: Coins.ConfigRepository;

	@IoC.inject(IoC.BindingType.ClientService)
	private readonly clientService!: Services.ClientService;

	#ledger: Services.LedgerTransport;
	#transport!: DposLedger;

	public override async connect(transport: Services.LedgerTransport): Promise<void> {
		this.#ledger = await transport.open();
		this.#transport = new DposLedger(new CommHandler(this.#ledger));
	}

	public override async disconnect(): Promise<void> {
		await this.#ledger.close();
	}

	public override async getVersion(): Promise<string> {
		const { version } = await this.#transport.version();

		return version;
	}

	public override async getPublicKey(path: string): Promise<string> {
		const { publicKey } = await this.#getPublicKeyAndAddress(path);

		return publicKey;
	}

	public override async signTransaction(path: string, payload: Buffer): Promise<string> {
		const signature: Buffer = await this.#transport.signTX(this.#getLedgerAccount(path), payload);

		return signature.toString("hex");
	}

	public override async signMessage(path: string, payload: Buffer): Promise<string> {
		const signature: Buffer = await this.#transport.signMSG(this.#getLedgerAccount(path), payload);

		return signature.slice(0, 64).toString("hex");
	}

	// @TODO: discover wallets until they 404
	public override async scan(options?: {
		useLegacy: boolean;
		startPath?: string;
	}): Promise<Services.LedgerWalletList> {
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

		// Return a mapping of paths and wallets that have been found.
		return this.mapPathsToWallets(addressCache, wallets);
	}

	async #getPublicKeyAndAddress(path: string): Promise<{
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
