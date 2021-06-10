import { IStoreTransaction } from "./contracts";
export declare class Storage {
	#private;
	connect(file: string): void;
	disconnect(): void;
	bulkAdd(data: IStoreTransaction[]): void;
	bulkRemoveById(ids: string[]): void;
	loadAll(): IStoreTransaction[];
	deleteAll(): void;
}
