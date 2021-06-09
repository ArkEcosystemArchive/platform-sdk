/* istanbul ignore file */

import { HttpClient } from "@arkecosystem/platform-sdk-http";

import { NotImplemented } from "../exceptions";
import { inject, injectable } from "../ioc";
import { BindingType } from "../ioc/service-provider.contract";
import { FeeService, TransactionFees } from "./fee.contract";

@injectable()
export class AbstractFeeService implements FeeService {
	@inject(BindingType.HttpClient)
	protected readonly httpClient!: HttpClient;

	public async all(): Promise<TransactionFees> {
		throw new NotImplemented(this.constructor.name, this.all.name);
	}
}
