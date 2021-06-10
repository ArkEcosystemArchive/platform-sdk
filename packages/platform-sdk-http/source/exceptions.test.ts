import { BadResponseException, RequestException } from "./exceptions";
import { Response } from "./response";

test("RequestException", () => {
	expect(
		new RequestException(
			new Response({
				body: "",
				headers: {},
				statusCode: 200,
			}),
		).message,
	).toBe("HTTP request returned status code 200.");
});

test("RequestException with Error", () => {
	expect(
		new RequestException(
			new Response({
				body: "",
				headers: {},
				statusCode: 200,
			}),
			new Error("Broken"),
		).message,
	).toBe("HTTP request returned status code 200: Broken");
});

test("BadResponseException", () => {
	expect(new BadResponseException("ERR_FAILED").message).toBe("Bad Response: ERR_FAILED");
});
