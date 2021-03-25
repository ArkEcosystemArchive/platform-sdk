import { Profile } from "../profiles/profile";

interface Peer {
	name: string;
	host: string;
	isMultiSignature: boolean;
}

export interface IPeerRepository {
    fill(peers: object): void;
    all(): Record<string, Peer>;
    keys(): string[];
    values(): Profile[];
    get(coin: string, network: string): Peer[];
    create(coin: string, network: string, peer: Peer): void;
    has(coin: string, network: string): boolean;
    update(coin: string, network: string, host: string, peer: Peer): void;
    forget(coin: string, network: string, peer: Peer): void;
    toObject(): Record<string, Peer>;
    getRelay(coin: string, network: string): Peer | undefined;
    getRelays(coin: string, network: string): Peer[];
    getMultiSignature(coin: string, network: string): Peer | undefined;
}
