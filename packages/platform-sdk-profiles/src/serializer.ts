import { StorageDeserializer, StorageSerializer } from "./contracts";

export const serializer: StorageSerializer = (value: any): string => JSON.stringify(value);

export const deserializer: StorageDeserializer = <T>(value: any): T => JSON.parse(value);
