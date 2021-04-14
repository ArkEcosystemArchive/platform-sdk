import { LCDClient } from "@terra-money/terra.js";

export const useClient = (URL: string, chainID: string): LCDClient => new LCDClient({ URL, chainID });
