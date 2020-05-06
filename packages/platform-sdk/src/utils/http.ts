import bent from "bent";

import { KeyValuePair } from "../contracts";

export const getJSON = async (url: string, query: object = {}): Promise<KeyValuePair> => {
	// @ts-ignore
	const searchParams: string = new URLSearchParams(query).toString();

	return bent("json")(searchParams ? `${url}?${searchParams}` : url);
};

export const postJSON = async (host: string, path: string, body: object, headers: object = {}) =>
	bent(host, "POST", "json", 200)(path, body, headers);
