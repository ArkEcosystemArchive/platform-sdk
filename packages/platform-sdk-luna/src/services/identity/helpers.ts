import { MnemonicKey } from "@terra-money/terra.js";

export const deriveKey = (mnemonic: string): MnemonicKey => new MnemonicKey({ mnemonic });
