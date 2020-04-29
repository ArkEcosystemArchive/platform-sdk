import { KeyValuePair } from "../types";

export interface Peer {
	ip: string;
	port: number;
	ports?: Record<string, number>;
	version?: string;
	height?: number;
	latency?: number;
}

export interface PeerResponse {
	ip: string;
	port: number;
	ports: Record<string, number>;
	version: string;
	height: number;
	latency: number;
}

export interface PeerDiscovery {
	getSeeds(): Peer[];

	withVersion(version: string): PeerDiscovery;

	withLatency(latency: number): PeerDiscovery;

	sortBy(key: string, direction: string): PeerDiscovery;

	findPeers(opts: any): Promise<PeerResponse[]>;

	findPeersWithPlugin(name: string, opts: { additional?: string[] }): Promise<Peer[]>;

	findPeersWithoutEstimates(opts: { additional?: string[] }): Promise<Peer[]>;
}

export interface PeerDTO {
	getIp(): string;

	getPort(): number;

	getVersion(): string;

	getHeight(): number;

	getLatency(): number;

	toObject(): KeyValuePair;
}
