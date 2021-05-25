export interface IdentityOptions {
    bip39?: boolean;
    bip44?: {
        account: number;
        change?: number;
        addressIndex?: number;
    };
    bip49?: {
        account: number;
        change?: number;
        addressIndex?: number;
    };
    bip84?: {
        account: number;
        change?: number;
        addressIndex?: number;
    };
}
