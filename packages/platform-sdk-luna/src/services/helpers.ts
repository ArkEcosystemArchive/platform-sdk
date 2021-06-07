import { LCDClient, MnemonicKey } from "@terra-money/terra.js";

export const deriveKey = (mnemonic: string): MnemonicKey => new MnemonicKey({ mnemonic });

export const useClient = (URL: string, chainID: string): LCDClient => new LCDClient({ URL, chainID });
