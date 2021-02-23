import { account, transaction } from "@elrondnetwork/elrond-core-js";

export const makeAccount = () => new account();

export const makeTransaction = (data) => new transaction(data);
