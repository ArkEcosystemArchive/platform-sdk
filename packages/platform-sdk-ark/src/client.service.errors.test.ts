import { broadcastErrors, guessBroadcastError } from "./client.service.errors";

test.each(Object.entries(broadcastErrors))("guessBroadcastError(%s)", (type, pattern) => {
	expect(guessBroadcastError(pattern)).toBe(type);
});
