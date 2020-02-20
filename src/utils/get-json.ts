import bent from "bent";

import { KeyValuePair } from "../types";

export const getJSON = async (url: string, query: object = {}): Promise<KeyValuePair> => {
	// @ts-ignore
	const searchParams: string = new URLSearchParams(query).toString();

	return bent("json")(searchParams ? `${url}?${searchParams}` : url);
};
