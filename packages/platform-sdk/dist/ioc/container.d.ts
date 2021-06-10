import { interfaces } from "inversify";
export declare type ContainerKey = string | symbol;
export declare class Container {
	#private;
	constructor();
	get<T>(key: ContainerKey): T;
	constant(key: ContainerKey, value: unknown): void;
	singleton(key: ContainerKey, value: new (...args: any[]) => unknown): void;
	has(key: ContainerKey): boolean;
	resolve<T>(constructorFunction: interfaces.Newable<T>): T;
	missing(key: ContainerKey): boolean;
	unbind(key: ContainerKey): void;
	flush(): void;
}
