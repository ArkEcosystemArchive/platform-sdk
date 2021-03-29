import { IReadOnlyWallet } from "../../../contracts";
import { Avatar } from "../../../helpers/avatar";

interface ROWallet {
	address: string;
	publicKey?: string;
	username?: string;
	rank?: number;
	explorerLink: string;
}

export class ReadOnlyWallet implements IReadOnlyWallet {
	//
}
