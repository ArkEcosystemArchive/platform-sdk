import { Contracts } from "@arkecosystem/platform-sdk";

export interface EnvironmentOptions {
	coins: Record<string, any>;
	storage: string | Storage;
	httpClient: Contracts.HttpClient;
	migrations?: Record<string, any>;
}
