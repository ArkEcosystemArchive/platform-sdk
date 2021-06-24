import { broadcastErrors, guessBroadcastError } from "./client.service.errors";

test.each(Object.values(broadcastErrors))("guessBroadcastError(%s)", (message) => {
	expect(guessBroadcastError(message)).toBe(message);
});
