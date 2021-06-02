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
 * Model Block
 */

export type Block = {
	height: number;
	hash: string;
};

/**
 * Model Transaction
 */

export type Transaction = {
	hash: string;
	block_id: number;
	time: number;
	amount: bigint;
	fee: bigint;
};

/**
 * Model TransactionPart
 */

export type TransactionPart = {
	output_hash: string;
	output_idx: number;
	input_hash: string | null;
	input_idx: number | null;
	amount: bigint;
	address: Prisma.JsonValue | null;
};

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js (ORM replacement)
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Blocks
 * const blocks = await prisma.block.findMany()
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
	 * // Fetch zero or more Blocks
	 * const blocks = await prisma.block.findMany()
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
	 * `prisma.block`: Exposes CRUD operations for the **Block** model.
	 * Example usage:
	 * ```ts
	 * // Fetch zero or more Blocks
	 * const blocks = await prisma.block.findMany()
	 * ```
	 */
	get block(): Prisma.BlockDelegate<GlobalReject>;

	/**
	 * `prisma.transaction`: Exposes CRUD operations for the **Transaction** model.
	 * Example usage:
	 * ```ts
	 * // Fetch zero or more Transactions
	 * const transactions = await prisma.transaction.findMany()
	 * ```
	 */
	get transaction(): Prisma.TransactionDelegate<GlobalReject>;

	/**
	 * `prisma.transactionPart`: Exposes CRUD operations for the **TransactionPart** model.
	 * Example usage:
	 * ```ts
	 * // Fetch zero or more TransactionParts
	 * const transactionParts = await prisma.transactionPart.findMany()
	 * ```
	 */
	get transactionPart(): Prisma.TransactionPartDelegate<GlobalReject>;
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
		Block: "Block";
		Transaction: "Transaction";
		TransactionPart: "TransactionPart";
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
	 * Model Block
	 */

	export type AggregateBlock = {
		_count: BlockCountAggregateOutputType | null;
		count: BlockCountAggregateOutputType | null;
		_avg: BlockAvgAggregateOutputType | null;
		avg: BlockAvgAggregateOutputType | null;
		_sum: BlockSumAggregateOutputType | null;
		sum: BlockSumAggregateOutputType | null;
		_min: BlockMinAggregateOutputType | null;
		min: BlockMinAggregateOutputType | null;
		_max: BlockMaxAggregateOutputType | null;
		max: BlockMaxAggregateOutputType | null;
	};

	export type BlockAvgAggregateOutputType = {
		height: number | null;
	};

	export type BlockSumAggregateOutputType = {
		height: number | null;
	};

	export type BlockMinAggregateOutputType = {
		height: number | null;
		hash: string | null;
	};

	export type BlockMaxAggregateOutputType = {
		height: number | null;
		hash: string | null;
	};

	export type BlockCountAggregateOutputType = {
		height: number;
		hash: number;
		_all: number;
	};

	export type BlockAvgAggregateInputType = {
		height?: true;
	};

	export type BlockSumAggregateInputType = {
		height?: true;
	};

	export type BlockMinAggregateInputType = {
		height?: true;
		hash?: true;
	};

	export type BlockMaxAggregateInputType = {
		height?: true;
		hash?: true;
	};

	export type BlockCountAggregateInputType = {
		height?: true;
		hash?: true;
		_all?: true;
	};

	export type BlockAggregateArgs = {
		/**
		 * Filter which Block to aggregate.
		 *
		 **/
		where?: BlockWhereInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of Blocks to fetch.
		 *
		 **/
		orderBy?: Enumerable<BlockOrderByInput>;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the start position
		 *
		 **/
		cursor?: BlockWhereUniqueInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` Blocks from the position of the cursor.
		 *
		 **/
		take?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` Blocks.
		 *
		 **/
		skip?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Count returned Blocks
		 **/
		_count?: true | BlockCountAggregateInputType;
		/**
		 * @deprecated since 2.23.0 please use `_count`
		 **/
		count?: true | BlockCountAggregateInputType;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Select which fields to average
		 **/
		_avg?: BlockAvgAggregateInputType;
		/**
		 * @deprecated since 2.23.0 please use `_avg`
		 **/
		avg?: BlockAvgAggregateInputType;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Select which fields to sum
		 **/
		_sum?: BlockSumAggregateInputType;
		/**
		 * @deprecated since 2.23.0 please use `_sum`
		 **/
		sum?: BlockSumAggregateInputType;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Select which fields to find the minimum value
		 **/
		_min?: BlockMinAggregateInputType;
		/**
		 * @deprecated since 2.23.0 please use `_min`
		 **/
		min?: BlockMinAggregateInputType;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Select which fields to find the maximum value
		 **/
		_max?: BlockMaxAggregateInputType;
		/**
		 * @deprecated since 2.23.0 please use `_max`
		 **/
		max?: BlockMaxAggregateInputType;
	};

	export type GetBlockAggregateType<T extends BlockAggregateArgs> = {
		[P in keyof T & keyof AggregateBlock]: P extends "_count" | "count"
			? T[P] extends true
				? number
				: GetScalarType<T[P], AggregateBlock[P]>
			: GetScalarType<T[P], AggregateBlock[P]>;
	};

	export type BlockGroupByArgs = {
		where?: BlockWhereInput;
		orderBy?: Enumerable<BlockOrderByInput>;
		by: Array<BlockScalarFieldEnum>;
		having?: BlockScalarWhereWithAggregatesInput;
		take?: number;
		skip?: number;
		_count?: BlockCountAggregateInputType | true;
		_avg?: BlockAvgAggregateInputType;
		_sum?: BlockSumAggregateInputType;
		_min?: BlockMinAggregateInputType;
		_max?: BlockMaxAggregateInputType;
	};

	export type BlockGroupByOutputType = {
		height: number;
		hash: string;
		_count: BlockCountAggregateOutputType | null;
		_avg: BlockAvgAggregateOutputType | null;
		_sum: BlockSumAggregateOutputType | null;
		_min: BlockMinAggregateOutputType | null;
		_max: BlockMaxAggregateOutputType | null;
	};

	type GetBlockGroupByPayload<T extends BlockGroupByArgs> = Promise<
		Array<
			PickArray<BlockGroupByOutputType, T["by"]> &
				{
					[P in keyof T & keyof BlockGroupByOutputType]: P extends "_count"
						? T[P] extends boolean
							? number
							: GetScalarType<T[P], BlockGroupByOutputType[P]>
						: GetScalarType<T[P], BlockGroupByOutputType[P]>;
				}
		>
	>;

	export type BlockSelect = {
		height?: boolean;
		hash?: boolean;
		transactions?: boolean | TransactionFindManyArgs;
	};

	export type BlockInclude = {
		transactions?: boolean | TransactionFindManyArgs;
	};

	export type BlockGetPayload<S extends boolean | null | undefined | BlockArgs, U = keyof S> = S extends true
		? Block
		: S extends undefined
		? never
		: S extends BlockArgs | BlockFindManyArgs
		? "include" extends U
			? Block &
					{
						[P in TrueKeys<S["include"]>]: P extends "transactions"
							? Array<TransactionGetPayload<S["include"][P]>>
							: never;
					}
			: "select" extends U
			? {
					[P in TrueKeys<S["select"]>]: P extends keyof Block
						? Block[P]
						: P extends "transactions"
						? Array<TransactionGetPayload<S["select"][P]>>
						: never;
			  }
			: Block
		: Block;

	type BlockCountArgs = Merge<
		Omit<BlockFindManyArgs, "select" | "include"> & {
			select?: BlockCountAggregateInputType | true;
		}
	>;

	export interface BlockDelegate<GlobalRejectSettings> {
		/**
		 * Find zero or one Block that matches the filter.
		 * @param {BlockFindUniqueArgs} args - Arguments to find a Block
		 * @example
		 * // Get one Block
		 * const block = await prisma.block.findUnique({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 **/
		findUnique<
			T extends BlockFindUniqueArgs,
			LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T["rejectOnNotFound"] : undefined
		>(
			args: SelectSubset<T, BlockFindUniqueArgs>,
		): HasReject<GlobalRejectSettings, LocalRejectSettings, "findUnique", "Block"> extends True
			? CheckSelect<T, Prisma__BlockClient<Block>, Prisma__BlockClient<BlockGetPayload<T>>>
			: CheckSelect<T, Prisma__BlockClient<Block | null>, Prisma__BlockClient<BlockGetPayload<T> | null>>;

		/**
		 * Find the first Block that matches the filter.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {BlockFindFirstArgs} args - Arguments to find a Block
		 * @example
		 * // Get one Block
		 * const block = await prisma.block.findFirst({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 **/
		findFirst<
			T extends BlockFindFirstArgs,
			LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T["rejectOnNotFound"] : undefined
		>(
			args?: SelectSubset<T, BlockFindFirstArgs>,
		): HasReject<GlobalRejectSettings, LocalRejectSettings, "findFirst", "Block"> extends True
			? CheckSelect<T, Prisma__BlockClient<Block>, Prisma__BlockClient<BlockGetPayload<T>>>
			: CheckSelect<T, Prisma__BlockClient<Block | null>, Prisma__BlockClient<BlockGetPayload<T> | null>>;

		/**
		 * Find zero or more Blocks that matches the filter.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {BlockFindManyArgs=} args - Arguments to filter and select certain fields only.
		 * @example
		 * // Get all Blocks
		 * const blocks = await prisma.block.findMany()
		 *
		 * // Get first 10 Blocks
		 * const blocks = await prisma.block.findMany({ take: 10 })
		 *
		 * // Only select the `height`
		 * const blockWithHeightOnly = await prisma.block.findMany({ select: { height: true } })
		 *
		 **/
		findMany<T extends BlockFindManyArgs>(
			args?: SelectSubset<T, BlockFindManyArgs>,
		): CheckSelect<T, PrismaPromise<Array<Block>>, PrismaPromise<Array<BlockGetPayload<T>>>>;

		/**
		 * Create a Block.
		 * @param {BlockCreateArgs} args - Arguments to create a Block.
		 * @example
		 * // Create one Block
		 * const Block = await prisma.block.create({
		 *   data: {
		 *     // ... data to create a Block
		 *   }
		 * })
		 *
		 **/
		create<T extends BlockCreateArgs>(
			args: SelectSubset<T, BlockCreateArgs>,
		): CheckSelect<T, Prisma__BlockClient<Block>, Prisma__BlockClient<BlockGetPayload<T>>>;

		/**
		 * Create many Blocks.
		 *     @param {BlockCreateManyArgs} args - Arguments to create many Blocks.
		 *     @example
		 *     // Create many Blocks
		 *     const block = await prisma.block.createMany({
		 *       data: {
		 *         // ... provide data here
		 *       }
		 *     })
		 *
		 **/
		createMany<T extends BlockCreateManyArgs>(
			args?: SelectSubset<T, BlockCreateManyArgs>,
		): PrismaPromise<BatchPayload>;

		/**
		 * Delete a Block.
		 * @param {BlockDeleteArgs} args - Arguments to delete one Block.
		 * @example
		 * // Delete one Block
		 * const Block = await prisma.block.delete({
		 *   where: {
		 *     // ... filter to delete one Block
		 *   }
		 * })
		 *
		 **/
		delete<T extends BlockDeleteArgs>(
			args: SelectSubset<T, BlockDeleteArgs>,
		): CheckSelect<T, Prisma__BlockClient<Block>, Prisma__BlockClient<BlockGetPayload<T>>>;

		/**
		 * Update one Block.
		 * @param {BlockUpdateArgs} args - Arguments to update one Block.
		 * @example
		 * // Update one Block
		 * const block = await prisma.block.update({
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: {
		 *     // ... provide data here
		 *   }
		 * })
		 *
		 **/
		update<T extends BlockUpdateArgs>(
			args: SelectSubset<T, BlockUpdateArgs>,
		): CheckSelect<T, Prisma__BlockClient<Block>, Prisma__BlockClient<BlockGetPayload<T>>>;

		/**
		 * Delete zero or more Blocks.
		 * @param {BlockDeleteManyArgs} args - Arguments to filter Blocks to delete.
		 * @example
		 * // Delete a few Blocks
		 * const { count } = await prisma.block.deleteMany({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 *
		 **/
		deleteMany<T extends BlockDeleteManyArgs>(
			args?: SelectSubset<T, BlockDeleteManyArgs>,
		): PrismaPromise<BatchPayload>;

		/**
		 * Update zero or more Blocks.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {BlockUpdateManyArgs} args - Arguments to update one or more rows.
		 * @example
		 * // Update many Blocks
		 * const block = await prisma.block.updateMany({
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: {
		 *     // ... provide data here
		 *   }
		 * })
		 *
		 **/
		updateMany<T extends BlockUpdateManyArgs>(
			args: SelectSubset<T, BlockUpdateManyArgs>,
		): PrismaPromise<BatchPayload>;

		/**
		 * Create or update one Block.
		 * @param {BlockUpsertArgs} args - Arguments to update or create a Block.
		 * @example
		 * // Update or create a Block
		 * const block = await prisma.block.upsert({
		 *   create: {
		 *     // ... data to create a Block
		 *   },
		 *   update: {
		 *     // ... in case it already exists, update
		 *   },
		 *   where: {
		 *     // ... the filter for the Block we want to update
		 *   }
		 * })
		 **/
		upsert<T extends BlockUpsertArgs>(
			args: SelectSubset<T, BlockUpsertArgs>,
		): CheckSelect<T, Prisma__BlockClient<Block>, Prisma__BlockClient<BlockGetPayload<T>>>;

		/**
		 * Count the number of Blocks.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {BlockCountArgs} args - Arguments to filter Blocks to count.
		 * @example
		 * // Count the number of Blocks
		 * const count = await prisma.block.count({
		 *   where: {
		 *     // ... the filter for the Blocks we want to count
		 *   }
		 * })
		 **/
		count<T extends BlockCountArgs>(
			args?: Subset<T, BlockCountArgs>,
		): PrismaPromise<
			T extends _Record<"select", any>
				? T["select"] extends true
					? number
					: GetScalarType<T["select"], BlockCountAggregateOutputType>
				: number
		>;

		/**
		 * Allows you to perform aggregations operations on a Block.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {BlockAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
		aggregate<T extends BlockAggregateArgs>(
			args: Subset<T, BlockAggregateArgs>,
		): PrismaPromise<GetBlockAggregateType<T>>;

		/**
		 * Group by Block.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {BlockGroupByArgs} args - Group by arguments.
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
			T extends BlockGroupByArgs,
			HasSelectOrTake extends Or<Extends<"skip", Keys<T>>, Extends<"take", Keys<T>>>,
			OrderByArg extends True extends HasSelectOrTake
				? { orderBy: BlockGroupByArgs["orderBy"] }
				: { orderBy?: BlockGroupByArgs["orderBy"] },
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
			args: SubsetIntersection<T, BlockGroupByArgs, OrderByArg> & InputErrors,
		): {} extends InputErrors ? GetBlockGroupByPayload<T> : Promise<InputErrors>;
	}

	/**
	 * The delegate class that acts as a "Promise-like" for Block.
	 * Why is this prefixed with `Prisma__`?
	 * Because we want to prevent naming conflicts as mentioned in
	 * https://github.com/prisma/prisma-client-js/issues/707
	 */
	export class Prisma__BlockClient<T> implements PrismaPromise<T> {
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

		transactions<T extends TransactionFindManyArgs = {}>(
			args?: Subset<T, TransactionFindManyArgs>,
		): CheckSelect<T, PrismaPromise<Array<Transaction>>, PrismaPromise<Array<TransactionGetPayload<T>>>>;

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
	 * Block findUnique
	 */
	export type BlockFindUniqueArgs = {
		/**
		 * Select specific fields to fetch from the Block
		 *
		 **/
		select?: BlockSelect | null;
		/**
		 * Choose, which related nodes to fetch as well.
		 *
		 **/
		include?: BlockInclude | null;
		/**
		 * Throw an Error if a Block can't be found
		 *
		 **/
		rejectOnNotFound?: RejectOnNotFound;
		/**
		 * Filter, which Block to fetch.
		 *
		 **/
		where: BlockWhereUniqueInput;
	};

	/**
	 * Block findFirst
	 */
	export type BlockFindFirstArgs = {
		/**
		 * Select specific fields to fetch from the Block
		 *
		 **/
		select?: BlockSelect | null;
		/**
		 * Choose, which related nodes to fetch as well.
		 *
		 **/
		include?: BlockInclude | null;
		/**
		 * Throw an Error if a Block can't be found
		 *
		 **/
		rejectOnNotFound?: RejectOnNotFound;
		/**
		 * Filter, which Block to fetch.
		 *
		 **/
		where?: BlockWhereInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of Blocks to fetch.
		 *
		 **/
		orderBy?: Enumerable<BlockOrderByInput>;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the position for searching for Blocks.
		 *
		 **/
		cursor?: BlockWhereUniqueInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` Blocks from the position of the cursor.
		 *
		 **/
		take?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` Blocks.
		 *
		 **/
		skip?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
		 *
		 * Filter by unique combinations of Blocks.
		 *
		 **/
		distinct?: Enumerable<BlockScalarFieldEnum>;
	};

	/**
	 * Block findMany
	 */
	export type BlockFindManyArgs = {
		/**
		 * Select specific fields to fetch from the Block
		 *
		 **/
		select?: BlockSelect | null;
		/**
		 * Choose, which related nodes to fetch as well.
		 *
		 **/
		include?: BlockInclude | null;
		/**
		 * Filter, which Blocks to fetch.
		 *
		 **/
		where?: BlockWhereInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of Blocks to fetch.
		 *
		 **/
		orderBy?: Enumerable<BlockOrderByInput>;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the position for listing Blocks.
		 *
		 **/
		cursor?: BlockWhereUniqueInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` Blocks from the position of the cursor.
		 *
		 **/
		take?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` Blocks.
		 *
		 **/
		skip?: number;
		distinct?: Enumerable<BlockScalarFieldEnum>;
	};

	/**
	 * Block create
	 */
	export type BlockCreateArgs = {
		/**
		 * Select specific fields to fetch from the Block
		 *
		 **/
		select?: BlockSelect | null;
		/**
		 * Choose, which related nodes to fetch as well.
		 *
		 **/
		include?: BlockInclude | null;
		/**
		 * The data needed to create a Block.
		 *
		 **/
		data: XOR<BlockCreateInput, BlockUncheckedCreateInput>;
	};

	/**
	 * Block createMany
	 */
	export type BlockCreateManyArgs = {
		data: Enumerable<BlockCreateManyInput>;
		skipDuplicates?: boolean;
	};

	/**
	 * Block update
	 */
	export type BlockUpdateArgs = {
		/**
		 * Select specific fields to fetch from the Block
		 *
		 **/
		select?: BlockSelect | null;
		/**
		 * Choose, which related nodes to fetch as well.
		 *
		 **/
		include?: BlockInclude | null;
		/**
		 * The data needed to update a Block.
		 *
		 **/
		data: XOR<BlockUpdateInput, BlockUncheckedUpdateInput>;
		/**
		 * Choose, which Block to update.
		 *
		 **/
		where: BlockWhereUniqueInput;
	};

	/**
	 * Block updateMany
	 */
	export type BlockUpdateManyArgs = {
		data: XOR<BlockUpdateManyMutationInput, BlockUncheckedUpdateManyInput>;
		where?: BlockWhereInput;
	};

	/**
	 * Block upsert
	 */
	export type BlockUpsertArgs = {
		/**
		 * Select specific fields to fetch from the Block
		 *
		 **/
		select?: BlockSelect | null;
		/**
		 * Choose, which related nodes to fetch as well.
		 *
		 **/
		include?: BlockInclude | null;
		/**
		 * The filter to search for the Block to update in case it exists.
		 *
		 **/
		where: BlockWhereUniqueInput;
		/**
		 * In case the Block found by the `where` argument doesn't exist, create a new Block with this data.
		 *
		 **/
		create: XOR<BlockCreateInput, BlockUncheckedCreateInput>;
		/**
		 * In case the Block was found with the provided `where` argument, update it with this data.
		 *
		 **/
		update: XOR<BlockUpdateInput, BlockUncheckedUpdateInput>;
	};

	/**
	 * Block delete
	 */
	export type BlockDeleteArgs = {
		/**
		 * Select specific fields to fetch from the Block
		 *
		 **/
		select?: BlockSelect | null;
		/**
		 * Choose, which related nodes to fetch as well.
		 *
		 **/
		include?: BlockInclude | null;
		/**
		 * Filter which Block to delete.
		 *
		 **/
		where: BlockWhereUniqueInput;
	};

	/**
	 * Block deleteMany
	 */
	export type BlockDeleteManyArgs = {
		where?: BlockWhereInput;
	};

	/**
	 * Block without action
	 */
	export type BlockArgs = {
		/**
		 * Select specific fields to fetch from the Block
		 *
		 **/
		select?: BlockSelect | null;
		/**
		 * Choose, which related nodes to fetch as well.
		 *
		 **/
		include?: BlockInclude | null;
	};

	/**
	 * Model Transaction
	 */

	export type AggregateTransaction = {
		_count: TransactionCountAggregateOutputType | null;
		count: TransactionCountAggregateOutputType | null;
		_avg: TransactionAvgAggregateOutputType | null;
		avg: TransactionAvgAggregateOutputType | null;
		_sum: TransactionSumAggregateOutputType | null;
		sum: TransactionSumAggregateOutputType | null;
		_min: TransactionMinAggregateOutputType | null;
		min: TransactionMinAggregateOutputType | null;
		_max: TransactionMaxAggregateOutputType | null;
		max: TransactionMaxAggregateOutputType | null;
	};

	export type TransactionAvgAggregateOutputType = {
		block_id: number | null;
		time: number | null;
		amount: number | null;
		fee: number | null;
	};

	export type TransactionSumAggregateOutputType = {
		block_id: number | null;
		time: number | null;
		amount: bigint | null;
		fee: bigint | null;
	};

	export type TransactionMinAggregateOutputType = {
		hash: string | null;
		block_id: number | null;
		time: number | null;
		amount: bigint | null;
		fee: bigint | null;
	};

	export type TransactionMaxAggregateOutputType = {
		hash: string | null;
		block_id: number | null;
		time: number | null;
		amount: bigint | null;
		fee: bigint | null;
	};

	export type TransactionCountAggregateOutputType = {
		hash: number;
		block_id: number;
		time: number;
		amount: number;
		fee: number;
		_all: number;
	};

	export type TransactionAvgAggregateInputType = {
		block_id?: true;
		time?: true;
		amount?: true;
		fee?: true;
	};

	export type TransactionSumAggregateInputType = {
		block_id?: true;
		time?: true;
		amount?: true;
		fee?: true;
	};

	export type TransactionMinAggregateInputType = {
		hash?: true;
		block_id?: true;
		time?: true;
		amount?: true;
		fee?: true;
	};

	export type TransactionMaxAggregateInputType = {
		hash?: true;
		block_id?: true;
		time?: true;
		amount?: true;
		fee?: true;
	};

	export type TransactionCountAggregateInputType = {
		hash?: true;
		block_id?: true;
		time?: true;
		amount?: true;
		fee?: true;
		_all?: true;
	};

	export type TransactionAggregateArgs = {
		/**
		 * Filter which Transaction to aggregate.
		 *
		 **/
		where?: TransactionWhereInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of Transactions to fetch.
		 *
		 **/
		orderBy?: Enumerable<TransactionOrderByInput>;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the start position
		 *
		 **/
		cursor?: TransactionWhereUniqueInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` Transactions from the position of the cursor.
		 *
		 **/
		take?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` Transactions.
		 *
		 **/
		skip?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Count returned Transactions
		 **/
		_count?: true | TransactionCountAggregateInputType;
		/**
		 * @deprecated since 2.23.0 please use `_count`
		 **/
		count?: true | TransactionCountAggregateInputType;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Select which fields to average
		 **/
		_avg?: TransactionAvgAggregateInputType;
		/**
		 * @deprecated since 2.23.0 please use `_avg`
		 **/
		avg?: TransactionAvgAggregateInputType;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Select which fields to sum
		 **/
		_sum?: TransactionSumAggregateInputType;
		/**
		 * @deprecated since 2.23.0 please use `_sum`
		 **/
		sum?: TransactionSumAggregateInputType;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Select which fields to find the minimum value
		 **/
		_min?: TransactionMinAggregateInputType;
		/**
		 * @deprecated since 2.23.0 please use `_min`
		 **/
		min?: TransactionMinAggregateInputType;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Select which fields to find the maximum value
		 **/
		_max?: TransactionMaxAggregateInputType;
		/**
		 * @deprecated since 2.23.0 please use `_max`
		 **/
		max?: TransactionMaxAggregateInputType;
	};

	export type GetTransactionAggregateType<T extends TransactionAggregateArgs> = {
		[P in keyof T & keyof AggregateTransaction]: P extends "_count" | "count"
			? T[P] extends true
				? number
				: GetScalarType<T[P], AggregateTransaction[P]>
			: GetScalarType<T[P], AggregateTransaction[P]>;
	};

	export type TransactionGroupByArgs = {
		where?: TransactionWhereInput;
		orderBy?: Enumerable<TransactionOrderByInput>;
		by: Array<TransactionScalarFieldEnum>;
		having?: TransactionScalarWhereWithAggregatesInput;
		take?: number;
		skip?: number;
		_count?: TransactionCountAggregateInputType | true;
		_avg?: TransactionAvgAggregateInputType;
		_sum?: TransactionSumAggregateInputType;
		_min?: TransactionMinAggregateInputType;
		_max?: TransactionMaxAggregateInputType;
	};

	export type TransactionGroupByOutputType = {
		hash: string;
		block_id: number;
		time: number;
		amount: bigint;
		fee: bigint;
		_count: TransactionCountAggregateOutputType | null;
		_avg: TransactionAvgAggregateOutputType | null;
		_sum: TransactionSumAggregateOutputType | null;
		_min: TransactionMinAggregateOutputType | null;
		_max: TransactionMaxAggregateOutputType | null;
	};

	type GetTransactionGroupByPayload<T extends TransactionGroupByArgs> = Promise<
		Array<
			PickArray<TransactionGroupByOutputType, T["by"]> &
				{
					[P in keyof T & keyof TransactionGroupByOutputType]: P extends "_count"
						? T[P] extends boolean
							? number
							: GetScalarType<T[P], TransactionGroupByOutputType[P]>
						: GetScalarType<T[P], TransactionGroupByOutputType[P]>;
				}
		>
	>;

	export type TransactionSelect = {
		hash?: boolean;
		block?: boolean | BlockArgs;
		block_id?: boolean;
		time?: boolean;
		amount?: boolean;
		fee?: boolean;
		transaction_parts?: boolean | TransactionPartFindManyArgs;
	};

	export type TransactionInclude = {
		block?: boolean | BlockArgs;
		transaction_parts?: boolean | TransactionPartFindManyArgs;
	};

	export type TransactionGetPayload<
		S extends boolean | null | undefined | TransactionArgs,
		U = keyof S
	> = S extends true
		? Transaction
		: S extends undefined
		? never
		: S extends TransactionArgs | TransactionFindManyArgs
		? "include" extends U
			? Transaction &
					{
						[P in TrueKeys<S["include"]>]: P extends "block"
							? BlockGetPayload<S["include"][P]>
							: P extends "transaction_parts"
							? Array<TransactionPartGetPayload<S["include"][P]>>
							: never;
					}
			: "select" extends U
			? {
					[P in TrueKeys<S["select"]>]: P extends keyof Transaction
						? Transaction[P]
						: P extends "block"
						? BlockGetPayload<S["select"][P]>
						: P extends "transaction_parts"
						? Array<TransactionPartGetPayload<S["select"][P]>>
						: never;
			  }
			: Transaction
		: Transaction;

	type TransactionCountArgs = Merge<
		Omit<TransactionFindManyArgs, "select" | "include"> & {
			select?: TransactionCountAggregateInputType | true;
		}
	>;

	export interface TransactionDelegate<GlobalRejectSettings> {
		/**
		 * Find zero or one Transaction that matches the filter.
		 * @param {TransactionFindUniqueArgs} args - Arguments to find a Transaction
		 * @example
		 * // Get one Transaction
		 * const transaction = await prisma.transaction.findUnique({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 **/
		findUnique<
			T extends TransactionFindUniqueArgs,
			LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T["rejectOnNotFound"] : undefined
		>(
			args: SelectSubset<T, TransactionFindUniqueArgs>,
		): HasReject<GlobalRejectSettings, LocalRejectSettings, "findUnique", "Transaction"> extends True
			? CheckSelect<
					T,
					Prisma__TransactionClient<Transaction>,
					Prisma__TransactionClient<TransactionGetPayload<T>>
			  >
			: CheckSelect<
					T,
					Prisma__TransactionClient<Transaction | null>,
					Prisma__TransactionClient<TransactionGetPayload<T> | null>
			  >;

		/**
		 * Find the first Transaction that matches the filter.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {TransactionFindFirstArgs} args - Arguments to find a Transaction
		 * @example
		 * // Get one Transaction
		 * const transaction = await prisma.transaction.findFirst({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 **/
		findFirst<
			T extends TransactionFindFirstArgs,
			LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T["rejectOnNotFound"] : undefined
		>(
			args?: SelectSubset<T, TransactionFindFirstArgs>,
		): HasReject<GlobalRejectSettings, LocalRejectSettings, "findFirst", "Transaction"> extends True
			? CheckSelect<
					T,
					Prisma__TransactionClient<Transaction>,
					Prisma__TransactionClient<TransactionGetPayload<T>>
			  >
			: CheckSelect<
					T,
					Prisma__TransactionClient<Transaction | null>,
					Prisma__TransactionClient<TransactionGetPayload<T> | null>
			  >;

		/**
		 * Find zero or more Transactions that matches the filter.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {TransactionFindManyArgs=} args - Arguments to filter and select certain fields only.
		 * @example
		 * // Get all Transactions
		 * const transactions = await prisma.transaction.findMany()
		 *
		 * // Get first 10 Transactions
		 * const transactions = await prisma.transaction.findMany({ take: 10 })
		 *
		 * // Only select the `hash`
		 * const transactionWithHashOnly = await prisma.transaction.findMany({ select: { hash: true } })
		 *
		 **/
		findMany<T extends TransactionFindManyArgs>(
			args?: SelectSubset<T, TransactionFindManyArgs>,
		): CheckSelect<T, PrismaPromise<Array<Transaction>>, PrismaPromise<Array<TransactionGetPayload<T>>>>;

		/**
		 * Create a Transaction.
		 * @param {TransactionCreateArgs} args - Arguments to create a Transaction.
		 * @example
		 * // Create one Transaction
		 * const Transaction = await prisma.transaction.create({
		 *   data: {
		 *     // ... data to create a Transaction
		 *   }
		 * })
		 *
		 **/
		create<T extends TransactionCreateArgs>(
			args: SelectSubset<T, TransactionCreateArgs>,
		): CheckSelect<T, Prisma__TransactionClient<Transaction>, Prisma__TransactionClient<TransactionGetPayload<T>>>;

		/**
		 * Create many Transactions.
		 *     @param {TransactionCreateManyArgs} args - Arguments to create many Transactions.
		 *     @example
		 *     // Create many Transactions
		 *     const transaction = await prisma.transaction.createMany({
		 *       data: {
		 *         // ... provide data here
		 *       }
		 *     })
		 *
		 **/
		createMany<T extends TransactionCreateManyArgs>(
			args?: SelectSubset<T, TransactionCreateManyArgs>,
		): PrismaPromise<BatchPayload>;

		/**
		 * Delete a Transaction.
		 * @param {TransactionDeleteArgs} args - Arguments to delete one Transaction.
		 * @example
		 * // Delete one Transaction
		 * const Transaction = await prisma.transaction.delete({
		 *   where: {
		 *     // ... filter to delete one Transaction
		 *   }
		 * })
		 *
		 **/
		delete<T extends TransactionDeleteArgs>(
			args: SelectSubset<T, TransactionDeleteArgs>,
		): CheckSelect<T, Prisma__TransactionClient<Transaction>, Prisma__TransactionClient<TransactionGetPayload<T>>>;

		/**
		 * Update one Transaction.
		 * @param {TransactionUpdateArgs} args - Arguments to update one Transaction.
		 * @example
		 * // Update one Transaction
		 * const transaction = await prisma.transaction.update({
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: {
		 *     // ... provide data here
		 *   }
		 * })
		 *
		 **/
		update<T extends TransactionUpdateArgs>(
			args: SelectSubset<T, TransactionUpdateArgs>,
		): CheckSelect<T, Prisma__TransactionClient<Transaction>, Prisma__TransactionClient<TransactionGetPayload<T>>>;

		/**
		 * Delete zero or more Transactions.
		 * @param {TransactionDeleteManyArgs} args - Arguments to filter Transactions to delete.
		 * @example
		 * // Delete a few Transactions
		 * const { count } = await prisma.transaction.deleteMany({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 *
		 **/
		deleteMany<T extends TransactionDeleteManyArgs>(
			args?: SelectSubset<T, TransactionDeleteManyArgs>,
		): PrismaPromise<BatchPayload>;

		/**
		 * Update zero or more Transactions.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {TransactionUpdateManyArgs} args - Arguments to update one or more rows.
		 * @example
		 * // Update many Transactions
		 * const transaction = await prisma.transaction.updateMany({
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: {
		 *     // ... provide data here
		 *   }
		 * })
		 *
		 **/
		updateMany<T extends TransactionUpdateManyArgs>(
			args: SelectSubset<T, TransactionUpdateManyArgs>,
		): PrismaPromise<BatchPayload>;

		/**
		 * Create or update one Transaction.
		 * @param {TransactionUpsertArgs} args - Arguments to update or create a Transaction.
		 * @example
		 * // Update or create a Transaction
		 * const transaction = await prisma.transaction.upsert({
		 *   create: {
		 *     // ... data to create a Transaction
		 *   },
		 *   update: {
		 *     // ... in case it already exists, update
		 *   },
		 *   where: {
		 *     // ... the filter for the Transaction we want to update
		 *   }
		 * })
		 **/
		upsert<T extends TransactionUpsertArgs>(
			args: SelectSubset<T, TransactionUpsertArgs>,
		): CheckSelect<T, Prisma__TransactionClient<Transaction>, Prisma__TransactionClient<TransactionGetPayload<T>>>;

		/**
		 * Count the number of Transactions.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {TransactionCountArgs} args - Arguments to filter Transactions to count.
		 * @example
		 * // Count the number of Transactions
		 * const count = await prisma.transaction.count({
		 *   where: {
		 *     // ... the filter for the Transactions we want to count
		 *   }
		 * })
		 **/
		count<T extends TransactionCountArgs>(
			args?: Subset<T, TransactionCountArgs>,
		): PrismaPromise<
			T extends _Record<"select", any>
				? T["select"] extends true
					? number
					: GetScalarType<T["select"], TransactionCountAggregateOutputType>
				: number
		>;

		/**
		 * Allows you to perform aggregations operations on a Transaction.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {TransactionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
		aggregate<T extends TransactionAggregateArgs>(
			args: Subset<T, TransactionAggregateArgs>,
		): PrismaPromise<GetTransactionAggregateType<T>>;

		/**
		 * Group by Transaction.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {TransactionGroupByArgs} args - Group by arguments.
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
			T extends TransactionGroupByArgs,
			HasSelectOrTake extends Or<Extends<"skip", Keys<T>>, Extends<"take", Keys<T>>>,
			OrderByArg extends True extends HasSelectOrTake
				? { orderBy: TransactionGroupByArgs["orderBy"] }
				: { orderBy?: TransactionGroupByArgs["orderBy"] },
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
			args: SubsetIntersection<T, TransactionGroupByArgs, OrderByArg> & InputErrors,
		): {} extends InputErrors ? GetTransactionGroupByPayload<T> : Promise<InputErrors>;
	}

	/**
	 * The delegate class that acts as a "Promise-like" for Transaction.
	 * Why is this prefixed with `Prisma__`?
	 * Because we want to prevent naming conflicts as mentioned in
	 * https://github.com/prisma/prisma-client-js/issues/707
	 */
	export class Prisma__TransactionClient<T> implements PrismaPromise<T> {
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

		block<T extends BlockArgs = {}>(
			args?: Subset<T, BlockArgs>,
		): CheckSelect<T, Prisma__BlockClient<Block | null>, Prisma__BlockClient<BlockGetPayload<T> | null>>;

		transaction_parts<T extends TransactionPartFindManyArgs = {}>(
			args?: Subset<T, TransactionPartFindManyArgs>,
		): CheckSelect<T, PrismaPromise<Array<TransactionPart>>, PrismaPromise<Array<TransactionPartGetPayload<T>>>>;

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
	 * Transaction findUnique
	 */
	export type TransactionFindUniqueArgs = {
		/**
		 * Select specific fields to fetch from the Transaction
		 *
		 **/
		select?: TransactionSelect | null;
		/**
		 * Choose, which related nodes to fetch as well.
		 *
		 **/
		include?: TransactionInclude | null;
		/**
		 * Throw an Error if a Transaction can't be found
		 *
		 **/
		rejectOnNotFound?: RejectOnNotFound;
		/**
		 * Filter, which Transaction to fetch.
		 *
		 **/
		where: TransactionWhereUniqueInput;
	};

	/**
	 * Transaction findFirst
	 */
	export type TransactionFindFirstArgs = {
		/**
		 * Select specific fields to fetch from the Transaction
		 *
		 **/
		select?: TransactionSelect | null;
		/**
		 * Choose, which related nodes to fetch as well.
		 *
		 **/
		include?: TransactionInclude | null;
		/**
		 * Throw an Error if a Transaction can't be found
		 *
		 **/
		rejectOnNotFound?: RejectOnNotFound;
		/**
		 * Filter, which Transaction to fetch.
		 *
		 **/
		where?: TransactionWhereInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of Transactions to fetch.
		 *
		 **/
		orderBy?: Enumerable<TransactionOrderByInput>;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the position for searching for Transactions.
		 *
		 **/
		cursor?: TransactionWhereUniqueInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` Transactions from the position of the cursor.
		 *
		 **/
		take?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` Transactions.
		 *
		 **/
		skip?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
		 *
		 * Filter by unique combinations of Transactions.
		 *
		 **/
		distinct?: Enumerable<TransactionScalarFieldEnum>;
	};

	/**
	 * Transaction findMany
	 */
	export type TransactionFindManyArgs = {
		/**
		 * Select specific fields to fetch from the Transaction
		 *
		 **/
		select?: TransactionSelect | null;
		/**
		 * Choose, which related nodes to fetch as well.
		 *
		 **/
		include?: TransactionInclude | null;
		/**
		 * Filter, which Transactions to fetch.
		 *
		 **/
		where?: TransactionWhereInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of Transactions to fetch.
		 *
		 **/
		orderBy?: Enumerable<TransactionOrderByInput>;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the position for listing Transactions.
		 *
		 **/
		cursor?: TransactionWhereUniqueInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` Transactions from the position of the cursor.
		 *
		 **/
		take?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` Transactions.
		 *
		 **/
		skip?: number;
		distinct?: Enumerable<TransactionScalarFieldEnum>;
	};

	/**
	 * Transaction create
	 */
	export type TransactionCreateArgs = {
		/**
		 * Select specific fields to fetch from the Transaction
		 *
		 **/
		select?: TransactionSelect | null;
		/**
		 * Choose, which related nodes to fetch as well.
		 *
		 **/
		include?: TransactionInclude | null;
		/**
		 * The data needed to create a Transaction.
		 *
		 **/
		data: XOR<TransactionCreateInput, TransactionUncheckedCreateInput>;
	};

	/**
	 * Transaction createMany
	 */
	export type TransactionCreateManyArgs = {
		data: Enumerable<TransactionCreateManyInput>;
		skipDuplicates?: boolean;
	};

	/**
	 * Transaction update
	 */
	export type TransactionUpdateArgs = {
		/**
		 * Select specific fields to fetch from the Transaction
		 *
		 **/
		select?: TransactionSelect | null;
		/**
		 * Choose, which related nodes to fetch as well.
		 *
		 **/
		include?: TransactionInclude | null;
		/**
		 * The data needed to update a Transaction.
		 *
		 **/
		data: XOR<TransactionUpdateInput, TransactionUncheckedUpdateInput>;
		/**
		 * Choose, which Transaction to update.
		 *
		 **/
		where: TransactionWhereUniqueInput;
	};

	/**
	 * Transaction updateMany
	 */
	export type TransactionUpdateManyArgs = {
		data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyInput>;
		where?: TransactionWhereInput;
	};

	/**
	 * Transaction upsert
	 */
	export type TransactionUpsertArgs = {
		/**
		 * Select specific fields to fetch from the Transaction
		 *
		 **/
		select?: TransactionSelect | null;
		/**
		 * Choose, which related nodes to fetch as well.
		 *
		 **/
		include?: TransactionInclude | null;
		/**
		 * The filter to search for the Transaction to update in case it exists.
		 *
		 **/
		where: TransactionWhereUniqueInput;
		/**
		 * In case the Transaction found by the `where` argument doesn't exist, create a new Transaction with this data.
		 *
		 **/
		create: XOR<TransactionCreateInput, TransactionUncheckedCreateInput>;
		/**
		 * In case the Transaction was found with the provided `where` argument, update it with this data.
		 *
		 **/
		update: XOR<TransactionUpdateInput, TransactionUncheckedUpdateInput>;
	};

	/**
	 * Transaction delete
	 */
	export type TransactionDeleteArgs = {
		/**
		 * Select specific fields to fetch from the Transaction
		 *
		 **/
		select?: TransactionSelect | null;
		/**
		 * Choose, which related nodes to fetch as well.
		 *
		 **/
		include?: TransactionInclude | null;
		/**
		 * Filter which Transaction to delete.
		 *
		 **/
		where: TransactionWhereUniqueInput;
	};

	/**
	 * Transaction deleteMany
	 */
	export type TransactionDeleteManyArgs = {
		where?: TransactionWhereInput;
	};

	/**
	 * Transaction without action
	 */
	export type TransactionArgs = {
		/**
		 * Select specific fields to fetch from the Transaction
		 *
		 **/
		select?: TransactionSelect | null;
		/**
		 * Choose, which related nodes to fetch as well.
		 *
		 **/
		include?: TransactionInclude | null;
	};

	/**
	 * Model TransactionPart
	 */

	export type AggregateTransactionPart = {
		_count: TransactionPartCountAggregateOutputType | null;
		count: TransactionPartCountAggregateOutputType | null;
		_avg: TransactionPartAvgAggregateOutputType | null;
		avg: TransactionPartAvgAggregateOutputType | null;
		_sum: TransactionPartSumAggregateOutputType | null;
		sum: TransactionPartSumAggregateOutputType | null;
		_min: TransactionPartMinAggregateOutputType | null;
		min: TransactionPartMinAggregateOutputType | null;
		_max: TransactionPartMaxAggregateOutputType | null;
		max: TransactionPartMaxAggregateOutputType | null;
	};

	export type TransactionPartAvgAggregateOutputType = {
		output_idx: number | null;
		input_idx: number | null;
		amount: number | null;
	};

	export type TransactionPartSumAggregateOutputType = {
		output_idx: number | null;
		input_idx: number | null;
		amount: bigint | null;
	};

	export type TransactionPartMinAggregateOutputType = {
		output_hash: string | null;
		output_idx: number | null;
		input_hash: string | null;
		input_idx: number | null;
		amount: bigint | null;
	};

	export type TransactionPartMaxAggregateOutputType = {
		output_hash: string | null;
		output_idx: number | null;
		input_hash: string | null;
		input_idx: number | null;
		amount: bigint | null;
	};

	export type TransactionPartCountAggregateOutputType = {
		output_hash: number;
		output_idx: number;
		input_hash: number;
		input_idx: number;
		amount: number;
		address: number;
		_all: number;
	};

	export type TransactionPartAvgAggregateInputType = {
		output_idx?: true;
		input_idx?: true;
		amount?: true;
	};

	export type TransactionPartSumAggregateInputType = {
		output_idx?: true;
		input_idx?: true;
		amount?: true;
	};

	export type TransactionPartMinAggregateInputType = {
		output_hash?: true;
		output_idx?: true;
		input_hash?: true;
		input_idx?: true;
		amount?: true;
	};

	export type TransactionPartMaxAggregateInputType = {
		output_hash?: true;
		output_idx?: true;
		input_hash?: true;
		input_idx?: true;
		amount?: true;
	};

	export type TransactionPartCountAggregateInputType = {
		output_hash?: true;
		output_idx?: true;
		input_hash?: true;
		input_idx?: true;
		amount?: true;
		address?: true;
		_all?: true;
	};

	export type TransactionPartAggregateArgs = {
		/**
		 * Filter which TransactionPart to aggregate.
		 *
		 **/
		where?: TransactionPartWhereInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of TransactionParts to fetch.
		 *
		 **/
		orderBy?: Enumerable<TransactionPartOrderByInput>;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the start position
		 *
		 **/
		cursor?: TransactionPartWhereUniqueInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` TransactionParts from the position of the cursor.
		 *
		 **/
		take?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` TransactionParts.
		 *
		 **/
		skip?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Count returned TransactionParts
		 **/
		_count?: true | TransactionPartCountAggregateInputType;
		/**
		 * @deprecated since 2.23.0 please use `_count`
		 **/
		count?: true | TransactionPartCountAggregateInputType;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Select which fields to average
		 **/
		_avg?: TransactionPartAvgAggregateInputType;
		/**
		 * @deprecated since 2.23.0 please use `_avg`
		 **/
		avg?: TransactionPartAvgAggregateInputType;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Select which fields to sum
		 **/
		_sum?: TransactionPartSumAggregateInputType;
		/**
		 * @deprecated since 2.23.0 please use `_sum`
		 **/
		sum?: TransactionPartSumAggregateInputType;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Select which fields to find the minimum value
		 **/
		_min?: TransactionPartMinAggregateInputType;
		/**
		 * @deprecated since 2.23.0 please use `_min`
		 **/
		min?: TransactionPartMinAggregateInputType;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Select which fields to find the maximum value
		 **/
		_max?: TransactionPartMaxAggregateInputType;
		/**
		 * @deprecated since 2.23.0 please use `_max`
		 **/
		max?: TransactionPartMaxAggregateInputType;
	};

	export type GetTransactionPartAggregateType<T extends TransactionPartAggregateArgs> = {
		[P in keyof T & keyof AggregateTransactionPart]: P extends "_count" | "count"
			? T[P] extends true
				? number
				: GetScalarType<T[P], AggregateTransactionPart[P]>
			: GetScalarType<T[P], AggregateTransactionPart[P]>;
	};

	export type TransactionPartGroupByArgs = {
		where?: TransactionPartWhereInput;
		orderBy?: Enumerable<TransactionPartOrderByInput>;
		by: Array<TransactionPartScalarFieldEnum>;
		having?: TransactionPartScalarWhereWithAggregatesInput;
		take?: number;
		skip?: number;
		_count?: TransactionPartCountAggregateInputType | true;
		_avg?: TransactionPartAvgAggregateInputType;
		_sum?: TransactionPartSumAggregateInputType;
		_min?: TransactionPartMinAggregateInputType;
		_max?: TransactionPartMaxAggregateInputType;
	};

	export type TransactionPartGroupByOutputType = {
		output_hash: string;
		output_idx: number;
		input_hash: string | null;
		input_idx: number | null;
		amount: bigint;
		address: JsonValue | null;
		_count: TransactionPartCountAggregateOutputType | null;
		_avg: TransactionPartAvgAggregateOutputType | null;
		_sum: TransactionPartSumAggregateOutputType | null;
		_min: TransactionPartMinAggregateOutputType | null;
		_max: TransactionPartMaxAggregateOutputType | null;
	};

	type GetTransactionPartGroupByPayload<T extends TransactionPartGroupByArgs> = Promise<
		Array<
			PickArray<TransactionPartGroupByOutputType, T["by"]> &
				{
					[P in keyof T & keyof TransactionPartGroupByOutputType]: P extends "_count"
						? T[P] extends boolean
							? number
							: GetScalarType<T[P], TransactionPartGroupByOutputType[P]>
						: GetScalarType<T[P], TransactionPartGroupByOutputType[P]>;
				}
		>
	>;

	export type TransactionPartSelect = {
		output_hash?: boolean;
		output_idx?: boolean;
		input_hash?: boolean;
		input_idx?: boolean;
		amount?: boolean;
		address?: boolean;
		transaction?: boolean | TransactionArgs;
	};

	export type TransactionPartInclude = {
		transaction?: boolean | TransactionArgs;
	};

	export type TransactionPartGetPayload<
		S extends boolean | null | undefined | TransactionPartArgs,
		U = keyof S
	> = S extends true
		? TransactionPart
		: S extends undefined
		? never
		: S extends TransactionPartArgs | TransactionPartFindManyArgs
		? "include" extends U
			? TransactionPart &
					{
						[P in TrueKeys<S["include"]>]: P extends "transaction"
							? TransactionGetPayload<S["include"][P]>
							: never;
					}
			: "select" extends U
			? {
					[P in TrueKeys<S["select"]>]: P extends keyof TransactionPart
						? TransactionPart[P]
						: P extends "transaction"
						? TransactionGetPayload<S["select"][P]>
						: never;
			  }
			: TransactionPart
		: TransactionPart;

	type TransactionPartCountArgs = Merge<
		Omit<TransactionPartFindManyArgs, "select" | "include"> & {
			select?: TransactionPartCountAggregateInputType | true;
		}
	>;

	export interface TransactionPartDelegate<GlobalRejectSettings> {
		/**
		 * Find zero or one TransactionPart that matches the filter.
		 * @param {TransactionPartFindUniqueArgs} args - Arguments to find a TransactionPart
		 * @example
		 * // Get one TransactionPart
		 * const transactionPart = await prisma.transactionPart.findUnique({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 **/
		findUnique<
			T extends TransactionPartFindUniqueArgs,
			LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T["rejectOnNotFound"] : undefined
		>(
			args: SelectSubset<T, TransactionPartFindUniqueArgs>,
		): HasReject<GlobalRejectSettings, LocalRejectSettings, "findUnique", "TransactionPart"> extends True
			? CheckSelect<
					T,
					Prisma__TransactionPartClient<TransactionPart>,
					Prisma__TransactionPartClient<TransactionPartGetPayload<T>>
			  >
			: CheckSelect<
					T,
					Prisma__TransactionPartClient<TransactionPart | null>,
					Prisma__TransactionPartClient<TransactionPartGetPayload<T> | null>
			  >;

		/**
		 * Find the first TransactionPart that matches the filter.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {TransactionPartFindFirstArgs} args - Arguments to find a TransactionPart
		 * @example
		 * // Get one TransactionPart
		 * const transactionPart = await prisma.transactionPart.findFirst({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 **/
		findFirst<
			T extends TransactionPartFindFirstArgs,
			LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T["rejectOnNotFound"] : undefined
		>(
			args?: SelectSubset<T, TransactionPartFindFirstArgs>,
		): HasReject<GlobalRejectSettings, LocalRejectSettings, "findFirst", "TransactionPart"> extends True
			? CheckSelect<
					T,
					Prisma__TransactionPartClient<TransactionPart>,
					Prisma__TransactionPartClient<TransactionPartGetPayload<T>>
			  >
			: CheckSelect<
					T,
					Prisma__TransactionPartClient<TransactionPart | null>,
					Prisma__TransactionPartClient<TransactionPartGetPayload<T> | null>
			  >;

		/**
		 * Find zero or more TransactionParts that matches the filter.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {TransactionPartFindManyArgs=} args - Arguments to filter and select certain fields only.
		 * @example
		 * // Get all TransactionParts
		 * const transactionParts = await prisma.transactionPart.findMany()
		 *
		 * // Get first 10 TransactionParts
		 * const transactionParts = await prisma.transactionPart.findMany({ take: 10 })
		 *
		 * // Only select the `output_hash`
		 * const transactionPartWithOutput_hashOnly = await prisma.transactionPart.findMany({ select: { output_hash: true } })
		 *
		 **/
		findMany<T extends TransactionPartFindManyArgs>(
			args?: SelectSubset<T, TransactionPartFindManyArgs>,
		): CheckSelect<T, PrismaPromise<Array<TransactionPart>>, PrismaPromise<Array<TransactionPartGetPayload<T>>>>;

		/**
		 * Create a TransactionPart.
		 * @param {TransactionPartCreateArgs} args - Arguments to create a TransactionPart.
		 * @example
		 * // Create one TransactionPart
		 * const TransactionPart = await prisma.transactionPart.create({
		 *   data: {
		 *     // ... data to create a TransactionPart
		 *   }
		 * })
		 *
		 **/
		create<T extends TransactionPartCreateArgs>(
			args: SelectSubset<T, TransactionPartCreateArgs>,
		): CheckSelect<
			T,
			Prisma__TransactionPartClient<TransactionPart>,
			Prisma__TransactionPartClient<TransactionPartGetPayload<T>>
		>;

		/**
		 * Create many TransactionParts.
		 *     @param {TransactionPartCreateManyArgs} args - Arguments to create many TransactionParts.
		 *     @example
		 *     // Create many TransactionParts
		 *     const transactionPart = await prisma.transactionPart.createMany({
		 *       data: {
		 *         // ... provide data here
		 *       }
		 *     })
		 *
		 **/
		createMany<T extends TransactionPartCreateManyArgs>(
			args?: SelectSubset<T, TransactionPartCreateManyArgs>,
		): PrismaPromise<BatchPayload>;

		/**
		 * Delete a TransactionPart.
		 * @param {TransactionPartDeleteArgs} args - Arguments to delete one TransactionPart.
		 * @example
		 * // Delete one TransactionPart
		 * const TransactionPart = await prisma.transactionPart.delete({
		 *   where: {
		 *     // ... filter to delete one TransactionPart
		 *   }
		 * })
		 *
		 **/
		delete<T extends TransactionPartDeleteArgs>(
			args: SelectSubset<T, TransactionPartDeleteArgs>,
		): CheckSelect<
			T,
			Prisma__TransactionPartClient<TransactionPart>,
			Prisma__TransactionPartClient<TransactionPartGetPayload<T>>
		>;

		/**
		 * Update one TransactionPart.
		 * @param {TransactionPartUpdateArgs} args - Arguments to update one TransactionPart.
		 * @example
		 * // Update one TransactionPart
		 * const transactionPart = await prisma.transactionPart.update({
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: {
		 *     // ... provide data here
		 *   }
		 * })
		 *
		 **/
		update<T extends TransactionPartUpdateArgs>(
			args: SelectSubset<T, TransactionPartUpdateArgs>,
		): CheckSelect<
			T,
			Prisma__TransactionPartClient<TransactionPart>,
			Prisma__TransactionPartClient<TransactionPartGetPayload<T>>
		>;

		/**
		 * Delete zero or more TransactionParts.
		 * @param {TransactionPartDeleteManyArgs} args - Arguments to filter TransactionParts to delete.
		 * @example
		 * // Delete a few TransactionParts
		 * const { count } = await prisma.transactionPart.deleteMany({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 *
		 **/
		deleteMany<T extends TransactionPartDeleteManyArgs>(
			args?: SelectSubset<T, TransactionPartDeleteManyArgs>,
		): PrismaPromise<BatchPayload>;

		/**
		 * Update zero or more TransactionParts.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {TransactionPartUpdateManyArgs} args - Arguments to update one or more rows.
		 * @example
		 * // Update many TransactionParts
		 * const transactionPart = await prisma.transactionPart.updateMany({
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: {
		 *     // ... provide data here
		 *   }
		 * })
		 *
		 **/
		updateMany<T extends TransactionPartUpdateManyArgs>(
			args: SelectSubset<T, TransactionPartUpdateManyArgs>,
		): PrismaPromise<BatchPayload>;

		/**
		 * Create or update one TransactionPart.
		 * @param {TransactionPartUpsertArgs} args - Arguments to update or create a TransactionPart.
		 * @example
		 * // Update or create a TransactionPart
		 * const transactionPart = await prisma.transactionPart.upsert({
		 *   create: {
		 *     // ... data to create a TransactionPart
		 *   },
		 *   update: {
		 *     // ... in case it already exists, update
		 *   },
		 *   where: {
		 *     // ... the filter for the TransactionPart we want to update
		 *   }
		 * })
		 **/
		upsert<T extends TransactionPartUpsertArgs>(
			args: SelectSubset<T, TransactionPartUpsertArgs>,
		): CheckSelect<
			T,
			Prisma__TransactionPartClient<TransactionPart>,
			Prisma__TransactionPartClient<TransactionPartGetPayload<T>>
		>;

		/**
		 * Count the number of TransactionParts.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {TransactionPartCountArgs} args - Arguments to filter TransactionParts to count.
		 * @example
		 * // Count the number of TransactionParts
		 * const count = await prisma.transactionPart.count({
		 *   where: {
		 *     // ... the filter for the TransactionParts we want to count
		 *   }
		 * })
		 **/
		count<T extends TransactionPartCountArgs>(
			args?: Subset<T, TransactionPartCountArgs>,
		): PrismaPromise<
			T extends _Record<"select", any>
				? T["select"] extends true
					? number
					: GetScalarType<T["select"], TransactionPartCountAggregateOutputType>
				: number
		>;

		/**
		 * Allows you to perform aggregations operations on a TransactionPart.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {TransactionPartAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
		aggregate<T extends TransactionPartAggregateArgs>(
			args: Subset<T, TransactionPartAggregateArgs>,
		): PrismaPromise<GetTransactionPartAggregateType<T>>;

		/**
		 * Group by TransactionPart.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {TransactionPartGroupByArgs} args - Group by arguments.
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
			T extends TransactionPartGroupByArgs,
			HasSelectOrTake extends Or<Extends<"skip", Keys<T>>, Extends<"take", Keys<T>>>,
			OrderByArg extends True extends HasSelectOrTake
				? { orderBy: TransactionPartGroupByArgs["orderBy"] }
				: { orderBy?: TransactionPartGroupByArgs["orderBy"] },
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
			args: SubsetIntersection<T, TransactionPartGroupByArgs, OrderByArg> & InputErrors,
		): {} extends InputErrors ? GetTransactionPartGroupByPayload<T> : Promise<InputErrors>;
	}

	/**
	 * The delegate class that acts as a "Promise-like" for TransactionPart.
	 * Why is this prefixed with `Prisma__`?
	 * Because we want to prevent naming conflicts as mentioned in
	 * https://github.com/prisma/prisma-client-js/issues/707
	 */
	export class Prisma__TransactionPartClient<T> implements PrismaPromise<T> {
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

		transaction<T extends TransactionArgs = {}>(
			args?: Subset<T, TransactionArgs>,
		): CheckSelect<
			T,
			Prisma__TransactionClient<Transaction | null>,
			Prisma__TransactionClient<TransactionGetPayload<T> | null>
		>;

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
	 * TransactionPart findUnique
	 */
	export type TransactionPartFindUniqueArgs = {
		/**
		 * Select specific fields to fetch from the TransactionPart
		 *
		 **/
		select?: TransactionPartSelect | null;
		/**
		 * Choose, which related nodes to fetch as well.
		 *
		 **/
		include?: TransactionPartInclude | null;
		/**
		 * Throw an Error if a TransactionPart can't be found
		 *
		 **/
		rejectOnNotFound?: RejectOnNotFound;
		/**
		 * Filter, which TransactionPart to fetch.
		 *
		 **/
		where: TransactionPartWhereUniqueInput;
	};

	/**
	 * TransactionPart findFirst
	 */
	export type TransactionPartFindFirstArgs = {
		/**
		 * Select specific fields to fetch from the TransactionPart
		 *
		 **/
		select?: TransactionPartSelect | null;
		/**
		 * Choose, which related nodes to fetch as well.
		 *
		 **/
		include?: TransactionPartInclude | null;
		/**
		 * Throw an Error if a TransactionPart can't be found
		 *
		 **/
		rejectOnNotFound?: RejectOnNotFound;
		/**
		 * Filter, which TransactionPart to fetch.
		 *
		 **/
		where?: TransactionPartWhereInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of TransactionParts to fetch.
		 *
		 **/
		orderBy?: Enumerable<TransactionPartOrderByInput>;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the position for searching for TransactionParts.
		 *
		 **/
		cursor?: TransactionPartWhereUniqueInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` TransactionParts from the position of the cursor.
		 *
		 **/
		take?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` TransactionParts.
		 *
		 **/
		skip?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
		 *
		 * Filter by unique combinations of TransactionParts.
		 *
		 **/
		distinct?: Enumerable<TransactionPartScalarFieldEnum>;
	};

	/**
	 * TransactionPart findMany
	 */
	export type TransactionPartFindManyArgs = {
		/**
		 * Select specific fields to fetch from the TransactionPart
		 *
		 **/
		select?: TransactionPartSelect | null;
		/**
		 * Choose, which related nodes to fetch as well.
		 *
		 **/
		include?: TransactionPartInclude | null;
		/**
		 * Filter, which TransactionParts to fetch.
		 *
		 **/
		where?: TransactionPartWhereInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of TransactionParts to fetch.
		 *
		 **/
		orderBy?: Enumerable<TransactionPartOrderByInput>;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the position for listing TransactionParts.
		 *
		 **/
		cursor?: TransactionPartWhereUniqueInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` TransactionParts from the position of the cursor.
		 *
		 **/
		take?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` TransactionParts.
		 *
		 **/
		skip?: number;
		distinct?: Enumerable<TransactionPartScalarFieldEnum>;
	};

	/**
	 * TransactionPart create
	 */
	export type TransactionPartCreateArgs = {
		/**
		 * Select specific fields to fetch from the TransactionPart
		 *
		 **/
		select?: TransactionPartSelect | null;
		/**
		 * Choose, which related nodes to fetch as well.
		 *
		 **/
		include?: TransactionPartInclude | null;
		/**
		 * The data needed to create a TransactionPart.
		 *
		 **/
		data: XOR<TransactionPartCreateInput, TransactionPartUncheckedCreateInput>;
	};

	/**
	 * TransactionPart createMany
	 */
	export type TransactionPartCreateManyArgs = {
		data: Enumerable<TransactionPartCreateManyInput>;
		skipDuplicates?: boolean;
	};

	/**
	 * TransactionPart update
	 */
	export type TransactionPartUpdateArgs = {
		/**
		 * Select specific fields to fetch from the TransactionPart
		 *
		 **/
		select?: TransactionPartSelect | null;
		/**
		 * Choose, which related nodes to fetch as well.
		 *
		 **/
		include?: TransactionPartInclude | null;
		/**
		 * The data needed to update a TransactionPart.
		 *
		 **/
		data: XOR<TransactionPartUpdateInput, TransactionPartUncheckedUpdateInput>;
		/**
		 * Choose, which TransactionPart to update.
		 *
		 **/
		where: TransactionPartWhereUniqueInput;
	};

	/**
	 * TransactionPart updateMany
	 */
	export type TransactionPartUpdateManyArgs = {
		data: XOR<TransactionPartUpdateManyMutationInput, TransactionPartUncheckedUpdateManyInput>;
		where?: TransactionPartWhereInput;
	};

	/**
	 * TransactionPart upsert
	 */
	export type TransactionPartUpsertArgs = {
		/**
		 * Select specific fields to fetch from the TransactionPart
		 *
		 **/
		select?: TransactionPartSelect | null;
		/**
		 * Choose, which related nodes to fetch as well.
		 *
		 **/
		include?: TransactionPartInclude | null;
		/**
		 * The filter to search for the TransactionPart to update in case it exists.
		 *
		 **/
		where: TransactionPartWhereUniqueInput;
		/**
		 * In case the TransactionPart found by the `where` argument doesn't exist, create a new TransactionPart with this data.
		 *
		 **/
		create: XOR<TransactionPartCreateInput, TransactionPartUncheckedCreateInput>;
		/**
		 * In case the TransactionPart was found with the provided `where` argument, update it with this data.
		 *
		 **/
		update: XOR<TransactionPartUpdateInput, TransactionPartUncheckedUpdateInput>;
	};

	/**
	 * TransactionPart delete
	 */
	export type TransactionPartDeleteArgs = {
		/**
		 * Select specific fields to fetch from the TransactionPart
		 *
		 **/
		select?: TransactionPartSelect | null;
		/**
		 * Choose, which related nodes to fetch as well.
		 *
		 **/
		include?: TransactionPartInclude | null;
		/**
		 * Filter which TransactionPart to delete.
		 *
		 **/
		where: TransactionPartWhereUniqueInput;
	};

	/**
	 * TransactionPart deleteMany
	 */
	export type TransactionPartDeleteManyArgs = {
		where?: TransactionPartWhereInput;
	};

	/**
	 * TransactionPart without action
	 */
	export type TransactionPartArgs = {
		/**
		 * Select specific fields to fetch from the TransactionPart
		 *
		 **/
		select?: TransactionPartSelect | null;
		/**
		 * Choose, which related nodes to fetch as well.
		 *
		 **/
		include?: TransactionPartInclude | null;
	};

	/**
	 * Enums
	 */

	// Based on
	// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

	export const BlockScalarFieldEnum: {
		height: "height";
		hash: "hash";
	};

	export type BlockScalarFieldEnum = typeof BlockScalarFieldEnum[keyof typeof BlockScalarFieldEnum];

	export const TransactionScalarFieldEnum: {
		hash: "hash";
		block_id: "block_id";
		time: "time";
		amount: "amount";
		fee: "fee";
	};

	export type TransactionScalarFieldEnum = typeof TransactionScalarFieldEnum[keyof typeof TransactionScalarFieldEnum];

	export const TransactionPartScalarFieldEnum: {
		output_hash: "output_hash";
		output_idx: "output_idx";
		input_hash: "input_hash";
		input_idx: "input_idx";
		amount: "amount";
		address: "address";
	};

	export type TransactionPartScalarFieldEnum = typeof TransactionPartScalarFieldEnum[keyof typeof TransactionPartScalarFieldEnum];

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

	export type BlockWhereInput = {
		AND?: Enumerable<BlockWhereInput>;
		OR?: Enumerable<BlockWhereInput>;
		NOT?: Enumerable<BlockWhereInput>;
		height?: IntFilter | number;
		hash?: StringFilter | string;
		transactions?: TransactionListRelationFilter;
	};

	export type BlockOrderByInput = {
		height?: SortOrder;
		hash?: SortOrder;
	};

	export type BlockWhereUniqueInput = {
		height?: number;
		hash?: string;
	};

	export type BlockScalarWhereWithAggregatesInput = {
		AND?: Enumerable<BlockScalarWhereWithAggregatesInput>;
		OR?: Enumerable<BlockScalarWhereWithAggregatesInput>;
		NOT?: Enumerable<BlockScalarWhereWithAggregatesInput>;
		height?: IntWithAggregatesFilter | number;
		hash?: StringWithAggregatesFilter | string;
	};

	export type TransactionWhereInput = {
		AND?: Enumerable<TransactionWhereInput>;
		OR?: Enumerable<TransactionWhereInput>;
		NOT?: Enumerable<TransactionWhereInput>;
		hash?: StringFilter | string;
		block?: XOR<BlockRelationFilter, BlockWhereInput>;
		block_id?: IntFilter | number;
		time?: IntFilter | number;
		amount?: BigIntFilter | bigint | number;
		fee?: BigIntFilter | bigint | number;
		transaction_parts?: TransactionPartListRelationFilter;
	};

	export type TransactionOrderByInput = {
		hash?: SortOrder;
		block_id?: SortOrder;
		time?: SortOrder;
		amount?: SortOrder;
		fee?: SortOrder;
	};

	export type TransactionWhereUniqueInput = {
		hash?: string;
	};

	export type TransactionScalarWhereWithAggregatesInput = {
		AND?: Enumerable<TransactionScalarWhereWithAggregatesInput>;
		OR?: Enumerable<TransactionScalarWhereWithAggregatesInput>;
		NOT?: Enumerable<TransactionScalarWhereWithAggregatesInput>;
		hash?: StringWithAggregatesFilter | string;
		block_id?: IntWithAggregatesFilter | number;
		time?: IntWithAggregatesFilter | number;
		amount?: BigIntWithAggregatesFilter | bigint | number;
		fee?: BigIntWithAggregatesFilter | bigint | number;
	};

	export type TransactionPartWhereInput = {
		AND?: Enumerable<TransactionPartWhereInput>;
		OR?: Enumerable<TransactionPartWhereInput>;
		NOT?: Enumerable<TransactionPartWhereInput>;
		output_hash?: StringFilter | string;
		output_idx?: IntFilter | number;
		input_hash?: StringNullableFilter | string | null;
		input_idx?: IntNullableFilter | number | null;
		amount?: BigIntFilter | bigint | number;
		address?: JsonNullableFilter;
		transaction?: XOR<TransactionRelationFilter, TransactionWhereInput>;
	};

	export type TransactionPartOrderByInput = {
		output_hash?: SortOrder;
		output_idx?: SortOrder;
		input_hash?: SortOrder;
		input_idx?: SortOrder;
		amount?: SortOrder;
		address?: SortOrder;
	};

	export type TransactionPartWhereUniqueInput = {
		transaction_input_hash_index?: TransactionPartTransaction_input_hash_indexCompoundUniqueInput;
		output_hash_output_idx?: TransactionPartOutput_hashOutput_idxCompoundUniqueInput;
	};

	export type TransactionPartScalarWhereWithAggregatesInput = {
		AND?: Enumerable<TransactionPartScalarWhereWithAggregatesInput>;
		OR?: Enumerable<TransactionPartScalarWhereWithAggregatesInput>;
		NOT?: Enumerable<TransactionPartScalarWhereWithAggregatesInput>;
		output_hash?: StringWithAggregatesFilter | string;
		output_idx?: IntWithAggregatesFilter | number;
		input_hash?: StringNullableWithAggregatesFilter | string | null;
		input_idx?: IntNullableWithAggregatesFilter | number | null;
		amount?: BigIntWithAggregatesFilter | bigint | number;
		address?: JsonNullableWithAggregatesFilter;
	};

	export type BlockCreateInput = {
		height: number;
		hash: string;
		transactions?: TransactionCreateNestedManyWithoutBlockInput;
	};

	export type BlockUncheckedCreateInput = {
		height: number;
		hash: string;
		transactions?: TransactionUncheckedCreateNestedManyWithoutBlockInput;
	};

	export type BlockUpdateInput = {
		height?: IntFieldUpdateOperationsInput | number;
		hash?: StringFieldUpdateOperationsInput | string;
		transactions?: TransactionUpdateManyWithoutBlockInput;
	};

	export type BlockUncheckedUpdateInput = {
		height?: IntFieldUpdateOperationsInput | number;
		hash?: StringFieldUpdateOperationsInput | string;
		transactions?: TransactionUncheckedUpdateManyWithoutBlockInput;
	};

	export type BlockCreateManyInput = {
		height: number;
		hash: string;
	};

	export type BlockUpdateManyMutationInput = {
		height?: IntFieldUpdateOperationsInput | number;
		hash?: StringFieldUpdateOperationsInput | string;
	};

	export type BlockUncheckedUpdateManyInput = {
		height?: IntFieldUpdateOperationsInput | number;
		hash?: StringFieldUpdateOperationsInput | string;
	};

	export type TransactionCreateInput = {
		hash: string;
		time: number;
		amount: bigint | number;
		fee: bigint | number;
		block: BlockCreateNestedOneWithoutTransactionsInput;
		transaction_parts?: TransactionPartCreateNestedManyWithoutTransactionInput;
	};

	export type TransactionUncheckedCreateInput = {
		hash: string;
		block_id: number;
		time: number;
		amount: bigint | number;
		fee: bigint | number;
		transaction_parts?: TransactionPartUncheckedCreateNestedManyWithoutTransactionInput;
	};

	export type TransactionUpdateInput = {
		hash?: StringFieldUpdateOperationsInput | string;
		time?: IntFieldUpdateOperationsInput | number;
		amount?: BigIntFieldUpdateOperationsInput | bigint | number;
		fee?: BigIntFieldUpdateOperationsInput | bigint | number;
		block?: BlockUpdateOneRequiredWithoutTransactionsInput;
		transaction_parts?: TransactionPartUpdateManyWithoutTransactionInput;
	};

	export type TransactionUncheckedUpdateInput = {
		hash?: StringFieldUpdateOperationsInput | string;
		block_id?: IntFieldUpdateOperationsInput | number;
		time?: IntFieldUpdateOperationsInput | number;
		amount?: BigIntFieldUpdateOperationsInput | bigint | number;
		fee?: BigIntFieldUpdateOperationsInput | bigint | number;
		transaction_parts?: TransactionPartUncheckedUpdateManyWithoutTransactionInput;
	};

	export type TransactionCreateManyInput = {
		hash: string;
		block_id: number;
		time: number;
		amount: bigint | number;
		fee: bigint | number;
	};

	export type TransactionUpdateManyMutationInput = {
		hash?: StringFieldUpdateOperationsInput | string;
		time?: IntFieldUpdateOperationsInput | number;
		amount?: BigIntFieldUpdateOperationsInput | bigint | number;
		fee?: BigIntFieldUpdateOperationsInput | bigint | number;
	};

	export type TransactionUncheckedUpdateManyInput = {
		hash?: StringFieldUpdateOperationsInput | string;
		block_id?: IntFieldUpdateOperationsInput | number;
		time?: IntFieldUpdateOperationsInput | number;
		amount?: BigIntFieldUpdateOperationsInput | bigint | number;
		fee?: BigIntFieldUpdateOperationsInput | bigint | number;
	};

	export type TransactionPartCreateInput = {
		output_idx: number;
		input_hash?: string | null;
		input_idx?: number | null;
		amount: bigint | number;
		address?: InputJsonValue | null;
		transaction: TransactionCreateNestedOneWithoutTransaction_partsInput;
	};

	export type TransactionPartUncheckedCreateInput = {
		output_hash: string;
		output_idx: number;
		input_hash?: string | null;
		input_idx?: number | null;
		amount: bigint | number;
		address?: InputJsonValue | null;
	};

	export type TransactionPartUpdateInput = {
		output_idx?: IntFieldUpdateOperationsInput | number;
		input_hash?: NullableStringFieldUpdateOperationsInput | string | null;
		input_idx?: NullableIntFieldUpdateOperationsInput | number | null;
		amount?: BigIntFieldUpdateOperationsInput | bigint | number;
		address?: InputJsonValue | null;
		transaction?: TransactionUpdateOneRequiredWithoutTransaction_partsInput;
	};

	export type TransactionPartUncheckedUpdateInput = {
		output_hash?: StringFieldUpdateOperationsInput | string;
		output_idx?: IntFieldUpdateOperationsInput | number;
		input_hash?: NullableStringFieldUpdateOperationsInput | string | null;
		input_idx?: NullableIntFieldUpdateOperationsInput | number | null;
		amount?: BigIntFieldUpdateOperationsInput | bigint | number;
		address?: InputJsonValue | null;
	};

	export type TransactionPartCreateManyInput = {
		output_hash: string;
		output_idx: number;
		input_hash?: string | null;
		input_idx?: number | null;
		amount: bigint | number;
		address?: InputJsonValue | null;
	};

	export type TransactionPartUpdateManyMutationInput = {
		output_idx?: IntFieldUpdateOperationsInput | number;
		input_hash?: NullableStringFieldUpdateOperationsInput | string | null;
		input_idx?: NullableIntFieldUpdateOperationsInput | number | null;
		amount?: BigIntFieldUpdateOperationsInput | bigint | number;
		address?: InputJsonValue | null;
	};

	export type TransactionPartUncheckedUpdateManyInput = {
		output_hash?: StringFieldUpdateOperationsInput | string;
		output_idx?: IntFieldUpdateOperationsInput | number;
		input_hash?: NullableStringFieldUpdateOperationsInput | string | null;
		input_idx?: NullableIntFieldUpdateOperationsInput | number | null;
		amount?: BigIntFieldUpdateOperationsInput | bigint | number;
		address?: InputJsonValue | null;
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

	export type TransactionListRelationFilter = {
		every?: TransactionWhereInput;
		some?: TransactionWhereInput;
		none?: TransactionWhereInput;
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

	export type BlockRelationFilter = {
		is?: BlockWhereInput;
		isNot?: BlockWhereInput;
	};

	export type BigIntFilter = {
		equals?: bigint | number;
		in?: Enumerable<bigint> | Enumerable<number>;
		notIn?: Enumerable<bigint> | Enumerable<number>;
		lt?: bigint | number;
		lte?: bigint | number;
		gt?: bigint | number;
		gte?: bigint | number;
		not?: NestedBigIntFilter | bigint | number;
	};

	export type TransactionPartListRelationFilter = {
		every?: TransactionPartWhereInput;
		some?: TransactionPartWhereInput;
		none?: TransactionPartWhereInput;
	};

	export type BigIntWithAggregatesFilter = {
		equals?: bigint | number;
		in?: Enumerable<bigint> | Enumerable<number>;
		notIn?: Enumerable<bigint> | Enumerable<number>;
		lt?: bigint | number;
		lte?: bigint | number;
		gt?: bigint | number;
		gte?: bigint | number;
		not?: NestedBigIntWithAggregatesFilter | bigint | number;
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
		_sum?: NestedBigIntFilter;
		/**
		 * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
		 *
		 **/
		sum?: NestedBigIntFilter;
		_min?: NestedBigIntFilter;
		/**
		 * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
		 *
		 **/
		min?: NestedBigIntFilter;
		_max?: NestedBigIntFilter;
		/**
		 * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
		 *
		 **/
		max?: NestedBigIntFilter;
	};

	export type StringNullableFilter = {
		equals?: string | null;
		in?: Enumerable<string> | null;
		notIn?: Enumerable<string> | null;
		lt?: string;
		lte?: string;
		gt?: string;
		gte?: string;
		contains?: string;
		startsWith?: string;
		endsWith?: string;
		mode?: QueryMode;
		not?: NestedStringNullableFilter | string | null;
	};

	export type IntNullableFilter = {
		equals?: number | null;
		in?: Enumerable<number> | null;
		notIn?: Enumerable<number> | null;
		lt?: number;
		lte?: number;
		gt?: number;
		gte?: number;
		not?: NestedIntNullableFilter | number | null;
	};
	export type JsonNullableFilter =
		| PatchUndefined<
				Either<Required<JsonNullableFilterBase>, Exclude<keyof Required<JsonNullableFilterBase>, "path">>,
				Required<JsonNullableFilterBase>
		  >
		| OptionalFlat<Omit<Required<JsonNullableFilterBase>, "path">>;

	export type JsonNullableFilterBase = {
		equals?: InputJsonValue | null;
		not?: InputJsonValue | null;
	};

	export type TransactionRelationFilter = {
		is?: TransactionWhereInput;
		isNot?: TransactionWhereInput;
	};

	export type TransactionPartTransaction_input_hash_indexCompoundUniqueInput = {
		input_hash: string;
		input_idx: number;
	};

	export type TransactionPartOutput_hashOutput_idxCompoundUniqueInput = {
		output_hash: string;
		output_idx: number;
	};

	export type StringNullableWithAggregatesFilter = {
		equals?: string | null;
		in?: Enumerable<string> | null;
		notIn?: Enumerable<string> | null;
		lt?: string;
		lte?: string;
		gt?: string;
		gte?: string;
		contains?: string;
		startsWith?: string;
		endsWith?: string;
		mode?: QueryMode;
		not?: NestedStringNullableWithAggregatesFilter | string | null;
		_count?: NestedIntNullableFilter;
		/**
		 * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
		 *
		 **/
		count?: NestedIntNullableFilter;
		_min?: NestedStringNullableFilter;
		/**
		 * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
		 *
		 **/
		min?: NestedStringNullableFilter;
		_max?: NestedStringNullableFilter;
		/**
		 * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
		 *
		 **/
		max?: NestedStringNullableFilter;
	};

	export type IntNullableWithAggregatesFilter = {
		equals?: number | null;
		in?: Enumerable<number> | null;
		notIn?: Enumerable<number> | null;
		lt?: number;
		lte?: number;
		gt?: number;
		gte?: number;
		not?: NestedIntNullableWithAggregatesFilter | number | null;
		_count?: NestedIntNullableFilter;
		/**
		 * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
		 *
		 **/
		count?: NestedIntNullableFilter;
		_avg?: NestedFloatNullableFilter;
		/**
		 * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
		 *
		 **/
		avg?: NestedFloatNullableFilter;
		_sum?: NestedIntNullableFilter;
		/**
		 * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
		 *
		 **/
		sum?: NestedIntNullableFilter;
		_min?: NestedIntNullableFilter;
		/**
		 * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
		 *
		 **/
		min?: NestedIntNullableFilter;
		_max?: NestedIntNullableFilter;
		/**
		 * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
		 *
		 **/
		max?: NestedIntNullableFilter;
	};
	export type JsonNullableWithAggregatesFilter =
		| PatchUndefined<
				Either<
					Required<JsonNullableWithAggregatesFilterBase>,
					Exclude<keyof Required<JsonNullableWithAggregatesFilterBase>, "path">
				>,
				Required<JsonNullableWithAggregatesFilterBase>
		  >
		| OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase>, "path">>;

	export type JsonNullableWithAggregatesFilterBase = {
		equals?: InputJsonValue | null;
		not?: InputJsonValue | null;
		_count?: NestedIntNullableFilter;
		/**
		 * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
		 *
		 **/
		count?: NestedIntNullableFilter;
		_min?: NestedJsonNullableFilter;
		/**
		 * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
		 *
		 **/
		min?: NestedJsonNullableFilter;
		_max?: NestedJsonNullableFilter;
		/**
		 * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
		 *
		 **/
		max?: NestedJsonNullableFilter;
	};

	export type TransactionCreateNestedManyWithoutBlockInput = {
		create?: XOR<
			Enumerable<TransactionCreateWithoutBlockInput>,
			Enumerable<TransactionUncheckedCreateWithoutBlockInput>
		>;
		connectOrCreate?: Enumerable<TransactionCreateOrConnectWithoutBlockInput>;
		createMany?: TransactionCreateManyBlockInputEnvelope;
		connect?: Enumerable<TransactionWhereUniqueInput>;
	};

	export type TransactionUncheckedCreateNestedManyWithoutBlockInput = {
		create?: XOR<
			Enumerable<TransactionCreateWithoutBlockInput>,
			Enumerable<TransactionUncheckedCreateWithoutBlockInput>
		>;
		connectOrCreate?: Enumerable<TransactionCreateOrConnectWithoutBlockInput>;
		createMany?: TransactionCreateManyBlockInputEnvelope;
		connect?: Enumerable<TransactionWhereUniqueInput>;
	};

	export type IntFieldUpdateOperationsInput = {
		set?: number;
		increment?: number;
		decrement?: number;
		multiply?: number;
		divide?: number;
	};

	export type StringFieldUpdateOperationsInput = {
		set?: string;
	};

	export type TransactionUpdateManyWithoutBlockInput = {
		create?: XOR<
			Enumerable<TransactionCreateWithoutBlockInput>,
			Enumerable<TransactionUncheckedCreateWithoutBlockInput>
		>;
		connectOrCreate?: Enumerable<TransactionCreateOrConnectWithoutBlockInput>;
		upsert?: Enumerable<TransactionUpsertWithWhereUniqueWithoutBlockInput>;
		createMany?: TransactionCreateManyBlockInputEnvelope;
		connect?: Enumerable<TransactionWhereUniqueInput>;
		set?: Enumerable<TransactionWhereUniqueInput>;
		disconnect?: Enumerable<TransactionWhereUniqueInput>;
		delete?: Enumerable<TransactionWhereUniqueInput>;
		update?: Enumerable<TransactionUpdateWithWhereUniqueWithoutBlockInput>;
		updateMany?: Enumerable<TransactionUpdateManyWithWhereWithoutBlockInput>;
		deleteMany?: Enumerable<TransactionScalarWhereInput>;
	};

	export type TransactionUncheckedUpdateManyWithoutBlockInput = {
		create?: XOR<
			Enumerable<TransactionCreateWithoutBlockInput>,
			Enumerable<TransactionUncheckedCreateWithoutBlockInput>
		>;
		connectOrCreate?: Enumerable<TransactionCreateOrConnectWithoutBlockInput>;
		upsert?: Enumerable<TransactionUpsertWithWhereUniqueWithoutBlockInput>;
		createMany?: TransactionCreateManyBlockInputEnvelope;
		connect?: Enumerable<TransactionWhereUniqueInput>;
		set?: Enumerable<TransactionWhereUniqueInput>;
		disconnect?: Enumerable<TransactionWhereUniqueInput>;
		delete?: Enumerable<TransactionWhereUniqueInput>;
		update?: Enumerable<TransactionUpdateWithWhereUniqueWithoutBlockInput>;
		updateMany?: Enumerable<TransactionUpdateManyWithWhereWithoutBlockInput>;
		deleteMany?: Enumerable<TransactionScalarWhereInput>;
	};

	export type BlockCreateNestedOneWithoutTransactionsInput = {
		create?: XOR<BlockCreateWithoutTransactionsInput, BlockUncheckedCreateWithoutTransactionsInput>;
		connectOrCreate?: BlockCreateOrConnectWithoutTransactionsInput;
		connect?: BlockWhereUniqueInput;
	};

	export type TransactionPartCreateNestedManyWithoutTransactionInput = {
		create?: XOR<
			Enumerable<TransactionPartCreateWithoutTransactionInput>,
			Enumerable<TransactionPartUncheckedCreateWithoutTransactionInput>
		>;
		connectOrCreate?: Enumerable<TransactionPartCreateOrConnectWithoutTransactionInput>;
		createMany?: TransactionPartCreateManyTransactionInputEnvelope;
		connect?: Enumerable<TransactionPartWhereUniqueInput>;
	};

	export type TransactionPartUncheckedCreateNestedManyWithoutTransactionInput = {
		create?: XOR<
			Enumerable<TransactionPartCreateWithoutTransactionInput>,
			Enumerable<TransactionPartUncheckedCreateWithoutTransactionInput>
		>;
		connectOrCreate?: Enumerable<TransactionPartCreateOrConnectWithoutTransactionInput>;
		createMany?: TransactionPartCreateManyTransactionInputEnvelope;
		connect?: Enumerable<TransactionPartWhereUniqueInput>;
	};

	export type BigIntFieldUpdateOperationsInput = {
		set?: bigint | number;
		increment?: bigint | number;
		decrement?: bigint | number;
		multiply?: bigint | number;
		divide?: bigint | number;
	};

	export type BlockUpdateOneRequiredWithoutTransactionsInput = {
		create?: XOR<BlockCreateWithoutTransactionsInput, BlockUncheckedCreateWithoutTransactionsInput>;
		connectOrCreate?: BlockCreateOrConnectWithoutTransactionsInput;
		upsert?: BlockUpsertWithoutTransactionsInput;
		connect?: BlockWhereUniqueInput;
		update?: XOR<BlockUpdateWithoutTransactionsInput, BlockUncheckedUpdateWithoutTransactionsInput>;
	};

	export type TransactionPartUpdateManyWithoutTransactionInput = {
		create?: XOR<
			Enumerable<TransactionPartCreateWithoutTransactionInput>,
			Enumerable<TransactionPartUncheckedCreateWithoutTransactionInput>
		>;
		connectOrCreate?: Enumerable<TransactionPartCreateOrConnectWithoutTransactionInput>;
		upsert?: Enumerable<TransactionPartUpsertWithWhereUniqueWithoutTransactionInput>;
		createMany?: TransactionPartCreateManyTransactionInputEnvelope;
		connect?: Enumerable<TransactionPartWhereUniqueInput>;
		set?: Enumerable<TransactionPartWhereUniqueInput>;
		disconnect?: Enumerable<TransactionPartWhereUniqueInput>;
		delete?: Enumerable<TransactionPartWhereUniqueInput>;
		update?: Enumerable<TransactionPartUpdateWithWhereUniqueWithoutTransactionInput>;
		updateMany?: Enumerable<TransactionPartUpdateManyWithWhereWithoutTransactionInput>;
		deleteMany?: Enumerable<TransactionPartScalarWhereInput>;
	};

	export type TransactionPartUncheckedUpdateManyWithoutTransactionInput = {
		create?: XOR<
			Enumerable<TransactionPartCreateWithoutTransactionInput>,
			Enumerable<TransactionPartUncheckedCreateWithoutTransactionInput>
		>;
		connectOrCreate?: Enumerable<TransactionPartCreateOrConnectWithoutTransactionInput>;
		upsert?: Enumerable<TransactionPartUpsertWithWhereUniqueWithoutTransactionInput>;
		createMany?: TransactionPartCreateManyTransactionInputEnvelope;
		connect?: Enumerable<TransactionPartWhereUniqueInput>;
		set?: Enumerable<TransactionPartWhereUniqueInput>;
		disconnect?: Enumerable<TransactionPartWhereUniqueInput>;
		delete?: Enumerable<TransactionPartWhereUniqueInput>;
		update?: Enumerable<TransactionPartUpdateWithWhereUniqueWithoutTransactionInput>;
		updateMany?: Enumerable<TransactionPartUpdateManyWithWhereWithoutTransactionInput>;
		deleteMany?: Enumerable<TransactionPartScalarWhereInput>;
	};

	export type TransactionCreateNestedOneWithoutTransaction_partsInput = {
		create?: XOR<
			TransactionCreateWithoutTransaction_partsInput,
			TransactionUncheckedCreateWithoutTransaction_partsInput
		>;
		connectOrCreate?: TransactionCreateOrConnectWithoutTransaction_partsInput;
		connect?: TransactionWhereUniqueInput;
	};

	export type NullableStringFieldUpdateOperationsInput = {
		set?: string | null;
	};

	export type NullableIntFieldUpdateOperationsInput = {
		set?: number | null;
		increment?: number;
		decrement?: number;
		multiply?: number;
		divide?: number;
	};

	export type TransactionUpdateOneRequiredWithoutTransaction_partsInput = {
		create?: XOR<
			TransactionCreateWithoutTransaction_partsInput,
			TransactionUncheckedCreateWithoutTransaction_partsInput
		>;
		connectOrCreate?: TransactionCreateOrConnectWithoutTransaction_partsInput;
		upsert?: TransactionUpsertWithoutTransaction_partsInput;
		connect?: TransactionWhereUniqueInput;
		update?: XOR<
			TransactionUpdateWithoutTransaction_partsInput,
			TransactionUncheckedUpdateWithoutTransaction_partsInput
		>;
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

	export type NestedBigIntFilter = {
		equals?: bigint | number;
		in?: Enumerable<bigint> | Enumerable<number>;
		notIn?: Enumerable<bigint> | Enumerable<number>;
		lt?: bigint | number;
		lte?: bigint | number;
		gt?: bigint | number;
		gte?: bigint | number;
		not?: NestedBigIntFilter | bigint | number;
	};

	export type NestedBigIntWithAggregatesFilter = {
		equals?: bigint | number;
		in?: Enumerable<bigint> | Enumerable<number>;
		notIn?: Enumerable<bigint> | Enumerable<number>;
		lt?: bigint | number;
		lte?: bigint | number;
		gt?: bigint | number;
		gte?: bigint | number;
		not?: NestedBigIntWithAggregatesFilter | bigint | number;
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
		_sum?: NestedBigIntFilter;
		/**
		 * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
		 *
		 **/
		sum?: NestedBigIntFilter;
		_min?: NestedBigIntFilter;
		/**
		 * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
		 *
		 **/
		min?: NestedBigIntFilter;
		_max?: NestedBigIntFilter;
		/**
		 * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
		 *
		 **/
		max?: NestedBigIntFilter;
	};

	export type NestedStringNullableFilter = {
		equals?: string | null;
		in?: Enumerable<string> | null;
		notIn?: Enumerable<string> | null;
		lt?: string;
		lte?: string;
		gt?: string;
		gte?: string;
		contains?: string;
		startsWith?: string;
		endsWith?: string;
		not?: NestedStringNullableFilter | string | null;
	};

	export type NestedIntNullableFilter = {
		equals?: number | null;
		in?: Enumerable<number> | null;
		notIn?: Enumerable<number> | null;
		lt?: number;
		lte?: number;
		gt?: number;
		gte?: number;
		not?: NestedIntNullableFilter | number | null;
	};

	export type NestedStringNullableWithAggregatesFilter = {
		equals?: string | null;
		in?: Enumerable<string> | null;
		notIn?: Enumerable<string> | null;
		lt?: string;
		lte?: string;
		gt?: string;
		gte?: string;
		contains?: string;
		startsWith?: string;
		endsWith?: string;
		not?: NestedStringNullableWithAggregatesFilter | string | null;
		_count?: NestedIntNullableFilter;
		/**
		 * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
		 *
		 **/
		count?: NestedIntNullableFilter;
		_min?: NestedStringNullableFilter;
		/**
		 * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
		 *
		 **/
		min?: NestedStringNullableFilter;
		_max?: NestedStringNullableFilter;
		/**
		 * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
		 *
		 **/
		max?: NestedStringNullableFilter;
	};

	export type NestedIntNullableWithAggregatesFilter = {
		equals?: number | null;
		in?: Enumerable<number> | null;
		notIn?: Enumerable<number> | null;
		lt?: number;
		lte?: number;
		gt?: number;
		gte?: number;
		not?: NestedIntNullableWithAggregatesFilter | number | null;
		_count?: NestedIntNullableFilter;
		/**
		 * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
		 *
		 **/
		count?: NestedIntNullableFilter;
		_avg?: NestedFloatNullableFilter;
		/**
		 * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
		 *
		 **/
		avg?: NestedFloatNullableFilter;
		_sum?: NestedIntNullableFilter;
		/**
		 * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
		 *
		 **/
		sum?: NestedIntNullableFilter;
		_min?: NestedIntNullableFilter;
		/**
		 * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
		 *
		 **/
		min?: NestedIntNullableFilter;
		_max?: NestedIntNullableFilter;
		/**
		 * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
		 *
		 **/
		max?: NestedIntNullableFilter;
	};

	export type NestedFloatNullableFilter = {
		equals?: number | null;
		in?: Enumerable<number> | null;
		notIn?: Enumerable<number> | null;
		lt?: number;
		lte?: number;
		gt?: number;
		gte?: number;
		not?: NestedFloatNullableFilter | number | null;
	};
	export type NestedJsonNullableFilter =
		| PatchUndefined<
				Either<
					Required<NestedJsonNullableFilterBase>,
					Exclude<keyof Required<NestedJsonNullableFilterBase>, "path">
				>,
				Required<NestedJsonNullableFilterBase>
		  >
		| OptionalFlat<Omit<Required<NestedJsonNullableFilterBase>, "path">>;

	export type NestedJsonNullableFilterBase = {
		equals?: InputJsonValue | null;
		not?: InputJsonValue | null;
	};

	export type TransactionCreateWithoutBlockInput = {
		hash: string;
		time: number;
		amount: bigint | number;
		fee: bigint | number;
		transaction_parts?: TransactionPartCreateNestedManyWithoutTransactionInput;
	};

	export type TransactionUncheckedCreateWithoutBlockInput = {
		hash: string;
		time: number;
		amount: bigint | number;
		fee: bigint | number;
		transaction_parts?: TransactionPartUncheckedCreateNestedManyWithoutTransactionInput;
	};

	export type TransactionCreateOrConnectWithoutBlockInput = {
		where: TransactionWhereUniqueInput;
		create: XOR<TransactionCreateWithoutBlockInput, TransactionUncheckedCreateWithoutBlockInput>;
	};

	export type TransactionCreateManyBlockInputEnvelope = {
		data: Enumerable<TransactionCreateManyBlockInput>;
		skipDuplicates?: boolean;
	};

	export type TransactionUpsertWithWhereUniqueWithoutBlockInput = {
		where: TransactionWhereUniqueInput;
		update: XOR<TransactionUpdateWithoutBlockInput, TransactionUncheckedUpdateWithoutBlockInput>;
		create: XOR<TransactionCreateWithoutBlockInput, TransactionUncheckedCreateWithoutBlockInput>;
	};

	export type TransactionUpdateWithWhereUniqueWithoutBlockInput = {
		where: TransactionWhereUniqueInput;
		data: XOR<TransactionUpdateWithoutBlockInput, TransactionUncheckedUpdateWithoutBlockInput>;
	};

	export type TransactionUpdateManyWithWhereWithoutBlockInput = {
		where: TransactionScalarWhereInput;
		data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyWithoutTransactionsInput>;
	};

	export type TransactionScalarWhereInput = {
		AND?: Enumerable<TransactionScalarWhereInput>;
		OR?: Enumerable<TransactionScalarWhereInput>;
		NOT?: Enumerable<TransactionScalarWhereInput>;
		hash?: StringFilter | string;
		block_id?: IntFilter | number;
		time?: IntFilter | number;
		amount?: BigIntFilter | bigint | number;
		fee?: BigIntFilter | bigint | number;
	};

	export type BlockCreateWithoutTransactionsInput = {
		height: number;
		hash: string;
	};

	export type BlockUncheckedCreateWithoutTransactionsInput = {
		height: number;
		hash: string;
	};

	export type BlockCreateOrConnectWithoutTransactionsInput = {
		where: BlockWhereUniqueInput;
		create: XOR<BlockCreateWithoutTransactionsInput, BlockUncheckedCreateWithoutTransactionsInput>;
	};

	export type TransactionPartCreateWithoutTransactionInput = {
		output_idx: number;
		input_hash?: string | null;
		input_idx?: number | null;
		amount: bigint | number;
		address?: InputJsonValue | null;
	};

	export type TransactionPartUncheckedCreateWithoutTransactionInput = {
		output_idx: number;
		input_hash?: string | null;
		input_idx?: number | null;
		amount: bigint | number;
		address?: InputJsonValue | null;
	};

	export type TransactionPartCreateOrConnectWithoutTransactionInput = {
		where: TransactionPartWhereUniqueInput;
		create: XOR<
			TransactionPartCreateWithoutTransactionInput,
			TransactionPartUncheckedCreateWithoutTransactionInput
		>;
	};

	export type TransactionPartCreateManyTransactionInputEnvelope = {
		data: Enumerable<TransactionPartCreateManyTransactionInput>;
		skipDuplicates?: boolean;
	};

	export type BlockUpsertWithoutTransactionsInput = {
		update: XOR<BlockUpdateWithoutTransactionsInput, BlockUncheckedUpdateWithoutTransactionsInput>;
		create: XOR<BlockCreateWithoutTransactionsInput, BlockUncheckedCreateWithoutTransactionsInput>;
	};

	export type BlockUpdateWithoutTransactionsInput = {
		height?: IntFieldUpdateOperationsInput | number;
		hash?: StringFieldUpdateOperationsInput | string;
	};

	export type BlockUncheckedUpdateWithoutTransactionsInput = {
		height?: IntFieldUpdateOperationsInput | number;
		hash?: StringFieldUpdateOperationsInput | string;
	};

	export type TransactionPartUpsertWithWhereUniqueWithoutTransactionInput = {
		where: TransactionPartWhereUniqueInput;
		update: XOR<
			TransactionPartUpdateWithoutTransactionInput,
			TransactionPartUncheckedUpdateWithoutTransactionInput
		>;
		create: XOR<
			TransactionPartCreateWithoutTransactionInput,
			TransactionPartUncheckedCreateWithoutTransactionInput
		>;
	};

	export type TransactionPartUpdateWithWhereUniqueWithoutTransactionInput = {
		where: TransactionPartWhereUniqueInput;
		data: XOR<TransactionPartUpdateWithoutTransactionInput, TransactionPartUncheckedUpdateWithoutTransactionInput>;
	};

	export type TransactionPartUpdateManyWithWhereWithoutTransactionInput = {
		where: TransactionPartScalarWhereInput;
		data: XOR<
			TransactionPartUpdateManyMutationInput,
			TransactionPartUncheckedUpdateManyWithoutTransaction_partsInput
		>;
	};

	export type TransactionPartScalarWhereInput = {
		AND?: Enumerable<TransactionPartScalarWhereInput>;
		OR?: Enumerable<TransactionPartScalarWhereInput>;
		NOT?: Enumerable<TransactionPartScalarWhereInput>;
		output_hash?: StringFilter | string;
		output_idx?: IntFilter | number;
		input_hash?: StringNullableFilter | string | null;
		input_idx?: IntNullableFilter | number | null;
		amount?: BigIntFilter | bigint | number;
		address?: JsonNullableFilter;
	};

	export type TransactionCreateWithoutTransaction_partsInput = {
		hash: string;
		time: number;
		amount: bigint | number;
		fee: bigint | number;
		block: BlockCreateNestedOneWithoutTransactionsInput;
	};

	export type TransactionUncheckedCreateWithoutTransaction_partsInput = {
		hash: string;
		block_id: number;
		time: number;
		amount: bigint | number;
		fee: bigint | number;
	};

	export type TransactionCreateOrConnectWithoutTransaction_partsInput = {
		where: TransactionWhereUniqueInput;
		create: XOR<
			TransactionCreateWithoutTransaction_partsInput,
			TransactionUncheckedCreateWithoutTransaction_partsInput
		>;
	};

	export type TransactionUpsertWithoutTransaction_partsInput = {
		update: XOR<
			TransactionUpdateWithoutTransaction_partsInput,
			TransactionUncheckedUpdateWithoutTransaction_partsInput
		>;
		create: XOR<
			TransactionCreateWithoutTransaction_partsInput,
			TransactionUncheckedCreateWithoutTransaction_partsInput
		>;
	};

	export type TransactionUpdateWithoutTransaction_partsInput = {
		hash?: StringFieldUpdateOperationsInput | string;
		time?: IntFieldUpdateOperationsInput | number;
		amount?: BigIntFieldUpdateOperationsInput | bigint | number;
		fee?: BigIntFieldUpdateOperationsInput | bigint | number;
		block?: BlockUpdateOneRequiredWithoutTransactionsInput;
	};

	export type TransactionUncheckedUpdateWithoutTransaction_partsInput = {
		hash?: StringFieldUpdateOperationsInput | string;
		block_id?: IntFieldUpdateOperationsInput | number;
		time?: IntFieldUpdateOperationsInput | number;
		amount?: BigIntFieldUpdateOperationsInput | bigint | number;
		fee?: BigIntFieldUpdateOperationsInput | bigint | number;
	};

	export type TransactionCreateManyBlockInput = {
		hash: string;
		time: number;
		amount: bigint | number;
		fee: bigint | number;
	};

	export type TransactionUpdateWithoutBlockInput = {
		hash?: StringFieldUpdateOperationsInput | string;
		time?: IntFieldUpdateOperationsInput | number;
		amount?: BigIntFieldUpdateOperationsInput | bigint | number;
		fee?: BigIntFieldUpdateOperationsInput | bigint | number;
		transaction_parts?: TransactionPartUpdateManyWithoutTransactionInput;
	};

	export type TransactionUncheckedUpdateWithoutBlockInput = {
		hash?: StringFieldUpdateOperationsInput | string;
		time?: IntFieldUpdateOperationsInput | number;
		amount?: BigIntFieldUpdateOperationsInput | bigint | number;
		fee?: BigIntFieldUpdateOperationsInput | bigint | number;
		transaction_parts?: TransactionPartUncheckedUpdateManyWithoutTransactionInput;
	};

	export type TransactionUncheckedUpdateManyWithoutTransactionsInput = {
		hash?: StringFieldUpdateOperationsInput | string;
		time?: IntFieldUpdateOperationsInput | number;
		amount?: BigIntFieldUpdateOperationsInput | bigint | number;
		fee?: BigIntFieldUpdateOperationsInput | bigint | number;
	};

	export type TransactionPartCreateManyTransactionInput = {
		output_idx: number;
		input_hash?: string | null;
		input_idx?: number | null;
		amount: bigint | number;
		address?: InputJsonValue | null;
	};

	export type TransactionPartUpdateWithoutTransactionInput = {
		output_idx?: IntFieldUpdateOperationsInput | number;
		input_hash?: NullableStringFieldUpdateOperationsInput | string | null;
		input_idx?: NullableIntFieldUpdateOperationsInput | number | null;
		amount?: BigIntFieldUpdateOperationsInput | bigint | number;
		address?: InputJsonValue | null;
	};

	export type TransactionPartUncheckedUpdateWithoutTransactionInput = {
		output_idx?: IntFieldUpdateOperationsInput | number;
		input_hash?: NullableStringFieldUpdateOperationsInput | string | null;
		input_idx?: NullableIntFieldUpdateOperationsInput | number | null;
		amount?: BigIntFieldUpdateOperationsInput | bigint | number;
		address?: InputJsonValue | null;
	};

	export type TransactionPartUncheckedUpdateManyWithoutTransaction_partsInput = {
		output_idx?: IntFieldUpdateOperationsInput | number;
		input_hash?: NullableStringFieldUpdateOperationsInput | string | null;
		input_idx?: NullableIntFieldUpdateOperationsInput | number | null;
		amount?: BigIntFieldUpdateOperationsInput | bigint | number;
		address?: InputJsonValue | null;
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
