export declare class Exception extends Error {
	constructor(message: string);
}
export declare class NotImplemented extends Exception {
	constructor(klass: string, method: string);
}
export declare class NotSupported extends Exception {
	constructor(klass: string, method: string);
}
export declare class InvalidArguments extends Exception {
	constructor(klass: string, method: string);
}
export declare class MissingArgument extends Exception {
	constructor(klass: string, method: string, arg: string);
}
export declare class CryptoException extends Exception {
	constructor(error: Error);
}
export declare class ForbiddenMethodCallException extends Exception {
	constructor(klass: string, method: string);
}
export declare class BadMethodDependencyException extends Exception {
	constructor(klass: string, method: string, dependency: string);
}
export declare class BadVariableDependencyException extends Exception {
	constructor(klass: string, method: string, dependency: string);
}
export declare class BadStateException extends Exception {
	constructor(method: string, error: string);
}
export declare class InvalidRecipientException extends Exception {}
