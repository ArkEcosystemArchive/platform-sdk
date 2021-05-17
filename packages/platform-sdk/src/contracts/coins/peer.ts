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
	__destruct(): Promise<void>;

	validate(url: string): Promise<boolean>;
}
