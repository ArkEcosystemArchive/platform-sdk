export declare class Manifest {
	#private;
	constructor(manifest: object);
	all(): object;
	get<T>(name: string): T;
}
