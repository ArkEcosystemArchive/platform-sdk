export class Exception extends Error {
	public constructor(message: string, code?: string) {
		super(message);

		Object.defineProperty(this, "message", {
			enumerable: false,
			value: code ? `${code}: ${message}` : message,
		});

		Object.defineProperty(this, "name", {
			enumerable: false,
			value: this.constructor.name,
		});

		Error.captureStackTrace(this, this.constructor);
	}
}

export class NotImplemented extends Exception {
	public constructor(klass: string, method: string) {
		super(`Method [${method}] is not implemented in [${klass}].`);
	}
}

export class NotSupported extends Exception {
	public constructor(klass: string, method: string) {
		super(`Method [${method}] is not supported in [${klass}].`);
	}
}
