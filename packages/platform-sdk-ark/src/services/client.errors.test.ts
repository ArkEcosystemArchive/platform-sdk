import { broadcastErrors, guessBroadcastError } from "./client.errors";

test.each(Object.entries(broadcastErrors))("guessBroadcastError(%s)", (type, pattern) => {
	expect(guessBroadcastError(pattern)).toBe(type);
});
