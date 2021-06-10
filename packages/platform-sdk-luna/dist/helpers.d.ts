import { LCDClient, MnemonicKey } from "@terra-money/terra.js";
export declare const deriveKey: (mnemonic: string) => MnemonicKey;
export declare const useClient: (URL: string, chainID: string) => LCDClient;
