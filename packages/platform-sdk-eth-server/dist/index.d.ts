export declare const subscribe: (flags: {
	coin: string;
	network: string;
	host: string;
	port: string;
	database: string;
	rpc: string;
	points: string;
	duration: string;
	whitelist: string;
	blacklist: string;
}) => Promise<void>;
