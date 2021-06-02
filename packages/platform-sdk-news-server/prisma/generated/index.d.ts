/**
 * Client
 **/

import * as runtime from "./runtime";
declare const prisma: unique symbol;
export type PrismaPromise<A> = Promise<A> & { [prisma]: true };
type UnwrapPromise<P extends any> = P extends Promise<infer R> ? R : P;
type UnwrapTuple<Tuple extends readonly unknown[]> = {
	[K in keyof Tuple]: K extends `${number}`
		? Tuple[K] extends PrismaPromise<infer X>
			? X
			: UnwrapPromise<Tuple[K]>
		: UnwrapPromise<Tuple[K]>;
};

/**
 * Model Coin
 */

export type Coin = {
	id: number;
	uuid: string;
	name: string;
	symbol: string;
	alias: string;
	data: Prisma.JsonValue;
};

/**
 * Model Team
 */

export type Team = {
	id: number;
	coin_id: number;
	uuid: string;
	name: string;
	slug: string;
	symbol: string;
	data: Prisma.JsonValue;
};

/**
 * Model Signal
 */

export type Signal = {
	id: number;
	team_id: number;
	uuid: string;
	text: string;
	rich_text: Prisma.JsonValue;
	date_active: Date;
	date_created: Date;
	date_updated: Date;
	attributed_author: Prisma.JsonValue;
	category: Prisma.JsonValue;
	is_featured: boolean;
	data: Prisma.JsonValue;
};

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js (ORM replacement)
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Coins
 * const coins = await prisma.coin.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
	T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
	U = "log" extends keyof T
		? T["log"] extends Array<Prisma.LogLevel | Prisma.LogDefinition>
			? Prisma.GetEvents<T["log"]>
			: never
		: never,
	GlobalReject = "rejectOnNotFound" extends keyof T ? T["rejectOnNotFound"] : false
