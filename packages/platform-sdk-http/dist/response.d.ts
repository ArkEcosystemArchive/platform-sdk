import { HttpResponse } from "./contracts";
interface ResponseInput {
	body: string | undefined;
	headers: Record<string, any>;
	statusCode: number;
}
export declare class Response implements HttpResponse {
	#private;
	protected _response: ResponseInput;
	protected _error: Error | undefined;
	protected _body: string | undefined;
	constructor(response: ResponseInput, error?: Error | undefined);
	body(): string;
	json<T = Record<string, any>>(): T;
	header(header: string): string | undefined;
	headers(): Record<string, any>;
	status(): number;
	successful(): boolean;
	ok(): boolean;
	redirect(): boolean;
	failed(): boolean;
	clientError(): boolean;
	serverError(): boolean;
}
export {};
