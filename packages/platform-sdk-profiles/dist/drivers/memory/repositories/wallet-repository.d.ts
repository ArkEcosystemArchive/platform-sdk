import { IReadWriteWallet, IWalletRepository, IWalletExportOptions, IWalletData, IProfile } from "../../../contracts";
export declare class WalletRepository implements IWalletRepository {
	#private;
	constructor(profile: IProfile);
	/** {@inheritDoc IWalletRepository.all} */
	all(): Record<string, IReadWriteWallet>;
	/** {@inheritDoc IWalletRepository.first} */
	first(): IReadWriteWallet;
	/** {@inheritDoc IWalletRepository.last} */
	last(): IReadWriteWallet;
	/** {@inheritDoc IWalletRepository.allByCoin} */
	allByCoin(): Record<string, Record<string, IReadWriteWallet>>;
	/** {@inheritDoc IWalletRepository.keys} */
	keys(): string[];
	/** {@inheritDoc IWalletRepository.values} */
	values(): IReadWriteWallet[];
	/** {@inheritDoc IWalletRepository.findById} */
	findById(id: string): IReadWriteWallet;
	/** {@inheritDoc IWalletRepository.findByAddress} */
	findByAddress(address: string): IReadWriteWallet | undefined;
	/** {@inheritDoc IWalletRepository.findByPublicKey} */
	findByPublicKey(publicKey: string): IReadWriteWallet | undefined;
	/** {@inheritDoc IWalletRepository.findByCoin} */
	findByCoin(coin: string): IReadWriteWallet[];
	/** {@inheritDoc IWalletRepository.findByCoinWithNetwork} */
	findByCoinWithNetwork(coin: string, network: string): IReadWriteWallet[];
	/** {@inheritDoc IWalletRepository.findByAlias} */
	findByAlias(alias: string): IReadWriteWallet | undefined;
	/** {@inheritDoc IWalletRepository.push} */
	push(
		wallet: IReadWriteWallet,
		options?: {
			force: boolean;
		},
	): IReadWriteWallet;
	/** {@inheritDoc IWalletRepository.update} */
	update(
		id: string,
		data: {
			alias?: string;
		},
	): void;
	/** {@inheritDoc IWalletRepository.has} */
	has(id: string): boolean;
	/** {@inheritDoc IWalletRepository.forget} */
	forget(id: string): void;
	/** {@inheritDoc IWalletRepository.flush} */
	flush(): void;
	/** {@inheritDoc IWalletRepository.count} */
	count(): number;
	/** {@inheritDoc IWalletRepository.toObject} */
	toObject(options?: IWalletExportOptions): Record<string, IWalletData>;
	/** {@inheritDoc IWalletRepository.sortBy} */
	sortBy(column: string, direction?: "asc" | "desc"): IReadWriteWallet[];
	/** {@inheritDoc IWalletRepository.fill} */
	fill(struct: Record<string, IWalletData>): Promise<void>;
	/** {@inheritDoc IWalletRepository.restore} */
	restore(): Promise<void>;
}
