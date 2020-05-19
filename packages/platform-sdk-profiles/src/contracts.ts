export interface ProfileData {
	name: string;
}

export interface ProfileServiceOptions {
	storage: {
		adapter: StorageAdapter;
		serializer?: StorageSerializer;
		deserializer?: StorageDeserializer;
	};
	key?: string;
}

export interface StorageAdapter {
	length(): Promise<number>;
	getItem<T = any>(key: string): Promise<T>;
	setItem<T>(key: string, val: T): Promise<void>;
	removeItem(key: string): Promise<void>;
	clear(): Promise<void>;
}

export type StorageSerializer = (value: any) => string;
export type StorageDeserializer = <T>(value: any) => T;
