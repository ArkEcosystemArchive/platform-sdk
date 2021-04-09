import { IProfile } from "../profiles/profile";

export interface IPeer {
	name: string;
	host: string;
	isMultiSignature: boolean;
}

export interface IPeerRepository {
	fill(peers: object): void;
	all(): Record<string, IPeer>;
	keys(): string[];
	values(): IProfile[];
	get(coin: string, network: string): IPeer[];
	create(coin: string, network: string, peer: IPeer): void;
	has(coin: string, network: string): boolean;
	update(coin: string, network: string, host: string, peer: IPeer): void;
	forget(coin: string, network: string, peer: IPeer): void;
	toObject(): Record<string, IPeer>;
	getRelay(coin: string, network: string): IPeer | undefined;
	getRelays(coin: string, network: string): IPeer[];
	getMultiSignature(coin: string, network: string): IPeer | undefined;
}
