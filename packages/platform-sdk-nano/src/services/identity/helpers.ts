import { wallet } from "nanocurrency-web";

export const deriveAccountKey = (mnemonic: string, index: number) => wallet.fromMnemonic(mnemonic).accounts[index || 0];
