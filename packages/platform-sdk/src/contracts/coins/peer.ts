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

// todo: create a DTO for peer discovery
// export interface Peer {
// 	getIp(): string;

// 	getPort(): number;

// 	getVersion(): string;

// 	getHeight(): number;

// 	getLatency(): number;

// 	toObject(): KeyValuePair;
// }
