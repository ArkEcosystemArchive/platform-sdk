/* istanbul ignore file */

import { HttpClient } from "../../../platform-sdk-http/dist";
import { NotImplemented } from "../exceptions";
import { BindingType, inject } from "../ioc";
import { FeeService, TransactionFees } from "./fee.contract";

export abstract class AbstractFeeService implements FeeService {
	@inject(BindingType.HttpClient)
	protected readonly httpClient!: HttpClient;

	public async __destruct(): Promise<void> {
		//
	}

	public async all(): Promise<TransactionFees> {
		throw new NotImplemented(this.constructor.name, this.all.name);
	}
}
