import { ValidatorData } from "../../contracts";
import { Paginator } from "./paginator";

export class ValidatorDataCollection extends Paginator<ValidatorData> {
	public findById(address: string): ValidatorData | undefined {
		return this.find("id", address);
	}

	private find(key: string, value: string): ValidatorData | undefined {
		return this.items().find((wallet: ValidatorData) => wallet[key]() === value);
	}
}
