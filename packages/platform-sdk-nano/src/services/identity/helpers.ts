import { wallet } from "nanocurrency-web";

export const deriveAccount = (mnemonic: string, index = 0) => wallet.fromMnemonic(mnemonic).accounts[index];
