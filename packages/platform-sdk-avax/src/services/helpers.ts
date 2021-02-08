import { Coins } from "@arkecosystem/platform-sdk";
import { Avalanche } from "avalanche"

export const useKeychain = (config: Coins.Config) => new Avalanche(
	"localhost",
	9650,
	"http",
	config.get("network.crypto.networkId"),
	config.get("network.crypto.blockchainId"),
).XChain().keyChain();
