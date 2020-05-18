import { StorageSerializer, StorageDeserializer } from "./interfaces";

export const serializer: StorageSerializer = (val: any) => {
	return JSON.stringify(val);
}

export const deserializer: StorageDeserializer = (val: any) => {
	return JSON.parse(val);
}
