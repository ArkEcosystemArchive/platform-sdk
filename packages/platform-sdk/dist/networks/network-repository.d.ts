import { NetworkManifest } from "./network.models";
export declare class NetworkRepository {
	#private;
	constructor(networks: Record<string, NetworkManifest>);
	all(): Record<string, NetworkManifest>;
	get(name: string): NetworkManifest;
	push(name: string, data: NetworkManifest): void;
	forget(name: string): void;
}
