import { IProfile } from "../profiles";

export interface IKnownWalletService {
	syncAll(): Promise<void>;
	name(network: string, address: string): string | undefined;
	is(network: string, address: string): boolean;
	isExchange(network: string, address: string): boolean;
	isTeam(network: string, address: string): boolean;
}
