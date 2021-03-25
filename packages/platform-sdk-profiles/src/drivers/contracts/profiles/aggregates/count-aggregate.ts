import { ProfileContract } from "../profile.models";

export interface ICountAggregate {
    contacts(): number;
    notifications(): number;
    wallets(): number;
}
