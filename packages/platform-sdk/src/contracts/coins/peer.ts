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

export interface PeerService {
	destruct(): Promise<void>;

	getSeeds(): string[];

	search(opts: any): Promise<PeerResponse[]>;

	searchWithPlugin(name: string, opts: { additional?: string[] }): Promise<Peer[]>;

	searchWithoutEstimates(opts: { additional?: string[] }): Promise<Peer[]>;
}
