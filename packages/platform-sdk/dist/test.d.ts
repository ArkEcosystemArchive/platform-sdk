import { ConfigRepository } from "./coins";
import { NetworkManifest } from "./networks";
export declare const createService: <T = any>({
	config,
	httpClient,
	manifest,
	meta,
	predicate,
	schema,
	service,
}: {
	config?: ConfigRepository | undefined;
	httpClient: any;
	manifest: NetworkManifest;
	meta?: any;
	predicate: any;
	schema: any;
	service: any;
}) => T;
export declare const createServiceAsync: <T = any>({
	config,
	httpClient,
	manifest,
	meta,
	predicate,
	schema,
	service,
}: {
	config?: ConfigRepository | undefined;
	httpClient: any;
	manifest: NetworkManifest;
	meta?: any;
	predicate: any;
	schema: any;
	service: any;
}) => Promise<T>;
