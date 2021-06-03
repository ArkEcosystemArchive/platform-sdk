/* eslint-disable */

import "jest-extended";

import { HttpResponse } from "./contracts";
import { AbstractRequest } from "./request";
import { Response } from "./response";

let subject: Stub;
let spy;

class Stub extends AbstractRequest {
	public constructor(protected readonly spy) {
		super();
	}

	protected async send(method: string, url: string, data?: { query?: object; data?: any }): Promise<HttpResponse> {
		this.spy({ method, url, data, options: this._options, bodyFormat: this._bodyFormat });

		return new Response({
			body: "{}",
			headers: { Accept: "something" },
			statusCode: 200,
		});
	}
}

beforeEach(() => {
	spy = jest.fn();
	subject = new Stub(spy);
});

test("#baseUrl", () => {
	subject.baseUrl("https://base.com");

	subject.get("/");

	expect(spy).toHaveBeenCalledWith({
		bodyFormat: "json",
		data: {
			query: undefined,
		},
		method: "GET",
		options: {
			headers: {
				"Content-Type": "application/json",
			},
			prefixUrl: "https://base.com/",
		},
		url: "/",
	});
});

test("#asJson", () => {
	subject.asJson();

	subject.get("/");

	expect(spy).toHaveBeenCalledWith({
		bodyFormat: "json",
		data: { query: undefined },
		method: "GET",
		options: { headers: { "Content-Type": "application/json" } },
		url: "/",
	});
});

test("#asForm", () => {
	subject.asForm();

	subject.get("/");

	expect(spy).toHaveBeenCalledWith({
		bodyFormat: "form_params",
		data: { query: undefined },
		method: "GET",
		options: { headers: { "Content-Type": "application/x-www-form-urlencoded" } },
		url: "/",
	});
});

test("#asOctet", () => {
	subject.asOctet();

	subject.get("/");

	expect(spy).toHaveBeenCalledWith({
		bodyFormat: "octet",
		data: { query: undefined },
		method: "GET",
		options: { headers: { "Content-Type": "application/octet-stream" } },
		url: "/",
	});
});

test("#bodyFormat", () => {
	subject.bodyFormat("bodyFormat");

	subject.get("/");

	expect(spy).toHaveBeenCalledWith({
		bodyFormat: "bodyFormat",
		data: { query: undefined },
		method: "GET",
		options: { headers: { "Content-Type": "application/json" } },
		url: "/",
	});
});

test("#contentType", () => {
	subject.contentType("contentType");

	subject.get("/");

	expect(spy).toHaveBeenCalledWith({
		bodyFormat: "json",
		data: { query: undefined },
		method: "GET",
		options: { headers: { "Content-Type": "contentType" } },
		url: "/",
	});
});

test("#acceptJson", () => {
	subject.acceptJson();

	subject.get("/");

	expect(spy).toHaveBeenCalledWith({
		bodyFormat: "json",
		data: { query: undefined },
		method: "GET",
		options: { headers: { Accept: "application/json", "Content-Type": "application/json" } },
		url: "/",
	});
});

test("#accept", () => {
	subject.accept("contentType");

	subject.get("/");

	expect(spy).toHaveBeenCalledWith({
		bodyFormat: "json",
		data: { query: undefined },
		method: "GET",
		options: { headers: { Accept: "contentType", "Content-Type": "application/json" } },
		url: "/",
	});
});

test("#withHeaders", () => {
	subject.withHeaders({ key: "value" });

	subject.get("/");

	expect(spy).toHaveBeenCalledWith({
		bodyFormat: "json",
		data: { query: undefined },
		method: "GET",
		options: { headers: { "Content-Type": "application/json", key: "value" } },
		url: "/",
	});
});

test("#withCacheStore", () => {
	subject.withCacheStore({ cache: "store" });

	subject.get("/");

	expect(spy).toHaveBeenCalledWith({
		bodyFormat: "json",
		data: { query: undefined },
		method: "GET",
		options: { cache: { cache: "store" }, headers: { "Content-Type": "application/json" } },
		url: "/",
	});
});

test("#timeout", () => {
	subject.timeout(5);

	subject.get("/");

	expect(spy).toHaveBeenCalledWith({
		bodyFormat: "json",
		data: { query: undefined },
		method: "GET",
		options: { headers: { "Content-Type": "application/json" }, timeout: 5 },
		url: "/",
	});
});

test("#retry", () => {
	subject.retry(3, 100);

	subject.get("/");

	expect(spy).toHaveBeenCalledWith({
		bodyFormat: "json",
		data: {
			query: undefined,
		},
		method: "GET",
		options: {
			headers: {
				"Content-Type": "application/json",
			},
			retry: {
				limit: 3,
				maxRetryAfter: 100,
			},
		},
		url: "/",
	});
});

test("#withOptions", () => {
	subject.withOptions({ option: "thing" });

	subject.get("/");

	expect(spy).toHaveBeenCalledWith({
		bodyFormat: "json",
		data: {
			query: undefined,
		},
		method: "GET",
		options: {
			headers: {
				"Content-Type": "application/json",
			},
			option: "thing",
		},
		url: "/",
	});
});

test("#get", () => {
	subject.get("/");

	expect(spy).toHaveBeenCalledWith({
		bodyFormat: "json",
		data: {
			data: undefined,
			query: undefined,
		},
		method: "GET",
		options: {
			headers: {
				"Content-Type": "application/json",
			},
		},
		url: "/",
	});
});

test("#head", () => {
	subject.head("/");

	expect(spy).toHaveBeenCalledWith({
		bodyFormat: "json",
		data: {
			data: undefined,
			query: undefined,
		},
		method: "HEAD",
		options: {
			headers: {
				"Content-Type": "application/json",
			},
		},
		url: "/",
	});
});

test("#post", () => {
	subject.post("/");

	expect(spy).toHaveBeenCalledWith({
		bodyFormat: "json",
		data: {
			data: undefined,
			query: undefined,
		},
		method: "POST",
		options: {
			headers: {
				"Content-Type": "application/json",
			},
		},
		url: "/",
	});
});

test("#patch", () => {
	subject.patch("/");

	expect(spy).toHaveBeenCalledWith({
		bodyFormat: "json",
		data: {
			data: undefined,
			query: undefined,
		},
		method: "PATCH",
		options: {
			headers: {
				"Content-Type": "application/json",
			},
		},
		url: "/",
	});
});

test("#put", () => {
	subject.put("/");

	expect(spy).toHaveBeenCalledWith({
		bodyFormat: "json",
		data: {
			data: undefined,
			query: undefined,
		},
		method: "PUT",
		options: {
			headers: {
				"Content-Type": "application/json",
			},
		},
		url: "/",
	});
});

test("#delete", () => {
	subject.delete("/");

	expect(spy).toHaveBeenCalledWith({
		bodyFormat: "json",
		data: {
			data: undefined,
			query: undefined,
		},
		method: "DELETE",
		options: {
			headers: {
				"Content-Type": "application/json",
			},
		},
		url: "/",
	});
});
