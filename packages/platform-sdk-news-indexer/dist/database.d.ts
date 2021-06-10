export declare class Database {
	#private;
	constructor();
	storeCoin({ alias, symbol, coin }: { alias: any; symbol: any; coin: any }): Promise<any>;
	storeTeam({ coin, symbol, team }: { coin: any; symbol: any; team: any }): Promise<any>;
	storeSignal({ team, signal }: { team: any; signal: any }): Promise<any>;
}
