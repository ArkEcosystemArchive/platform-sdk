import { ARKTransport } from "@arkecosystem/ledger-transport";
import { Coins, Contracts, IoC, Services } from "@arkecosystem/platform-sdk";
import { BIP44, HDKey } from "@arkecosystem/platform-sdk-crypto";
import { chunk, createRange, formatLedgerDerivationPath } from "./ledger.service.helpers";

@IoC.injectable()
export class LedgerService extends Services.AbstractLedgerService {
	@IoC.inject(IoC.BindingType.ConfigRepository)
	private readonly configRepository!: Coins.ConfigRepository;

	@IoC.inject(IoC.BindingType.ClientService)
	private readonly clientService!: Services.ClientService;

	@IoC.inject(IoC.BindingType.AddressService)
	private readonly addressService!: Services.AddressService;

	#ledger!: Services.LedgerTransport;
	#transport!: ARKTransport;

	public override async connect(transport: Services.LedgerTransport): Promise<void> {
		this.#ledger = await transport.open();
		this.#transport = new ARKTransport(this.#ledger);
	}

	public override async disconnect(): Promise<void> {
		await this.#ledger.close();
	}

	public override async getVersion(): Promise<string> {
		return this.#transport.getVersion();
	}

	public override async getPublicKey(path: string): Promise<string> {
		return this.#transport.getPublicKey(path);
	}

	public override async getExtendedPublicKey(path: string): Promise<string> {
		return this.#transport.getExtPublicKey(path);
	}

	public override async signTransaction(path: string, payload: Buffer): Promise<string> {
		return this.#transport.signTransactionWithSchnorr(path, payload);
	}

	public override async signMessage(path: string, payload: Buffer): Promise<string> {
		return this.#transport.signMessageWithSchnorr(path, payload);
	}

	public override async scan(options?: { useLegacy: boolean; startPath?: string }): Promise<Services.LedgerWalletList> {
		const pageSize = 5;
		let page = 0;
		const slip44 = this.configRepository.get<number>("network.constants.slip44");

		const addressCache: Record<string, { address: string; publicKey: string }> = {};
		let wallets: Contracts.WalletData[] = [];

		let hasMore = true;
		do {
			const addresses: string[] = [];

			/**
			 * @remarks
			 * This needs to be used to support the borked BIP44 implementation from the v2 desktop wallet.
			 */
			if (options?.useLegacy) {
				for (const accountIndex of createRange(page, pageSize)) {
					const path: string = formatLedgerDerivationPath({ coinType: slip44, account: accountIndex });
					const publicKey: string = await this.getPublicKey(path);
					const { address } = await this.addressService.fromPublicKey(publicKey);

					addresses.push(address);

					addressCache[path] = { address, publicKey };
				}

				const collection = await this.clientService.wallets({ addresses });

				wallets = wallets.concat(collection.items());

				hasMore = collection.isNotEmpty();
			} else {
				const path = `m/44'/${slip44}'/0'`;
				let initialAddressIndex = 0;

				if (options?.startPath) {
					/*
					 * Get the address index from expected format `m/purpose'/coinType'/account'/change/addressIndex`
					 */
					initialAddressIndex = BIP44.parse(options.startPath).addressIndex + 1;
				}

				/**
				 * @remarks
				 * This is the new BIP44 compliant derivation which will be used by default.
				 */
				const compressedPublicKey = await this.getExtendedPublicKey(path);

				for (const addressIndexIterator of createRange(page, pageSize)) {
					const addressIndex = initialAddressIndex + addressIndexIterator;
					const publicKey: string = HDKey.fromCompressedPublicKey(compressedPublicKey)
						.derive(`m/0/${addressIndex}`)
						.publicKey.toString("hex");

					const { address } = await this.addressService.fromPublicKey(publicKey);

					addresses.push(address);

					addressCache[`${path}/0/${addressIndex}`] = { address, publicKey };
				}

				const collections = await Promise.all(
					chunk(addresses, 50).map((addresses: string[]) => this.clientService.wallets({ addresses })),
				);

				for (const collection of collections) {
					wallets = wallets.concat(collection.items());

					hasMore = collection.isNotEmpty();
				}
			}

			page++;
		} while (hasMore);

		// Return a mapping of paths and wallets that have been found.
		return this.mapPathsToWallets(addressCache, wallets);
	}
}
