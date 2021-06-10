import { Response } from "./response";
export declare class Exception extends Error {
	constructor(message: string);
}
export declare class RequestException extends Error {
	constructor(response: Response, error?: Error);
}
export declare class BadResponseException extends Exception {
	constructor(code: string);
}
