import { DateTime } from "@arkecosystem/platform-sdk-intl";

export const normalizeTimestamp = (input: number): DateTime => {
	// TODO: use a genesis timestamp that matches the network
	return DateTime.make("2016-05-24T17:00:00.000Z").addSeconds(input);
};
