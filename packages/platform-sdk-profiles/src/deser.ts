import { StorageSerializer, StorageDeserializer } from "./interfaces";

export const serializer: StorageSerializer = (value: any) => JSON.stringify(value);

export const deserializer: StorageDeserializer = (value: any) => JSON.parse(value);
