"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidRecipientException = exports.BadStateException = exports.BadVariableDependencyException = exports.BadMethodDependencyException = exports.ForbiddenMethodCallException = exports.CryptoException = exports.MissingArgument = exports.InvalidArguments = exports.NotSupported = exports.NotImplemented = exports.Exception = void 0;
class Exception extends Error {
	constructor(message) {
		super(message);
		Object.defineProperty(this, "message", {
			enumerable: false,
			value: message,
		});
		Object.defineProperty(this, "name", {
			enumerable: false,
			value: this.constructor.name,
		});
		Error.captureStackTrace(this, this.constructor);
	}
}
exports.Exception = Exception;
class NotImplemented extends Exception {
	constructor(klass, method) {
		super(`Method ${klass}#${method} is not implemented.`);
	}
}
exports.NotImplemented = NotImplemented;
class NotSupported extends Exception {
	constructor(klass, method) {
		super(`Method ${klass}#${method} is not supported.`);
	}
}
exports.NotSupported = NotSupported;
class InvalidArguments extends Exception {
	constructor(klass, method) {
		super(`Method ${klass}#${method} does not accept the given arguments.`);
	}
}
exports.InvalidArguments = InvalidArguments;
class MissingArgument extends Exception {
	constructor(klass, method, arg) {
		super(`Method ${klass}#${method} expects the argument [${arg}] but it was not given.`);
	}
}
exports.MissingArgument = MissingArgument;
class CryptoException extends Exception {
	constructor(error) {
		super(error.message);
	}
}
exports.CryptoException = CryptoException;
class ForbiddenMethodCallException extends Exception {
	constructor(klass, method) {
		super(`Method ${klass}#${method} cannot be called.`);
	}
}
exports.ForbiddenMethodCallException = ForbiddenMethodCallException;
class BadMethodDependencyException extends Exception {
	constructor(klass, method, dependency) {
		super(`Method ${klass}#${method} depends on ${klass}#${dependency} being called first.`);
	}
}
exports.BadMethodDependencyException = BadMethodDependencyException;
class BadVariableDependencyException extends Exception {
	constructor(klass, method, dependency) {
		super(`Method ${klass}#${method} depends on ${klass}#${dependency} being declared first.`);
	}
}
exports.BadVariableDependencyException = BadVariableDependencyException;
class BadStateException extends Exception {
	constructor(method, error) {
		super(`Method [${method}] has entered a bad state: ${error}`);
	}
}
exports.BadStateException = BadStateException;
class InvalidRecipientException extends Exception {}
exports.InvalidRecipientException = InvalidRecipientException;
//# sourceMappingURL=exceptions.js.map