> {
	/**
	 * @private
	 */
	private fetcher;
	/**
	 * @private
	 */
	private readonly dmmf;
	/**
	 * @private
	 */
	private connectionPromise?;
	/**
	 * @private
	 */
	private disconnectionPromise?;
	/**
	 * @private
	 */
	private readonly engineConfig;
	/**
	 * @private
	 */
	private readonly measurePerformance;

	/**
	 * ##  Prisma Client ʲˢ
	 *
	 * Type-safe database client for TypeScript & Node.js (ORM replacement)
	 * @example
	 * ```
	 * const prisma = new PrismaClient()
	 * // Fetch zero or more Coins
	 * const coins = await prisma.coin.findMany()
	 * ```
	 *
	 *
	 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
	 */

	constructor(optionsArg?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
	$on<V extends U | "beforeExit">(
		eventType: V,
		callback: (
			event: V extends "query"
				? Prisma.QueryEvent
				: V extends "beforeExit"
				? () => Promise<void>
				: Prisma.LogEvent,
		) => void,
	): void;

	/**
	 * Connect with the database
	 */
	$connect(): Promise<void>;

	/**
	 * Disconnect from the database
	 */
	$disconnect(): Promise<any>;

	/**
	 * Add a middleware
	 */
	$use(cb: Prisma.Middleware): void;

	/**
	 * Executes a raw query and returns the number of affected rows
	 * @example
	 * ```
	 * // With parameters use prisma.executeRaw``, values will be escaped automatically
	 * const result = await prisma.executeRaw`UPDATE User SET cool = ${true} WHERE id = ${1};`
	 * // Or
	 * const result = await prisma.executeRaw('UPDATE User SET cool = $1 WHERE id = $2 ;', true, 1)
	 * ```
	 *
	 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
	 */
	$executeRaw<T = any>(query: string | TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<number>;

	/**
	 * Performs a raw query and returns the SELECT data
	 * @example
	 * ```
	 * // With parameters use prisma.queryRaw``, values will be escaped automatically
	 * const result = await prisma.queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'ema.il'};`
	 * // Or
	 * const result = await prisma.queryRaw('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'ema.il')
	 * ```
	 *
	 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
	 */
	$queryRaw<T = any>(query: string | TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<T>;

	/**
	 * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
	 * @example
	 * ```
	 * const [george, bob, alice] = await prisma.transaction([
	 *   prisma.user.create({ data: { name: 'George' } }),
	 *   prisma.user.create({ data: { name: 'Bob' } }),
	 *   prisma.user.create({ data: { name: 'Alice' } }),
	 * ])
	 * ```
	 *
	 * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
	 */
	$transaction<P extends PrismaPromise<any>[]>(arg: [...P]): Promise<UnwrapTuple<P>>;

	/**
	 * `prisma.coin`: Exposes CRUD operations for the **Coin** model.
	 * Example usage:
	 * ```ts
	 * // Fetch zero or more Coins
	 * const coins = await prisma.coin.findMany()
	 * ```
	 */
	get coin(): Prisma.CoinDelegate<GlobalReject>;

	/**
	 * `prisma.team`: Exposes CRUD operations for the **Team** model.
	 * Example usage:
	 * ```ts
	 * // Fetch zero or more Teams
	 * const teams = await prisma.team.findMany()
	 * ```
	 */
	get team(): Prisma.TeamDelegate<GlobalReject>;

	/**
	 * `prisma.signal`: Exposes CRUD operations for the **Signal** model.
	 * Example usage:
	 * ```ts
	 * // Fetch zero or more Signals
	 * const signals = await prisma.signal.findMany()
	 * ```
	 */
	get signal(): Prisma.SignalDelegate<GlobalReject>;
}

export namespace Prisma {
	export import DMMF = runtime.DMMF;

	/**
	 * Prisma Errors
	 */
	export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
	export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
	export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
	export import PrismaClientInitializationError = runtime.PrismaClientInitializationError;
	export import PrismaClientValidationError = runtime.PrismaClientValidationError;

	/**
	 * Re-export of sql-template-tag
	 */
	export import sql = runtime.sqltag;
	export import empty = runtime.empty;
	export import join = runtime.join;
	export import raw = runtime.raw;
	export import Sql = runtime.Sql;

	/**
	 * Decimal.js
	 */
	export import Decimal = runtime.Decimal;

	/**
	 * Prisma Client JS version: 2.24.0
	 * Query Engine version: f3e341280d96d0abc068f97e959ddf01f321a858
	 */
	export type PrismaVersion = {
		client: string;
	};

	export const prismaVersion: PrismaVersion;

	/**
	 * Utility Types
	 */

	/**
	 * From https://github.com/sindresorhus/type-fest/
	 * Matches a JSON object.
	 * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from.
	 */
	export type JsonObject = { [Key in string]?: JsonValue };

	/**
	 * From https://github.com/sindresorhus/type-fest/
	 * Matches a JSON array.
	 */
	export interface JsonArray extends Array<JsonValue> {}

	/**
	 * From https://github.com/sindresorhus/type-fest/
	 * Matches any valid JSON value.
	 */
	export type JsonValue = string | number | boolean | null | JsonObject | JsonArray;

	/**
	 * Same as JsonObject, but allows undefined
	 */
	export type InputJsonObject = { [Key in string]?: JsonValue };

	export interface InputJsonArray extends Array<JsonValue> {}

	export type InputJsonValue = undefined | string | number | boolean | null | InputJsonObject | InputJsonArray;
	type SelectAndInclude = {
		select: any;
		include: any;
	};
	type HasSelect = {
		select: any;
	};
	type HasInclude = {
		include: any;
	};
	type CheckSelect<T, S, U> = T extends SelectAndInclude
		? "Please either choose `select` or `include`"
		: T extends HasSelect
		? U
		: T extends HasInclude
		? U
		: S;

	/**
	 * Get the type of the value, that the Promise holds.
	 */
	export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

	/**
	 * Get the return type of a function which returns a Promise.
	 */
	export type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>;

	/**
	 * From T, pick a set of properties whose keys are in the union K
	 */
	type Prisma__Pick<T, K extends keyof T> = {
		[P in K]: T[P];
	};

	export type Enumerable<T> = T | Array<T>;

	export type RequiredKeys<T> = {
		[K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K;
	}[keyof T];

	export type TruthyKeys<T> = {
		[key in keyof T]: T[key] extends false | undefined | null ? never : key;
	}[keyof T];

	export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>;

	/**
	 * Subset
	 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
	 */
	export type Subset<T, U> = {
		[key in keyof T]: key extends keyof U ? T[key] : never;
	};

	/**
	 * SelectSubset
	 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
	 * Additionally, it validates, if both select and include are present. If the case, it errors.
	 */
	export type SelectSubset<T, U> = {
		[key in keyof T]: key extends keyof U ? T[key] : never;
	} &
		(T extends SelectAndInclude ? "Please either choose `select` or `include`." : {});

	/**
	 * Subset + Intersection
	 * @desc From `T` pick properties that exist in `U` and intersect `K`
	 */
	export type SubsetIntersection<T, U, K> = {
		[key in keyof T]: key extends keyof U ? T[key] : never;
	} &
		K;

	type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

	/**
	 * XOR is needed to have a real mutually exclusive union type
	 * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
	 */
	type XOR<T, U> = T | U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;

	/**
	 * Is T a Record?
	 */
	type IsObject<T extends any> = T extends Array<any>
		? False
		: T extends Date
		? False
		: T extends Buffer
		? False
		: T extends BigInt
		? False
		: T extends object
		? True
		: False;

	/**
	 * If it's T[], return T
	 */
	export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;

	/**
	 * From ts-toolbelt
	 */

	type __Either<O extends object, K extends Key> = Omit<O, K> &
		{
			// Merge all but K
			[P in K]: Prisma__Pick<O, P & keyof O>; // With K possibilities
		}[K];

	type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;

	type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>;

	type _Either<O extends object, K extends Key, strict extends Boolean> = {
		1: EitherStrict<O, K>;
		0: EitherLoose<O, K>;
	}[strict];

	type Either<O extends object, K extends Key, strict extends Boolean = 1> = O extends unknown
		? _Either<O, K, strict>
		: never;

	export type Union = any;

	type PatchUndefined<O extends object, O1 extends object> = {
		[K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K];
	} & {};

	/** Helper Types for "Merge" **/
	export type IntersectOf<U extends Union> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void
		? I
		: never;

	export type Overwrite<O extends object, O1 extends object> = {
		[K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
	} & {};

	type _Merge<U extends object> = IntersectOf<
		Overwrite<
			U,
			{
				[K in keyof U]-?: At<U, K>;
			}
		>
	>;

	type Key = string | number | symbol;
	type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
	type AtStrict<O extends object, K extends Key> = O[K & keyof O];
	type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
	export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
		1: AtStrict<O, K>;
		0: AtLoose<O, K>;
	}[strict];

	export type ComputeRaw<A extends any> = A extends Function
		? A
		: {
				[K in keyof A]: A[K];
		  } & {};

	export type OptionalFlat<O> = {
		[K in keyof O]?: O[K];
	} & {};

	type _Record<K extends keyof any, T> = {
		[P in K]: T;
	};

	type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

	export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
	/** End Helper Types for "Merge" **/

	export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

	/**
  A [[Boolean]]
  */
	export type Boolean = True | False;

	// /**
	// 1
	// */
	export type True = 1;

	/**
  0
  */
	export type False = 0;

	export type Not<B extends Boolean> = {
		0: 1;
		1: 0;
	}[B];

	export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
		? 0 // anything `never` is false
		: A1 extends A2
		? 1
		: 0;

	export type Has<U extends Union, U1 extends Union> = Not<Extends<Exclude<U1, U>, U1>>;

	export type Or<B1 extends Boolean, B2 extends Boolean> = {
		0: {
			0: 0;
			1: 1;
		};
		1: {
			0: 1;
			1: 1;
		};
	}[B1][B2];

	export type Keys<U extends Union> = U extends unknown ? keyof U : never;

	type Exact<A, W = unknown> = W extends unknown
		? A extends Narrowable
			? Cast<A, W>
			: Cast<
					{ [K in keyof A]: K extends keyof W ? Exact<A[K], W[K]> : never },
					{ [K in keyof W]: K extends keyof A ? Exact<A[K], W[K]> : W[K] }
			  >
		: never;

	type Narrowable = string | number | boolean | bigint;

	type Cast<A, B> = A extends B ? A : B;

	export const type: unique symbol;

	export function validator<V>(): <S>(select: Exact<S, V>) => S;

	/**
	 * Used by group by
	 */

	export type GetScalarType<T, O> = O extends object
		? {
				[P in keyof T]: P extends keyof O ? O[P] : never;
		  }
		: never;

	type FieldPaths<T, U = Omit<T, "_avg" | "_sum" | "_count" | "_min" | "_max">> = IsObject<T> extends True ? U : T;

	type GetHavingFields<T> = {
		[K in keyof T]: Or<Or<Extends<"OR", K>, Extends<"AND", K>>, Extends<"NOT", K>> extends True
			? // infer is only needed to not hit TS limit
			  // based on the brilliant idea of Pierre-Antoine Mills
			  // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
			  T[K] extends infer TK
				? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
				: never
			: {} extends FieldPaths<T[K]>
			? never
			: K;
	}[keyof T];

	/**
	 * Convert tuple to union
	 */
	type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
	type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
	type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;

	/**
	 * Like `Pick`, but with an array
	 */
	type PickArray<T, K extends Array<keyof T>> = Prisma__Pick<T, TupleToUnion<K>>;

	/**
	 * Exclude all keys with underscores
	 */
	type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T;

	class PrismaClientFetcher {
		private readonly prisma;
		private readonly debug;
		private readonly hooks?;
		constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
		request<T>(
			document: any,
			dataPath?: string[],
			rootField?: string,
			typeName?: string,
			isList?: boolean,
			callsite?: string,
		): Promise<T>;
		sanitizeMessage(message: string): string;
		protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
	}

	export const ModelName: {
		Coin: "Coin";
		Team: "Team";
		Signal: "Signal";
	};

	export type ModelName = typeof ModelName[keyof typeof ModelName];

	export type Datasources = {
		db?: Datasource;
	};

	export type RejectOnNotFound = boolean | ((error: Error) => Error);
	export type RejectPerModel = { [P in ModelName]?: RejectOnNotFound };
	export type RejectPerOperation = { [P in "findUnique" | "findFirst"]?: RejectPerModel | RejectOnNotFound };
	type IsReject<T> = T extends true ? True : T extends (err: Error) => Error ? True : False;
	export type HasReject<
		GlobalRejectSettings extends Prisma.PrismaClientOptions["rejectOnNotFound"],
		LocalRejectSettings,
		Action extends PrismaAction,
		Model extends ModelName
	> = LocalRejectSettings extends RejectOnNotFound
		? IsReject<LocalRejectSettings>
		: GlobalRejectSettings extends RejectPerOperation
		? Action extends keyof GlobalRejectSettings
			? GlobalRejectSettings[Action] extends boolean
				? IsReject<GlobalRejectSettings[Action]>
				: GlobalRejectSettings[Action] extends RejectPerModel
				? Model extends keyof GlobalRejectSettings[Action]
					? IsReject<GlobalRejectSettings[Action][Model]>
					: False
				: False
			: False
		: IsReject<GlobalRejectSettings>;
	export type ErrorFormat = "pretty" | "colorless" | "minimal";

	export interface PrismaClientOptions {
		/**
		 * Configure findUnique/findFirst to throw an error if the query returns null.
		 *  * @example
		 * ```
		 * // Reject on both findUnique/findFirst
		 * rejectOnNotFound: true
		 * // Reject only on findFirst with a custom error
		 * rejectOnNotFound: { findFirst: (err) => new Error("Custom Error")}
		 * // Reject on user.findUnique with a custom error
		 * rejectOnNotFound: { findUnique: {User: (err) => new Error("User not found")}}
		 * ```
		 */
		rejectOnNotFound?: RejectOnNotFound | RejectPerOperation;
		/**
		 * Overwrites the datasource url from your prisma.schema file
		 */
		datasources?: Datasources;

		/**
		 * @default "colorless"
		 */
		errorFormat?: ErrorFormat;

		/**
		 * @example
		 * ```
		 * // Defaults to stdout
		 * log: ['query', 'info', 'warn', 'error']
		 *
		 * // Emit as events
		 * log: [
		 *  { emit: 'stdout', level: 'query' },
		 *  { emit: 'stdout', level: 'info' },
		 *  { emit: 'stdout', level: 'warn' }
		 *  { emit: 'stdout', level: 'error' }
		 * ]
		 * ```
		 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
		 */
		log?: Array<LogLevel | LogDefinition>;
	}

	export type Hooks = {
		beforeRequest?: (options: {
			query: string;
			path: string[];
			rootField?: string;
			typeName?: string;
			document: any;
		}) => any;
	};

	/* Types for Logging */
	export type LogLevel = "info" | "query" | "warn" | "error";
	export type LogDefinition = {
		level: LogLevel;
		emit: "stdout" | "event";
	};

	export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition
		? T["emit"] extends "event"
			? T["level"]
			: never
		: never;
	export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition>
		? GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
		: never;

	export type QueryEvent = {
		timestamp: Date;
		query: string;
		params: string;
		duration: number;
		target: string;
	};

	export type LogEvent = {
		timestamp: Date;
		message: string;
		target: string;
	};
	/* End Types for Logging */

	export type PrismaAction =
		| "findUnique"
		| "findMany"
		| "findFirst"
		| "create"
		| "createMany"
		| "update"
		| "updateMany"
		| "upsert"
		| "delete"
		| "deleteMany"
		| "executeRaw"
		| "queryRaw"
		| "aggregate"
		| "count";

	/**
	 * These options are being passed in to the middleware as "params"
	 */
	export type MiddlewareParams = {
		model?: ModelName;
		action: PrismaAction;
		args: any;
		dataPath: string[];
		runInTransaction: boolean;
	};

	/**
	 * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
	 */
	export type Middleware<T = any> = (
		params: MiddlewareParams,
		next: (params: MiddlewareParams) => Promise<T>,
	) => Promise<T>;

	// tested in getLogLevel.test.ts
	export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;
	export type Datasource = {
		url?: string;
	};

	/**
	 * Count Types
	 */

	/**
	 * Models
	 */

	/**
	 * Model Coin
	 */

	export type AggregateCoin = {
		_count: CoinCountAggregateOutputType | null;
		count: CoinCountAggregateOutputType | null;
		_avg: CoinAvgAggregateOutputType | null;
		avg: CoinAvgAggregateOutputType | null;
		_sum: CoinSumAggregateOutputType | null;
		sum: CoinSumAggregateOutputType | null;
		_min: CoinMinAggregateOutputType | null;
		min: CoinMinAggregateOutputType | null;
		_max: CoinMaxAggregateOutputType | null;
		max: CoinMaxAggregateOutputType | null;
	};

	export type CoinAvgAggregateOutputType = {
		id: number | null;
	};

	export type CoinSumAggregateOutputType = {
		id: number | null;
	};

	export type CoinMinAggregateOutputType = {
		id: number | null;
		uuid: string | null;
		name: string | null;
		symbol: string | null;
		alias: string | null;
	};

	export type CoinMaxAggregateOutputType = {
		id: number | null;
		uuid: string | null;
		name: string | null;
		symbol: string | null;
		alias: string | null;
	};

	export type CoinCountAggregateOutputType = {
		id: number;
		uuid: number;
		name: number;
		symbol: number;
		alias: number;
		data: number;
		_all: number;
	};

	export type CoinAvgAggregateInputType = {
		id?: true;
	};

	export type CoinSumAggregateInputType = {
		id?: true;
	};

	export type CoinMinAggregateInputType = {
		id?: true;
		uuid?: true;
		name?: true;
		symbol?: true;
		alias?: true;
	};

	export type CoinMaxAggregateInputType = {
		id?: true;
		uuid?: true;
		name?: true;
		symbol?: true;
		alias?: true;
	};

	export type CoinCountAggregateInputType = {
		id?: true;
		uuid?: true;
		name?: true;
		symbol?: true;
		alias?: true;
		data?: true;
		_all?: true;
	};

	export type CoinAggregateArgs = {
		/**
		 * Filter which Coin to aggregate.
		 *
		 **/
		where?: CoinWhereInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of Coins to fetch.
		 *
		 **/
		orderBy?: Enumerable<CoinOrderByInput>;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the start position
		 *
		 **/
		cursor?: CoinWhereUniqueInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` Coins from the position of the cursor.
		 *
		 **/
		take?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` Coins.
		 *
		 **/
		skip?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Count returned Coins
		 **/
		_count?: true | CoinCountAggregateInputType;
		/**
		 * @deprecated since 2.23.0 please use `_count`
		 **/
		count?: true | CoinCountAggregateInputType;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Select which fields to average
		 **/
		_avg?: CoinAvgAggregateInputType;
		/**
		 * @deprecated since 2.23.0 please use `_avg`
		 **/
		avg?: CoinAvgAggregateInputType;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Select which fields to sum
		 **/
		_sum?: CoinSumAggregateInputType;
		/**
		 * @deprecated since 2.23.0 please use `_sum`
		 **/
		sum?: CoinSumAggregateInputType;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Select which fields to find the minimum value
		 **/
		_min?: CoinMinAggregateInputType;
		/**
		 * @deprecated since 2.23.0 please use `_min`
		 **/
		min?: CoinMinAggregateInputType;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Select which fields to find the maximum value
		 **/
		_max?: CoinMaxAggregateInputType;
		/**
		 * @deprecated since 2.23.0 please use `_max`
		 **/
		max?: CoinMaxAggregateInputType;
	};

	export type GetCoinAggregateType<T extends CoinAggregateArgs> = {
		[P in keyof T & keyof AggregateCoin]: P extends "_count" | "count"
			? T[P] extends true
				? number
				: GetScalarType<T[P], AggregateCoin[P]>
			: GetScalarType<T[P], AggregateCoin[P]>;
	};

	export type CoinGroupByArgs = {
		where?: CoinWhereInput;
		orderBy?: Enumerable<CoinOrderByInput>;
		by: Array<CoinScalarFieldEnum>;
		having?: CoinScalarWhereWithAggregatesInput;
		take?: number;
		skip?: number;
		_count?: CoinCountAggregateInputType | true;
		_avg?: CoinAvgAggregateInputType;
		_sum?: CoinSumAggregateInputType;
		_min?: CoinMinAggregateInputType;
		_max?: CoinMaxAggregateInputType;
	};

	export type CoinGroupByOutputType = {
		id: number;
		uuid: string;
		name: string;
		symbol: string;
		alias: string;
		data: JsonValue;
		_count: CoinCountAggregateOutputType | null;
		_avg: CoinAvgAggregateOutputType | null;
		_sum: CoinSumAggregateOutputType | null;
		_min: CoinMinAggregateOutputType | null;
		_max: CoinMaxAggregateOutputType | null;
	};

	type GetCoinGroupByPayload<T extends CoinGroupByArgs> = Promise<
		Array<
			PickArray<CoinGroupByOutputType, T["by"]> &
				{
					[P in keyof T & keyof CoinGroupByOutputType]: P extends "_count"
						? T[P] extends boolean
							? number
							: GetScalarType<T[P], CoinGroupByOutputType[P]>
						: GetScalarType<T[P], CoinGroupByOutputType[P]>;
				}
		>
	>;

	export type CoinSelect = {
		id?: boolean;
		uuid?: boolean;
		name?: boolean;
		symbol?: boolean;
		alias?: boolean;
		data?: boolean;
		teams?: boolean | TeamFindManyArgs;
	};

	export type CoinInclude = {
		teams?: boolean | TeamFindManyArgs;
	};

	export type CoinGetPayload<S extends boolean | null | undefined | CoinArgs, U = keyof S> = S extends true
		? Coin
		: S extends undefined
		? never
		: S extends CoinArgs | CoinFindManyArgs
		? "include" extends U
			? Coin &
					{
						[P in TrueKeys<S["include"]>]: P extends "teams"
							? Array<TeamGetPayload<S["include"][P]>>
							: never;
					}
			: "select" extends U
			? {
					[P in TrueKeys<S["select"]>]: P extends keyof Coin
						? Coin[P]
						: P extends "teams"
						? Array<TeamGetPayload<S["select"][P]>>
						: never;
			  }
			: Coin
		: Coin;

	type CoinCountArgs = Merge<
		Omit<CoinFindManyArgs, "select" | "include"> & {
			select?: CoinCountAggregateInputType | true;
		}
	>;

	export interface CoinDelegate<GlobalRejectSettings> {
		/**
		 * Find zero or one Coin that matches the filter.
		 * @param {CoinFindUniqueArgs} args - Arguments to find a Coin
		 * @example
		 * // Get one Coin
		 * const coin = await prisma.coin.findUnique({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 **/
		findUnique<
			T extends CoinFindUniqueArgs,
			LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T["rejectOnNotFound"] : undefined
		>(
			args: SelectSubset<T, CoinFindUniqueArgs>,
		): HasReject<GlobalRejectSettings, LocalRejectSettings, "findUnique", "Coin"> extends True
			? CheckSelect<T, Prisma__CoinClient<Coin>, Prisma__CoinClient<CoinGetPayload<T>>>
			: CheckSelect<T, Prisma__CoinClient<Coin | null>, Prisma__CoinClient<CoinGetPayload<T> | null>>;

		/**
		 * Find the first Coin that matches the filter.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {CoinFindFirstArgs} args - Arguments to find a Coin
		 * @example
		 * // Get one Coin
		 * const coin = await prisma.coin.findFirst({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 **/
		findFirst<
			T extends CoinFindFirstArgs,
			LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T["rejectOnNotFound"] : undefined
		>(
			args?: SelectSubset<T, CoinFindFirstArgs>,
		): HasReject<GlobalRejectSettings, LocalRejectSettings, "findFirst", "Coin"> extends True
			? CheckSelect<T, Prisma__CoinClient<Coin>, Prisma__CoinClient<CoinGetPayload<T>>>
			: CheckSelect<T, Prisma__CoinClient<Coin | null>, Prisma__CoinClient<CoinGetPayload<T> | null>>;

		/**
		 * Find zero or more Coins that matches the filter.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {CoinFindManyArgs=} args - Arguments to filter and select certain fields only.
		 * @example
		 * // Get all Coins
		 * const coins = await prisma.coin.findMany()
		 *
		 * // Get first 10 Coins
		 * const coins = await prisma.coin.findMany({ take: 10 })
		 *
		 * // Only select the `id`
		 * const coinWithIdOnly = await prisma.coin.findMany({ select: { id: true } })
		 *
		 **/
		findMany<T extends CoinFindManyArgs>(
			args?: SelectSubset<T, CoinFindManyArgs>,
		): CheckSelect<T, PrismaPromise<Array<Coin>>, PrismaPromise<Array<CoinGetPayload<T>>>>;

		/**
		 * Create a Coin.
		 * @param {CoinCreateArgs} args - Arguments to create a Coin.
		 * @example
		 * // Create one Coin
		 * const Coin = await prisma.coin.create({
		 *   data: {
		 *     // ... data to create a Coin
		 *   }
		 * })
		 *
		 **/
		create<T extends CoinCreateArgs>(
			args: SelectSubset<T, CoinCreateArgs>,
		): CheckSelect<T, Prisma__CoinClient<Coin>, Prisma__CoinClient<CoinGetPayload<T>>>;

		/**
		 * Create many Coins.
		 *     @param {CoinCreateManyArgs} args - Arguments to create many Coins.
		 *     @example
		 *     // Create many Coins
		 *     const coin = await prisma.coin.createMany({
		 *       data: {
		 *         // ... provide data here
		 *       }
		 *     })
		 *
		 **/
		createMany<T extends CoinCreateManyArgs>(
			args?: SelectSubset<T, CoinCreateManyArgs>,
		): PrismaPromise<BatchPayload>;

		/**
		 * Delete a Coin.
		 * @param {CoinDeleteArgs} args - Arguments to delete one Coin.
		 * @example
		 * // Delete one Coin
		 * const Coin = await prisma.coin.delete({
		 *   where: {
		 *     // ... filter to delete one Coin
		 *   }
		 * })
		 *
		 **/
		delete<T extends CoinDeleteArgs>(
			args: SelectSubset<T, CoinDeleteArgs>,
		): CheckSelect<T, Prisma__CoinClient<Coin>, Prisma__CoinClient<CoinGetPayload<T>>>;

		/**
		 * Update one Coin.
		 * @param {CoinUpdateArgs} args - Arguments to update one Coin.
		 * @example
		 * // Update one Coin
		 * const coin = await prisma.coin.update({
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: {
		 *     // ... provide data here
		 *   }
		 * })
		 *
		 **/
		update<T extends CoinUpdateArgs>(
			args: SelectSubset<T, CoinUpdateArgs>,
		): CheckSelect<T, Prisma__CoinClient<Coin>, Prisma__CoinClient<CoinGetPayload<T>>>;

		/**
		 * Delete zero or more Coins.
		 * @param {CoinDeleteManyArgs} args - Arguments to filter Coins to delete.
		 * @example
		 * // Delete a few Coins
		 * const { count } = await prisma.coin.deleteMany({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 *
		 **/
		deleteMany<T extends CoinDeleteManyArgs>(
			args?: SelectSubset<T, CoinDeleteManyArgs>,
		): PrismaPromise<BatchPayload>;

		/**
		 * Update zero or more Coins.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {CoinUpdateManyArgs} args - Arguments to update one or more rows.
		 * @example
		 * // Update many Coins
		 * const coin = await prisma.coin.updateMany({
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: {
		 *     // ... provide data here
		 *   }
		 * })
		 *
		 **/
		updateMany<T extends CoinUpdateManyArgs>(
			args: SelectSubset<T, CoinUpdateManyArgs>,
		): PrismaPromise<BatchPayload>;

		/**
		 * Create or update one Coin.
		 * @param {CoinUpsertArgs} args - Arguments to update or create a Coin.
		 * @example
		 * // Update or create a Coin
		 * const coin = await prisma.coin.upsert({
		 *   create: {
		 *     // ... data to create a Coin
		 *   },
		 *   update: {
		 *     // ... in case it already exists, update
		 *   },
		 *   where: {
		 *     // ... the filter for the Coin we want to update
		 *   }
		 * })
		 **/
		upsert<T extends CoinUpsertArgs>(
			args: SelectSubset<T, CoinUpsertArgs>,
		): CheckSelect<T, Prisma__CoinClient<Coin>, Prisma__CoinClient<CoinGetPayload<T>>>;

		/**
		 * Count the number of Coins.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {CoinCountArgs} args - Arguments to filter Coins to count.
		 * @example
		 * // Count the number of Coins
		 * const count = await prisma.coin.count({
		 *   where: {
		 *     // ... the filter for the Coins we want to count
		 *   }
		 * })
		 **/
		count<T extends CoinCountArgs>(
			args?: Subset<T, CoinCountArgs>,
		): PrismaPromise<
			T extends _Record<"select", any>
				? T["select"] extends true
					? number
					: GetScalarType<T["select"], CoinCountAggregateOutputType>
				: number
		>;

		/**
		 * Allows you to perform aggregations operations on a Coin.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {CoinAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
		 * @example
		 * // Ordered by age ascending
		 * // Where email contains prisma.io
		 * // Limited to the 10 users
		 * const aggregations = await prisma.user.aggregate({
		 *   _avg: {
		 *     age: true,
		 *   },
		 *   where: {
		 *     email: {
		 *       contains: "prisma.io",
		 *     },
		 *   },
		 *   orderBy: {
		 *     age: "asc",
		 *   },
		 *   take: 10,
		 * })
		 **/
		aggregate<T extends CoinAggregateArgs>(
			args: Subset<T, CoinAggregateArgs>,
		): PrismaPromise<GetCoinAggregateType<T>>;

		/**
		 * Group by Coin.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {CoinGroupByArgs} args - Group by arguments.
		 * @example
		 * // Group by city, order by createdAt, get count
		 * const result = await prisma.user.groupBy({
		 *   by: ['city', 'createdAt'],
		 *   orderBy: {
		 *     createdAt: true
		 *   },
		 *   _count: {
		 *     _all: true
		 *   },
		 * })
		 *
		 **/
		groupBy<
			T extends CoinGroupByArgs,
			HasSelectOrTake extends Or<Extends<"skip", Keys<T>>, Extends<"take", Keys<T>>>,
			OrderByArg extends True extends HasSelectOrTake
				? { orderBy: CoinGroupByArgs["orderBy"] }
				: { orderBy?: CoinGroupByArgs["orderBy"] },
			OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T["orderBy"]>>>,
			ByFields extends TupleToUnion<T["by"]>,
			ByValid extends Has<ByFields, OrderFields>,
			HavingFields extends GetHavingFields<T["having"]>,
			HavingValid extends Has<ByFields, HavingFields>,
			ByEmpty extends T["by"] extends never[] ? True : False,
			InputErrors extends ByEmpty extends True
				? `Error: "by" must not be empty.`
				: HavingValid extends False
				? {
						[P in HavingFields]: P extends ByFields
							? never
							: P extends string
							? `Error: Field "${P}" used in "having" needs to be provided in "by".`
							: [Error, "Field ", P, ` in "having" needs to be provided in "by"`];
				  }[HavingFields]
				: "take" extends Keys<T>
				? "orderBy" extends Keys<T>
					? ByValid extends True
						? {}
						: {
								[P in OrderFields]: P extends ByFields
									? never
									: `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
						  }[OrderFields]
					: 'Error: If you provide "take", you also need to provide "orderBy"'
				: "skip" extends Keys<T>
				? "orderBy" extends Keys<T>
					? ByValid extends True
						? {}
						: {
								[P in OrderFields]: P extends ByFields
									? never
									: `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
						  }[OrderFields]
					: 'Error: If you provide "skip", you also need to provide "orderBy"'
				: ByValid extends True
				? {}
				: {
						[P in OrderFields]: P extends ByFields
							? never
							: `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
				  }[OrderFields]
		>(
			args: SubsetIntersection<T, CoinGroupByArgs, OrderByArg> & InputErrors,
		): {} extends InputErrors ? GetCoinGroupByPayload<T> : Promise<InputErrors>;
	}

	/**
	 * The delegate class that acts as a "Promise-like" for Coin.
	 * Why is this prefixed with `Prisma__`?
	 * Because we want to prevent naming conflicts as mentioned in
	 * https://github.com/prisma/prisma-client-js/issues/707
	 */
	export class Prisma__CoinClient<T> implements PrismaPromise<T> {
		[prisma]: true;
		private readonly _dmmf;
		private readonly _fetcher;
		private readonly _queryType;
		private readonly _rootField;
		private readonly _clientMethod;
		private readonly _args;
		private readonly _dataPath;
		private readonly _errorFormat;
		private readonly _measurePerformance?;
		private _isList;
		private _callsite;
		private _requestPromise?;
		constructor(
			_dmmf: runtime.DMMFClass,
			_fetcher: PrismaClientFetcher,
			_queryType: "query" | "mutation",
			_rootField: string,
			_clientMethod: string,
			_args: any,
			_dataPath: string[],
			_errorFormat: ErrorFormat,
			_measurePerformance?: boolean | undefined,
			_isList?: boolean,
		);
		readonly [Symbol.toStringTag]: "PrismaClientPromise";

		teams<T extends TeamFindManyArgs = {}>(
			args?: Subset<T, TeamFindManyArgs>,
		): CheckSelect<T, PrismaPromise<Array<Team>>, PrismaPromise<Array<TeamGetPayload<T>>>>;

		private get _document();
		/**
		 * Attaches callbacks for the resolution and/or rejection of the Promise.
		 * @param onfulfilled The callback to execute when the Promise is resolved.
		 * @param onrejected The callback to execute when the Promise is rejected.
		 * @returns A Promise for the completion of which ever callback is executed.
		 */
		then<TResult1 = T, TResult2 = never>(
			onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
			onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
		): Promise<TResult1 | TResult2>;
		/**
		 * Attaches a callback for only the rejection of the Promise.
		 * @param onrejected The callback to execute when the Promise is rejected.
		 * @returns A Promise for the completion of the callback.
		 */
		catch<TResult = never>(
			onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
		): Promise<T | TResult>;
		/**
		 * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
		 * resolved value cannot be modified from the callback.
		 * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
		 * @returns A Promise for the completion of the callback.
		 */
		finally(onfinally?: (() => void) | undefined | null): Promise<T>;
	}

	// Custom InputTypes

	/**
	 * Coin findUnique
	 */
	export type CoinFindUniqueArgs = {
		/**
		 * Select specific fields to fetch from the Coin
		 *
		 **/
		select?: CoinSelect | null;
		/**
		 * Choose, which related nodes to fetch as well.
		 *
		 **/
		include?: CoinInclude | null;
		/**
		 * Throw an Error if a Coin can't be found
		 *
		 **/
		rejectOnNotFound?: RejectOnNotFound;
		/**
		 * Filter, which Coin to fetch.
		 *
		 **/
		where: CoinWhereUniqueInput;
	};

	/**
	 * Coin findFirst
	 */
	export type CoinFindFirstArgs = {
		/**
		 * Select specific fields to fetch from the Coin
		 *
		 **/
		select?: CoinSelect | null;
		/**
		 * Choose, which related nodes to fetch as well.
		 *
		 **/
		include?: CoinInclude | null;
		/**
		 * Throw an Error if a Coin can't be found
		 *
		 **/
		rejectOnNotFound?: RejectOnNotFound;
		/**
		 * Filter, which Coin to fetch.
		 *
		 **/
		where?: CoinWhereInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of Coins to fetch.
		 *
		 **/
		orderBy?: Enumerable<CoinOrderByInput>;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the position for searching for Coins.
		 *
		 **/
		cursor?: CoinWhereUniqueInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` Coins from the position of the cursor.
		 *
		 **/
		take?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` Coins.
		 *
		 **/
		skip?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
		 *
		 * Filter by unique combinations of Coins.
		 *
		 **/
		distinct?: Enumerable<CoinScalarFieldEnum>;
	};

	/**
	 * Coin findMany
	 */
	export type CoinFindManyArgs = {
		/**
		 * Select specific fields to fetch from the Coin
		 *
		 **/
		select?: CoinSelect | null;
		/**
		 * Choose, which related nodes to fetch as well.
		 *
		 **/
		include?: CoinInclude | null;
		/**
		 * Filter, which Coins to fetch.
		 *
		 **/
		where?: CoinWhereInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of Coins to fetch.
		 *
		 **/
		orderBy?: Enumerable<CoinOrderByInput>;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the position for listing Coins.
		 *
		 **/
		cursor?: CoinWhereUniqueInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` Coins from the position of the cursor.
		 *
		 **/
		take?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` Coins.
		 *
		 **/
		skip?: number;
		distinct?: Enumerable<CoinScalarFieldEnum>;
	};

	/**
	 * Coin create
	 */
	export type CoinCreateArgs = {
		/**
		 * Select specific fields to fetch from the Coin
		 *
		 **/
		select?: CoinSelect | null;
		/**
		 * Choose, which related nodes to fetch as well.
		 *
		 **/
		include?: CoinInclude | null;
		/**
		 * The data needed to create a Coin.
		 *
		 **/
		data: XOR<CoinCreateInput, CoinUncheckedCreateInput>;
	};

	/**
	 * Coin createMany
	 */
	export type CoinCreateManyArgs = {
		data: Enumerable<CoinCreateManyInput>;
		skipDuplicates?: boolean;
	};

	/**
	 * Coin update
	 */
	export type CoinUpdateArgs = {
		/**
		 * Select specific fields to fetch from the Coin
		 *
		 **/
		select?: CoinSelect | null;
		/**
		 * Choose, which related nodes to fetch as well.
		 *
		 **/
		include?: CoinInclude | null;
		/**
		 * The data needed to update a Coin.
		 *
		 **/
		data: XOR<CoinUpdateInput, CoinUncheckedUpdateInput>;
		/**
		 * Choose, which Coin to update.
		 *
		 **/
		where: CoinWhereUniqueInput;
	};

	/**
	 * Coin updateMany
	 */
	export type CoinUpdateManyArgs = {
		data: XOR<CoinUpdateManyMutationInput, CoinUncheckedUpdateManyInput>;
		where?: CoinWhereInput;
	};

	/**
	 * Coin upsert
	 */
	export type CoinUpsertArgs = {
		/**
		 * Select specific fields to fetch from the Coin
		 *
		 **/
		select?: CoinSelect | null;
		/**
		 * Choose, which related nodes to fetch as well.
		 *
		 **/
		include?: CoinInclude | null;
		/**
		 * The filter to search for the Coin to update in case it exists.
		 *
		 **/
		where: CoinWhereUniqueInput;
		/**
		 * In case the Coin found by the `where` argument doesn't exist, create a new Coin with this data.
		 *
		 **/
		create: XOR<CoinCreateInput, CoinUncheckedCreateInput>;
		/**
		 * In case the Coin was found with the provided `where` argument, update it with this data.
		 *
		 **/
		update: XOR<CoinUpdateInput, CoinUncheckedUpdateInput>;
	};

	/**
	 * Coin delete
	 */
	export type CoinDeleteArgs = {
		/**
		 * Select specific fields to fetch from the Coin
		 *
		 **/
		select?: CoinSelect | null;
		/**
		 * Choose, which related nodes to fetch as well.
		 *
		 **/
		include?: CoinInclude | null;
		/**
		 * Filter which Coin to delete.
		 *
		 **/
		where: CoinWhereUniqueInput;
	};

	/**
	 * Coin deleteMany
	 */
	export type CoinDeleteManyArgs = {
		where?: CoinWhereInput;
	};

	/**
	 * Coin without action
	 */
	export type CoinArgs = {
		/**
		 * Select specific fields to fetch from the Coin
		 *
		 **/
		select?: CoinSelect | null;
		/**
		 * Choose, which related nodes to fetch as well.
		 *
		 **/
		include?: CoinInclude | null;
	};

	/**
	 * Model Team
	 */

	export type AggregateTeam = {
		_count: TeamCountAggregateOutputType | null;
		count: TeamCountAggregateOutputType | null;
		_avg: TeamAvgAggregateOutputType | null;
		avg: TeamAvgAggregateOutputType | null;
		_sum: TeamSumAggregateOutputType | null;
		sum: TeamSumAggregateOutputType | null;
		_min: TeamMinAggregateOutputType | null;
		min: TeamMinAggregateOutputType | null;
		_max: TeamMaxAggregateOutputType | null;
		max: TeamMaxAggregateOutputType | null;
	};

	export type TeamAvgAggregateOutputType = {
		id: number | null;
		coin_id: number | null;
	};

	export type TeamSumAggregateOutputType = {
		id: number | null;
		coin_id: number | null;
	};

	export type TeamMinAggregateOutputType = {
		id: number | null;
		coin_id: number | null;
		uuid: string | null;
		name: string | null;
		slug: string | null;
		symbol: string | null;
	};

	export type TeamMaxAggregateOutputType = {
		id: number | null;
		coin_id: number | null;
		uuid: string | null;
		name: string | null;
		slug: string | null;
		symbol: string | null;
	};

	export type TeamCountAggregateOutputType = {
		id: number;
		coin_id: number;
		uuid: number;
		name: number;
		slug: number;
		symbol: number;
		data: number;
		_all: number;
	};

	export type TeamAvgAggregateInputType = {
		id?: true;
		coin_id?: true;
	};

	export type TeamSumAggregateInputType = {
		id?: true;
		coin_id?: true;
	};

	export type TeamMinAggregateInputType = {
		id?: true;
		coin_id?: true;
		uuid?: true;
		name?: true;
		slug?: true;
		symbol?: true;
	};

	export type TeamMaxAggregateInputType = {
		id?: true;
		coin_id?: true;
		uuid?: true;
		name?: true;
		slug?: true;
		symbol?: true;
	};

	export type TeamCountAggregateInputType = {
		id?: true;
		coin_id?: true;
		uuid?: true;
		name?: true;
		slug?: true;
		symbol?: true;
		data?: true;
		_all?: true;
	};

	export type TeamAggregateArgs = {
		/**
		 * Filter which Team to aggregate.
		 *
		 **/
		where?: TeamWhereInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of Teams to fetch.
		 *
		 **/
		orderBy?: Enumerable<TeamOrderByInput>;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the start position
		 *
		 **/
		cursor?: TeamWhereUniqueInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` Teams from the position of the cursor.
		 *
		 **/
		take?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` Teams.
		 *
		 **/
		skip?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Count returned Teams
		 **/
		_count?: true | TeamCountAggregateInputType;
		/**
		 * @deprecated since 2.23.0 please use `_count`
		 **/
		count?: true | TeamCountAggregateInputType;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Select which fields to average
		 **/
		_avg?: TeamAvgAggregateInputType;
		/**
		 * @deprecated since 2.23.0 please use `_avg`
		 **/
		avg?: TeamAvgAggregateInputType;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Select which fields to sum
		 **/
		_sum?: TeamSumAggregateInputType;
		/**
		 * @deprecated since 2.23.0 please use `_sum`
		 **/
		sum?: TeamSumAggregateInputType;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Select which fields to find the minimum value
		 **/
		_min?: TeamMinAggregateInputType;
		/**
		 * @deprecated since 2.23.0 please use `_min`
		 **/
		min?: TeamMinAggregateInputType;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Select which fields to find the maximum value
		 **/
		_max?: TeamMaxAggregateInputType;
		/**
		 * @deprecated since 2.23.0 please use `_max`
		 **/
		max?: TeamMaxAggregateInputType;
	};

	export type GetTeamAggregateType<T extends TeamAggregateArgs> = {
		[P in keyof T & keyof AggregateTeam]: P extends "_count" | "count"
			? T[P] extends true
				? number
				: GetScalarType<T[P], AggregateTeam[P]>
			: GetScalarType<T[P], AggregateTeam[P]>;
	};

	export type TeamGroupByArgs = {
		where?: TeamWhereInput;
		orderBy?: Enumerable<TeamOrderByInput>;
		by: Array<TeamScalarFieldEnum>;
		having?: TeamScalarWhereWithAggregatesInput;
		take?: number;
		skip?: number;
		_count?: TeamCountAggregateInputType | true;
		_avg?: TeamAvgAggregateInputType;
		_sum?: TeamSumAggregateInputType;
		_min?: TeamMinAggregateInputType;
		_max?: TeamMaxAggregateInputType;
	};

	export type TeamGroupByOutputType = {
		id: number;
		coin_id: number;
		uuid: string;
		name: string;
		slug: string;
		symbol: string;
		data: JsonValue;
		_count: TeamCountAggregateOutputType | null;
		_avg: TeamAvgAggregateOutputType | null;
		_sum: TeamSumAggregateOutputType | null;
		_min: TeamMinAggregateOutputType | null;
		_max: TeamMaxAggregateOutputType | null;
	};

	type GetTeamGroupByPayload<T extends TeamGroupByArgs> = Promise<
		Array<
			PickArray<TeamGroupByOutputType, T["by"]> &
				{
					[P in keyof T & keyof TeamGroupByOutputType]: P extends "_count"
						? T[P] extends boolean
							? number
							: GetScalarType<T[P], TeamGroupByOutputType[P]>
						: GetScalarType<T[P], TeamGroupByOutputType[P]>;
				}
		>
	>;

	export type TeamSelect = {
		id?: boolean;
		coin?: boolean | CoinArgs;
		coin_id?: boolean;
		uuid?: boolean;
		name?: boolean;
		slug?: boolean;
		symbol?: boolean;
		data?: boolean;
		signals?: boolean | SignalFindManyArgs;
	};

	export type TeamInclude = {
		coin?: boolean | CoinArgs;
		signals?: boolean | SignalFindManyArgs;
	};

	export type TeamGetPayload<S extends boolean | null | undefined | TeamArgs, U = keyof S> = S extends true
		? Team
		: S extends undefined
		? never
		: S extends TeamArgs | TeamFindManyArgs
		? "include" extends U
			? Team &
					{
						[P in TrueKeys<S["include"]>]: P extends "coin"
							? CoinGetPayload<S["include"][P]>
							: P extends "signals"
							? Array<SignalGetPayload<S["include"][P]>>
							: never;
					}
			: "select" extends U
			? {
					[P in TrueKeys<S["select"]>]: P extends keyof Team
						? Team[P]
						: P extends "coin"
						? CoinGetPayload<S["select"][P]>
						: P extends "signals"
						? Array<SignalGetPayload<S["select"][P]>>
						: never;
			  }
			: Team
		: Team;

	type TeamCountArgs = Merge<
		Omit<TeamFindManyArgs, "select" | "include"> & {
			select?: TeamCountAggregateInputType | true;
		}
	>;

	export interface TeamDelegate<GlobalRejectSettings> {
		/**
		 * Find zero or one Team that matches the filter.
		 * @param {TeamFindUniqueArgs} args - Arguments to find a Team
		 * @example
		 * // Get one Team
		 * const team = await prisma.team.findUnique({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 **/
		findUnique<
			T extends TeamFindUniqueArgs,
			LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T["rejectOnNotFound"] : undefined
		>(
			args: SelectSubset<T, TeamFindUniqueArgs>,
		): HasReject<GlobalRejectSettings, LocalRejectSettings, "findUnique", "Team"> extends True
			? CheckSelect<T, Prisma__TeamClient<Team>, Prisma__TeamClient<TeamGetPayload<T>>>
			: CheckSelect<T, Prisma__TeamClient<Team | null>, Prisma__TeamClient<TeamGetPayload<T> | null>>;

		/**
		 * Find the first Team that matches the filter.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {TeamFindFirstArgs} args - Arguments to find a Team
		 * @example
		 * // Get one Team
		 * const team = await prisma.team.findFirst({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 **/
		findFirst<
			T extends TeamFindFirstArgs,
			LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T["rejectOnNotFound"] : undefined
		>(
			args?: SelectSubset<T, TeamFindFirstArgs>,
		): HasReject<GlobalRejectSettings, LocalRejectSettings, "findFirst", "Team"> extends True
			? CheckSelect<T, Prisma__TeamClient<Team>, Prisma__TeamClient<TeamGetPayload<T>>>
			: CheckSelect<T, Prisma__TeamClient<Team | null>, Prisma__TeamClient<TeamGetPayload<T> | null>>;

		/**
		 * Find zero or more Teams that matches the filter.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {TeamFindManyArgs=} args - Arguments to filter and select certain fields only.
		 * @example
		 * // Get all Teams
		 * const teams = await prisma.team.findMany()
		 *
		 * // Get first 10 Teams
		 * const teams = await prisma.team.findMany({ take: 10 })
		 *
		 * // Only select the `id`
		 * const teamWithIdOnly = await prisma.team.findMany({ select: { id: true } })
		 *
		 **/
		findMany<T extends TeamFindManyArgs>(
			args?: SelectSubset<T, TeamFindManyArgs>,
		): CheckSelect<T, PrismaPromise<Array<Team>>, PrismaPromise<Array<TeamGetPayload<T>>>>;

		/**
		 * Create a Team.
		 * @param {TeamCreateArgs} args - Arguments to create a Team.
		 * @example
		 * // Create one Team
		 * const Team = await prisma.team.create({
		 *   data: {
		 *     // ... data to create a Team
		 *   }
		 * })
		 *
		 **/
		create<T extends TeamCreateArgs>(
			args: SelectSubset<T, TeamCreateArgs>,
		): CheckSelect<T, Prisma__TeamClient<Team>, Prisma__TeamClient<TeamGetPayload<T>>>;

		/**
		 * Create many Teams.
		 *     @param {TeamCreateManyArgs} args - Arguments to create many Teams.
		 *     @example
		 *     // Create many Teams
		 *     const team = await prisma.team.createMany({
		 *       data: {
		 *         // ... provide data here
		 *       }
		 *     })
		 *
		 **/
		createMany<T extends TeamCreateManyArgs>(
			args?: SelectSubset<T, TeamCreateManyArgs>,
		): PrismaPromise<BatchPayload>;

		/**
		 * Delete a Team.
		 * @param {TeamDeleteArgs} args - Arguments to delete one Team.
		 * @example
		 * // Delete one Team
		 * const Team = await prisma.team.delete({
		 *   where: {
		 *     // ... filter to delete one Team
		 *   }
		 * })
		 *
		 **/
		delete<T extends TeamDeleteArgs>(
			args: SelectSubset<T, TeamDeleteArgs>,
		): CheckSelect<T, Prisma__TeamClient<Team>, Prisma__TeamClient<TeamGetPayload<T>>>;

		/**
		 * Update one Team.
		 * @param {TeamUpdateArgs} args - Arguments to update one Team.
		 * @example
		 * // Update one Team
		 * const team = await prisma.team.update({
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: {
		 *     // ... provide data here
		 *   }
		 * })
		 *
		 **/
		update<T extends TeamUpdateArgs>(
			args: SelectSubset<T, TeamUpdateArgs>,
		): CheckSelect<T, Prisma__TeamClient<Team>, Prisma__TeamClient<TeamGetPayload<T>>>;

		/**
		 * Delete zero or more Teams.
		 * @param {TeamDeleteManyArgs} args - Arguments to filter Teams to delete.
		 * @example
		 * // Delete a few Teams
		 * const { count } = await prisma.team.deleteMany({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 *
		 **/
		deleteMany<T extends TeamDeleteManyArgs>(
			args?: SelectSubset<T, TeamDeleteManyArgs>,
		): PrismaPromise<BatchPayload>;

		/**
		 * Update zero or more Teams.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {TeamUpdateManyArgs} args - Arguments to update one or more rows.
		 * @example
		 * // Update many Teams
		 * const team = await prisma.team.updateMany({
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: {
		 *     // ... provide data here
		 *   }
		 * })
		 *
		 **/
		updateMany<T extends TeamUpdateManyArgs>(
			args: SelectSubset<T, TeamUpdateManyArgs>,
		): PrismaPromise<BatchPayload>;

		/**
		 * Create or update one Team.
		 * @param {TeamUpsertArgs} args - Arguments to update or create a Team.
		 * @example
		 * // Update or create a Team
		 * const team = await prisma.team.upsert({
		 *   create: {
		 *     // ... data to create a Team
		 *   },
		 *   update: {
		 *     // ... in case it already exists, update
		 *   },
		 *   where: {
		 *     // ... the filter for the Team we want to update
		 *   }
		 * })
		 **/
		upsert<T extends TeamUpsertArgs>(
			args: SelectSubset<T, TeamUpsertArgs>,
		): CheckSelect<T, Prisma__TeamClient<Team>, Prisma__TeamClient<TeamGetPayload<T>>>;

		/**
		 * Count the number of Teams.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {TeamCountArgs} args - Arguments to filter Teams to count.
		 * @example
		 * // Count the number of Teams
		 * const count = await prisma.team.count({
		 *   where: {
		 *     // ... the filter for the Teams we want to count
		 *   }
		 * })
		 **/
		count<T extends TeamCountArgs>(
			args?: Subset<T, TeamCountArgs>,
		): PrismaPromise<
			T extends _Record<"select", any>
				? T["select"] extends true
					? number
					: GetScalarType<T["select"], TeamCountAggregateOutputType>
				: number
		>;

		/**
		 * Allows you to perform aggregations operations on a Team.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {TeamAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
		 * @example
		 * // Ordered by age ascending
		 * // Where email contains prisma.io
		 * // Limited to the 10 users
		 * const aggregations = await prisma.user.aggregate({
		 *   _avg: {
		 *     age: true,
		 *   },
		 *   where: {
		 *     email: {
		 *       contains: "prisma.io",
		 *     },
		 *   },
		 *   orderBy: {
		 *     age: "asc",
		 *   },
		 *   take: 10,
		 * })
		 **/
		aggregate<T extends TeamAggregateArgs>(
			args: Subset<T, TeamAggregateArgs>,
		): PrismaPromise<GetTeamAggregateType<T>>;

		/**
		 * Group by Team.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {TeamGroupByArgs} args - Group by arguments.
		 * @example
		 * // Group by city, order by createdAt, get count
		 * const result = await prisma.user.groupBy({
		 *   by: ['city', 'createdAt'],
		 *   orderBy: {
		 *     createdAt: true
		 *   },
		 *   _count: {
		 *     _all: true
		 *   },
		 * })
		 *
		 **/
		groupBy<
			T extends TeamGroupByArgs,
			HasSelectOrTake extends Or<Extends<"skip", Keys<T>>, Extends<"take", Keys<T>>>,
			OrderByArg extends True extends HasSelectOrTake
				? { orderBy: TeamGroupByArgs["orderBy"] }
				: { orderBy?: TeamGroupByArgs["orderBy"] },
			OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T["orderBy"]>>>,
			ByFields extends TupleToUnion<T["by"]>,
			ByValid extends Has<ByFields, OrderFields>,
			HavingFields extends GetHavingFields<T["having"]>,
			HavingValid extends Has<ByFields, HavingFields>,
			ByEmpty extends T["by"] extends never[] ? True : False,
			InputErrors extends ByEmpty extends True
				? `Error: "by" must not be empty.`
				: HavingValid extends False
				? {
						[P in HavingFields]: P extends ByFields
							? never
							: P extends string
							? `Error: Field "${P}" used in "having" needs to be provided in "by".`
							: [Error, "Field ", P, ` in "having" needs to be provided in "by"`];
				  }[HavingFields]
				: "take" extends Keys<T>
				? "orderBy" extends Keys<T>
					? ByValid extends True
						? {}
						: {
								[P in OrderFields]: P extends ByFields
									? never
									: `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
						  }[OrderFields]
					: 'Error: If you provide "take", you also need to provide "orderBy"'
				: "skip" extends Keys<T>
				? "orderBy" extends Keys<T>
					? ByValid extends True
						? {}
						: {
								[P in OrderFields]: P extends ByFields
									? never
									: `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
						  }[OrderFields]
					: 'Error: If you provide "skip", you also need to provide "orderBy"'
				: ByValid extends True
				? {}
				: {
						[P in OrderFields]: P extends ByFields
							? never
							: `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
				  }[OrderFields]
		>(
			args: SubsetIntersection<T, TeamGroupByArgs, OrderByArg> & InputErrors,
		): {} extends InputErrors ? GetTeamGroupByPayload<T> : Promise<InputErrors>;
	}

	/**
	 * The delegate class that acts as a "Promise-like" for Team.
	 * Why is this prefixed with `Prisma__`?
	 * Because we want to prevent naming conflicts as mentioned in
	 * https://github.com/prisma/prisma-client-js/issues/707
	 */
	export class Prisma__TeamClient<T> implements PrismaPromise<T> {
		[prisma]: true;
		private readonly _dmmf;
		private readonly _fetcher;
		private readonly _queryType;
		private readonly _rootField;
		private readonly _clientMethod;
		private readonly _args;
		private readonly _dataPath;
		private readonly _errorFormat;
		private readonly _measurePerformance?;
		private _isList;
		private _callsite;
		private _requestPromise?;
		constructor(
			_dmmf: runtime.DMMFClass,
			_fetcher: PrismaClientFetcher,
			_queryType: "query" | "mutation",
			_rootField: string,
			_clientMethod: string,
			_args: any,
			_dataPath: string[],
			_errorFormat: ErrorFormat,
			_measurePerformance?: boolean | undefined,
			_isList?: boolean,
		);
		readonly [Symbol.toStringTag]: "PrismaClientPromise";

		coin<T extends CoinArgs = {}>(
			args?: Subset<T, CoinArgs>,
		): CheckSelect<T, Prisma__CoinClient<Coin | null>, Prisma__CoinClient<CoinGetPayload<T> | null>>;

		signals<T extends SignalFindManyArgs = {}>(
			args?: Subset<T, SignalFindManyArgs>,
		): CheckSelect<T, PrismaPromise<Array<Signal>>, PrismaPromise<Array<SignalGetPayload<T>>>>;

		private get _document();
		/**
		 * Attaches callbacks for the resolution and/or rejection of the Promise.
		 * @param onfulfilled The callback to execute when the Promise is resolved.
		 * @param onrejected The callback to execute when the Promise is rejected.
		 * @returns A Promise for the completion of which ever callback is executed.
		 */
		then<TResult1 = T, TResult2 = never>(
			onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
			onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
		): Promise<TResult1 | TResult2>;
		/**
		 * Attaches a callback for only the rejection of the Promise.
		 * @param onrejected The callback to execute when the Promise is rejected.
		 * @returns A Promise for the completion of the callback.
		 */
		catch<TResult = never>(
			onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
		): Promise<T | TResult>;
		/**
		 * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
		 * resolved value cannot be modified from the callback.
		 * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
		 * @returns A Promise for the completion of the callback.
		 */
		finally(onfinally?: (() => void) | undefined | null): Promise<T>;
	}

	// Custom InputTypes

	/**
	 * Team findUnique
	 */
	export type TeamFindUniqueArgs = {
		/**
		 * Select specific fields to fetch from the Team
		 *
		 **/
		select?: TeamSelect | null;
		/**
		 * Choose, which related nodes to fetch as well.
		 *
		 **/
		include?: TeamInclude | null;
		/**
		 * Throw an Error if a Team can't be found
		 *
		 **/
		rejectOnNotFound?: RejectOnNotFound;
		/**
		 * Filter, which Team to fetch.
		 *
		 **/
		where: TeamWhereUniqueInput;
	};

	/**
	 * Team findFirst
	 */
	export type TeamFindFirstArgs = {
		/**
		 * Select specific fields to fetch from the Team
		 *
		 **/
		select?: TeamSelect | null;
		/**
		 * Choose, which related nodes to fetch as well.
		 *
		 **/
		include?: TeamInclude | null;
		/**
		 * Throw an Error if a Team can't be found
		 *
		 **/
		rejectOnNotFound?: RejectOnNotFound;
		/**
		 * Filter, which Team to fetch.
		 *
		 **/
		where?: TeamWhereInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of Teams to fetch.
		 *
		 **/
		orderBy?: Enumerable<TeamOrderByInput>;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the position for searching for Teams.
		 *
		 **/
		cursor?: TeamWhereUniqueInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` Teams from the position of the cursor.
		 *
		 **/
		take?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` Teams.
		 *
		 **/
		skip?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
		 *
		 * Filter by unique combinations of Teams.
		 *
		 **/
		distinct?: Enumerable<TeamScalarFieldEnum>;
	};

	/**
	 * Team findMany
	 */
	export type TeamFindManyArgs = {
		/**
		 * Select specific fields to fetch from the Team
		 *
		 **/
		select?: TeamSelect | null;
		/**
		 * Choose, which related nodes to fetch as well.
		 *
		 **/
		include?: TeamInclude | null;
		/**
		 * Filter, which Teams to fetch.
		 *
		 **/
		where?: TeamWhereInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of Teams to fetch.
		 *
		 **/
		orderBy?: Enumerable<TeamOrderByInput>;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the position for listing Teams.
		 *
		 **/
		cursor?: TeamWhereUniqueInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` Teams from the position of the cursor.
		 *
		 **/
		take?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` Teams.
		 *
		 **/
		skip?: number;
		distinct?: Enumerable<TeamScalarFieldEnum>;
	};

	/**
	 * Team create
	 */
	export type TeamCreateArgs = {
		/**
		 * Select specific fields to fetch from the Team
		 *
		 **/
		select?: TeamSelect | null;
		/**
		 * Choose, which related nodes to fetch as well.
		 *
		 **/
		include?: TeamInclude | null;
		/**
		 * The data needed to create a Team.
		 *
		 **/
		data: XOR<TeamCreateInput, TeamUncheckedCreateInput>;
	};

	/**
	 * Team createMany
	 */
	export type TeamCreateManyArgs = {
		data: Enumerable<TeamCreateManyInput>;
		skipDuplicates?: boolean;
	};

	/**
	 * Team update
	 */
	export type TeamUpdateArgs = {
		/**
		 * Select specific fields to fetch from the Team
		 *
		 **/
		select?: TeamSelect | null;
		/**
		 * Choose, which related nodes to fetch as well.
		 *
		 **/
		include?: TeamInclude | null;
		/**
		 * The data needed to update a Team.
		 *
		 **/
		data: XOR<TeamUpdateInput, TeamUncheckedUpdateInput>;
		/**
		 * Choose, which Team to update.
		 *
		 **/
		where: TeamWhereUniqueInput;
	};

	/**
	 * Team updateMany
	 */
	export type TeamUpdateManyArgs = {
		data: XOR<TeamUpdateManyMutationInput, TeamUncheckedUpdateManyInput>;
		where?: TeamWhereInput;
	};

	/**
	 * Team upsert
	 */
	export type TeamUpsertArgs = {
		/**
		 * Select specific fields to fetch from the Team
		 *
		 **/
		select?: TeamSelect | null;
		/**
		 * Choose, which related nodes to fetch as well.
		 *
		 **/
		include?: TeamInclude | null;
		/**
		 * The filter to search for the Team to update in case it exists.
		 *
		 **/
		where: TeamWhereUniqueInput;
		/**
		 * In case the Team found by the `where` argument doesn't exist, create a new Team with this data.
		 *
		 **/
		create: XOR<TeamCreateInput, TeamUncheckedCreateInput>;
		/**
		 * In case the Team was found with the provided `where` argument, update it with this data.
		 *
		 **/
		update: XOR<TeamUpdateInput, TeamUncheckedUpdateInput>;
	};

	/**
	 * Team delete
	 */
	export type TeamDeleteArgs = {
		/**
		 * Select specific fields to fetch from the Team
		 *
		 **/
		select?: TeamSelect | null;
		/**
		 * Choose, which related nodes to fetch as well.
		 *
		 **/
		include?: TeamInclude | null;
		/**
		 * Filter which Team to delete.
		 *
		 **/
		where: TeamWhereUniqueInput;
	};

	/**
	 * Team deleteMany
	 */
	export type TeamDeleteManyArgs = {
		where?: TeamWhereInput;
	};

	/**
	 * Team without action
	 */
	export type TeamArgs = {
		/**
		 * Select specific fields to fetch from the Team
		 *
		 **/
		select?: TeamSelect | null;
		/**
		 * Choose, which related nodes to fetch as well.
		 *
		 **/
		include?: TeamInclude | null;
	};

	/**
	 * Model Signal
	 */

	export type AggregateSignal = {
		_count: SignalCountAggregateOutputType | null;
		count: SignalCountAggregateOutputType | null;
		_avg: SignalAvgAggregateOutputType | null;
		avg: SignalAvgAggregateOutputType | null;
		_sum: SignalSumAggregateOutputType | null;
		sum: SignalSumAggregateOutputType | null;
		_min: SignalMinAggregateOutputType | null;
		min: SignalMinAggregateOutputType | null;
		_max: SignalMaxAggregateOutputType | null;
		max: SignalMaxAggregateOutputType | null;
	};

	export type SignalAvgAggregateOutputType = {
		id: number | null;
		team_id: number | null;
	};

	export type SignalSumAggregateOutputType = {
		id: number | null;
		team_id: number | null;
	};

	export type SignalMinAggregateOutputType = {
		id: number | null;
		team_id: number | null;
		uuid: string | null;
		text: string | null;
		date_active: Date | null;
		date_created: Date | null;
		date_updated: Date | null;
		is_featured: boolean | null;
	};

	export type SignalMaxAggregateOutputType = {
		id: number | null;
		team_id: number | null;
		uuid: string | null;
		text: string | null;
		date_active: Date | null;
		date_created: Date | null;
		date_updated: Date | null;
		is_featured: boolean | null;
	};

	export type SignalCountAggregateOutputType = {
		id: number;
		team_id: number;
		uuid: number;
		text: number;
		rich_text: number;
		date_active: number;
		date_created: number;
		date_updated: number;
		attributed_author: number;
		category: number;
		is_featured: number;
		data: number;
		_all: number;
	};

	export type SignalAvgAggregateInputType = {
		id?: true;
		team_id?: true;
	};

	export type SignalSumAggregateInputType = {
		id?: true;
		team_id?: true;
	};

	export type SignalMinAggregateInputType = {
		id?: true;
		team_id?: true;
		uuid?: true;
		text?: true;
		date_active?: true;
		date_created?: true;
		date_updated?: true;
		is_featured?: true;
	};

	export type SignalMaxAggregateInputType = {
		id?: true;
		team_id?: true;
		uuid?: true;
		text?: true;
		date_active?: true;
		date_created?: true;
		date_updated?: true;
		is_featured?: true;
	};

	export type SignalCountAggregateInputType = {
		id?: true;
		team_id?: true;
		uuid?: true;
		text?: true;
		rich_text?: true;
		date_active?: true;
		date_created?: true;
		date_updated?: true;
		attributed_author?: true;
		category?: true;
		is_featured?: true;
		data?: true;
		_all?: true;
	};

	export type SignalAggregateArgs = {
		/**
		 * Filter which Signal to aggregate.
		 *
		 **/
		where?: SignalWhereInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of Signals to fetch.
		 *
		 **/
		orderBy?: Enumerable<SignalOrderByInput>;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the start position
		 *
		 **/
		cursor?: SignalWhereUniqueInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` Signals from the position of the cursor.
		 *
		 **/
		take?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` Signals.
		 *
		 **/
		skip?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Count returned Signals
		 **/
		_count?: true | SignalCountAggregateInputType;
		/**
		 * @deprecated since 2.23.0 please use `_count`
		 **/
		count?: true | SignalCountAggregateInputType;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Select which fields to average
		 **/
		_avg?: SignalAvgAggregateInputType;
		/**
		 * @deprecated since 2.23.0 please use `_avg`
		 **/
		avg?: SignalAvgAggregateInputType;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Select which fields to sum
		 **/
		_sum?: SignalSumAggregateInputType;
		/**
		 * @deprecated since 2.23.0 please use `_sum`
		 **/
		sum?: SignalSumAggregateInputType;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Select which fields to find the minimum value
		 **/
		_min?: SignalMinAggregateInputType;
		/**
		 * @deprecated since 2.23.0 please use `_min`
		 **/
		min?: SignalMinAggregateInputType;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Select which fields to find the maximum value
		 **/
		_max?: SignalMaxAggregateInputType;
		/**
		 * @deprecated since 2.23.0 please use `_max`
		 **/
		max?: SignalMaxAggregateInputType;
	};

	export type GetSignalAggregateType<T extends SignalAggregateArgs> = {
		[P in keyof T & keyof AggregateSignal]: P extends "_count" | "count"
			? T[P] extends true
				? number
				: GetScalarType<T[P], AggregateSignal[P]>
			: GetScalarType<T[P], AggregateSignal[P]>;
	};

	export type SignalGroupByArgs = {
		where?: SignalWhereInput;
		orderBy?: Enumerable<SignalOrderByInput>;
		by: Array<SignalScalarFieldEnum>;
		having?: SignalScalarWhereWithAggregatesInput;
		take?: number;
		skip?: number;
		_count?: SignalCountAggregateInputType | true;
		_avg?: SignalAvgAggregateInputType;
		_sum?: SignalSumAggregateInputType;
		_min?: SignalMinAggregateInputType;
		_max?: SignalMaxAggregateInputType;
	};

	export type SignalGroupByOutputType = {
		id: number;
		team_id: number;
		uuid: string;
		text: string;
		rich_text: JsonValue;
		date_active: Date;
		date_created: Date;
		date_updated: Date;
		attributed_author: JsonValue;
		category: JsonValue;
		is_featured: boolean;
		data: JsonValue;
		_count: SignalCountAggregateOutputType | null;
		_avg: SignalAvgAggregateOutputType | null;
		_sum: SignalSumAggregateOutputType | null;
		_min: SignalMinAggregateOutputType | null;
		_max: SignalMaxAggregateOutputType | null;
	};

	type GetSignalGroupByPayload<T extends SignalGroupByArgs> = Promise<
		Array<
			PickArray<SignalGroupByOutputType, T["by"]> &
				{
					[P in keyof T & keyof SignalGroupByOutputType]: P extends "_count"
						? T[P] extends boolean
							? number
							: GetScalarType<T[P], SignalGroupByOutputType[P]>
						: GetScalarType<T[P], SignalGroupByOutputType[P]>;
				}
		>
	>;

	export type SignalSelect = {
		id?: boolean;
		team?: boolean | TeamArgs;
		team_id?: boolean;
		uuid?: boolean;
		text?: boolean;
		rich_text?: boolean;
		date_active?: boolean;
		date_created?: boolean;
		date_updated?: boolean;
		attributed_author?: boolean;
		category?: boolean;
		is_featured?: boolean;
		data?: boolean;
	};

	export type SignalInclude = {
		team?: boolean | TeamArgs;
	};

	export type SignalGetPayload<S extends boolean | null | undefined | SignalArgs, U = keyof S> = S extends true
		? Signal
		: S extends undefined
		? never
		: S extends SignalArgs | SignalFindManyArgs
		? "include" extends U
			? Signal &
					{
						[P in TrueKeys<S["include"]>]: P extends "team" ? TeamGetPayload<S["include"][P]> : never;
					}
			: "select" extends U
			? {
					[P in TrueKeys<S["select"]>]: P extends keyof Signal
						? Signal[P]
						: P extends "team"
						? TeamGetPayload<S["select"][P]>
						: never;
			  }
			: Signal
		: Signal;

	type SignalCountArgs = Merge<
		Omit<SignalFindManyArgs, "select" | "include"> & {
			select?: SignalCountAggregateInputType | true;
		}
	>;

	export interface SignalDelegate<GlobalRejectSettings> {
		/**
		 * Find zero or one Signal that matches the filter.
		 * @param {SignalFindUniqueArgs} args - Arguments to find a Signal
		 * @example
		 * // Get one Signal
		 * const signal = await prisma.signal.findUnique({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 **/
		findUnique<
			T extends SignalFindUniqueArgs,
			LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T["rejectOnNotFound"] : undefined
		>(
			args: SelectSubset<T, SignalFindUniqueArgs>,
		): HasReject<GlobalRejectSettings, LocalRejectSettings, "findUnique", "Signal"> extends True
			? CheckSelect<T, Prisma__SignalClient<Signal>, Prisma__SignalClient<SignalGetPayload<T>>>
			: CheckSelect<T, Prisma__SignalClient<Signal | null>, Prisma__SignalClient<SignalGetPayload<T> | null>>;

		/**
		 * Find the first Signal that matches the filter.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {SignalFindFirstArgs} args - Arguments to find a Signal
		 * @example
		 * // Get one Signal
		 * const signal = await prisma.signal.findFirst({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 **/
		findFirst<
			T extends SignalFindFirstArgs,
			LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T["rejectOnNotFound"] : undefined
		>(
			args?: SelectSubset<T, SignalFindFirstArgs>,
		): HasReject<GlobalRejectSettings, LocalRejectSettings, "findFirst", "Signal"> extends True
			? CheckSelect<T, Prisma__SignalClient<Signal>, Prisma__SignalClient<SignalGetPayload<T>>>
			: CheckSelect<T, Prisma__SignalClient<Signal | null>, Prisma__SignalClient<SignalGetPayload<T> | null>>;

		/**
		 * Find zero or more Signals that matches the filter.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {SignalFindManyArgs=} args - Arguments to filter and select certain fields only.
		 * @example
		 * // Get all Signals
		 * const signals = await prisma.signal.findMany()
		 *
		 * // Get first 10 Signals
		 * const signals = await prisma.signal.findMany({ take: 10 })
		 *
		 * // Only select the `id`
		 * const signalWithIdOnly = await prisma.signal.findMany({ select: { id: true } })
		 *
		 **/
		findMany<T extends SignalFindManyArgs>(
			args?: SelectSubset<T, SignalFindManyArgs>,
		): CheckSelect<T, PrismaPromise<Array<Signal>>, PrismaPromise<Array<SignalGetPayload<T>>>>;

		/**
		 * Create a Signal.
		 * @param {SignalCreateArgs} args - Arguments to create a Signal.
		 * @example
		 * // Create one Signal
		 * const Signal = await prisma.signal.create({
		 *   data: {
		 *     // ... data to create a Signal
		 *   }
		 * })
		 *
		 **/
		create<T extends SignalCreateArgs>(
			args: SelectSubset<T, SignalCreateArgs>,
		): CheckSelect<T, Prisma__SignalClient<Signal>, Prisma__SignalClient<SignalGetPayload<T>>>;

		/**
		 * Create many Signals.
		 *     @param {SignalCreateManyArgs} args - Arguments to create many Signals.
		 *     @example
		 *     // Create many Signals
		 *     const signal = await prisma.signal.createMany({
		 *       data: {
		 *         // ... provide data here
		 *       }
		 *     })
		 *
		 **/
		createMany<T extends SignalCreateManyArgs>(
			args?: SelectSubset<T, SignalCreateManyArgs>,
		): PrismaPromise<BatchPayload>;

		/**
		 * Delete a Signal.
		 * @param {SignalDeleteArgs} args - Arguments to delete one Signal.
		 * @example
		 * // Delete one Signal
		 * const Signal = await prisma.signal.delete({
		 *   where: {
		 *     // ... filter to delete one Signal
		 *   }
		 * })
		 *
		 **/
		delete<T extends SignalDeleteArgs>(
			args: SelectSubset<T, SignalDeleteArgs>,
		): CheckSelect<T, Prisma__SignalClient<Signal>, Prisma__SignalClient<SignalGetPayload<T>>>;

		/**
		 * Update one Signal.
		 * @param {SignalUpdateArgs} args - Arguments to update one Signal.
		 * @example
		 * // Update one Signal
		 * const signal = await prisma.signal.update({
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: {
		 *     // ... provide data here
		 *   }
		 * })
		 *
		 **/
		update<T extends SignalUpdateArgs>(
			args: SelectSubset<T, SignalUpdateArgs>,
		): CheckSelect<T, Prisma__SignalClient<Signal>, Prisma__SignalClient<SignalGetPayload<T>>>;

		/**
		 * Delete zero or more Signals.
		 * @param {SignalDeleteManyArgs} args - Arguments to filter Signals to delete.
		 * @example
		 * // Delete a few Signals
		 * const { count } = await prisma.signal.deleteMany({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 *
		 **/
		deleteMany<T extends SignalDeleteManyArgs>(
			args?: SelectSubset<T, SignalDeleteManyArgs>,
		): PrismaPromise<BatchPayload>;

		/**
		 * Update zero or more Signals.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {SignalUpdateManyArgs} args - Arguments to update one or more rows.
		 * @example
		 * // Update many Signals
		 * const signal = await prisma.signal.updateMany({
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: {
		 *     // ... provide data here
		 *   }
		 * })
		 *
		 **/
		updateMany<T extends SignalUpdateManyArgs>(
			args: SelectSubset<T, SignalUpdateManyArgs>,
		): PrismaPromise<BatchPayload>;

		/**
		 * Create or update one Signal.
		 * @param {SignalUpsertArgs} args - Arguments to update or create a Signal.
		 * @example
		 * // Update or create a Signal
		 * const signal = await prisma.signal.upsert({
		 *   create: {
		 *     // ... data to create a Signal
		 *   },
		 *   update: {
		 *     // ... in case it already exists, update
		 *   },
		 *   where: {
		 *     // ... the filter for the Signal we want to update
		 *   }
		 * })
		 **/
		upsert<T extends SignalUpsertArgs>(
			args: SelectSubset<T, SignalUpsertArgs>,
		): CheckSelect<T, Prisma__SignalClient<Signal>, Prisma__SignalClient<SignalGetPayload<T>>>;

		/**
		 * Count the number of Signals.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {SignalCountArgs} args - Arguments to filter Signals to count.
		 * @example
		 * // Count the number of Signals
		 * const count = await prisma.signal.count({
		 *   where: {
		 *     // ... the filter for the Signals we want to count
		 *   }
		 * })
		 **/
		count<T extends SignalCountArgs>(
			args?: Subset<T, SignalCountArgs>,
		): PrismaPromise<
			T extends _Record<"select", any>
				? T["select"] extends true
					? number
					: GetScalarType<T["select"], SignalCountAggregateOutputType>
				: number
		>;

		/**
		 * Allows you to perform aggregations operations on a Signal.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {SignalAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
		 * @example
		 * // Ordered by age ascending
		 * // Where email contains prisma.io
		 * // Limited to the 10 users
		 * const aggregations = await prisma.user.aggregate({
		 *   _avg: {
		 *     age: true,
		 *   },
		 *   where: {
		 *     email: {
		 *       contains: "prisma.io",
		 *     },
		 *   },
		 *   orderBy: {
		 *     age: "asc",
		 *   },
		 *   take: 10,
		 * })
		 **/
		aggregate<T extends SignalAggregateArgs>(
			args: Subset<T, SignalAggregateArgs>,
		): PrismaPromise<GetSignalAggregateType<T>>;

		/**
		 * Group by Signal.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {SignalGroupByArgs} args - Group by arguments.
		 * @example
		 * // Group by city, order by createdAt, get count
		 * const result = await prisma.user.groupBy({
		 *   by: ['city', 'createdAt'],
		 *   orderBy: {
		 *     createdAt: true
		 *   },
		 *   _count: {
		 *     _all: true
		 *   },
		 * })
		 *
		 **/
		groupBy<
			T extends SignalGroupByArgs,
			HasSelectOrTake extends Or<Extends<"skip", Keys<T>>, Extends<"take", Keys<T>>>,
			OrderByArg extends True extends HasSelectOrTake
				? { orderBy: SignalGroupByArgs["orderBy"] }
				: { orderBy?: SignalGroupByArgs["orderBy"] },
			OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T["orderBy"]>>>,
			ByFields extends TupleToUnion<T["by"]>,
			ByValid extends Has<ByFields, OrderFields>,
			HavingFields extends GetHavingFields<T["having"]>,
			HavingValid extends Has<ByFields, HavingFields>,
			ByEmpty extends T["by"] extends never[] ? True : False,
			InputErrors extends ByEmpty extends True
				? `Error: "by" must not be empty.`
				: HavingValid extends False
				? {
						[P in HavingFields]: P extends ByFields
							? never
							: P extends string
							? `Error: Field "${P}" used in "having" needs to be provided in "by".`
							: [Error, "Field ", P, ` in "having" needs to be provided in "by"`];
				  }[HavingFields]
				: "take" extends Keys<T>
				? "orderBy" extends Keys<T>
					? ByValid extends True
						? {}
						: {
								[P in OrderFields]: P extends ByFields
									? never
									: `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
						  }[OrderFields]
					: 'Error: If you provide "take", you also need to provide "orderBy"'
				: "skip" extends Keys<T>
				? "orderBy" extends Keys<T>
					? ByValid extends True
						? {}
						: {
								[P in OrderFields]: P extends ByFields
									? never
									: `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
						  }[OrderFields]
					: 'Error: If you provide "skip", you also need to provide "orderBy"'
				: ByValid extends True
				? {}
				: {
						[P in OrderFields]: P extends ByFields
							? never
							: `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
				  }[OrderFields]
		>(
			args: SubsetIntersection<T, SignalGroupByArgs, OrderByArg> & InputErrors,
		): {} extends InputErrors ? GetSignalGroupByPayload<T> : Promise<InputErrors>;
	}

	/**
	 * The delegate class that acts as a "Promise-like" for Signal.
	 * Why is this prefixed with `Prisma__`?
	 * Because we want to prevent naming conflicts as mentioned in
	 * https://github.com/prisma/prisma-client-js/issues/707
	 */
	export class Prisma__SignalClient<T> implements PrismaPromise<T> {
		[prisma]: true;
		private readonly _dmmf;
		private readonly _fetcher;
		private readonly _queryType;
		private readonly _rootField;
		private readonly _clientMethod;
		private readonly _args;
		private readonly _dataPath;
		private readonly _errorFormat;
		private readonly _measurePerformance?;
		private _isList;
		private _callsite;
		private _requestPromise?;
		constructor(
			_dmmf: runtime.DMMFClass,
			_fetcher: PrismaClientFetcher,
			_queryType: "query" | "mutation",
			_rootField: string,
			_clientMethod: string,
			_args: any,
			_dataPath: string[],
			_errorFormat: ErrorFormat,
			_measurePerformance?: boolean | undefined,
			_isList?: boolean,
		);
		readonly [Symbol.toStringTag]: "PrismaClientPromise";

		team<T extends TeamArgs = {}>(
			args?: Subset<T, TeamArgs>,
		): CheckSelect<T, Prisma__TeamClient<Team | null>, Prisma__TeamClient<TeamGetPayload<T> | null>>;

		private get _document();
		/**
		 * Attaches callbacks for the resolution and/or rejection of the Promise.
		 * @param onfulfilled The callback to execute when the Promise is resolved.
		 * @param onrejected The callback to execute when the Promise is rejected.
		 * @returns A Promise for the completion of which ever callback is executed.
		 */
		then<TResult1 = T, TResult2 = never>(
			onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
			onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
		): Promise<TResult1 | TResult2>;
		/**
		 * Attaches a callback for only the rejection of the Promise.
		 * @param onrejected The callback to execute when the Promise is rejected.
		 * @returns A Promise for the completion of the callback.
		 */
		catch<TResult = never>(
			onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
		): Promise<T | TResult>;
		/**
		 * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
		 * resolved value cannot be modified from the callback.
		 * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
		 * @returns A Promise for the completion of the callback.
		 */
		finally(onfinally?: (() => void) | undefined | null): Promise<T>;
	}

	// Custom InputTypes

	/**
	 * Signal findUnique
	 */
	export type SignalFindUniqueArgs = {
		/**
		 * Select specific fields to fetch from the Signal
		 *
		 **/
		select?: SignalSelect | null;
		/**
		 * Choose, which related nodes to fetch as well.
		 *
		 **/
		include?: SignalInclude | null;
		/**
		 * Throw an Error if a Signal can't be found
		 *
		 **/
		rejectOnNotFound?: RejectOnNotFound;
		/**
		 * Filter, which Signal to fetch.
		 *
		 **/
		where: SignalWhereUniqueInput;
	};

	/**
	 * Signal findFirst
	 */
	export type SignalFindFirstArgs = {
		/**
		 * Select specific fields to fetch from the Signal
		 *
		 **/
		select?: SignalSelect | null;
		/**
		 * Choose, which related nodes to fetch as well.
		 *
		 **/
		include?: SignalInclude | null;
		/**
		 * Throw an Error if a Signal can't be found
		 *
		 **/
		rejectOnNotFound?: RejectOnNotFound;
		/**
		 * Filter, which Signal to fetch.
		 *
		 **/
		where?: SignalWhereInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of Signals to fetch.
		 *
		 **/
		orderBy?: Enumerable<SignalOrderByInput>;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the position for searching for Signals.
		 *
		 **/
		cursor?: SignalWhereUniqueInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` Signals from the position of the cursor.
		 *
		 **/
		take?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` Signals.
		 *
		 **/
		skip?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
		 *
		 * Filter by unique combinations of Signals.
		 *
		 **/
		distinct?: Enumerable<SignalScalarFieldEnum>;
	};

	/**
	 * Signal findMany
	 */
	export type SignalFindManyArgs = {
		/**
		 * Select specific fields to fetch from the Signal
		 *
		 **/
		select?: SignalSelect | null;
		/**
		 * Choose, which related nodes to fetch as well.
		 *
		 **/
		include?: SignalInclude | null;
		/**
		 * Filter, which Signals to fetch.
		 *
		 **/
		where?: SignalWhereInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of Signals to fetch.
		 *
		 **/
		orderBy?: Enumerable<SignalOrderByInput>;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the position for listing Signals.
		 *
		 **/
		cursor?: SignalWhereUniqueInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` Signals from the position of the cursor.
		 *
		 **/
		take?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` Signals.
		 *
		 **/
		skip?: number;
		distinct?: Enumerable<SignalScalarFieldEnum>;
	};

	/**
	 * Signal create
	 */
	export type SignalCreateArgs = {
		/**
		 * Select specific fields to fetch from the Signal
		 *
		 **/
		select?: SignalSelect | null;
		/**
		 * Choose, which related nodes to fetch as well.
		 *
		 **/
		include?: SignalInclude | null;
		/**
		 * The data needed to create a Signal.
		 *
		 **/
		data: XOR<SignalCreateInput, SignalUncheckedCreateInput>;
	};

	/**
	 * Signal createMany
	 */
	export type SignalCreateManyArgs = {
		data: Enumerable<SignalCreateManyInput>;
		skipDuplicates?: boolean;
	};

	/**
	 * Signal update
	 */
	export type SignalUpdateArgs = {
		/**
		 * Select specific fields to fetch from the Signal
		 *
		 **/
		select?: SignalSelect | null;
		/**
		 * Choose, which related nodes to fetch as well.
		 *
		 **/
		include?: SignalInclude | null;
		/**
		 * The data needed to update a Signal.
		 *
		 **/
		data: XOR<SignalUpdateInput, SignalUncheckedUpdateInput>;
		/**
		 * Choose, which Signal to update.
		 *
		 **/
		where: SignalWhereUniqueInput;
	};

	/**
	 * Signal updateMany
	 */
	export type SignalUpdateManyArgs = {
		data: XOR<SignalUpdateManyMutationInput, SignalUncheckedUpdateManyInput>;
		where?: SignalWhereInput;
	};

	/**
	 * Signal upsert
	 */
	export type SignalUpsertArgs = {
		/**
		 * Select specific fields to fetch from the Signal
		 *
		 **/
		select?: SignalSelect | null;
		/**
		 * Choose, which related nodes to fetch as well.
		 *
		 **/
		include?: SignalInclude | null;
		/**
		 * The filter to search for the Signal to update in case it exists.
		 *
		 **/
		where: SignalWhereUniqueInput;
		/**
		 * In case the Signal found by the `where` argument doesn't exist, create a new Signal with this data.
		 *
		 **/
		create: XOR<SignalCreateInput, SignalUncheckedCreateInput>;
		/**
		 * In case the Signal was found with the provided `where` argument, update it with this data.
		 *
		 **/
		update: XOR<SignalUpdateInput, SignalUncheckedUpdateInput>;
	};

	/**
	 * Signal delete
	 */
	export type SignalDeleteArgs = {
		/**
		 * Select specific fields to fetch from the Signal
		 *
		 **/
		select?: SignalSelect | null;
		/**
		 * Choose, which related nodes to fetch as well.
		 *
		 **/
		include?: SignalInclude | null;
		/**
		 * Filter which Signal to delete.
		 *
		 **/
		where: SignalWhereUniqueInput;
	};

	/**
	 * Signal deleteMany
	 */
	export type SignalDeleteManyArgs = {
		where?: SignalWhereInput;
	};

	/**
	 * Signal without action
	 */
	export type SignalArgs = {
		/**
		 * Select specific fields to fetch from the Signal
		 *
		 **/
		select?: SignalSelect | null;
		/**
		 * Choose, which related nodes to fetch as well.
		 *
		 **/
		include?: SignalInclude | null;
	};

	/**
	 * Enums
	 */

	// Based on
	// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

	export const CoinScalarFieldEnum: {
		id: "id";
		uuid: "uuid";
		name: "name";
		symbol: "symbol";
		alias: "alias";
		data: "data";
	};

	export type CoinScalarFieldEnum = typeof CoinScalarFieldEnum[keyof typeof CoinScalarFieldEnum];

	export const TeamScalarFieldEnum: {
		id: "id";
		coin_id: "coin_id";
		uuid: "uuid";
		name: "name";
		slug: "slug";
		symbol: "symbol";
		data: "data";
	};

	export type TeamScalarFieldEnum = typeof TeamScalarFieldEnum[keyof typeof TeamScalarFieldEnum];

	export const SignalScalarFieldEnum: {
		id: "id";
		team_id: "team_id";
		uuid: "uuid";
		text: "text";
		rich_text: "rich_text";
		date_active: "date_active";
		date_created: "date_created";
		date_updated: "date_updated";
		attributed_author: "attributed_author";
		category: "category";
		is_featured: "is_featured";
		data: "data";
	};

	export type SignalScalarFieldEnum = typeof SignalScalarFieldEnum[keyof typeof SignalScalarFieldEnum];

	export const SortOrder: {
		asc: "asc";
		desc: "desc";
	};

	export type SortOrder = typeof SortOrder[keyof typeof SortOrder];

	export const QueryMode: {
		default: "default";
		insensitive: "insensitive";
	};

	export type QueryMode = typeof QueryMode[keyof typeof QueryMode];

	/**
	 * Deep Input Types
	 */

	export type CoinWhereInput = {
		AND?: Enumerable<CoinWhereInput>;
		OR?: Enumerable<CoinWhereInput>;
		NOT?: Enumerable<CoinWhereInput>;
		id?: IntFilter | number;
		uuid?: StringFilter | string;
		name?: StringFilter | string;
		symbol?: StringFilter | string;
		alias?: StringFilter | string;
		data?: JsonFilter;
		teams?: TeamListRelationFilter;
	};

	export type CoinOrderByInput = {
		id?: SortOrder;
		uuid?: SortOrder;
		name?: SortOrder;
		symbol?: SortOrder;
		alias?: SortOrder;
		data?: SortOrder;
	};

	export type CoinWhereUniqueInput = {
		id?: number;
		uuid?: string;
	};

	export type CoinScalarWhereWithAggregatesInput = {
		AND?: Enumerable<CoinScalarWhereWithAggregatesInput>;
		OR?: Enumerable<CoinScalarWhereWithAggregatesInput>;
		NOT?: Enumerable<CoinScalarWhereWithAggregatesInput>;
		id?: IntWithAggregatesFilter | number;
		uuid?: StringWithAggregatesFilter | string;
		name?: StringWithAggregatesFilter | string;
		symbol?: StringWithAggregatesFilter | string;
		alias?: StringWithAggregatesFilter | string;
		data?: JsonWithAggregatesFilter;
	};

	export type TeamWhereInput = {
		AND?: Enumerable<TeamWhereInput>;
		OR?: Enumerable<TeamWhereInput>;
		NOT?: Enumerable<TeamWhereInput>;
		id?: IntFilter | number;
		coin?: XOR<CoinRelationFilter, CoinWhereInput>;
		coin_id?: IntFilter | number;
		uuid?: StringFilter | string;
		name?: StringFilter | string;
		slug?: StringFilter | string;
		symbol?: StringFilter | string;
		data?: JsonFilter;
		signals?: SignalListRelationFilter;
	};

	export type TeamOrderByInput = {
		id?: SortOrder;
		coin_id?: SortOrder;
		uuid?: SortOrder;
		name?: SortOrder;
		slug?: SortOrder;
		symbol?: SortOrder;
		data?: SortOrder;
	};

	export type TeamWhereUniqueInput = {
		id?: number;
		uuid?: string;
	};

	export type TeamScalarWhereWithAggregatesInput = {
		AND?: Enumerable<TeamScalarWhereWithAggregatesInput>;
		OR?: Enumerable<TeamScalarWhereWithAggregatesInput>;
		NOT?: Enumerable<TeamScalarWhereWithAggregatesInput>;
		id?: IntWithAggregatesFilter | number;
		coin_id?: IntWithAggregatesFilter | number;
		uuid?: StringWithAggregatesFilter | string;
		name?: StringWithAggregatesFilter | string;
		slug?: StringWithAggregatesFilter | string;
		symbol?: StringWithAggregatesFilter | string;
		data?: JsonWithAggregatesFilter;
	};

	export type SignalWhereInput = {
		AND?: Enumerable<SignalWhereInput>;
		OR?: Enumerable<SignalWhereInput>;
		NOT?: Enumerable<SignalWhereInput>;
		id?: IntFilter | number;
		team?: XOR<TeamRelationFilter, TeamWhereInput>;
		team_id?: IntFilter | number;
		uuid?: StringFilter | string;
		text?: StringFilter | string;
		rich_text?: JsonFilter;
		date_active?: DateTimeFilter | Date | string;
		date_created?: DateTimeFilter | Date | string;
		date_updated?: DateTimeFilter | Date | string;
		attributed_author?: JsonFilter;
		category?: JsonFilter;
		is_featured?: BoolFilter | boolean;
		data?: JsonFilter;
	};

	export type SignalOrderByInput = {
		id?: SortOrder;
		team_id?: SortOrder;
		uuid?: SortOrder;
		text?: SortOrder;
		rich_text?: SortOrder;
		date_active?: SortOrder;
		date_created?: SortOrder;
		date_updated?: SortOrder;
		attributed_author?: SortOrder;
		category?: SortOrder;
		is_featured?: SortOrder;
		data?: SortOrder;
	};

	export type SignalWhereUniqueInput = {
		id?: number;
		uuid?: string;
	};

	export type SignalScalarWhereWithAggregatesInput = {
		AND?: Enumerable<SignalScalarWhereWithAggregatesInput>;
		OR?: Enumerable<SignalScalarWhereWithAggregatesInput>;
		NOT?: Enumerable<SignalScalarWhereWithAggregatesInput>;
		id?: IntWithAggregatesFilter | number;
		team_id?: IntWithAggregatesFilter | number;
		uuid?: StringWithAggregatesFilter | string;
		text?: StringWithAggregatesFilter | string;
		rich_text?: JsonWithAggregatesFilter;
		date_active?: DateTimeWithAggregatesFilter | Date | string;
		date_created?: DateTimeWithAggregatesFilter | Date | string;
		date_updated?: DateTimeWithAggregatesFilter | Date | string;
		attributed_author?: JsonWithAggregatesFilter;
		category?: JsonWithAggregatesFilter;
		is_featured?: BoolWithAggregatesFilter | boolean;
		data?: JsonWithAggregatesFilter;
	};

	export type CoinCreateInput = {
		uuid: string;
		name: string;
		symbol: string;
		alias: string;
		data: InputJsonValue;
		teams?: TeamCreateNestedManyWithoutCoinInput;
	};

	export type CoinUncheckedCreateInput = {
		id?: number;
		uuid: string;
		name: string;
		symbol: string;
		alias: string;
		data: InputJsonValue;
		teams?: TeamUncheckedCreateNestedManyWithoutCoinInput;
	};

	export type CoinUpdateInput = {
		uuid?: StringFieldUpdateOperationsInput | string;
		name?: StringFieldUpdateOperationsInput | string;
		symbol?: StringFieldUpdateOperationsInput | string;
		alias?: StringFieldUpdateOperationsInput | string;
		data?: InputJsonValue;
		teams?: TeamUpdateManyWithoutCoinInput;
	};

	export type CoinUncheckedUpdateInput = {
		id?: IntFieldUpdateOperationsInput | number;
		uuid?: StringFieldUpdateOperationsInput | string;
		name?: StringFieldUpdateOperationsInput | string;
		symbol?: StringFieldUpdateOperationsInput | string;
		alias?: StringFieldUpdateOperationsInput | string;
		data?: InputJsonValue;
		teams?: TeamUncheckedUpdateManyWithoutCoinInput;
	};

	export type CoinCreateManyInput = {
		id?: number;
		uuid: string;
		name: string;
		symbol: string;
		alias: string;
		data: InputJsonValue;
	};

	export type CoinUpdateManyMutationInput = {
		uuid?: StringFieldUpdateOperationsInput | string;
		name?: StringFieldUpdateOperationsInput | string;
		symbol?: StringFieldUpdateOperationsInput | string;
		alias?: StringFieldUpdateOperationsInput | string;
		data?: InputJsonValue;
	};

	export type CoinUncheckedUpdateManyInput = {
		id?: IntFieldUpdateOperationsInput | number;
		uuid?: StringFieldUpdateOperationsInput | string;
		name?: StringFieldUpdateOperationsInput | string;
		symbol?: StringFieldUpdateOperationsInput | string;
		alias?: StringFieldUpdateOperationsInput | string;
		data?: InputJsonValue;
	};

	export type TeamCreateInput = {
		uuid: string;
		name: string;
		slug: string;
		symbol: string;
		data: InputJsonValue;
		coin: CoinCreateNestedOneWithoutTeamsInput;
		signals?: SignalCreateNestedManyWithoutTeamInput;
	};

	export type TeamUncheckedCreateInput = {
		id?: number;
		coin_id: number;
		uuid: string;
		name: string;
		slug: string;
		symbol: string;
		data: InputJsonValue;
		signals?: SignalUncheckedCreateNestedManyWithoutTeamInput;
	};

	export type TeamUpdateInput = {
		uuid?: StringFieldUpdateOperationsInput | string;
		name?: StringFieldUpdateOperationsInput | string;
		slug?: StringFieldUpdateOperationsInput | string;
		symbol?: StringFieldUpdateOperationsInput | string;
		data?: InputJsonValue;
		coin?: CoinUpdateOneRequiredWithoutTeamsInput;
		signals?: SignalUpdateManyWithoutTeamInput;
	};

	export type TeamUncheckedUpdateInput = {
		id?: IntFieldUpdateOperationsInput | number;
		coin_id?: IntFieldUpdateOperationsInput | number;
		uuid?: StringFieldUpdateOperationsInput | string;
		name?: StringFieldUpdateOperationsInput | string;
		slug?: StringFieldUpdateOperationsInput | string;
		symbol?: StringFieldUpdateOperationsInput | string;
		data?: InputJsonValue;
		signals?: SignalUncheckedUpdateManyWithoutTeamInput;
	};

	export type TeamCreateManyInput = {
		id?: number;
		coin_id: number;
		uuid: string;
		name: string;
		slug: string;
		symbol: string;
		data: InputJsonValue;
	};

	export type TeamUpdateManyMutationInput = {
		uuid?: StringFieldUpdateOperationsInput | string;
		name?: StringFieldUpdateOperationsInput | string;
		slug?: StringFieldUpdateOperationsInput | string;
		symbol?: StringFieldUpdateOperationsInput | string;
		data?: InputJsonValue;
	};

	export type TeamUncheckedUpdateManyInput = {
		id?: IntFieldUpdateOperationsInput | number;
		coin_id?: IntFieldUpdateOperationsInput | number;
		uuid?: StringFieldUpdateOperationsInput | string;
		name?: StringFieldUpdateOperationsInput | string;
		slug?: StringFieldUpdateOperationsInput | string;
		symbol?: StringFieldUpdateOperationsInput | string;
		data?: InputJsonValue;
	};

	export type SignalCreateInput = {
		uuid: string;
		text: string;
		rich_text: InputJsonValue;
		date_active: Date | string;
		date_created: Date | string;
		date_updated: Date | string;
		attributed_author: InputJsonValue;
		category: InputJsonValue;
		is_featured: boolean;
		data: InputJsonValue;
		team: TeamCreateNestedOneWithoutSignalsInput;
	};

	export type SignalUncheckedCreateInput = {
		id?: number;
		team_id: number;
		uuid: string;
		text: string;
		rich_text: InputJsonValue;
		date_active: Date | string;
		date_created: Date | string;
		date_updated: Date | string;
		attributed_author: InputJsonValue;
		category: InputJsonValue;
		is_featured: boolean;
		data: InputJsonValue;
	};

	export type SignalUpdateInput = {
		uuid?: StringFieldUpdateOperationsInput | string;
		text?: StringFieldUpdateOperationsInput | string;
		rich_text?: InputJsonValue;
		date_active?: DateTimeFieldUpdateOperationsInput | Date | string;
		date_created?: DateTimeFieldUpdateOperationsInput | Date | string;
		date_updated?: DateTimeFieldUpdateOperationsInput | Date | string;
		attributed_author?: InputJsonValue;
		category?: InputJsonValue;
		is_featured?: BoolFieldUpdateOperationsInput | boolean;
		data?: InputJsonValue;
		team?: TeamUpdateOneRequiredWithoutSignalsInput;
	};

	export type SignalUncheckedUpdateInput = {
		id?: IntFieldUpdateOperationsInput | number;
		team_id?: IntFieldUpdateOperationsInput | number;
		uuid?: StringFieldUpdateOperationsInput | string;
		text?: StringFieldUpdateOperationsInput | string;
		rich_text?: InputJsonValue;
		date_active?: DateTimeFieldUpdateOperationsInput | Date | string;
		date_created?: DateTimeFieldUpdateOperationsInput | Date | string;
		date_updated?: DateTimeFieldUpdateOperationsInput | Date | string;
		attributed_author?: InputJsonValue;
		category?: InputJsonValue;
		is_featured?: BoolFieldUpdateOperationsInput | boolean;
		data?: InputJsonValue;
	};

	export type SignalCreateManyInput = {
		id?: number;
		team_id: number;
		uuid: string;
		text: string;
		rich_text: InputJsonValue;
		date_active: Date | string;
		date_created: Date | string;
		date_updated: Date | string;
		attributed_author: InputJsonValue;
		category: InputJsonValue;
		is_featured: boolean;
		data: InputJsonValue;
	};

	export type SignalUpdateManyMutationInput = {
		uuid?: StringFieldUpdateOperationsInput | string;
		text?: StringFieldUpdateOperationsInput | string;
		rich_text?: InputJsonValue;
		date_active?: DateTimeFieldUpdateOperationsInput | Date | string;
		date_created?: DateTimeFieldUpdateOperationsInput | Date | string;
		date_updated?: DateTimeFieldUpdateOperationsInput | Date | string;
		attributed_author?: InputJsonValue;
		category?: InputJsonValue;
		is_featured?: BoolFieldUpdateOperationsInput | boolean;
		data?: InputJsonValue;
	};

	export type SignalUncheckedUpdateManyInput = {
		id?: IntFieldUpdateOperationsInput | number;
		team_id?: IntFieldUpdateOperationsInput | number;
		uuid?: StringFieldUpdateOperationsInput | string;
		text?: StringFieldUpdateOperationsInput | string;
		rich_text?: InputJsonValue;
		date_active?: DateTimeFieldUpdateOperationsInput | Date | string;
		date_created?: DateTimeFieldUpdateOperationsInput | Date | string;
		date_updated?: DateTimeFieldUpdateOperationsInput | Date | string;
		attributed_author?: InputJsonValue;
		category?: InputJsonValue;
		is_featured?: BoolFieldUpdateOperationsInput | boolean;
		data?: InputJsonValue;
	};

	export type IntFilter = {
		equals?: number;
		in?: Enumerable<number>;
		notIn?: Enumerable<number>;
		lt?: number;
		lte?: number;
		gt?: number;
		gte?: number;
		not?: NestedIntFilter | number;
	};

	export type StringFilter = {
		equals?: string;
		in?: Enumerable<string>;
		notIn?: Enumerable<string>;
		lt?: string;
		lte?: string;
		gt?: string;
		gte?: string;
		contains?: string;
		startsWith?: string;
		endsWith?: string;
		mode?: QueryMode;
		not?: NestedStringFilter | string;
	};
	export type JsonFilter =
		| PatchUndefined<
				Either<Required<JsonFilterBase>, Exclude<keyof Required<JsonFilterBase>, "path">>,
				Required<JsonFilterBase>
		  >
		| OptionalFlat<Omit<Required<JsonFilterBase>, "path">>;

	export type JsonFilterBase = {
		equals?: InputJsonValue;
		lt?: InputJsonValue;
		lte?: InputJsonValue;
		gt?: InputJsonValue;
		gte?: InputJsonValue;
		path?: Array<string>;
		string_contains?: string;
		string_starts_with?: string;
		string_ends_with?: string;
		array_contains?: InputJsonValue;
		array_starts_with?: InputJsonValue;
		array_ends_with?: InputJsonValue;
		not?: InputJsonValue;
	};

	export type TeamListRelationFilter = {
		every?: TeamWhereInput;
		some?: TeamWhereInput;
		none?: TeamWhereInput;
	};

	export type IntWithAggregatesFilter = {
		equals?: number;
		in?: Enumerable<number>;
		notIn?: Enumerable<number>;
		lt?: number;
		lte?: number;
		gt?: number;
		gte?: number;
		not?: NestedIntWithAggregatesFilter | number;
		_count?: NestedIntFilter;
		/**
		 * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
		 *
		 **/
		count?: NestedIntFilter;
		_avg?: NestedFloatFilter;
		/**
		 * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
		 *
		 **/
		avg?: NestedFloatFilter;
		_sum?: NestedIntFilter;
		/**
		 * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
		 *
		 **/
		sum?: NestedIntFilter;
		_min?: NestedIntFilter;
		/**
		 * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
		 *
		 **/
		min?: NestedIntFilter;
		_max?: NestedIntFilter;
		/**
		 * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
		 *
		 **/
		max?: NestedIntFilter;
	};

	export type StringWithAggregatesFilter = {
		equals?: string;
		in?: Enumerable<string>;
		notIn?: Enumerable<string>;
		lt?: string;
		lte?: string;
		gt?: string;
		gte?: string;
		contains?: string;
		startsWith?: string;
		endsWith?: string;
		mode?: QueryMode;
		not?: NestedStringWithAggregatesFilter | string;
		_count?: NestedIntFilter;
		/**
		 * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
		 *
		 **/
		count?: NestedIntFilter;
		_min?: NestedStringFilter;
		/**
		 * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
		 *
		 **/
		min?: NestedStringFilter;
		_max?: NestedStringFilter;
		/**
		 * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
		 *
		 **/
		max?: NestedStringFilter;
	};
	export type JsonWithAggregatesFilter =
		| PatchUndefined<
				Either<
					Required<JsonWithAggregatesFilterBase>,
					Exclude<keyof Required<JsonWithAggregatesFilterBase>, "path">
				>,
				Required<JsonWithAggregatesFilterBase>
		  >
		| OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase>, "path">>;

	export type JsonWithAggregatesFilterBase = {
		equals?: InputJsonValue;
		lt?: InputJsonValue;
		lte?: InputJsonValue;
		gt?: InputJsonValue;
		gte?: InputJsonValue;
		path?: Array<string>;
		string_contains?: string;
		string_starts_with?: string;
		string_ends_with?: string;
		array_contains?: InputJsonValue;
		array_starts_with?: InputJsonValue;
		array_ends_with?: InputJsonValue;
		not?: InputJsonValue;
		_count?: NestedIntFilter;
		/**
		 * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
		 *
		 **/
		count?: NestedIntFilter;
		_min?: NestedJsonFilter;
		/**
		 * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
		 *
		 **/
		min?: NestedJsonFilter;
		_max?: NestedJsonFilter;
		/**
		 * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
		 *
		 **/
		max?: NestedJsonFilter;
	};

	export type CoinRelationFilter = {
		is?: CoinWhereInput;
		isNot?: CoinWhereInput;
	};

	export type SignalListRelationFilter = {
		every?: SignalWhereInput;
		some?: SignalWhereInput;
		none?: SignalWhereInput;
	};

	export type TeamRelationFilter = {
		is?: TeamWhereInput;
		isNot?: TeamWhereInput;
	};

	export type DateTimeFilter = {
		equals?: Date | string;
		in?: Enumerable<Date> | Enumerable<string>;
		notIn?: Enumerable<Date> | Enumerable<string>;
		lt?: Date | string;
		lte?: Date | string;
		gt?: Date | string;
		gte?: Date | string;
		not?: NestedDateTimeFilter | Date | string;
	};

	export type BoolFilter = {
		equals?: boolean;
		not?: NestedBoolFilter | boolean;
	};

	export type DateTimeWithAggregatesFilter = {
		equals?: Date | string;
		in?: Enumerable<Date> | Enumerable<string>;
		notIn?: Enumerable<Date> | Enumerable<string>;
		lt?: Date | string;
		lte?: Date | string;
		gt?: Date | string;
		gte?: Date | string;
		not?: NestedDateTimeWithAggregatesFilter | Date | string;
		_count?: NestedIntFilter;
		/**
		 * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
		 *
		 **/
		count?: NestedIntFilter;
		_min?: NestedDateTimeFilter;
		/**
		 * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
		 *
		 **/
		min?: NestedDateTimeFilter;
		_max?: NestedDateTimeFilter;
		/**
		 * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
		 *
		 **/
		max?: NestedDateTimeFilter;
	};

	export type BoolWithAggregatesFilter = {
		equals?: boolean;
		not?: NestedBoolWithAggregatesFilter | boolean;
		_count?: NestedIntFilter;
		/**
		 * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
		 *
		 **/
		count?: NestedIntFilter;
		_min?: NestedBoolFilter;
		/**
		 * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
		 *
		 **/
		min?: NestedBoolFilter;
		_max?: NestedBoolFilter;
		/**
		 * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
		 *
		 **/
		max?: NestedBoolFilter;
	};

	export type TeamCreateNestedManyWithoutCoinInput = {
		create?: XOR<Enumerable<TeamCreateWithoutCoinInput>, Enumerable<TeamUncheckedCreateWithoutCoinInput>>;
		connectOrCreate?: Enumerable<TeamCreateOrConnectWithoutCoinInput>;
		createMany?: TeamCreateManyCoinInputEnvelope;
		connect?: Enumerable<TeamWhereUniqueInput>;
	};

	export type TeamUncheckedCreateNestedManyWithoutCoinInput = {
		create?: XOR<Enumerable<TeamCreateWithoutCoinInput>, Enumerable<TeamUncheckedCreateWithoutCoinInput>>;
		connectOrCreate?: Enumerable<TeamCreateOrConnectWithoutCoinInput>;
		createMany?: TeamCreateManyCoinInputEnvelope;
		connect?: Enumerable<TeamWhereUniqueInput>;
	};

	export type StringFieldUpdateOperationsInput = {
		set?: string;
	};

	export type TeamUpdateManyWithoutCoinInput = {
		create?: XOR<Enumerable<TeamCreateWithoutCoinInput>, Enumerable<TeamUncheckedCreateWithoutCoinInput>>;
		connectOrCreate?: Enumerable<TeamCreateOrConnectWithoutCoinInput>;
		upsert?: Enumerable<TeamUpsertWithWhereUniqueWithoutCoinInput>;
		createMany?: TeamCreateManyCoinInputEnvelope;
		connect?: Enumerable<TeamWhereUniqueInput>;
		set?: Enumerable<TeamWhereUniqueInput>;
		disconnect?: Enumerable<TeamWhereUniqueInput>;
		delete?: Enumerable<TeamWhereUniqueInput>;
		update?: Enumerable<TeamUpdateWithWhereUniqueWithoutCoinInput>;
		updateMany?: Enumerable<TeamUpdateManyWithWhereWithoutCoinInput>;
		deleteMany?: Enumerable<TeamScalarWhereInput>;
	};

	export type IntFieldUpdateOperationsInput = {
		set?: number;
		increment?: number;
		decrement?: number;
		multiply?: number;
		divide?: number;
	};

	export type TeamUncheckedUpdateManyWithoutCoinInput = {
		create?: XOR<Enumerable<TeamCreateWithoutCoinInput>, Enumerable<TeamUncheckedCreateWithoutCoinInput>>;
		connectOrCreate?: Enumerable<TeamCreateOrConnectWithoutCoinInput>;
		upsert?: Enumerable<TeamUpsertWithWhereUniqueWithoutCoinInput>;
		createMany?: TeamCreateManyCoinInputEnvelope;
		connect?: Enumerable<TeamWhereUniqueInput>;
		set?: Enumerable<TeamWhereUniqueInput>;
		disconnect?: Enumerable<TeamWhereUniqueInput>;
		delete?: Enumerable<TeamWhereUniqueInput>;
		update?: Enumerable<TeamUpdateWithWhereUniqueWithoutCoinInput>;
		updateMany?: Enumerable<TeamUpdateManyWithWhereWithoutCoinInput>;
		deleteMany?: Enumerable<TeamScalarWhereInput>;
	};

	export type CoinCreateNestedOneWithoutTeamsInput = {
		create?: XOR<CoinCreateWithoutTeamsInput, CoinUncheckedCreateWithoutTeamsInput>;
		connectOrCreate?: CoinCreateOrConnectWithoutTeamsInput;
		connect?: CoinWhereUniqueInput;
	};

	export type SignalCreateNestedManyWithoutTeamInput = {
		create?: XOR<Enumerable<SignalCreateWithoutTeamInput>, Enumerable<SignalUncheckedCreateWithoutTeamInput>>;
		connectOrCreate?: Enumerable<SignalCreateOrConnectWithoutTeamInput>;
		createMany?: SignalCreateManyTeamInputEnvelope;
		connect?: Enumerable<SignalWhereUniqueInput>;
	};

	export type SignalUncheckedCreateNestedManyWithoutTeamInput = {
		create?: XOR<Enumerable<SignalCreateWithoutTeamInput>, Enumerable<SignalUncheckedCreateWithoutTeamInput>>;
		connectOrCreate?: Enumerable<SignalCreateOrConnectWithoutTeamInput>;
		createMany?: SignalCreateManyTeamInputEnvelope;
		connect?: Enumerable<SignalWhereUniqueInput>;
	};

	export type CoinUpdateOneRequiredWithoutTeamsInput = {
		create?: XOR<CoinCreateWithoutTeamsInput, CoinUncheckedCreateWithoutTeamsInput>;
		connectOrCreate?: CoinCreateOrConnectWithoutTeamsInput;
		upsert?: CoinUpsertWithoutTeamsInput;
		connect?: CoinWhereUniqueInput;
		update?: XOR<CoinUpdateWithoutTeamsInput, CoinUncheckedUpdateWithoutTeamsInput>;
	};

	export type SignalUpdateManyWithoutTeamInput = {
		create?: XOR<Enumerable<SignalCreateWithoutTeamInput>, Enumerable<SignalUncheckedCreateWithoutTeamInput>>;
		connectOrCreate?: Enumerable<SignalCreateOrConnectWithoutTeamInput>;
		upsert?: Enumerable<SignalUpsertWithWhereUniqueWithoutTeamInput>;
		createMany?: SignalCreateManyTeamInputEnvelope;
		connect?: Enumerable<SignalWhereUniqueInput>;
		set?: Enumerable<SignalWhereUniqueInput>;
		disconnect?: Enumerable<SignalWhereUniqueInput>;
		delete?: Enumerable<SignalWhereUniqueInput>;
		update?: Enumerable<SignalUpdateWithWhereUniqueWithoutTeamInput>;
		updateMany?: Enumerable<SignalUpdateManyWithWhereWithoutTeamInput>;
		deleteMany?: Enumerable<SignalScalarWhereInput>;
	};

	export type SignalUncheckedUpdateManyWithoutTeamInput = {
		create?: XOR<Enumerable<SignalCreateWithoutTeamInput>, Enumerable<SignalUncheckedCreateWithoutTeamInput>>;
		connectOrCreate?: Enumerable<SignalCreateOrConnectWithoutTeamInput>;
		upsert?: Enumerable<SignalUpsertWithWhereUniqueWithoutTeamInput>;
		createMany?: SignalCreateManyTeamInputEnvelope;
		connect?: Enumerable<SignalWhereUniqueInput>;
		set?: Enumerable<SignalWhereUniqueInput>;
		disconnect?: Enumerable<SignalWhereUniqueInput>;
		delete?: Enumerable<SignalWhereUniqueInput>;
		update?: Enumerable<SignalUpdateWithWhereUniqueWithoutTeamInput>;
		updateMany?: Enumerable<SignalUpdateManyWithWhereWithoutTeamInput>;
		deleteMany?: Enumerable<SignalScalarWhereInput>;
	};

	export type TeamCreateNestedOneWithoutSignalsInput = {
		create?: XOR<TeamCreateWithoutSignalsInput, TeamUncheckedCreateWithoutSignalsInput>;
		connectOrCreate?: TeamCreateOrConnectWithoutSignalsInput;
		connect?: TeamWhereUniqueInput;
	};

	export type DateTimeFieldUpdateOperationsInput = {
		set?: Date | string;
	};

	export type BoolFieldUpdateOperationsInput = {
		set?: boolean;
	};

	export type TeamUpdateOneRequiredWithoutSignalsInput = {
		create?: XOR<TeamCreateWithoutSignalsInput, TeamUncheckedCreateWithoutSignalsInput>;
		connectOrCreate?: TeamCreateOrConnectWithoutSignalsInput;
		upsert?: TeamUpsertWithoutSignalsInput;
		connect?: TeamWhereUniqueInput;
		update?: XOR<TeamUpdateWithoutSignalsInput, TeamUncheckedUpdateWithoutSignalsInput>;
	};

	export type NestedIntFilter = {
		equals?: number;
		in?: Enumerable<number>;
		notIn?: Enumerable<number>;
		lt?: number;
		lte?: number;
		gt?: number;
		gte?: number;
		not?: NestedIntFilter | number;
	};

	export type NestedStringFilter = {
		equals?: string;
		in?: Enumerable<string>;
		notIn?: Enumerable<string>;
		lt?: string;
		lte?: string;
		gt?: string;
		gte?: string;
		contains?: string;
		startsWith?: string;
		endsWith?: string;
		not?: NestedStringFilter | string;
	};

	export type NestedIntWithAggregatesFilter = {
		equals?: number;
		in?: Enumerable<number>;
		notIn?: Enumerable<number>;
		lt?: number;
		lte?: number;
		gt?: number;
		gte?: number;
		not?: NestedIntWithAggregatesFilter | number;
		_count?: NestedIntFilter;
		/**
		 * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
		 *
		 **/
		count?: NestedIntFilter;
		_avg?: NestedFloatFilter;
		/**
		 * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
		 *
		 **/
		avg?: NestedFloatFilter;
		_sum?: NestedIntFilter;
		/**
		 * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
		 *
		 **/
		sum?: NestedIntFilter;
		_min?: NestedIntFilter;
		/**
		 * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
		 *
		 **/
		min?: NestedIntFilter;
		_max?: NestedIntFilter;
		/**
		 * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
		 *
		 **/
		max?: NestedIntFilter;
	};

	export type NestedFloatFilter = {
		equals?: number;
		in?: Enumerable<number>;
		notIn?: Enumerable<number>;
		lt?: number;
		lte?: number;
		gt?: number;
		gte?: number;
		not?: NestedFloatFilter | number;
	};

	export type NestedStringWithAggregatesFilter = {
		equals?: string;
		in?: Enumerable<string>;
		notIn?: Enumerable<string>;
		lt?: string;
		lte?: string;
		gt?: string;
		gte?: string;
		contains?: string;
		startsWith?: string;
		endsWith?: string;
		not?: NestedStringWithAggregatesFilter | string;
		_count?: NestedIntFilter;
		/**
		 * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
		 *
		 **/
		count?: NestedIntFilter;
		_min?: NestedStringFilter;
		/**
		 * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
		 *
		 **/
		min?: NestedStringFilter;
		_max?: NestedStringFilter;
		/**
		 * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
		 *
		 **/
		max?: NestedStringFilter;
	};
	export type NestedJsonFilter =
		| PatchUndefined<
				Either<Required<NestedJsonFilterBase>, Exclude<keyof Required<NestedJsonFilterBase>, "path">>,
				Required<NestedJsonFilterBase>
		  >
		| OptionalFlat<Omit<Required<NestedJsonFilterBase>, "path">>;

	export type NestedJsonFilterBase = {
		equals?: InputJsonValue;
		lt?: InputJsonValue;
		lte?: InputJsonValue;
		gt?: InputJsonValue;
		gte?: InputJsonValue;
		path?: Array<string>;
		string_contains?: string;
		string_starts_with?: string;
		string_ends_with?: string;
		array_contains?: InputJsonValue;
		array_starts_with?: InputJsonValue;
		array_ends_with?: InputJsonValue;
		not?: InputJsonValue;
	};

	export type NestedDateTimeFilter = {
		equals?: Date | string;
		in?: Enumerable<Date> | Enumerable<string>;
		notIn?: Enumerable<Date> | Enumerable<string>;
		lt?: Date | string;
		lte?: Date | string;
		gt?: Date | string;
		gte?: Date | string;
		not?: NestedDateTimeFilter | Date | string;
	};

	export type NestedBoolFilter = {
		equals?: boolean;
		not?: NestedBoolFilter | boolean;
	};

	export type NestedDateTimeWithAggregatesFilter = {
		equals?: Date | string;
		in?: Enumerable<Date> | Enumerable<string>;
		notIn?: Enumerable<Date> | Enumerable<string>;
		lt?: Date | string;
		lte?: Date | string;
		gt?: Date | string;
		gte?: Date | string;
		not?: NestedDateTimeWithAggregatesFilter | Date | string;
		_count?: NestedIntFilter;
		/**
		 * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
		 *
		 **/
		count?: NestedIntFilter;
		_min?: NestedDateTimeFilter;
		/**
		 * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
		 *
		 **/
		min?: NestedDateTimeFilter;
		_max?: NestedDateTimeFilter;
		/**
		 * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
		 *
		 **/
		max?: NestedDateTimeFilter;
	};

	export type NestedBoolWithAggregatesFilter = {
		equals?: boolean;
		not?: NestedBoolWithAggregatesFilter | boolean;
		_count?: NestedIntFilter;
		/**
		 * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
		 *
		 **/
		count?: NestedIntFilter;
		_min?: NestedBoolFilter;
		/**
		 * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
		 *
		 **/
		min?: NestedBoolFilter;
		_max?: NestedBoolFilter;
		/**
		 * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
		 *
		 **/
		max?: NestedBoolFilter;
	};

	export type TeamCreateWithoutCoinInput = {
		uuid: string;
		name: string;
		slug: string;
		symbol: string;
		data: InputJsonValue;
		signals?: SignalCreateNestedManyWithoutTeamInput;
	};

	export type TeamUncheckedCreateWithoutCoinInput = {
		id?: number;
		uuid: string;
		name: string;
		slug: string;
		symbol: string;
		data: InputJsonValue;
		signals?: SignalUncheckedCreateNestedManyWithoutTeamInput;
	};

	export type TeamCreateOrConnectWithoutCoinInput = {
		where: TeamWhereUniqueInput;
		create: XOR<TeamCreateWithoutCoinInput, TeamUncheckedCreateWithoutCoinInput>;
	};

	export type TeamCreateManyCoinInputEnvelope = {
		data: Enumerable<TeamCreateManyCoinInput>;
		skipDuplicates?: boolean;
	};

	export type TeamUpsertWithWhereUniqueWithoutCoinInput = {
		where: TeamWhereUniqueInput;
		update: XOR<TeamUpdateWithoutCoinInput, TeamUncheckedUpdateWithoutCoinInput>;
		create: XOR<TeamCreateWithoutCoinInput, TeamUncheckedCreateWithoutCoinInput>;
	};

	export type TeamUpdateWithWhereUniqueWithoutCoinInput = {
		where: TeamWhereUniqueInput;
		data: XOR<TeamUpdateWithoutCoinInput, TeamUncheckedUpdateWithoutCoinInput>;
	};

	export type TeamUpdateManyWithWhereWithoutCoinInput = {
		where: TeamScalarWhereInput;
		data: XOR<TeamUpdateManyMutationInput, TeamUncheckedUpdateManyWithoutTeamsInput>;
	};

	export type TeamScalarWhereInput = {
		AND?: Enumerable<TeamScalarWhereInput>;
		OR?: Enumerable<TeamScalarWhereInput>;
		NOT?: Enumerable<TeamScalarWhereInput>;
		id?: IntFilter | number;
		coin_id?: IntFilter | number;
		uuid?: StringFilter | string;
		name?: StringFilter | string;
		slug?: StringFilter | string;
		symbol?: StringFilter | string;
		data?: JsonFilter;
	};

	export type CoinCreateWithoutTeamsInput = {
		uuid: string;
		name: string;
		symbol: string;
		alias: string;
		data: InputJsonValue;
	};

	export type CoinUncheckedCreateWithoutTeamsInput = {
		id?: number;
		uuid: string;
		name: string;
		symbol: string;
		alias: string;
		data: InputJsonValue;
	};

	export type CoinCreateOrConnectWithoutTeamsInput = {
		where: CoinWhereUniqueInput;
		create: XOR<CoinCreateWithoutTeamsInput, CoinUncheckedCreateWithoutTeamsInput>;
	};

	export type SignalCreateWithoutTeamInput = {
		uuid: string;
		text: string;
		rich_text: InputJsonValue;
		date_active: Date | string;
		date_created: Date | string;
		date_updated: Date | string;
		attributed_author: InputJsonValue;
		category: InputJsonValue;
		is_featured: boolean;
		data: InputJsonValue;
	};

	export type SignalUncheckedCreateWithoutTeamInput = {
		id?: number;
		uuid: string;
		text: string;
		rich_text: InputJsonValue;
		date_active: Date | string;
		date_created: Date | string;
		date_updated: Date | string;
		attributed_author: InputJsonValue;
		category: InputJsonValue;
		is_featured: boolean;
		data: InputJsonValue;
	};

	export type SignalCreateOrConnectWithoutTeamInput = {
		where: SignalWhereUniqueInput;
		create: XOR<SignalCreateWithoutTeamInput, SignalUncheckedCreateWithoutTeamInput>;
	};

	export type SignalCreateManyTeamInputEnvelope = {
		data: Enumerable<SignalCreateManyTeamInput>;
		skipDuplicates?: boolean;
	};

	export type CoinUpsertWithoutTeamsInput = {
		update: XOR<CoinUpdateWithoutTeamsInput, CoinUncheckedUpdateWithoutTeamsInput>;
		create: XOR<CoinCreateWithoutTeamsInput, CoinUncheckedCreateWithoutTeamsInput>;
	};

	export type CoinUpdateWithoutTeamsInput = {
		uuid?: StringFieldUpdateOperationsInput | string;
		name?: StringFieldUpdateOperationsInput | string;
		symbol?: StringFieldUpdateOperationsInput | string;
		alias?: StringFieldUpdateOperationsInput | string;
		data?: InputJsonValue;
	};

	export type CoinUncheckedUpdateWithoutTeamsInput = {
		id?: IntFieldUpdateOperationsInput | number;
		uuid?: StringFieldUpdateOperationsInput | string;
		name?: StringFieldUpdateOperationsInput | string;
		symbol?: StringFieldUpdateOperationsInput | string;
		alias?: StringFieldUpdateOperationsInput | string;
		data?: InputJsonValue;
	};

	export type SignalUpsertWithWhereUniqueWithoutTeamInput = {
		where: SignalWhereUniqueInput;
		update: XOR<SignalUpdateWithoutTeamInput, SignalUncheckedUpdateWithoutTeamInput>;
		create: XOR<SignalCreateWithoutTeamInput, SignalUncheckedCreateWithoutTeamInput>;
	};

	export type SignalUpdateWithWhereUniqueWithoutTeamInput = {
		where: SignalWhereUniqueInput;
		data: XOR<SignalUpdateWithoutTeamInput, SignalUncheckedUpdateWithoutTeamInput>;
	};

	export type SignalUpdateManyWithWhereWithoutTeamInput = {
		where: SignalScalarWhereInput;
		data: XOR<SignalUpdateManyMutationInput, SignalUncheckedUpdateManyWithoutSignalsInput>;
	};

	export type SignalScalarWhereInput = {
		AND?: Enumerable<SignalScalarWhereInput>;
		OR?: Enumerable<SignalScalarWhereInput>;
		NOT?: Enumerable<SignalScalarWhereInput>;
		id?: IntFilter | number;
		team_id?: IntFilter | number;
		uuid?: StringFilter | string;
		text?: StringFilter | string;
		rich_text?: JsonFilter;
		date_active?: DateTimeFilter | Date | string;
		date_created?: DateTimeFilter | Date | string;
		date_updated?: DateTimeFilter | Date | string;
		attributed_author?: JsonFilter;
		category?: JsonFilter;
		is_featured?: BoolFilter | boolean;
		data?: JsonFilter;
	};

	export type TeamCreateWithoutSignalsInput = {
		uuid: string;
		name: string;
		slug: string;
		symbol: string;
		data: InputJsonValue;
		coin: CoinCreateNestedOneWithoutTeamsInput;
	};

	export type TeamUncheckedCreateWithoutSignalsInput = {
		id?: number;
		coin_id: number;
		uuid: string;
		name: string;
		slug: string;
		symbol: string;
		data: InputJsonValue;
	};

	export type TeamCreateOrConnectWithoutSignalsInput = {
		where: TeamWhereUniqueInput;
		create: XOR<TeamCreateWithoutSignalsInput, TeamUncheckedCreateWithoutSignalsInput>;
	};

	export type TeamUpsertWithoutSignalsInput = {
		update: XOR<TeamUpdateWithoutSignalsInput, TeamUncheckedUpdateWithoutSignalsInput>;
		create: XOR<TeamCreateWithoutSignalsInput, TeamUncheckedCreateWithoutSignalsInput>;
	};

	export type TeamUpdateWithoutSignalsInput = {
		uuid?: StringFieldUpdateOperationsInput | string;
		name?: StringFieldUpdateOperationsInput | string;
		slug?: StringFieldUpdateOperationsInput | string;
		symbol?: StringFieldUpdateOperationsInput | string;
		data?: InputJsonValue;
		coin?: CoinUpdateOneRequiredWithoutTeamsInput;
	};

	export type TeamUncheckedUpdateWithoutSignalsInput = {
		id?: IntFieldUpdateOperationsInput | number;
		coin_id?: IntFieldUpdateOperationsInput | number;
		uuid?: StringFieldUpdateOperationsInput | string;
		name?: StringFieldUpdateOperationsInput | string;
		slug?: StringFieldUpdateOperationsInput | string;
		symbol?: StringFieldUpdateOperationsInput | string;
		data?: InputJsonValue;
	};

	export type TeamCreateManyCoinInput = {
		id?: number;
		uuid: string;
		name: string;
		slug: string;
		symbol: string;
		data: InputJsonValue;
	};

	export type TeamUpdateWithoutCoinInput = {
		uuid?: StringFieldUpdateOperationsInput | string;
		name?: StringFieldUpdateOperationsInput | string;
		slug?: StringFieldUpdateOperationsInput | string;
		symbol?: StringFieldUpdateOperationsInput | string;
		data?: InputJsonValue;
		signals?: SignalUpdateManyWithoutTeamInput;
	};

	export type TeamUncheckedUpdateWithoutCoinInput = {
		id?: IntFieldUpdateOperationsInput | number;
		uuid?: StringFieldUpdateOperationsInput | string;
		name?: StringFieldUpdateOperationsInput | string;
		slug?: StringFieldUpdateOperationsInput | string;
		symbol?: StringFieldUpdateOperationsInput | string;
		data?: InputJsonValue;
		signals?: SignalUncheckedUpdateManyWithoutTeamInput;
	};

	export type TeamUncheckedUpdateManyWithoutTeamsInput = {
		id?: IntFieldUpdateOperationsInput | number;
		uuid?: StringFieldUpdateOperationsInput | string;
		name?: StringFieldUpdateOperationsInput | string;
		slug?: StringFieldUpdateOperationsInput | string;
		symbol?: StringFieldUpdateOperationsInput | string;
		data?: InputJsonValue;
	};

	export type SignalCreateManyTeamInput = {
		id?: number;
		uuid: string;
		text: string;
		rich_text: InputJsonValue;
		date_active: Date | string;
		date_created: Date | string;
		date_updated: Date | string;
		attributed_author: InputJsonValue;
		category: InputJsonValue;
		is_featured: boolean;
		data: InputJsonValue;
	};

	export type SignalUpdateWithoutTeamInput = {
		uuid?: StringFieldUpdateOperationsInput | string;
		text?: StringFieldUpdateOperationsInput | string;
		rich_text?: InputJsonValue;
		date_active?: DateTimeFieldUpdateOperationsInput | Date | string;
		date_created?: DateTimeFieldUpdateOperationsInput | Date | string;
		date_updated?: DateTimeFieldUpdateOperationsInput | Date | string;
		attributed_author?: InputJsonValue;
		category?: InputJsonValue;
		is_featured?: BoolFieldUpdateOperationsInput | boolean;
		data?: InputJsonValue;
	};

	export type SignalUncheckedUpdateWithoutTeamInput = {
		id?: IntFieldUpdateOperationsInput | number;
		uuid?: StringFieldUpdateOperationsInput | string;
		text?: StringFieldUpdateOperationsInput | string;
		rich_text?: InputJsonValue;
		date_active?: DateTimeFieldUpdateOperationsInput | Date | string;
		date_created?: DateTimeFieldUpdateOperationsInput | Date | string;
		date_updated?: DateTimeFieldUpdateOperationsInput | Date | string;
		attributed_author?: InputJsonValue;
		category?: InputJsonValue;
		is_featured?: BoolFieldUpdateOperationsInput | boolean;
		data?: InputJsonValue;
	};

	export type SignalUncheckedUpdateManyWithoutSignalsInput = {
		id?: IntFieldUpdateOperationsInput | number;
		uuid?: StringFieldUpdateOperationsInput | string;
		text?: StringFieldUpdateOperationsInput | string;
		rich_text?: InputJsonValue;
		date_active?: DateTimeFieldUpdateOperationsInput | Date | string;
		date_created?: DateTimeFieldUpdateOperationsInput | Date | string;
		date_updated?: DateTimeFieldUpdateOperationsInput | Date | string;
		attributed_author?: InputJsonValue;
		category?: InputJsonValue;
		is_featured?: BoolFieldUpdateOperationsInput | boolean;
		data?: InputJsonValue;
	};

	/**
	 * Batch Payload for updateMany & deleteMany & createMany
	 */

	export type BatchPayload = {
		count: number;
	};

	/**
	 * DMMF
	 */
	export const dmmf: runtime.DMMF.Document;
}
