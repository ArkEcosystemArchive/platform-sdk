/* istanbul ignore file */

import { NotImplemented } from "../exceptions";
import { injectable } from "../ioc";
import { LedgerService, LedgerTransport, LedgerWalletList } from "./ledger.contract";

@injectable()
export class AbstractLedgerService implements LedgerService {
	public async __destruct(): Promise<void> {
		await this.disconnect();
	}

	public async connect(transport: LedgerTransport): Promise<void> {
		throw new NotImplemented(this.constructor.name, this.connect.name);
	}

	public async disconnect(): Promise<void> {
		throw new NotImplemented(this.constructor.name, this.disconnect.name);
	}

	public async getVersion(): Promise<string> {
		throw new NotImplemented(this.constructor.name, this.getVersion.name);
	}

	public async getPublicKey(path: string): Promise<string> {
		throw new NotImplemented(this.constructor.name, this.getPublicKey.name);
	}

	public async getExtendedPublicKey(path: string): Promise<string> {
		throw new NotImplemented(this.constructor.name, this.getExtendedPublicKey.name);
	}

	public async signTransaction(path: string, payload: Buffer): Promise<string> {
		throw new NotImplemented(this.constructor.name, this.signTransaction.name);
	}

	public async signMessage(path: string, payload: Buffer): Promise<string> {
		throw new NotImplemented(this.constructor.name, this.signMessage.name);
	}

	public async scan(options?: { useLegacy: boolean }): Promise<LedgerWalletList> {
		throw new NotImplemented(this.constructor.name, this.scan.name);
	}
}
