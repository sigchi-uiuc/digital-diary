
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Entry
 * 
 */
export type Entry = $Result.DefaultSelection<Prisma.$EntryPayload>
/**
 * Model EntryLocation
 * 
 */
export type EntryLocation = $Result.DefaultSelection<Prisma.$EntryLocationPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const EntryType: {
  FREEWRITE: 'FREEWRITE',
  GUIDED: 'GUIDED'
};

export type EntryType = (typeof EntryType)[keyof typeof EntryType]


export const Visibility: {
  PRIVATE: 'PRIVATE',
  PUBLIC: 'PUBLIC',
  PROTECTED: 'PROTECTED'
};

export type Visibility = (typeof Visibility)[keyof typeof Visibility]

}

export type EntryType = $Enums.EntryType

export const EntryType: typeof $Enums.EntryType

export type Visibility = $Enums.Visibility

export const Visibility: typeof $Enums.Visibility

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.entry`: Exposes CRUD operations for the **Entry** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Entries
    * const entries = await prisma.entry.findMany()
    * ```
    */
  get entry(): Prisma.EntryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.entryLocation`: Exposes CRUD operations for the **EntryLocation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EntryLocations
    * const entryLocations = await prisma.entryLocation.findMany()
    * ```
    */
  get entryLocation(): Prisma.EntryLocationDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.17.1
   * Query Engine version: 272a37d34178c2894197e17273bf937f25acdeac
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

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
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Entry: 'Entry',
    EntryLocation: 'EntryLocation'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "entry" | "entryLocation"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Entry: {
        payload: Prisma.$EntryPayload<ExtArgs>
        fields: Prisma.EntryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EntryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EntryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntryPayload>
          }
          findFirst: {
            args: Prisma.EntryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EntryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntryPayload>
          }
          findMany: {
            args: Prisma.EntryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntryPayload>[]
          }
          create: {
            args: Prisma.EntryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntryPayload>
          }
          createMany: {
            args: Prisma.EntryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EntryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntryPayload>[]
          }
          delete: {
            args: Prisma.EntryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntryPayload>
          }
          update: {
            args: Prisma.EntryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntryPayload>
          }
          deleteMany: {
            args: Prisma.EntryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EntryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EntryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntryPayload>[]
          }
          upsert: {
            args: Prisma.EntryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntryPayload>
          }
          aggregate: {
            args: Prisma.EntryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEntry>
          }
          groupBy: {
            args: Prisma.EntryGroupByArgs<ExtArgs>
            result: $Utils.Optional<EntryGroupByOutputType>[]
          }
          count: {
            args: Prisma.EntryCountArgs<ExtArgs>
            result: $Utils.Optional<EntryCountAggregateOutputType> | number
          }
        }
      }
      EntryLocation: {
        payload: Prisma.$EntryLocationPayload<ExtArgs>
        fields: Prisma.EntryLocationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EntryLocationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntryLocationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EntryLocationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntryLocationPayload>
          }
          findFirst: {
            args: Prisma.EntryLocationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntryLocationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EntryLocationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntryLocationPayload>
          }
          findMany: {
            args: Prisma.EntryLocationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntryLocationPayload>[]
          }
          create: {
            args: Prisma.EntryLocationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntryLocationPayload>
          }
          createMany: {
            args: Prisma.EntryLocationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EntryLocationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntryLocationPayload>[]
          }
          delete: {
            args: Prisma.EntryLocationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntryLocationPayload>
          }
          update: {
            args: Prisma.EntryLocationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntryLocationPayload>
          }
          deleteMany: {
            args: Prisma.EntryLocationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EntryLocationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EntryLocationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntryLocationPayload>[]
          }
          upsert: {
            args: Prisma.EntryLocationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntryLocationPayload>
          }
          aggregate: {
            args: Prisma.EntryLocationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEntryLocation>
          }
          groupBy: {
            args: Prisma.EntryLocationGroupByArgs<ExtArgs>
            result: $Utils.Optional<EntryLocationGroupByOutputType>[]
          }
          count: {
            args: Prisma.EntryLocationCountArgs<ExtArgs>
            result: $Utils.Optional<EntryLocationCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    entry?: EntryOmit
    entryLocation?: EntryLocationOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    friends: number
    friendsOf: number
    entries: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    friends?: boolean | UserCountOutputTypeCountFriendsArgs
    friendsOf?: boolean | UserCountOutputTypeCountFriendsOfArgs
    entries?: boolean | UserCountOutputTypeCountEntriesArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFriendsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFriendsOfArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountEntriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EntryWhereInput
  }


  /**
   * Count Type EntryCountOutputType
   */

  export type EntryCountOutputType = {
    entryLocations: number
  }

  export type EntryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    entryLocations?: boolean | EntryCountOutputTypeCountEntryLocationsArgs
  }

  // Custom InputTypes
  /**
   * EntryCountOutputType without action
   */
  export type EntryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntryCountOutputType
     */
    select?: EntryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EntryCountOutputType without action
   */
  export type EntryCountOutputTypeCountEntryLocationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EntryLocationWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    journalEntriesCount: number | null
    privateEntriesCount: number | null
    publicEntriesCount: number | null
    protectedEntriesCount: number | null
  }

  export type UserSumAggregateOutputType = {
    journalEntriesCount: number | null
    privateEntriesCount: number | null
    publicEntriesCount: number | null
    protectedEntriesCount: number | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    username: string | null
    password: string | null
    email: string | null
    profilePicture: string | null
    createdAt: Date | null
    updatedAt: Date | null
    journalEntriesCount: number | null
    privateEntriesCount: number | null
    publicEntriesCount: number | null
    protectedEntriesCount: number | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    username: string | null
    password: string | null
    email: string | null
    profilePicture: string | null
    createdAt: Date | null
    updatedAt: Date | null
    journalEntriesCount: number | null
    privateEntriesCount: number | null
    publicEntriesCount: number | null
    protectedEntriesCount: number | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    username: number
    password: number
    email: number
    profilePicture: number
    createdAt: number
    updatedAt: number
    journalEntriesCount: number
    privateEntriesCount: number
    publicEntriesCount: number
    protectedEntriesCount: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    journalEntriesCount?: true
    privateEntriesCount?: true
    publicEntriesCount?: true
    protectedEntriesCount?: true
  }

  export type UserSumAggregateInputType = {
    journalEntriesCount?: true
    privateEntriesCount?: true
    publicEntriesCount?: true
    protectedEntriesCount?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    username?: true
    password?: true
    email?: true
    profilePicture?: true
    createdAt?: true
    updatedAt?: true
    journalEntriesCount?: true
    privateEntriesCount?: true
    publicEntriesCount?: true
    protectedEntriesCount?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    username?: true
    password?: true
    email?: true
    profilePicture?: true
    createdAt?: true
    updatedAt?: true
    journalEntriesCount?: true
    privateEntriesCount?: true
    publicEntriesCount?: true
    protectedEntriesCount?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    username?: true
    password?: true
    email?: true
    profilePicture?: true
    createdAt?: true
    updatedAt?: true
    journalEntriesCount?: true
    privateEntriesCount?: true
    publicEntriesCount?: true
    protectedEntriesCount?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    username: string
    password: string
    email: string
    profilePicture: string | null
    createdAt: Date
    updatedAt: Date
    journalEntriesCount: number
    privateEntriesCount: number
    publicEntriesCount: number
    protectedEntriesCount: number
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    password?: boolean
    email?: boolean
    profilePicture?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    journalEntriesCount?: boolean
    privateEntriesCount?: boolean
    publicEntriesCount?: boolean
    protectedEntriesCount?: boolean
    friends?: boolean | User$friendsArgs<ExtArgs>
    friendsOf?: boolean | User$friendsOfArgs<ExtArgs>
    entries?: boolean | User$entriesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    password?: boolean
    email?: boolean
    profilePicture?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    journalEntriesCount?: boolean
    privateEntriesCount?: boolean
    publicEntriesCount?: boolean
    protectedEntriesCount?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    password?: boolean
    email?: boolean
    profilePicture?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    journalEntriesCount?: boolean
    privateEntriesCount?: boolean
    publicEntriesCount?: boolean
    protectedEntriesCount?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    username?: boolean
    password?: boolean
    email?: boolean
    profilePicture?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    journalEntriesCount?: boolean
    privateEntriesCount?: boolean
    publicEntriesCount?: boolean
    protectedEntriesCount?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "username" | "password" | "email" | "profilePicture" | "createdAt" | "updatedAt" | "journalEntriesCount" | "privateEntriesCount" | "publicEntriesCount" | "protectedEntriesCount", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    friends?: boolean | User$friendsArgs<ExtArgs>
    friendsOf?: boolean | User$friendsOfArgs<ExtArgs>
    entries?: boolean | User$entriesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      friends: Prisma.$UserPayload<ExtArgs>[]
      friendsOf: Prisma.$UserPayload<ExtArgs>[]
      entries: Prisma.$EntryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      username: string
      password: string
      email: string
      profilePicture: string | null
      createdAt: Date
      updatedAt: Date
      journalEntriesCount: number
      privateEntriesCount: number
      publicEntriesCount: number
      protectedEntriesCount: number
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
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
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    friends<T extends User$friendsArgs<ExtArgs> = {}>(args?: Subset<T, User$friendsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    friendsOf<T extends User$friendsOfArgs<ExtArgs> = {}>(args?: Subset<T, User$friendsOfArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    entries<T extends User$entriesArgs<ExtArgs> = {}>(args?: Subset<T, User$entriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EntryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly username: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly profilePicture: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly journalEntriesCount: FieldRef<"User", 'Int'>
    readonly privateEntriesCount: FieldRef<"User", 'Int'>
    readonly publicEntriesCount: FieldRef<"User", 'Int'>
    readonly protectedEntriesCount: FieldRef<"User", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.friends
   */
  export type User$friendsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User.friendsOf
   */
  export type User$friendsOfArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User.entries
   */
  export type User$entriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Entry
     */
    select?: EntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Entry
     */
    omit?: EntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntryInclude<ExtArgs> | null
    where?: EntryWhereInput
    orderBy?: EntryOrderByWithRelationInput | EntryOrderByWithRelationInput[]
    cursor?: EntryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EntryScalarFieldEnum | EntryScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Entry
   */

  export type AggregateEntry = {
    _count: EntryCountAggregateOutputType | null
    _avg: EntryAvgAggregateOutputType | null
    _sum: EntrySumAggregateOutputType | null
    _min: EntryMinAggregateOutputType | null
    _max: EntryMaxAggregateOutputType | null
  }

  export type EntryAvgAggregateOutputType = {
    qualityScore: number | null
    stepsCount: number | null
  }

  export type EntrySumAggregateOutputType = {
    qualityScore: number | null
    stepsCount: number | null
  }

  export type EntryMinAggregateOutputType = {
    id: string | null
    userId: string | null
    type: $Enums.EntryType | null
    visibility: $Enums.Visibility | null
    content: string | null
    qualityScore: number | null
    qualityEmoji: string | null
    stepsCount: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EntryMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    type: $Enums.EntryType | null
    visibility: $Enums.Visibility | null
    content: string | null
    qualityScore: number | null
    qualityEmoji: string | null
    stepsCount: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EntryCountAggregateOutputType = {
    id: number
    userId: number
    type: number
    visibility: number
    content: number
    qualityScore: number
    qualityEmoji: number
    mediaUrls: number
    locations: number
    stepsCount: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type EntryAvgAggregateInputType = {
    qualityScore?: true
    stepsCount?: true
  }

  export type EntrySumAggregateInputType = {
    qualityScore?: true
    stepsCount?: true
  }

  export type EntryMinAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    visibility?: true
    content?: true
    qualityScore?: true
    qualityEmoji?: true
    stepsCount?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EntryMaxAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    visibility?: true
    content?: true
    qualityScore?: true
    qualityEmoji?: true
    stepsCount?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EntryCountAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    visibility?: true
    content?: true
    qualityScore?: true
    qualityEmoji?: true
    mediaUrls?: true
    locations?: true
    stepsCount?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type EntryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Entry to aggregate.
     */
    where?: EntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Entries to fetch.
     */
    orderBy?: EntryOrderByWithRelationInput | EntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Entries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Entries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Entries
    **/
    _count?: true | EntryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EntryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EntrySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EntryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EntryMaxAggregateInputType
  }

  export type GetEntryAggregateType<T extends EntryAggregateArgs> = {
        [P in keyof T & keyof AggregateEntry]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEntry[P]>
      : GetScalarType<T[P], AggregateEntry[P]>
  }




  export type EntryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EntryWhereInput
    orderBy?: EntryOrderByWithAggregationInput | EntryOrderByWithAggregationInput[]
    by: EntryScalarFieldEnum[] | EntryScalarFieldEnum
    having?: EntryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EntryCountAggregateInputType | true
    _avg?: EntryAvgAggregateInputType
    _sum?: EntrySumAggregateInputType
    _min?: EntryMinAggregateInputType
    _max?: EntryMaxAggregateInputType
  }

  export type EntryGroupByOutputType = {
    id: string
    userId: string
    type: $Enums.EntryType
    visibility: $Enums.Visibility
    content: string | null
    qualityScore: number | null
    qualityEmoji: string | null
    mediaUrls: string[]
    locations: JsonValue | null
    stepsCount: number | null
    createdAt: Date
    updatedAt: Date
    _count: EntryCountAggregateOutputType | null
    _avg: EntryAvgAggregateOutputType | null
    _sum: EntrySumAggregateOutputType | null
    _min: EntryMinAggregateOutputType | null
    _max: EntryMaxAggregateOutputType | null
  }

  type GetEntryGroupByPayload<T extends EntryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EntryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EntryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EntryGroupByOutputType[P]>
            : GetScalarType<T[P], EntryGroupByOutputType[P]>
        }
      >
    >


  export type EntrySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    visibility?: boolean
    content?: boolean
    qualityScore?: boolean
    qualityEmoji?: boolean
    mediaUrls?: boolean
    locations?: boolean
    stepsCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    entryLocations?: boolean | Entry$entryLocationsArgs<ExtArgs>
    _count?: boolean | EntryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["entry"]>

  export type EntrySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    visibility?: boolean
    content?: boolean
    qualityScore?: boolean
    qualityEmoji?: boolean
    mediaUrls?: boolean
    locations?: boolean
    stepsCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["entry"]>

  export type EntrySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    visibility?: boolean
    content?: boolean
    qualityScore?: boolean
    qualityEmoji?: boolean
    mediaUrls?: boolean
    locations?: boolean
    stepsCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["entry"]>

  export type EntrySelectScalar = {
    id?: boolean
    userId?: boolean
    type?: boolean
    visibility?: boolean
    content?: boolean
    qualityScore?: boolean
    qualityEmoji?: boolean
    mediaUrls?: boolean
    locations?: boolean
    stepsCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type EntryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "type" | "visibility" | "content" | "qualityScore" | "qualityEmoji" | "mediaUrls" | "locations" | "stepsCount" | "createdAt" | "updatedAt", ExtArgs["result"]["entry"]>
  export type EntryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    entryLocations?: boolean | Entry$entryLocationsArgs<ExtArgs>
    _count?: boolean | EntryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type EntryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type EntryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $EntryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Entry"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      entryLocations: Prisma.$EntryLocationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      type: $Enums.EntryType
      visibility: $Enums.Visibility
      content: string | null
      qualityScore: number | null
      qualityEmoji: string | null
      mediaUrls: string[]
      locations: Prisma.JsonValue | null
      stepsCount: number | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["entry"]>
    composites: {}
  }

  type EntryGetPayload<S extends boolean | null | undefined | EntryDefaultArgs> = $Result.GetResult<Prisma.$EntryPayload, S>

  type EntryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EntryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EntryCountAggregateInputType | true
    }

  export interface EntryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Entry'], meta: { name: 'Entry' } }
    /**
     * Find zero or one Entry that matches the filter.
     * @param {EntryFindUniqueArgs} args - Arguments to find a Entry
     * @example
     * // Get one Entry
     * const entry = await prisma.entry.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EntryFindUniqueArgs>(args: SelectSubset<T, EntryFindUniqueArgs<ExtArgs>>): Prisma__EntryClient<$Result.GetResult<Prisma.$EntryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Entry that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EntryFindUniqueOrThrowArgs} args - Arguments to find a Entry
     * @example
     * // Get one Entry
     * const entry = await prisma.entry.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EntryFindUniqueOrThrowArgs>(args: SelectSubset<T, EntryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EntryClient<$Result.GetResult<Prisma.$EntryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Entry that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntryFindFirstArgs} args - Arguments to find a Entry
     * @example
     * // Get one Entry
     * const entry = await prisma.entry.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EntryFindFirstArgs>(args?: SelectSubset<T, EntryFindFirstArgs<ExtArgs>>): Prisma__EntryClient<$Result.GetResult<Prisma.$EntryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Entry that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntryFindFirstOrThrowArgs} args - Arguments to find a Entry
     * @example
     * // Get one Entry
     * const entry = await prisma.entry.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EntryFindFirstOrThrowArgs>(args?: SelectSubset<T, EntryFindFirstOrThrowArgs<ExtArgs>>): Prisma__EntryClient<$Result.GetResult<Prisma.$EntryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Entries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Entries
     * const entries = await prisma.entry.findMany()
     * 
     * // Get first 10 Entries
     * const entries = await prisma.entry.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const entryWithIdOnly = await prisma.entry.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EntryFindManyArgs>(args?: SelectSubset<T, EntryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EntryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Entry.
     * @param {EntryCreateArgs} args - Arguments to create a Entry.
     * @example
     * // Create one Entry
     * const Entry = await prisma.entry.create({
     *   data: {
     *     // ... data to create a Entry
     *   }
     * })
     * 
     */
    create<T extends EntryCreateArgs>(args: SelectSubset<T, EntryCreateArgs<ExtArgs>>): Prisma__EntryClient<$Result.GetResult<Prisma.$EntryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Entries.
     * @param {EntryCreateManyArgs} args - Arguments to create many Entries.
     * @example
     * // Create many Entries
     * const entry = await prisma.entry.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EntryCreateManyArgs>(args?: SelectSubset<T, EntryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Entries and returns the data saved in the database.
     * @param {EntryCreateManyAndReturnArgs} args - Arguments to create many Entries.
     * @example
     * // Create many Entries
     * const entry = await prisma.entry.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Entries and only return the `id`
     * const entryWithIdOnly = await prisma.entry.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EntryCreateManyAndReturnArgs>(args?: SelectSubset<T, EntryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EntryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Entry.
     * @param {EntryDeleteArgs} args - Arguments to delete one Entry.
     * @example
     * // Delete one Entry
     * const Entry = await prisma.entry.delete({
     *   where: {
     *     // ... filter to delete one Entry
     *   }
     * })
     * 
     */
    delete<T extends EntryDeleteArgs>(args: SelectSubset<T, EntryDeleteArgs<ExtArgs>>): Prisma__EntryClient<$Result.GetResult<Prisma.$EntryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Entry.
     * @param {EntryUpdateArgs} args - Arguments to update one Entry.
     * @example
     * // Update one Entry
     * const entry = await prisma.entry.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EntryUpdateArgs>(args: SelectSubset<T, EntryUpdateArgs<ExtArgs>>): Prisma__EntryClient<$Result.GetResult<Prisma.$EntryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Entries.
     * @param {EntryDeleteManyArgs} args - Arguments to filter Entries to delete.
     * @example
     * // Delete a few Entries
     * const { count } = await prisma.entry.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EntryDeleteManyArgs>(args?: SelectSubset<T, EntryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Entries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Entries
     * const entry = await prisma.entry.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EntryUpdateManyArgs>(args: SelectSubset<T, EntryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Entries and returns the data updated in the database.
     * @param {EntryUpdateManyAndReturnArgs} args - Arguments to update many Entries.
     * @example
     * // Update many Entries
     * const entry = await prisma.entry.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Entries and only return the `id`
     * const entryWithIdOnly = await prisma.entry.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EntryUpdateManyAndReturnArgs>(args: SelectSubset<T, EntryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EntryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Entry.
     * @param {EntryUpsertArgs} args - Arguments to update or create a Entry.
     * @example
     * // Update or create a Entry
     * const entry = await prisma.entry.upsert({
     *   create: {
     *     // ... data to create a Entry
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Entry we want to update
     *   }
     * })
     */
    upsert<T extends EntryUpsertArgs>(args: SelectSubset<T, EntryUpsertArgs<ExtArgs>>): Prisma__EntryClient<$Result.GetResult<Prisma.$EntryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Entries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntryCountArgs} args - Arguments to filter Entries to count.
     * @example
     * // Count the number of Entries
     * const count = await prisma.entry.count({
     *   where: {
     *     // ... the filter for the Entries we want to count
     *   }
     * })
    **/
    count<T extends EntryCountArgs>(
      args?: Subset<T, EntryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EntryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Entry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends EntryAggregateArgs>(args: Subset<T, EntryAggregateArgs>): Prisma.PrismaPromise<GetEntryAggregateType<T>>

    /**
     * Group by Entry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntryGroupByArgs} args - Group by arguments.
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
      T extends EntryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EntryGroupByArgs['orderBy'] }
        : { orderBy?: EntryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EntryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEntryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Entry model
   */
  readonly fields: EntryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Entry.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EntryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    entryLocations<T extends Entry$entryLocationsArgs<ExtArgs> = {}>(args?: Subset<T, Entry$entryLocationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EntryLocationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Entry model
   */
  interface EntryFieldRefs {
    readonly id: FieldRef<"Entry", 'String'>
    readonly userId: FieldRef<"Entry", 'String'>
    readonly type: FieldRef<"Entry", 'EntryType'>
    readonly visibility: FieldRef<"Entry", 'Visibility'>
    readonly content: FieldRef<"Entry", 'String'>
    readonly qualityScore: FieldRef<"Entry", 'Int'>
    readonly qualityEmoji: FieldRef<"Entry", 'String'>
    readonly mediaUrls: FieldRef<"Entry", 'String[]'>
    readonly locations: FieldRef<"Entry", 'Json'>
    readonly stepsCount: FieldRef<"Entry", 'Int'>
    readonly createdAt: FieldRef<"Entry", 'DateTime'>
    readonly updatedAt: FieldRef<"Entry", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Entry findUnique
   */
  export type EntryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Entry
     */
    select?: EntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Entry
     */
    omit?: EntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntryInclude<ExtArgs> | null
    /**
     * Filter, which Entry to fetch.
     */
    where: EntryWhereUniqueInput
  }

  /**
   * Entry findUniqueOrThrow
   */
  export type EntryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Entry
     */
    select?: EntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Entry
     */
    omit?: EntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntryInclude<ExtArgs> | null
    /**
     * Filter, which Entry to fetch.
     */
    where: EntryWhereUniqueInput
  }

  /**
   * Entry findFirst
   */
  export type EntryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Entry
     */
    select?: EntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Entry
     */
    omit?: EntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntryInclude<ExtArgs> | null
    /**
     * Filter, which Entry to fetch.
     */
    where?: EntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Entries to fetch.
     */
    orderBy?: EntryOrderByWithRelationInput | EntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Entries.
     */
    cursor?: EntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Entries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Entries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Entries.
     */
    distinct?: EntryScalarFieldEnum | EntryScalarFieldEnum[]
  }

  /**
   * Entry findFirstOrThrow
   */
  export type EntryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Entry
     */
    select?: EntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Entry
     */
    omit?: EntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntryInclude<ExtArgs> | null
    /**
     * Filter, which Entry to fetch.
     */
    where?: EntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Entries to fetch.
     */
    orderBy?: EntryOrderByWithRelationInput | EntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Entries.
     */
    cursor?: EntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Entries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Entries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Entries.
     */
    distinct?: EntryScalarFieldEnum | EntryScalarFieldEnum[]
  }

  /**
   * Entry findMany
   */
  export type EntryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Entry
     */
    select?: EntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Entry
     */
    omit?: EntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntryInclude<ExtArgs> | null
    /**
     * Filter, which Entries to fetch.
     */
    where?: EntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Entries to fetch.
     */
    orderBy?: EntryOrderByWithRelationInput | EntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Entries.
     */
    cursor?: EntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Entries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Entries.
     */
    skip?: number
    distinct?: EntryScalarFieldEnum | EntryScalarFieldEnum[]
  }

  /**
   * Entry create
   */
  export type EntryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Entry
     */
    select?: EntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Entry
     */
    omit?: EntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntryInclude<ExtArgs> | null
    /**
     * The data needed to create a Entry.
     */
    data: XOR<EntryCreateInput, EntryUncheckedCreateInput>
  }

  /**
   * Entry createMany
   */
  export type EntryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Entries.
     */
    data: EntryCreateManyInput | EntryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Entry createManyAndReturn
   */
  export type EntryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Entry
     */
    select?: EntrySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Entry
     */
    omit?: EntryOmit<ExtArgs> | null
    /**
     * The data used to create many Entries.
     */
    data: EntryCreateManyInput | EntryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Entry update
   */
  export type EntryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Entry
     */
    select?: EntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Entry
     */
    omit?: EntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntryInclude<ExtArgs> | null
    /**
     * The data needed to update a Entry.
     */
    data: XOR<EntryUpdateInput, EntryUncheckedUpdateInput>
    /**
     * Choose, which Entry to update.
     */
    where: EntryWhereUniqueInput
  }

  /**
   * Entry updateMany
   */
  export type EntryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Entries.
     */
    data: XOR<EntryUpdateManyMutationInput, EntryUncheckedUpdateManyInput>
    /**
     * Filter which Entries to update
     */
    where?: EntryWhereInput
    /**
     * Limit how many Entries to update.
     */
    limit?: number
  }

  /**
   * Entry updateManyAndReturn
   */
  export type EntryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Entry
     */
    select?: EntrySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Entry
     */
    omit?: EntryOmit<ExtArgs> | null
    /**
     * The data used to update Entries.
     */
    data: XOR<EntryUpdateManyMutationInput, EntryUncheckedUpdateManyInput>
    /**
     * Filter which Entries to update
     */
    where?: EntryWhereInput
    /**
     * Limit how many Entries to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Entry upsert
   */
  export type EntryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Entry
     */
    select?: EntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Entry
     */
    omit?: EntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntryInclude<ExtArgs> | null
    /**
     * The filter to search for the Entry to update in case it exists.
     */
    where: EntryWhereUniqueInput
    /**
     * In case the Entry found by the `where` argument doesn't exist, create a new Entry with this data.
     */
    create: XOR<EntryCreateInput, EntryUncheckedCreateInput>
    /**
     * In case the Entry was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EntryUpdateInput, EntryUncheckedUpdateInput>
  }

  /**
   * Entry delete
   */
  export type EntryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Entry
     */
    select?: EntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Entry
     */
    omit?: EntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntryInclude<ExtArgs> | null
    /**
     * Filter which Entry to delete.
     */
    where: EntryWhereUniqueInput
  }

  /**
   * Entry deleteMany
   */
  export type EntryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Entries to delete
     */
    where?: EntryWhereInput
    /**
     * Limit how many Entries to delete.
     */
    limit?: number
  }

  /**
   * Entry.entryLocations
   */
  export type Entry$entryLocationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntryLocation
     */
    select?: EntryLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EntryLocation
     */
    omit?: EntryLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntryLocationInclude<ExtArgs> | null
    where?: EntryLocationWhereInput
    orderBy?: EntryLocationOrderByWithRelationInput | EntryLocationOrderByWithRelationInput[]
    cursor?: EntryLocationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EntryLocationScalarFieldEnum | EntryLocationScalarFieldEnum[]
  }

  /**
   * Entry without action
   */
  export type EntryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Entry
     */
    select?: EntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Entry
     */
    omit?: EntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntryInclude<ExtArgs> | null
  }


  /**
   * Model EntryLocation
   */

  export type AggregateEntryLocation = {
    _count: EntryLocationCountAggregateOutputType | null
    _avg: EntryLocationAvgAggregateOutputType | null
    _sum: EntryLocationSumAggregateOutputType | null
    _min: EntryLocationMinAggregateOutputType | null
    _max: EntryLocationMaxAggregateOutputType | null
  }

  export type EntryLocationAvgAggregateOutputType = {
    lat: number | null
    lng: number | null
    sequence: number | null
  }

  export type EntryLocationSumAggregateOutputType = {
    lat: number | null
    lng: number | null
    sequence: number | null
  }

  export type EntryLocationMinAggregateOutputType = {
    id: string | null
    entryId: string | null
    lat: number | null
    lng: number | null
    name: string | null
    placeId: string | null
    visitedAt: Date | null
    sequence: number | null
    createdAt: Date | null
  }

  export type EntryLocationMaxAggregateOutputType = {
    id: string | null
    entryId: string | null
    lat: number | null
    lng: number | null
    name: string | null
    placeId: string | null
    visitedAt: Date | null
    sequence: number | null
    createdAt: Date | null
  }

  export type EntryLocationCountAggregateOutputType = {
    id: number
    entryId: number
    lat: number
    lng: number
    name: number
    placeId: number
    visitedAt: number
    sequence: number
    raw: number
    createdAt: number
    _all: number
  }


  export type EntryLocationAvgAggregateInputType = {
    lat?: true
    lng?: true
    sequence?: true
  }

  export type EntryLocationSumAggregateInputType = {
    lat?: true
    lng?: true
    sequence?: true
  }

  export type EntryLocationMinAggregateInputType = {
    id?: true
    entryId?: true
    lat?: true
    lng?: true
    name?: true
    placeId?: true
    visitedAt?: true
    sequence?: true
    createdAt?: true
  }

  export type EntryLocationMaxAggregateInputType = {
    id?: true
    entryId?: true
    lat?: true
    lng?: true
    name?: true
    placeId?: true
    visitedAt?: true
    sequence?: true
    createdAt?: true
  }

  export type EntryLocationCountAggregateInputType = {
    id?: true
    entryId?: true
    lat?: true
    lng?: true
    name?: true
    placeId?: true
    visitedAt?: true
    sequence?: true
    raw?: true
    createdAt?: true
    _all?: true
  }

  export type EntryLocationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EntryLocation to aggregate.
     */
    where?: EntryLocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EntryLocations to fetch.
     */
    orderBy?: EntryLocationOrderByWithRelationInput | EntryLocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EntryLocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EntryLocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EntryLocations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EntryLocations
    **/
    _count?: true | EntryLocationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EntryLocationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EntryLocationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EntryLocationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EntryLocationMaxAggregateInputType
  }

  export type GetEntryLocationAggregateType<T extends EntryLocationAggregateArgs> = {
        [P in keyof T & keyof AggregateEntryLocation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEntryLocation[P]>
      : GetScalarType<T[P], AggregateEntryLocation[P]>
  }




  export type EntryLocationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EntryLocationWhereInput
    orderBy?: EntryLocationOrderByWithAggregationInput | EntryLocationOrderByWithAggregationInput[]
    by: EntryLocationScalarFieldEnum[] | EntryLocationScalarFieldEnum
    having?: EntryLocationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EntryLocationCountAggregateInputType | true
    _avg?: EntryLocationAvgAggregateInputType
    _sum?: EntryLocationSumAggregateInputType
    _min?: EntryLocationMinAggregateInputType
    _max?: EntryLocationMaxAggregateInputType
  }

  export type EntryLocationGroupByOutputType = {
    id: string
    entryId: string
    lat: number
    lng: number
    name: string | null
    placeId: string | null
    visitedAt: Date | null
    sequence: number | null
    raw: JsonValue | null
    createdAt: Date
    _count: EntryLocationCountAggregateOutputType | null
    _avg: EntryLocationAvgAggregateOutputType | null
    _sum: EntryLocationSumAggregateOutputType | null
    _min: EntryLocationMinAggregateOutputType | null
    _max: EntryLocationMaxAggregateOutputType | null
  }

  type GetEntryLocationGroupByPayload<T extends EntryLocationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EntryLocationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EntryLocationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EntryLocationGroupByOutputType[P]>
            : GetScalarType<T[P], EntryLocationGroupByOutputType[P]>
        }
      >
    >


  export type EntryLocationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    entryId?: boolean
    lat?: boolean
    lng?: boolean
    name?: boolean
    placeId?: boolean
    visitedAt?: boolean
    sequence?: boolean
    raw?: boolean
    createdAt?: boolean
    entry?: boolean | EntryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["entryLocation"]>

  export type EntryLocationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    entryId?: boolean
    lat?: boolean
    lng?: boolean
    name?: boolean
    placeId?: boolean
    visitedAt?: boolean
    sequence?: boolean
    raw?: boolean
    createdAt?: boolean
    entry?: boolean | EntryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["entryLocation"]>

  export type EntryLocationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    entryId?: boolean
    lat?: boolean
    lng?: boolean
    name?: boolean
    placeId?: boolean
    visitedAt?: boolean
    sequence?: boolean
    raw?: boolean
    createdAt?: boolean
    entry?: boolean | EntryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["entryLocation"]>

  export type EntryLocationSelectScalar = {
    id?: boolean
    entryId?: boolean
    lat?: boolean
    lng?: boolean
    name?: boolean
    placeId?: boolean
    visitedAt?: boolean
    sequence?: boolean
    raw?: boolean
    createdAt?: boolean
  }

  export type EntryLocationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "entryId" | "lat" | "lng" | "name" | "placeId" | "visitedAt" | "sequence" | "raw" | "createdAt", ExtArgs["result"]["entryLocation"]>
  export type EntryLocationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    entry?: boolean | EntryDefaultArgs<ExtArgs>
  }
  export type EntryLocationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    entry?: boolean | EntryDefaultArgs<ExtArgs>
  }
  export type EntryLocationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    entry?: boolean | EntryDefaultArgs<ExtArgs>
  }

  export type $EntryLocationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EntryLocation"
    objects: {
      entry: Prisma.$EntryPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      entryId: string
      lat: number
      lng: number
      name: string | null
      placeId: string | null
      visitedAt: Date | null
      sequence: number | null
      raw: Prisma.JsonValue | null
      createdAt: Date
    }, ExtArgs["result"]["entryLocation"]>
    composites: {}
  }

  type EntryLocationGetPayload<S extends boolean | null | undefined | EntryLocationDefaultArgs> = $Result.GetResult<Prisma.$EntryLocationPayload, S>

  type EntryLocationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EntryLocationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EntryLocationCountAggregateInputType | true
    }

  export interface EntryLocationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EntryLocation'], meta: { name: 'EntryLocation' } }
    /**
     * Find zero or one EntryLocation that matches the filter.
     * @param {EntryLocationFindUniqueArgs} args - Arguments to find a EntryLocation
     * @example
     * // Get one EntryLocation
     * const entryLocation = await prisma.entryLocation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EntryLocationFindUniqueArgs>(args: SelectSubset<T, EntryLocationFindUniqueArgs<ExtArgs>>): Prisma__EntryLocationClient<$Result.GetResult<Prisma.$EntryLocationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EntryLocation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EntryLocationFindUniqueOrThrowArgs} args - Arguments to find a EntryLocation
     * @example
     * // Get one EntryLocation
     * const entryLocation = await prisma.entryLocation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EntryLocationFindUniqueOrThrowArgs>(args: SelectSubset<T, EntryLocationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EntryLocationClient<$Result.GetResult<Prisma.$EntryLocationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EntryLocation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntryLocationFindFirstArgs} args - Arguments to find a EntryLocation
     * @example
     * // Get one EntryLocation
     * const entryLocation = await prisma.entryLocation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EntryLocationFindFirstArgs>(args?: SelectSubset<T, EntryLocationFindFirstArgs<ExtArgs>>): Prisma__EntryLocationClient<$Result.GetResult<Prisma.$EntryLocationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EntryLocation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntryLocationFindFirstOrThrowArgs} args - Arguments to find a EntryLocation
     * @example
     * // Get one EntryLocation
     * const entryLocation = await prisma.entryLocation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EntryLocationFindFirstOrThrowArgs>(args?: SelectSubset<T, EntryLocationFindFirstOrThrowArgs<ExtArgs>>): Prisma__EntryLocationClient<$Result.GetResult<Prisma.$EntryLocationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EntryLocations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntryLocationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EntryLocations
     * const entryLocations = await prisma.entryLocation.findMany()
     * 
     * // Get first 10 EntryLocations
     * const entryLocations = await prisma.entryLocation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const entryLocationWithIdOnly = await prisma.entryLocation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EntryLocationFindManyArgs>(args?: SelectSubset<T, EntryLocationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EntryLocationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EntryLocation.
     * @param {EntryLocationCreateArgs} args - Arguments to create a EntryLocation.
     * @example
     * // Create one EntryLocation
     * const EntryLocation = await prisma.entryLocation.create({
     *   data: {
     *     // ... data to create a EntryLocation
     *   }
     * })
     * 
     */
    create<T extends EntryLocationCreateArgs>(args: SelectSubset<T, EntryLocationCreateArgs<ExtArgs>>): Prisma__EntryLocationClient<$Result.GetResult<Prisma.$EntryLocationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EntryLocations.
     * @param {EntryLocationCreateManyArgs} args - Arguments to create many EntryLocations.
     * @example
     * // Create many EntryLocations
     * const entryLocation = await prisma.entryLocation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EntryLocationCreateManyArgs>(args?: SelectSubset<T, EntryLocationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EntryLocations and returns the data saved in the database.
     * @param {EntryLocationCreateManyAndReturnArgs} args - Arguments to create many EntryLocations.
     * @example
     * // Create many EntryLocations
     * const entryLocation = await prisma.entryLocation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EntryLocations and only return the `id`
     * const entryLocationWithIdOnly = await prisma.entryLocation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EntryLocationCreateManyAndReturnArgs>(args?: SelectSubset<T, EntryLocationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EntryLocationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a EntryLocation.
     * @param {EntryLocationDeleteArgs} args - Arguments to delete one EntryLocation.
     * @example
     * // Delete one EntryLocation
     * const EntryLocation = await prisma.entryLocation.delete({
     *   where: {
     *     // ... filter to delete one EntryLocation
     *   }
     * })
     * 
     */
    delete<T extends EntryLocationDeleteArgs>(args: SelectSubset<T, EntryLocationDeleteArgs<ExtArgs>>): Prisma__EntryLocationClient<$Result.GetResult<Prisma.$EntryLocationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EntryLocation.
     * @param {EntryLocationUpdateArgs} args - Arguments to update one EntryLocation.
     * @example
     * // Update one EntryLocation
     * const entryLocation = await prisma.entryLocation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EntryLocationUpdateArgs>(args: SelectSubset<T, EntryLocationUpdateArgs<ExtArgs>>): Prisma__EntryLocationClient<$Result.GetResult<Prisma.$EntryLocationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EntryLocations.
     * @param {EntryLocationDeleteManyArgs} args - Arguments to filter EntryLocations to delete.
     * @example
     * // Delete a few EntryLocations
     * const { count } = await prisma.entryLocation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EntryLocationDeleteManyArgs>(args?: SelectSubset<T, EntryLocationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EntryLocations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntryLocationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EntryLocations
     * const entryLocation = await prisma.entryLocation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EntryLocationUpdateManyArgs>(args: SelectSubset<T, EntryLocationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EntryLocations and returns the data updated in the database.
     * @param {EntryLocationUpdateManyAndReturnArgs} args - Arguments to update many EntryLocations.
     * @example
     * // Update many EntryLocations
     * const entryLocation = await prisma.entryLocation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more EntryLocations and only return the `id`
     * const entryLocationWithIdOnly = await prisma.entryLocation.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EntryLocationUpdateManyAndReturnArgs>(args: SelectSubset<T, EntryLocationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EntryLocationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one EntryLocation.
     * @param {EntryLocationUpsertArgs} args - Arguments to update or create a EntryLocation.
     * @example
     * // Update or create a EntryLocation
     * const entryLocation = await prisma.entryLocation.upsert({
     *   create: {
     *     // ... data to create a EntryLocation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EntryLocation we want to update
     *   }
     * })
     */
    upsert<T extends EntryLocationUpsertArgs>(args: SelectSubset<T, EntryLocationUpsertArgs<ExtArgs>>): Prisma__EntryLocationClient<$Result.GetResult<Prisma.$EntryLocationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EntryLocations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntryLocationCountArgs} args - Arguments to filter EntryLocations to count.
     * @example
     * // Count the number of EntryLocations
     * const count = await prisma.entryLocation.count({
     *   where: {
     *     // ... the filter for the EntryLocations we want to count
     *   }
     * })
    **/
    count<T extends EntryLocationCountArgs>(
      args?: Subset<T, EntryLocationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EntryLocationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EntryLocation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntryLocationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends EntryLocationAggregateArgs>(args: Subset<T, EntryLocationAggregateArgs>): Prisma.PrismaPromise<GetEntryLocationAggregateType<T>>

    /**
     * Group by EntryLocation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntryLocationGroupByArgs} args - Group by arguments.
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
      T extends EntryLocationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EntryLocationGroupByArgs['orderBy'] }
        : { orderBy?: EntryLocationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EntryLocationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEntryLocationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EntryLocation model
   */
  readonly fields: EntryLocationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EntryLocation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EntryLocationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    entry<T extends EntryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EntryDefaultArgs<ExtArgs>>): Prisma__EntryClient<$Result.GetResult<Prisma.$EntryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the EntryLocation model
   */
  interface EntryLocationFieldRefs {
    readonly id: FieldRef<"EntryLocation", 'String'>
    readonly entryId: FieldRef<"EntryLocation", 'String'>
    readonly lat: FieldRef<"EntryLocation", 'Float'>
    readonly lng: FieldRef<"EntryLocation", 'Float'>
    readonly name: FieldRef<"EntryLocation", 'String'>
    readonly placeId: FieldRef<"EntryLocation", 'String'>
    readonly visitedAt: FieldRef<"EntryLocation", 'DateTime'>
    readonly sequence: FieldRef<"EntryLocation", 'Int'>
    readonly raw: FieldRef<"EntryLocation", 'Json'>
    readonly createdAt: FieldRef<"EntryLocation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * EntryLocation findUnique
   */
  export type EntryLocationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntryLocation
     */
    select?: EntryLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EntryLocation
     */
    omit?: EntryLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntryLocationInclude<ExtArgs> | null
    /**
     * Filter, which EntryLocation to fetch.
     */
    where: EntryLocationWhereUniqueInput
  }

  /**
   * EntryLocation findUniqueOrThrow
   */
  export type EntryLocationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntryLocation
     */
    select?: EntryLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EntryLocation
     */
    omit?: EntryLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntryLocationInclude<ExtArgs> | null
    /**
     * Filter, which EntryLocation to fetch.
     */
    where: EntryLocationWhereUniqueInput
  }

  /**
   * EntryLocation findFirst
   */
  export type EntryLocationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntryLocation
     */
    select?: EntryLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EntryLocation
     */
    omit?: EntryLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntryLocationInclude<ExtArgs> | null
    /**
     * Filter, which EntryLocation to fetch.
     */
    where?: EntryLocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EntryLocations to fetch.
     */
    orderBy?: EntryLocationOrderByWithRelationInput | EntryLocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EntryLocations.
     */
    cursor?: EntryLocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EntryLocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EntryLocations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EntryLocations.
     */
    distinct?: EntryLocationScalarFieldEnum | EntryLocationScalarFieldEnum[]
  }

  /**
   * EntryLocation findFirstOrThrow
   */
  export type EntryLocationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntryLocation
     */
    select?: EntryLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EntryLocation
     */
    omit?: EntryLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntryLocationInclude<ExtArgs> | null
    /**
     * Filter, which EntryLocation to fetch.
     */
    where?: EntryLocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EntryLocations to fetch.
     */
    orderBy?: EntryLocationOrderByWithRelationInput | EntryLocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EntryLocations.
     */
    cursor?: EntryLocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EntryLocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EntryLocations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EntryLocations.
     */
    distinct?: EntryLocationScalarFieldEnum | EntryLocationScalarFieldEnum[]
  }

  /**
   * EntryLocation findMany
   */
  export type EntryLocationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntryLocation
     */
    select?: EntryLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EntryLocation
     */
    omit?: EntryLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntryLocationInclude<ExtArgs> | null
    /**
     * Filter, which EntryLocations to fetch.
     */
    where?: EntryLocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EntryLocations to fetch.
     */
    orderBy?: EntryLocationOrderByWithRelationInput | EntryLocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EntryLocations.
     */
    cursor?: EntryLocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EntryLocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EntryLocations.
     */
    skip?: number
    distinct?: EntryLocationScalarFieldEnum | EntryLocationScalarFieldEnum[]
  }

  /**
   * EntryLocation create
   */
  export type EntryLocationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntryLocation
     */
    select?: EntryLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EntryLocation
     */
    omit?: EntryLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntryLocationInclude<ExtArgs> | null
    /**
     * The data needed to create a EntryLocation.
     */
    data: XOR<EntryLocationCreateInput, EntryLocationUncheckedCreateInput>
  }

  /**
   * EntryLocation createMany
   */
  export type EntryLocationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EntryLocations.
     */
    data: EntryLocationCreateManyInput | EntryLocationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EntryLocation createManyAndReturn
   */
  export type EntryLocationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntryLocation
     */
    select?: EntryLocationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EntryLocation
     */
    omit?: EntryLocationOmit<ExtArgs> | null
    /**
     * The data used to create many EntryLocations.
     */
    data: EntryLocationCreateManyInput | EntryLocationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntryLocationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * EntryLocation update
   */
  export type EntryLocationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntryLocation
     */
    select?: EntryLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EntryLocation
     */
    omit?: EntryLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntryLocationInclude<ExtArgs> | null
    /**
     * The data needed to update a EntryLocation.
     */
    data: XOR<EntryLocationUpdateInput, EntryLocationUncheckedUpdateInput>
    /**
     * Choose, which EntryLocation to update.
     */
    where: EntryLocationWhereUniqueInput
  }

  /**
   * EntryLocation updateMany
   */
  export type EntryLocationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EntryLocations.
     */
    data: XOR<EntryLocationUpdateManyMutationInput, EntryLocationUncheckedUpdateManyInput>
    /**
     * Filter which EntryLocations to update
     */
    where?: EntryLocationWhereInput
    /**
     * Limit how many EntryLocations to update.
     */
    limit?: number
  }

  /**
   * EntryLocation updateManyAndReturn
   */
  export type EntryLocationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntryLocation
     */
    select?: EntryLocationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EntryLocation
     */
    omit?: EntryLocationOmit<ExtArgs> | null
    /**
     * The data used to update EntryLocations.
     */
    data: XOR<EntryLocationUpdateManyMutationInput, EntryLocationUncheckedUpdateManyInput>
    /**
     * Filter which EntryLocations to update
     */
    where?: EntryLocationWhereInput
    /**
     * Limit how many EntryLocations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntryLocationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * EntryLocation upsert
   */
  export type EntryLocationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntryLocation
     */
    select?: EntryLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EntryLocation
     */
    omit?: EntryLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntryLocationInclude<ExtArgs> | null
    /**
     * The filter to search for the EntryLocation to update in case it exists.
     */
    where: EntryLocationWhereUniqueInput
    /**
     * In case the EntryLocation found by the `where` argument doesn't exist, create a new EntryLocation with this data.
     */
    create: XOR<EntryLocationCreateInput, EntryLocationUncheckedCreateInput>
    /**
     * In case the EntryLocation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EntryLocationUpdateInput, EntryLocationUncheckedUpdateInput>
  }

  /**
   * EntryLocation delete
   */
  export type EntryLocationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntryLocation
     */
    select?: EntryLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EntryLocation
     */
    omit?: EntryLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntryLocationInclude<ExtArgs> | null
    /**
     * Filter which EntryLocation to delete.
     */
    where: EntryLocationWhereUniqueInput
  }

  /**
   * EntryLocation deleteMany
   */
  export type EntryLocationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EntryLocations to delete
     */
    where?: EntryLocationWhereInput
    /**
     * Limit how many EntryLocations to delete.
     */
    limit?: number
  }

  /**
   * EntryLocation without action
   */
  export type EntryLocationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntryLocation
     */
    select?: EntryLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EntryLocation
     */
    omit?: EntryLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntryLocationInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    username: 'username',
    password: 'password',
    email: 'email',
    profilePicture: 'profilePicture',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    journalEntriesCount: 'journalEntriesCount',
    privateEntriesCount: 'privateEntriesCount',
    publicEntriesCount: 'publicEntriesCount',
    protectedEntriesCount: 'protectedEntriesCount'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const EntryScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    type: 'type',
    visibility: 'visibility',
    content: 'content',
    qualityScore: 'qualityScore',
    qualityEmoji: 'qualityEmoji',
    mediaUrls: 'mediaUrls',
    locations: 'locations',
    stepsCount: 'stepsCount',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type EntryScalarFieldEnum = (typeof EntryScalarFieldEnum)[keyof typeof EntryScalarFieldEnum]


  export const EntryLocationScalarFieldEnum: {
    id: 'id',
    entryId: 'entryId',
    lat: 'lat',
    lng: 'lng',
    name: 'name',
    placeId: 'placeId',
    visitedAt: 'visitedAt',
    sequence: 'sequence',
    raw: 'raw',
    createdAt: 'createdAt'
  };

  export type EntryLocationScalarFieldEnum = (typeof EntryLocationScalarFieldEnum)[keyof typeof EntryLocationScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'EntryType'
   */
  export type EnumEntryTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EntryType'>
    


  /**
   * Reference to a field of type 'EntryType[]'
   */
  export type ListEnumEntryTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EntryType[]'>
    


  /**
   * Reference to a field of type 'Visibility'
   */
  export type EnumVisibilityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Visibility'>
    


  /**
   * Reference to a field of type 'Visibility[]'
   */
  export type ListEnumVisibilityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Visibility[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    username?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    profilePicture?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    journalEntriesCount?: IntFilter<"User"> | number
    privateEntriesCount?: IntFilter<"User"> | number
    publicEntriesCount?: IntFilter<"User"> | number
    protectedEntriesCount?: IntFilter<"User"> | number
    friends?: UserListRelationFilter
    friendsOf?: UserListRelationFilter
    entries?: EntryListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    email?: SortOrder
    profilePicture?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    journalEntriesCount?: SortOrder
    privateEntriesCount?: SortOrder
    publicEntriesCount?: SortOrder
    protectedEntriesCount?: SortOrder
    friends?: UserOrderByRelationAggregateInput
    friendsOf?: UserOrderByRelationAggregateInput
    entries?: EntryOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    username?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    profilePicture?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    journalEntriesCount?: IntFilter<"User"> | number
    privateEntriesCount?: IntFilter<"User"> | number
    publicEntriesCount?: IntFilter<"User"> | number
    protectedEntriesCount?: IntFilter<"User"> | number
    friends?: UserListRelationFilter
    friendsOf?: UserListRelationFilter
    entries?: EntryListRelationFilter
  }, "id" | "username" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    email?: SortOrder
    profilePicture?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    journalEntriesCount?: SortOrder
    privateEntriesCount?: SortOrder
    publicEntriesCount?: SortOrder
    protectedEntriesCount?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    username?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    profilePicture?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    journalEntriesCount?: IntWithAggregatesFilter<"User"> | number
    privateEntriesCount?: IntWithAggregatesFilter<"User"> | number
    publicEntriesCount?: IntWithAggregatesFilter<"User"> | number
    protectedEntriesCount?: IntWithAggregatesFilter<"User"> | number
  }

  export type EntryWhereInput = {
    AND?: EntryWhereInput | EntryWhereInput[]
    OR?: EntryWhereInput[]
    NOT?: EntryWhereInput | EntryWhereInput[]
    id?: StringFilter<"Entry"> | string
    userId?: StringFilter<"Entry"> | string
    type?: EnumEntryTypeFilter<"Entry"> | $Enums.EntryType
    visibility?: EnumVisibilityFilter<"Entry"> | $Enums.Visibility
    content?: StringNullableFilter<"Entry"> | string | null
    qualityScore?: IntNullableFilter<"Entry"> | number | null
    qualityEmoji?: StringNullableFilter<"Entry"> | string | null
    mediaUrls?: StringNullableListFilter<"Entry">
    locations?: JsonNullableFilter<"Entry">
    stepsCount?: IntNullableFilter<"Entry"> | number | null
    createdAt?: DateTimeFilter<"Entry"> | Date | string
    updatedAt?: DateTimeFilter<"Entry"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    entryLocations?: EntryLocationListRelationFilter
  }

  export type EntryOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    visibility?: SortOrder
    content?: SortOrderInput | SortOrder
    qualityScore?: SortOrderInput | SortOrder
    qualityEmoji?: SortOrderInput | SortOrder
    mediaUrls?: SortOrder
    locations?: SortOrderInput | SortOrder
    stepsCount?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    entryLocations?: EntryLocationOrderByRelationAggregateInput
  }

  export type EntryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: EntryWhereInput | EntryWhereInput[]
    OR?: EntryWhereInput[]
    NOT?: EntryWhereInput | EntryWhereInput[]
    userId?: StringFilter<"Entry"> | string
    type?: EnumEntryTypeFilter<"Entry"> | $Enums.EntryType
    visibility?: EnumVisibilityFilter<"Entry"> | $Enums.Visibility
    content?: StringNullableFilter<"Entry"> | string | null
    qualityScore?: IntNullableFilter<"Entry"> | number | null
    qualityEmoji?: StringNullableFilter<"Entry"> | string | null
    mediaUrls?: StringNullableListFilter<"Entry">
    locations?: JsonNullableFilter<"Entry">
    stepsCount?: IntNullableFilter<"Entry"> | number | null
    createdAt?: DateTimeFilter<"Entry"> | Date | string
    updatedAt?: DateTimeFilter<"Entry"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    entryLocations?: EntryLocationListRelationFilter
  }, "id">

  export type EntryOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    visibility?: SortOrder
    content?: SortOrderInput | SortOrder
    qualityScore?: SortOrderInput | SortOrder
    qualityEmoji?: SortOrderInput | SortOrder
    mediaUrls?: SortOrder
    locations?: SortOrderInput | SortOrder
    stepsCount?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: EntryCountOrderByAggregateInput
    _avg?: EntryAvgOrderByAggregateInput
    _max?: EntryMaxOrderByAggregateInput
    _min?: EntryMinOrderByAggregateInput
    _sum?: EntrySumOrderByAggregateInput
  }

  export type EntryScalarWhereWithAggregatesInput = {
    AND?: EntryScalarWhereWithAggregatesInput | EntryScalarWhereWithAggregatesInput[]
    OR?: EntryScalarWhereWithAggregatesInput[]
    NOT?: EntryScalarWhereWithAggregatesInput | EntryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Entry"> | string
    userId?: StringWithAggregatesFilter<"Entry"> | string
    type?: EnumEntryTypeWithAggregatesFilter<"Entry"> | $Enums.EntryType
    visibility?: EnumVisibilityWithAggregatesFilter<"Entry"> | $Enums.Visibility
    content?: StringNullableWithAggregatesFilter<"Entry"> | string | null
    qualityScore?: IntNullableWithAggregatesFilter<"Entry"> | number | null
    qualityEmoji?: StringNullableWithAggregatesFilter<"Entry"> | string | null
    mediaUrls?: StringNullableListFilter<"Entry">
    locations?: JsonNullableWithAggregatesFilter<"Entry">
    stepsCount?: IntNullableWithAggregatesFilter<"Entry"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"Entry"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Entry"> | Date | string
  }

  export type EntryLocationWhereInput = {
    AND?: EntryLocationWhereInput | EntryLocationWhereInput[]
    OR?: EntryLocationWhereInput[]
    NOT?: EntryLocationWhereInput | EntryLocationWhereInput[]
    id?: StringFilter<"EntryLocation"> | string
    entryId?: StringFilter<"EntryLocation"> | string
    lat?: FloatFilter<"EntryLocation"> | number
    lng?: FloatFilter<"EntryLocation"> | number
    name?: StringNullableFilter<"EntryLocation"> | string | null
    placeId?: StringNullableFilter<"EntryLocation"> | string | null
    visitedAt?: DateTimeNullableFilter<"EntryLocation"> | Date | string | null
    sequence?: IntNullableFilter<"EntryLocation"> | number | null
    raw?: JsonNullableFilter<"EntryLocation">
    createdAt?: DateTimeFilter<"EntryLocation"> | Date | string
    entry?: XOR<EntryScalarRelationFilter, EntryWhereInput>
  }

  export type EntryLocationOrderByWithRelationInput = {
    id?: SortOrder
    entryId?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
    name?: SortOrderInput | SortOrder
    placeId?: SortOrderInput | SortOrder
    visitedAt?: SortOrderInput | SortOrder
    sequence?: SortOrderInput | SortOrder
    raw?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    entry?: EntryOrderByWithRelationInput
  }

  export type EntryLocationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: EntryLocationWhereInput | EntryLocationWhereInput[]
    OR?: EntryLocationWhereInput[]
    NOT?: EntryLocationWhereInput | EntryLocationWhereInput[]
    entryId?: StringFilter<"EntryLocation"> | string
    lat?: FloatFilter<"EntryLocation"> | number
    lng?: FloatFilter<"EntryLocation"> | number
    name?: StringNullableFilter<"EntryLocation"> | string | null
    placeId?: StringNullableFilter<"EntryLocation"> | string | null
    visitedAt?: DateTimeNullableFilter<"EntryLocation"> | Date | string | null
    sequence?: IntNullableFilter<"EntryLocation"> | number | null
    raw?: JsonNullableFilter<"EntryLocation">
    createdAt?: DateTimeFilter<"EntryLocation"> | Date | string
    entry?: XOR<EntryScalarRelationFilter, EntryWhereInput>
  }, "id">

  export type EntryLocationOrderByWithAggregationInput = {
    id?: SortOrder
    entryId?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
    name?: SortOrderInput | SortOrder
    placeId?: SortOrderInput | SortOrder
    visitedAt?: SortOrderInput | SortOrder
    sequence?: SortOrderInput | SortOrder
    raw?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: EntryLocationCountOrderByAggregateInput
    _avg?: EntryLocationAvgOrderByAggregateInput
    _max?: EntryLocationMaxOrderByAggregateInput
    _min?: EntryLocationMinOrderByAggregateInput
    _sum?: EntryLocationSumOrderByAggregateInput
  }

  export type EntryLocationScalarWhereWithAggregatesInput = {
    AND?: EntryLocationScalarWhereWithAggregatesInput | EntryLocationScalarWhereWithAggregatesInput[]
    OR?: EntryLocationScalarWhereWithAggregatesInput[]
    NOT?: EntryLocationScalarWhereWithAggregatesInput | EntryLocationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"EntryLocation"> | string
    entryId?: StringWithAggregatesFilter<"EntryLocation"> | string
    lat?: FloatWithAggregatesFilter<"EntryLocation"> | number
    lng?: FloatWithAggregatesFilter<"EntryLocation"> | number
    name?: StringNullableWithAggregatesFilter<"EntryLocation"> | string | null
    placeId?: StringNullableWithAggregatesFilter<"EntryLocation"> | string | null
    visitedAt?: DateTimeNullableWithAggregatesFilter<"EntryLocation"> | Date | string | null
    sequence?: IntNullableWithAggregatesFilter<"EntryLocation"> | number | null
    raw?: JsonNullableWithAggregatesFilter<"EntryLocation">
    createdAt?: DateTimeWithAggregatesFilter<"EntryLocation"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    username: string
    password: string
    email: string
    profilePicture?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    journalEntriesCount?: number
    privateEntriesCount?: number
    publicEntriesCount?: number
    protectedEntriesCount?: number
    friends?: UserCreateNestedManyWithoutFriendsOfInput
    friendsOf?: UserCreateNestedManyWithoutFriendsInput
    entries?: EntryCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    username: string
    password: string
    email: string
    profilePicture?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    journalEntriesCount?: number
    privateEntriesCount?: number
    publicEntriesCount?: number
    protectedEntriesCount?: number
    friends?: UserUncheckedCreateNestedManyWithoutFriendsOfInput
    friendsOf?: UserUncheckedCreateNestedManyWithoutFriendsInput
    entries?: EntryUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    journalEntriesCount?: IntFieldUpdateOperationsInput | number
    privateEntriesCount?: IntFieldUpdateOperationsInput | number
    publicEntriesCount?: IntFieldUpdateOperationsInput | number
    protectedEntriesCount?: IntFieldUpdateOperationsInput | number
    friends?: UserUpdateManyWithoutFriendsOfNestedInput
    friendsOf?: UserUpdateManyWithoutFriendsNestedInput
    entries?: EntryUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    journalEntriesCount?: IntFieldUpdateOperationsInput | number
    privateEntriesCount?: IntFieldUpdateOperationsInput | number
    publicEntriesCount?: IntFieldUpdateOperationsInput | number
    protectedEntriesCount?: IntFieldUpdateOperationsInput | number
    friends?: UserUncheckedUpdateManyWithoutFriendsOfNestedInput
    friendsOf?: UserUncheckedUpdateManyWithoutFriendsNestedInput
    entries?: EntryUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    username: string
    password: string
    email: string
    profilePicture?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    journalEntriesCount?: number
    privateEntriesCount?: number
    publicEntriesCount?: number
    protectedEntriesCount?: number
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    journalEntriesCount?: IntFieldUpdateOperationsInput | number
    privateEntriesCount?: IntFieldUpdateOperationsInput | number
    publicEntriesCount?: IntFieldUpdateOperationsInput | number
    protectedEntriesCount?: IntFieldUpdateOperationsInput | number
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    journalEntriesCount?: IntFieldUpdateOperationsInput | number
    privateEntriesCount?: IntFieldUpdateOperationsInput | number
    publicEntriesCount?: IntFieldUpdateOperationsInput | number
    protectedEntriesCount?: IntFieldUpdateOperationsInput | number
  }

  export type EntryCreateInput = {
    id?: string
    type: $Enums.EntryType
    visibility?: $Enums.Visibility
    content?: string | null
    qualityScore?: number | null
    qualityEmoji?: string | null
    mediaUrls?: EntryCreatemediaUrlsInput | string[]
    locations?: NullableJsonNullValueInput | InputJsonValue
    stepsCount?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutEntriesInput
    entryLocations?: EntryLocationCreateNestedManyWithoutEntryInput
  }

  export type EntryUncheckedCreateInput = {
    id?: string
    userId: string
    type: $Enums.EntryType
    visibility?: $Enums.Visibility
    content?: string | null
    qualityScore?: number | null
    qualityEmoji?: string | null
    mediaUrls?: EntryCreatemediaUrlsInput | string[]
    locations?: NullableJsonNullValueInput | InputJsonValue
    stepsCount?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    entryLocations?: EntryLocationUncheckedCreateNestedManyWithoutEntryInput
  }

  export type EntryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumEntryTypeFieldUpdateOperationsInput | $Enums.EntryType
    visibility?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    content?: NullableStringFieldUpdateOperationsInput | string | null
    qualityScore?: NullableIntFieldUpdateOperationsInput | number | null
    qualityEmoji?: NullableStringFieldUpdateOperationsInput | string | null
    mediaUrls?: EntryUpdatemediaUrlsInput | string[]
    locations?: NullableJsonNullValueInput | InputJsonValue
    stepsCount?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutEntriesNestedInput
    entryLocations?: EntryLocationUpdateManyWithoutEntryNestedInput
  }

  export type EntryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: EnumEntryTypeFieldUpdateOperationsInput | $Enums.EntryType
    visibility?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    content?: NullableStringFieldUpdateOperationsInput | string | null
    qualityScore?: NullableIntFieldUpdateOperationsInput | number | null
    qualityEmoji?: NullableStringFieldUpdateOperationsInput | string | null
    mediaUrls?: EntryUpdatemediaUrlsInput | string[]
    locations?: NullableJsonNullValueInput | InputJsonValue
    stepsCount?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    entryLocations?: EntryLocationUncheckedUpdateManyWithoutEntryNestedInput
  }

  export type EntryCreateManyInput = {
    id?: string
    userId: string
    type: $Enums.EntryType
    visibility?: $Enums.Visibility
    content?: string | null
    qualityScore?: number | null
    qualityEmoji?: string | null
    mediaUrls?: EntryCreatemediaUrlsInput | string[]
    locations?: NullableJsonNullValueInput | InputJsonValue
    stepsCount?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EntryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumEntryTypeFieldUpdateOperationsInput | $Enums.EntryType
    visibility?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    content?: NullableStringFieldUpdateOperationsInput | string | null
    qualityScore?: NullableIntFieldUpdateOperationsInput | number | null
    qualityEmoji?: NullableStringFieldUpdateOperationsInput | string | null
    mediaUrls?: EntryUpdatemediaUrlsInput | string[]
    locations?: NullableJsonNullValueInput | InputJsonValue
    stepsCount?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EntryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: EnumEntryTypeFieldUpdateOperationsInput | $Enums.EntryType
    visibility?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    content?: NullableStringFieldUpdateOperationsInput | string | null
    qualityScore?: NullableIntFieldUpdateOperationsInput | number | null
    qualityEmoji?: NullableStringFieldUpdateOperationsInput | string | null
    mediaUrls?: EntryUpdatemediaUrlsInput | string[]
    locations?: NullableJsonNullValueInput | InputJsonValue
    stepsCount?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EntryLocationCreateInput = {
    id?: string
    lat: number
    lng: number
    name?: string | null
    placeId?: string | null
    visitedAt?: Date | string | null
    sequence?: number | null
    raw?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    entry: EntryCreateNestedOneWithoutEntryLocationsInput
  }

  export type EntryLocationUncheckedCreateInput = {
    id?: string
    entryId: string
    lat: number
    lng: number
    name?: string | null
    placeId?: string | null
    visitedAt?: Date | string | null
    sequence?: number | null
    raw?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type EntryLocationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    placeId?: NullableStringFieldUpdateOperationsInput | string | null
    visitedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sequence?: NullableIntFieldUpdateOperationsInput | number | null
    raw?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    entry?: EntryUpdateOneRequiredWithoutEntryLocationsNestedInput
  }

  export type EntryLocationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    entryId?: StringFieldUpdateOperationsInput | string
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    placeId?: NullableStringFieldUpdateOperationsInput | string | null
    visitedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sequence?: NullableIntFieldUpdateOperationsInput | number | null
    raw?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EntryLocationCreateManyInput = {
    id?: string
    entryId: string
    lat: number
    lng: number
    name?: string | null
    placeId?: string | null
    visitedAt?: Date | string | null
    sequence?: number | null
    raw?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type EntryLocationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    placeId?: NullableStringFieldUpdateOperationsInput | string | null
    visitedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sequence?: NullableIntFieldUpdateOperationsInput | number | null
    raw?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EntryLocationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    entryId?: StringFieldUpdateOperationsInput | string
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    placeId?: NullableStringFieldUpdateOperationsInput | string | null
    visitedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sequence?: NullableIntFieldUpdateOperationsInput | number | null
    raw?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type EntryListRelationFilter = {
    every?: EntryWhereInput
    some?: EntryWhereInput
    none?: EntryWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EntryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    email?: SortOrder
    profilePicture?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    journalEntriesCount?: SortOrder
    privateEntriesCount?: SortOrder
    publicEntriesCount?: SortOrder
    protectedEntriesCount?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    journalEntriesCount?: SortOrder
    privateEntriesCount?: SortOrder
    publicEntriesCount?: SortOrder
    protectedEntriesCount?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    email?: SortOrder
    profilePicture?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    journalEntriesCount?: SortOrder
    privateEntriesCount?: SortOrder
    publicEntriesCount?: SortOrder
    protectedEntriesCount?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    email?: SortOrder
    profilePicture?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    journalEntriesCount?: SortOrder
    privateEntriesCount?: SortOrder
    publicEntriesCount?: SortOrder
    protectedEntriesCount?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    journalEntriesCount?: SortOrder
    privateEntriesCount?: SortOrder
    publicEntriesCount?: SortOrder
    protectedEntriesCount?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumEntryTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.EntryType | EnumEntryTypeFieldRefInput<$PrismaModel>
    in?: $Enums.EntryType[] | ListEnumEntryTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.EntryType[] | ListEnumEntryTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumEntryTypeFilter<$PrismaModel> | $Enums.EntryType
  }

  export type EnumVisibilityFilter<$PrismaModel = never> = {
    equals?: $Enums.Visibility | EnumVisibilityFieldRefInput<$PrismaModel>
    in?: $Enums.Visibility[] | ListEnumVisibilityFieldRefInput<$PrismaModel>
    notIn?: $Enums.Visibility[] | ListEnumVisibilityFieldRefInput<$PrismaModel>
    not?: NestedEnumVisibilityFilter<$PrismaModel> | $Enums.Visibility
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type EntryLocationListRelationFilter = {
    every?: EntryLocationWhereInput
    some?: EntryLocationWhereInput
    none?: EntryLocationWhereInput
  }

  export type EntryLocationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EntryCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    visibility?: SortOrder
    content?: SortOrder
    qualityScore?: SortOrder
    qualityEmoji?: SortOrder
    mediaUrls?: SortOrder
    locations?: SortOrder
    stepsCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EntryAvgOrderByAggregateInput = {
    qualityScore?: SortOrder
    stepsCount?: SortOrder
  }

  export type EntryMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    visibility?: SortOrder
    content?: SortOrder
    qualityScore?: SortOrder
    qualityEmoji?: SortOrder
    stepsCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EntryMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    visibility?: SortOrder
    content?: SortOrder
    qualityScore?: SortOrder
    qualityEmoji?: SortOrder
    stepsCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EntrySumOrderByAggregateInput = {
    qualityScore?: SortOrder
    stepsCount?: SortOrder
  }

  export type EnumEntryTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EntryType | EnumEntryTypeFieldRefInput<$PrismaModel>
    in?: $Enums.EntryType[] | ListEnumEntryTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.EntryType[] | ListEnumEntryTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumEntryTypeWithAggregatesFilter<$PrismaModel> | $Enums.EntryType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEntryTypeFilter<$PrismaModel>
    _max?: NestedEnumEntryTypeFilter<$PrismaModel>
  }

  export type EnumVisibilityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Visibility | EnumVisibilityFieldRefInput<$PrismaModel>
    in?: $Enums.Visibility[] | ListEnumVisibilityFieldRefInput<$PrismaModel>
    notIn?: $Enums.Visibility[] | ListEnumVisibilityFieldRefInput<$PrismaModel>
    not?: NestedEnumVisibilityWithAggregatesFilter<$PrismaModel> | $Enums.Visibility
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumVisibilityFilter<$PrismaModel>
    _max?: NestedEnumVisibilityFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type EntryScalarRelationFilter = {
    is?: EntryWhereInput
    isNot?: EntryWhereInput
  }

  export type EntryLocationCountOrderByAggregateInput = {
    id?: SortOrder
    entryId?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
    name?: SortOrder
    placeId?: SortOrder
    visitedAt?: SortOrder
    sequence?: SortOrder
    raw?: SortOrder
    createdAt?: SortOrder
  }

  export type EntryLocationAvgOrderByAggregateInput = {
    lat?: SortOrder
    lng?: SortOrder
    sequence?: SortOrder
  }

  export type EntryLocationMaxOrderByAggregateInput = {
    id?: SortOrder
    entryId?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
    name?: SortOrder
    placeId?: SortOrder
    visitedAt?: SortOrder
    sequence?: SortOrder
    createdAt?: SortOrder
  }

  export type EntryLocationMinOrderByAggregateInput = {
    id?: SortOrder
    entryId?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
    name?: SortOrder
    placeId?: SortOrder
    visitedAt?: SortOrder
    sequence?: SortOrder
    createdAt?: SortOrder
  }

  export type EntryLocationSumOrderByAggregateInput = {
    lat?: SortOrder
    lng?: SortOrder
    sequence?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type UserCreateNestedManyWithoutFriendsOfInput = {
    create?: XOR<UserCreateWithoutFriendsOfInput, UserUncheckedCreateWithoutFriendsOfInput> | UserCreateWithoutFriendsOfInput[] | UserUncheckedCreateWithoutFriendsOfInput[]
    connectOrCreate?: UserCreateOrConnectWithoutFriendsOfInput | UserCreateOrConnectWithoutFriendsOfInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type UserCreateNestedManyWithoutFriendsInput = {
    create?: XOR<UserCreateWithoutFriendsInput, UserUncheckedCreateWithoutFriendsInput> | UserCreateWithoutFriendsInput[] | UserUncheckedCreateWithoutFriendsInput[]
    connectOrCreate?: UserCreateOrConnectWithoutFriendsInput | UserCreateOrConnectWithoutFriendsInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type EntryCreateNestedManyWithoutUserInput = {
    create?: XOR<EntryCreateWithoutUserInput, EntryUncheckedCreateWithoutUserInput> | EntryCreateWithoutUserInput[] | EntryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EntryCreateOrConnectWithoutUserInput | EntryCreateOrConnectWithoutUserInput[]
    createMany?: EntryCreateManyUserInputEnvelope
    connect?: EntryWhereUniqueInput | EntryWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutFriendsOfInput = {
    create?: XOR<UserCreateWithoutFriendsOfInput, UserUncheckedCreateWithoutFriendsOfInput> | UserCreateWithoutFriendsOfInput[] | UserUncheckedCreateWithoutFriendsOfInput[]
    connectOrCreate?: UserCreateOrConnectWithoutFriendsOfInput | UserCreateOrConnectWithoutFriendsOfInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutFriendsInput = {
    create?: XOR<UserCreateWithoutFriendsInput, UserUncheckedCreateWithoutFriendsInput> | UserCreateWithoutFriendsInput[] | UserUncheckedCreateWithoutFriendsInput[]
    connectOrCreate?: UserCreateOrConnectWithoutFriendsInput | UserCreateOrConnectWithoutFriendsInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type EntryUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<EntryCreateWithoutUserInput, EntryUncheckedCreateWithoutUserInput> | EntryCreateWithoutUserInput[] | EntryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EntryCreateOrConnectWithoutUserInput | EntryCreateOrConnectWithoutUserInput[]
    createMany?: EntryCreateManyUserInputEnvelope
    connect?: EntryWhereUniqueInput | EntryWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateManyWithoutFriendsOfNestedInput = {
    create?: XOR<UserCreateWithoutFriendsOfInput, UserUncheckedCreateWithoutFriendsOfInput> | UserCreateWithoutFriendsOfInput[] | UserUncheckedCreateWithoutFriendsOfInput[]
    connectOrCreate?: UserCreateOrConnectWithoutFriendsOfInput | UserCreateOrConnectWithoutFriendsOfInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutFriendsOfInput | UserUpsertWithWhereUniqueWithoutFriendsOfInput[]
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutFriendsOfInput | UserUpdateWithWhereUniqueWithoutFriendsOfInput[]
    updateMany?: UserUpdateManyWithWhereWithoutFriendsOfInput | UserUpdateManyWithWhereWithoutFriendsOfInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type UserUpdateManyWithoutFriendsNestedInput = {
    create?: XOR<UserCreateWithoutFriendsInput, UserUncheckedCreateWithoutFriendsInput> | UserCreateWithoutFriendsInput[] | UserUncheckedCreateWithoutFriendsInput[]
    connectOrCreate?: UserCreateOrConnectWithoutFriendsInput | UserCreateOrConnectWithoutFriendsInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutFriendsInput | UserUpsertWithWhereUniqueWithoutFriendsInput[]
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutFriendsInput | UserUpdateWithWhereUniqueWithoutFriendsInput[]
    updateMany?: UserUpdateManyWithWhereWithoutFriendsInput | UserUpdateManyWithWhereWithoutFriendsInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type EntryUpdateManyWithoutUserNestedInput = {
    create?: XOR<EntryCreateWithoutUserInput, EntryUncheckedCreateWithoutUserInput> | EntryCreateWithoutUserInput[] | EntryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EntryCreateOrConnectWithoutUserInput | EntryCreateOrConnectWithoutUserInput[]
    upsert?: EntryUpsertWithWhereUniqueWithoutUserInput | EntryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: EntryCreateManyUserInputEnvelope
    set?: EntryWhereUniqueInput | EntryWhereUniqueInput[]
    disconnect?: EntryWhereUniqueInput | EntryWhereUniqueInput[]
    delete?: EntryWhereUniqueInput | EntryWhereUniqueInput[]
    connect?: EntryWhereUniqueInput | EntryWhereUniqueInput[]
    update?: EntryUpdateWithWhereUniqueWithoutUserInput | EntryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: EntryUpdateManyWithWhereWithoutUserInput | EntryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: EntryScalarWhereInput | EntryScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutFriendsOfNestedInput = {
    create?: XOR<UserCreateWithoutFriendsOfInput, UserUncheckedCreateWithoutFriendsOfInput> | UserCreateWithoutFriendsOfInput[] | UserUncheckedCreateWithoutFriendsOfInput[]
    connectOrCreate?: UserCreateOrConnectWithoutFriendsOfInput | UserCreateOrConnectWithoutFriendsOfInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutFriendsOfInput | UserUpsertWithWhereUniqueWithoutFriendsOfInput[]
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutFriendsOfInput | UserUpdateWithWhereUniqueWithoutFriendsOfInput[]
    updateMany?: UserUpdateManyWithWhereWithoutFriendsOfInput | UserUpdateManyWithWhereWithoutFriendsOfInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutFriendsNestedInput = {
    create?: XOR<UserCreateWithoutFriendsInput, UserUncheckedCreateWithoutFriendsInput> | UserCreateWithoutFriendsInput[] | UserUncheckedCreateWithoutFriendsInput[]
    connectOrCreate?: UserCreateOrConnectWithoutFriendsInput | UserCreateOrConnectWithoutFriendsInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutFriendsInput | UserUpsertWithWhereUniqueWithoutFriendsInput[]
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutFriendsInput | UserUpdateWithWhereUniqueWithoutFriendsInput[]
    updateMany?: UserUpdateManyWithWhereWithoutFriendsInput | UserUpdateManyWithWhereWithoutFriendsInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type EntryUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<EntryCreateWithoutUserInput, EntryUncheckedCreateWithoutUserInput> | EntryCreateWithoutUserInput[] | EntryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EntryCreateOrConnectWithoutUserInput | EntryCreateOrConnectWithoutUserInput[]
    upsert?: EntryUpsertWithWhereUniqueWithoutUserInput | EntryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: EntryCreateManyUserInputEnvelope
    set?: EntryWhereUniqueInput | EntryWhereUniqueInput[]
    disconnect?: EntryWhereUniqueInput | EntryWhereUniqueInput[]
    delete?: EntryWhereUniqueInput | EntryWhereUniqueInput[]
    connect?: EntryWhereUniqueInput | EntryWhereUniqueInput[]
    update?: EntryUpdateWithWhereUniqueWithoutUserInput | EntryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: EntryUpdateManyWithWhereWithoutUserInput | EntryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: EntryScalarWhereInput | EntryScalarWhereInput[]
  }

  export type EntryCreatemediaUrlsInput = {
    set: string[]
  }

  export type UserCreateNestedOneWithoutEntriesInput = {
    create?: XOR<UserCreateWithoutEntriesInput, UserUncheckedCreateWithoutEntriesInput>
    connectOrCreate?: UserCreateOrConnectWithoutEntriesInput
    connect?: UserWhereUniqueInput
  }

  export type EntryLocationCreateNestedManyWithoutEntryInput = {
    create?: XOR<EntryLocationCreateWithoutEntryInput, EntryLocationUncheckedCreateWithoutEntryInput> | EntryLocationCreateWithoutEntryInput[] | EntryLocationUncheckedCreateWithoutEntryInput[]
    connectOrCreate?: EntryLocationCreateOrConnectWithoutEntryInput | EntryLocationCreateOrConnectWithoutEntryInput[]
    createMany?: EntryLocationCreateManyEntryInputEnvelope
    connect?: EntryLocationWhereUniqueInput | EntryLocationWhereUniqueInput[]
  }

  export type EntryLocationUncheckedCreateNestedManyWithoutEntryInput = {
    create?: XOR<EntryLocationCreateWithoutEntryInput, EntryLocationUncheckedCreateWithoutEntryInput> | EntryLocationCreateWithoutEntryInput[] | EntryLocationUncheckedCreateWithoutEntryInput[]
    connectOrCreate?: EntryLocationCreateOrConnectWithoutEntryInput | EntryLocationCreateOrConnectWithoutEntryInput[]
    createMany?: EntryLocationCreateManyEntryInputEnvelope
    connect?: EntryLocationWhereUniqueInput | EntryLocationWhereUniqueInput[]
  }

  export type EnumEntryTypeFieldUpdateOperationsInput = {
    set?: $Enums.EntryType
  }

  export type EnumVisibilityFieldUpdateOperationsInput = {
    set?: $Enums.Visibility
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EntryUpdatemediaUrlsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type UserUpdateOneRequiredWithoutEntriesNestedInput = {
    create?: XOR<UserCreateWithoutEntriesInput, UserUncheckedCreateWithoutEntriesInput>
    connectOrCreate?: UserCreateOrConnectWithoutEntriesInput
    upsert?: UserUpsertWithoutEntriesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutEntriesInput, UserUpdateWithoutEntriesInput>, UserUncheckedUpdateWithoutEntriesInput>
  }

  export type EntryLocationUpdateManyWithoutEntryNestedInput = {
    create?: XOR<EntryLocationCreateWithoutEntryInput, EntryLocationUncheckedCreateWithoutEntryInput> | EntryLocationCreateWithoutEntryInput[] | EntryLocationUncheckedCreateWithoutEntryInput[]
    connectOrCreate?: EntryLocationCreateOrConnectWithoutEntryInput | EntryLocationCreateOrConnectWithoutEntryInput[]
    upsert?: EntryLocationUpsertWithWhereUniqueWithoutEntryInput | EntryLocationUpsertWithWhereUniqueWithoutEntryInput[]
    createMany?: EntryLocationCreateManyEntryInputEnvelope
    set?: EntryLocationWhereUniqueInput | EntryLocationWhereUniqueInput[]
    disconnect?: EntryLocationWhereUniqueInput | EntryLocationWhereUniqueInput[]
    delete?: EntryLocationWhereUniqueInput | EntryLocationWhereUniqueInput[]
    connect?: EntryLocationWhereUniqueInput | EntryLocationWhereUniqueInput[]
    update?: EntryLocationUpdateWithWhereUniqueWithoutEntryInput | EntryLocationUpdateWithWhereUniqueWithoutEntryInput[]
    updateMany?: EntryLocationUpdateManyWithWhereWithoutEntryInput | EntryLocationUpdateManyWithWhereWithoutEntryInput[]
    deleteMany?: EntryLocationScalarWhereInput | EntryLocationScalarWhereInput[]
  }

  export type EntryLocationUncheckedUpdateManyWithoutEntryNestedInput = {
    create?: XOR<EntryLocationCreateWithoutEntryInput, EntryLocationUncheckedCreateWithoutEntryInput> | EntryLocationCreateWithoutEntryInput[] | EntryLocationUncheckedCreateWithoutEntryInput[]
    connectOrCreate?: EntryLocationCreateOrConnectWithoutEntryInput | EntryLocationCreateOrConnectWithoutEntryInput[]
    upsert?: EntryLocationUpsertWithWhereUniqueWithoutEntryInput | EntryLocationUpsertWithWhereUniqueWithoutEntryInput[]
    createMany?: EntryLocationCreateManyEntryInputEnvelope
    set?: EntryLocationWhereUniqueInput | EntryLocationWhereUniqueInput[]
    disconnect?: EntryLocationWhereUniqueInput | EntryLocationWhereUniqueInput[]
    delete?: EntryLocationWhereUniqueInput | EntryLocationWhereUniqueInput[]
    connect?: EntryLocationWhereUniqueInput | EntryLocationWhereUniqueInput[]
    update?: EntryLocationUpdateWithWhereUniqueWithoutEntryInput | EntryLocationUpdateWithWhereUniqueWithoutEntryInput[]
    updateMany?: EntryLocationUpdateManyWithWhereWithoutEntryInput | EntryLocationUpdateManyWithWhereWithoutEntryInput[]
    deleteMany?: EntryLocationScalarWhereInput | EntryLocationScalarWhereInput[]
  }

  export type EntryCreateNestedOneWithoutEntryLocationsInput = {
    create?: XOR<EntryCreateWithoutEntryLocationsInput, EntryUncheckedCreateWithoutEntryLocationsInput>
    connectOrCreate?: EntryCreateOrConnectWithoutEntryLocationsInput
    connect?: EntryWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type EntryUpdateOneRequiredWithoutEntryLocationsNestedInput = {
    create?: XOR<EntryCreateWithoutEntryLocationsInput, EntryUncheckedCreateWithoutEntryLocationsInput>
    connectOrCreate?: EntryCreateOrConnectWithoutEntryLocationsInput
    upsert?: EntryUpsertWithoutEntryLocationsInput
    connect?: EntryWhereUniqueInput
    update?: XOR<XOR<EntryUpdateToOneWithWhereWithoutEntryLocationsInput, EntryUpdateWithoutEntryLocationsInput>, EntryUncheckedUpdateWithoutEntryLocationsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumEntryTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.EntryType | EnumEntryTypeFieldRefInput<$PrismaModel>
    in?: $Enums.EntryType[] | ListEnumEntryTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.EntryType[] | ListEnumEntryTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumEntryTypeFilter<$PrismaModel> | $Enums.EntryType
  }

  export type NestedEnumVisibilityFilter<$PrismaModel = never> = {
    equals?: $Enums.Visibility | EnumVisibilityFieldRefInput<$PrismaModel>
    in?: $Enums.Visibility[] | ListEnumVisibilityFieldRefInput<$PrismaModel>
    notIn?: $Enums.Visibility[] | ListEnumVisibilityFieldRefInput<$PrismaModel>
    not?: NestedEnumVisibilityFilter<$PrismaModel> | $Enums.Visibility
  }

  export type NestedEnumEntryTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EntryType | EnumEntryTypeFieldRefInput<$PrismaModel>
    in?: $Enums.EntryType[] | ListEnumEntryTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.EntryType[] | ListEnumEntryTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumEntryTypeWithAggregatesFilter<$PrismaModel> | $Enums.EntryType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEntryTypeFilter<$PrismaModel>
    _max?: NestedEnumEntryTypeFilter<$PrismaModel>
  }

  export type NestedEnumVisibilityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Visibility | EnumVisibilityFieldRefInput<$PrismaModel>
    in?: $Enums.Visibility[] | ListEnumVisibilityFieldRefInput<$PrismaModel>
    notIn?: $Enums.Visibility[] | ListEnumVisibilityFieldRefInput<$PrismaModel>
    not?: NestedEnumVisibilityWithAggregatesFilter<$PrismaModel> | $Enums.Visibility
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumVisibilityFilter<$PrismaModel>
    _max?: NestedEnumVisibilityFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type UserCreateWithoutFriendsOfInput = {
    id?: string
    username: string
    password: string
    email: string
    profilePicture?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    journalEntriesCount?: number
    privateEntriesCount?: number
    publicEntriesCount?: number
    protectedEntriesCount?: number
    friends?: UserCreateNestedManyWithoutFriendsOfInput
    entries?: EntryCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutFriendsOfInput = {
    id?: string
    username: string
    password: string
    email: string
    profilePicture?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    journalEntriesCount?: number
    privateEntriesCount?: number
    publicEntriesCount?: number
    protectedEntriesCount?: number
    friends?: UserUncheckedCreateNestedManyWithoutFriendsOfInput
    entries?: EntryUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutFriendsOfInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFriendsOfInput, UserUncheckedCreateWithoutFriendsOfInput>
  }

  export type UserCreateWithoutFriendsInput = {
    id?: string
    username: string
    password: string
    email: string
    profilePicture?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    journalEntriesCount?: number
    privateEntriesCount?: number
    publicEntriesCount?: number
    protectedEntriesCount?: number
    friendsOf?: UserCreateNestedManyWithoutFriendsInput
    entries?: EntryCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutFriendsInput = {
    id?: string
    username: string
    password: string
    email: string
    profilePicture?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    journalEntriesCount?: number
    privateEntriesCount?: number
    publicEntriesCount?: number
    protectedEntriesCount?: number
    friendsOf?: UserUncheckedCreateNestedManyWithoutFriendsInput
    entries?: EntryUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutFriendsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFriendsInput, UserUncheckedCreateWithoutFriendsInput>
  }

  export type EntryCreateWithoutUserInput = {
    id?: string
    type: $Enums.EntryType
    visibility?: $Enums.Visibility
    content?: string | null
    qualityScore?: number | null
    qualityEmoji?: string | null
    mediaUrls?: EntryCreatemediaUrlsInput | string[]
    locations?: NullableJsonNullValueInput | InputJsonValue
    stepsCount?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    entryLocations?: EntryLocationCreateNestedManyWithoutEntryInput
  }

  export type EntryUncheckedCreateWithoutUserInput = {
    id?: string
    type: $Enums.EntryType
    visibility?: $Enums.Visibility
    content?: string | null
    qualityScore?: number | null
    qualityEmoji?: string | null
    mediaUrls?: EntryCreatemediaUrlsInput | string[]
    locations?: NullableJsonNullValueInput | InputJsonValue
    stepsCount?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    entryLocations?: EntryLocationUncheckedCreateNestedManyWithoutEntryInput
  }

  export type EntryCreateOrConnectWithoutUserInput = {
    where: EntryWhereUniqueInput
    create: XOR<EntryCreateWithoutUserInput, EntryUncheckedCreateWithoutUserInput>
  }

  export type EntryCreateManyUserInputEnvelope = {
    data: EntryCreateManyUserInput | EntryCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithWhereUniqueWithoutFriendsOfInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutFriendsOfInput, UserUncheckedUpdateWithoutFriendsOfInput>
    create: XOR<UserCreateWithoutFriendsOfInput, UserUncheckedCreateWithoutFriendsOfInput>
  }

  export type UserUpdateWithWhereUniqueWithoutFriendsOfInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutFriendsOfInput, UserUncheckedUpdateWithoutFriendsOfInput>
  }

  export type UserUpdateManyWithWhereWithoutFriendsOfInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutFriendsOfInput>
  }

  export type UserScalarWhereInput = {
    AND?: UserScalarWhereInput | UserScalarWhereInput[]
    OR?: UserScalarWhereInput[]
    NOT?: UserScalarWhereInput | UserScalarWhereInput[]
    id?: StringFilter<"User"> | string
    username?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    profilePicture?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    journalEntriesCount?: IntFilter<"User"> | number
    privateEntriesCount?: IntFilter<"User"> | number
    publicEntriesCount?: IntFilter<"User"> | number
    protectedEntriesCount?: IntFilter<"User"> | number
  }

  export type UserUpsertWithWhereUniqueWithoutFriendsInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutFriendsInput, UserUncheckedUpdateWithoutFriendsInput>
    create: XOR<UserCreateWithoutFriendsInput, UserUncheckedCreateWithoutFriendsInput>
  }

  export type UserUpdateWithWhereUniqueWithoutFriendsInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutFriendsInput, UserUncheckedUpdateWithoutFriendsInput>
  }

  export type UserUpdateManyWithWhereWithoutFriendsInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutFriendsInput>
  }

  export type EntryUpsertWithWhereUniqueWithoutUserInput = {
    where: EntryWhereUniqueInput
    update: XOR<EntryUpdateWithoutUserInput, EntryUncheckedUpdateWithoutUserInput>
    create: XOR<EntryCreateWithoutUserInput, EntryUncheckedCreateWithoutUserInput>
  }

  export type EntryUpdateWithWhereUniqueWithoutUserInput = {
    where: EntryWhereUniqueInput
    data: XOR<EntryUpdateWithoutUserInput, EntryUncheckedUpdateWithoutUserInput>
  }

  export type EntryUpdateManyWithWhereWithoutUserInput = {
    where: EntryScalarWhereInput
    data: XOR<EntryUpdateManyMutationInput, EntryUncheckedUpdateManyWithoutUserInput>
  }

  export type EntryScalarWhereInput = {
    AND?: EntryScalarWhereInput | EntryScalarWhereInput[]
    OR?: EntryScalarWhereInput[]
    NOT?: EntryScalarWhereInput | EntryScalarWhereInput[]
    id?: StringFilter<"Entry"> | string
    userId?: StringFilter<"Entry"> | string
    type?: EnumEntryTypeFilter<"Entry"> | $Enums.EntryType
    visibility?: EnumVisibilityFilter<"Entry"> | $Enums.Visibility
    content?: StringNullableFilter<"Entry"> | string | null
    qualityScore?: IntNullableFilter<"Entry"> | number | null
    qualityEmoji?: StringNullableFilter<"Entry"> | string | null
    mediaUrls?: StringNullableListFilter<"Entry">
    locations?: JsonNullableFilter<"Entry">
    stepsCount?: IntNullableFilter<"Entry"> | number | null
    createdAt?: DateTimeFilter<"Entry"> | Date | string
    updatedAt?: DateTimeFilter<"Entry"> | Date | string
  }

  export type UserCreateWithoutEntriesInput = {
    id?: string
    username: string
    password: string
    email: string
    profilePicture?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    journalEntriesCount?: number
    privateEntriesCount?: number
    publicEntriesCount?: number
    protectedEntriesCount?: number
    friends?: UserCreateNestedManyWithoutFriendsOfInput
    friendsOf?: UserCreateNestedManyWithoutFriendsInput
  }

  export type UserUncheckedCreateWithoutEntriesInput = {
    id?: string
    username: string
    password: string
    email: string
    profilePicture?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    journalEntriesCount?: number
    privateEntriesCount?: number
    publicEntriesCount?: number
    protectedEntriesCount?: number
    friends?: UserUncheckedCreateNestedManyWithoutFriendsOfInput
    friendsOf?: UserUncheckedCreateNestedManyWithoutFriendsInput
  }

  export type UserCreateOrConnectWithoutEntriesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutEntriesInput, UserUncheckedCreateWithoutEntriesInput>
  }

  export type EntryLocationCreateWithoutEntryInput = {
    id?: string
    lat: number
    lng: number
    name?: string | null
    placeId?: string | null
    visitedAt?: Date | string | null
    sequence?: number | null
    raw?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type EntryLocationUncheckedCreateWithoutEntryInput = {
    id?: string
    lat: number
    lng: number
    name?: string | null
    placeId?: string | null
    visitedAt?: Date | string | null
    sequence?: number | null
    raw?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type EntryLocationCreateOrConnectWithoutEntryInput = {
    where: EntryLocationWhereUniqueInput
    create: XOR<EntryLocationCreateWithoutEntryInput, EntryLocationUncheckedCreateWithoutEntryInput>
  }

  export type EntryLocationCreateManyEntryInputEnvelope = {
    data: EntryLocationCreateManyEntryInput | EntryLocationCreateManyEntryInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutEntriesInput = {
    update: XOR<UserUpdateWithoutEntriesInput, UserUncheckedUpdateWithoutEntriesInput>
    create: XOR<UserCreateWithoutEntriesInput, UserUncheckedCreateWithoutEntriesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutEntriesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutEntriesInput, UserUncheckedUpdateWithoutEntriesInput>
  }

  export type UserUpdateWithoutEntriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    journalEntriesCount?: IntFieldUpdateOperationsInput | number
    privateEntriesCount?: IntFieldUpdateOperationsInput | number
    publicEntriesCount?: IntFieldUpdateOperationsInput | number
    protectedEntriesCount?: IntFieldUpdateOperationsInput | number
    friends?: UserUpdateManyWithoutFriendsOfNestedInput
    friendsOf?: UserUpdateManyWithoutFriendsNestedInput
  }

  export type UserUncheckedUpdateWithoutEntriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    journalEntriesCount?: IntFieldUpdateOperationsInput | number
    privateEntriesCount?: IntFieldUpdateOperationsInput | number
    publicEntriesCount?: IntFieldUpdateOperationsInput | number
    protectedEntriesCount?: IntFieldUpdateOperationsInput | number
    friends?: UserUncheckedUpdateManyWithoutFriendsOfNestedInput
    friendsOf?: UserUncheckedUpdateManyWithoutFriendsNestedInput
  }

  export type EntryLocationUpsertWithWhereUniqueWithoutEntryInput = {
    where: EntryLocationWhereUniqueInput
    update: XOR<EntryLocationUpdateWithoutEntryInput, EntryLocationUncheckedUpdateWithoutEntryInput>
    create: XOR<EntryLocationCreateWithoutEntryInput, EntryLocationUncheckedCreateWithoutEntryInput>
  }

  export type EntryLocationUpdateWithWhereUniqueWithoutEntryInput = {
    where: EntryLocationWhereUniqueInput
    data: XOR<EntryLocationUpdateWithoutEntryInput, EntryLocationUncheckedUpdateWithoutEntryInput>
  }

  export type EntryLocationUpdateManyWithWhereWithoutEntryInput = {
    where: EntryLocationScalarWhereInput
    data: XOR<EntryLocationUpdateManyMutationInput, EntryLocationUncheckedUpdateManyWithoutEntryInput>
  }

  export type EntryLocationScalarWhereInput = {
    AND?: EntryLocationScalarWhereInput | EntryLocationScalarWhereInput[]
    OR?: EntryLocationScalarWhereInput[]
    NOT?: EntryLocationScalarWhereInput | EntryLocationScalarWhereInput[]
    id?: StringFilter<"EntryLocation"> | string
    entryId?: StringFilter<"EntryLocation"> | string
    lat?: FloatFilter<"EntryLocation"> | number
    lng?: FloatFilter<"EntryLocation"> | number
    name?: StringNullableFilter<"EntryLocation"> | string | null
    placeId?: StringNullableFilter<"EntryLocation"> | string | null
    visitedAt?: DateTimeNullableFilter<"EntryLocation"> | Date | string | null
    sequence?: IntNullableFilter<"EntryLocation"> | number | null
    raw?: JsonNullableFilter<"EntryLocation">
    createdAt?: DateTimeFilter<"EntryLocation"> | Date | string
  }

  export type EntryCreateWithoutEntryLocationsInput = {
    id?: string
    type: $Enums.EntryType
    visibility?: $Enums.Visibility
    content?: string | null
    qualityScore?: number | null
    qualityEmoji?: string | null
    mediaUrls?: EntryCreatemediaUrlsInput | string[]
    locations?: NullableJsonNullValueInput | InputJsonValue
    stepsCount?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutEntriesInput
  }

  export type EntryUncheckedCreateWithoutEntryLocationsInput = {
    id?: string
    userId: string
    type: $Enums.EntryType
    visibility?: $Enums.Visibility
    content?: string | null
    qualityScore?: number | null
    qualityEmoji?: string | null
    mediaUrls?: EntryCreatemediaUrlsInput | string[]
    locations?: NullableJsonNullValueInput | InputJsonValue
    stepsCount?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EntryCreateOrConnectWithoutEntryLocationsInput = {
    where: EntryWhereUniqueInput
    create: XOR<EntryCreateWithoutEntryLocationsInput, EntryUncheckedCreateWithoutEntryLocationsInput>
  }

  export type EntryUpsertWithoutEntryLocationsInput = {
    update: XOR<EntryUpdateWithoutEntryLocationsInput, EntryUncheckedUpdateWithoutEntryLocationsInput>
    create: XOR<EntryCreateWithoutEntryLocationsInput, EntryUncheckedCreateWithoutEntryLocationsInput>
    where?: EntryWhereInput
  }

  export type EntryUpdateToOneWithWhereWithoutEntryLocationsInput = {
    where?: EntryWhereInput
    data: XOR<EntryUpdateWithoutEntryLocationsInput, EntryUncheckedUpdateWithoutEntryLocationsInput>
  }

  export type EntryUpdateWithoutEntryLocationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumEntryTypeFieldUpdateOperationsInput | $Enums.EntryType
    visibility?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    content?: NullableStringFieldUpdateOperationsInput | string | null
    qualityScore?: NullableIntFieldUpdateOperationsInput | number | null
    qualityEmoji?: NullableStringFieldUpdateOperationsInput | string | null
    mediaUrls?: EntryUpdatemediaUrlsInput | string[]
    locations?: NullableJsonNullValueInput | InputJsonValue
    stepsCount?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutEntriesNestedInput
  }

  export type EntryUncheckedUpdateWithoutEntryLocationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: EnumEntryTypeFieldUpdateOperationsInput | $Enums.EntryType
    visibility?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    content?: NullableStringFieldUpdateOperationsInput | string | null
    qualityScore?: NullableIntFieldUpdateOperationsInput | number | null
    qualityEmoji?: NullableStringFieldUpdateOperationsInput | string | null
    mediaUrls?: EntryUpdatemediaUrlsInput | string[]
    locations?: NullableJsonNullValueInput | InputJsonValue
    stepsCount?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EntryCreateManyUserInput = {
    id?: string
    type: $Enums.EntryType
    visibility?: $Enums.Visibility
    content?: string | null
    qualityScore?: number | null
    qualityEmoji?: string | null
    mediaUrls?: EntryCreatemediaUrlsInput | string[]
    locations?: NullableJsonNullValueInput | InputJsonValue
    stepsCount?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateWithoutFriendsOfInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    journalEntriesCount?: IntFieldUpdateOperationsInput | number
    privateEntriesCount?: IntFieldUpdateOperationsInput | number
    publicEntriesCount?: IntFieldUpdateOperationsInput | number
    protectedEntriesCount?: IntFieldUpdateOperationsInput | number
    friends?: UserUpdateManyWithoutFriendsOfNestedInput
    entries?: EntryUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutFriendsOfInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    journalEntriesCount?: IntFieldUpdateOperationsInput | number
    privateEntriesCount?: IntFieldUpdateOperationsInput | number
    publicEntriesCount?: IntFieldUpdateOperationsInput | number
    protectedEntriesCount?: IntFieldUpdateOperationsInput | number
    friends?: UserUncheckedUpdateManyWithoutFriendsOfNestedInput
    entries?: EntryUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateManyWithoutFriendsOfInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    journalEntriesCount?: IntFieldUpdateOperationsInput | number
    privateEntriesCount?: IntFieldUpdateOperationsInput | number
    publicEntriesCount?: IntFieldUpdateOperationsInput | number
    protectedEntriesCount?: IntFieldUpdateOperationsInput | number
  }

  export type UserUpdateWithoutFriendsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    journalEntriesCount?: IntFieldUpdateOperationsInput | number
    privateEntriesCount?: IntFieldUpdateOperationsInput | number
    publicEntriesCount?: IntFieldUpdateOperationsInput | number
    protectedEntriesCount?: IntFieldUpdateOperationsInput | number
    friendsOf?: UserUpdateManyWithoutFriendsNestedInput
    entries?: EntryUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutFriendsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    journalEntriesCount?: IntFieldUpdateOperationsInput | number
    privateEntriesCount?: IntFieldUpdateOperationsInput | number
    publicEntriesCount?: IntFieldUpdateOperationsInput | number
    protectedEntriesCount?: IntFieldUpdateOperationsInput | number
    friendsOf?: UserUncheckedUpdateManyWithoutFriendsNestedInput
    entries?: EntryUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateManyWithoutFriendsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    journalEntriesCount?: IntFieldUpdateOperationsInput | number
    privateEntriesCount?: IntFieldUpdateOperationsInput | number
    publicEntriesCount?: IntFieldUpdateOperationsInput | number
    protectedEntriesCount?: IntFieldUpdateOperationsInput | number
  }

  export type EntryUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumEntryTypeFieldUpdateOperationsInput | $Enums.EntryType
    visibility?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    content?: NullableStringFieldUpdateOperationsInput | string | null
    qualityScore?: NullableIntFieldUpdateOperationsInput | number | null
    qualityEmoji?: NullableStringFieldUpdateOperationsInput | string | null
    mediaUrls?: EntryUpdatemediaUrlsInput | string[]
    locations?: NullableJsonNullValueInput | InputJsonValue
    stepsCount?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    entryLocations?: EntryLocationUpdateManyWithoutEntryNestedInput
  }

  export type EntryUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumEntryTypeFieldUpdateOperationsInput | $Enums.EntryType
    visibility?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    content?: NullableStringFieldUpdateOperationsInput | string | null
    qualityScore?: NullableIntFieldUpdateOperationsInput | number | null
    qualityEmoji?: NullableStringFieldUpdateOperationsInput | string | null
    mediaUrls?: EntryUpdatemediaUrlsInput | string[]
    locations?: NullableJsonNullValueInput | InputJsonValue
    stepsCount?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    entryLocations?: EntryLocationUncheckedUpdateManyWithoutEntryNestedInput
  }

  export type EntryUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumEntryTypeFieldUpdateOperationsInput | $Enums.EntryType
    visibility?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    content?: NullableStringFieldUpdateOperationsInput | string | null
    qualityScore?: NullableIntFieldUpdateOperationsInput | number | null
    qualityEmoji?: NullableStringFieldUpdateOperationsInput | string | null
    mediaUrls?: EntryUpdatemediaUrlsInput | string[]
    locations?: NullableJsonNullValueInput | InputJsonValue
    stepsCount?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EntryLocationCreateManyEntryInput = {
    id?: string
    lat: number
    lng: number
    name?: string | null
    placeId?: string | null
    visitedAt?: Date | string | null
    sequence?: number | null
    raw?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type EntryLocationUpdateWithoutEntryInput = {
    id?: StringFieldUpdateOperationsInput | string
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    placeId?: NullableStringFieldUpdateOperationsInput | string | null
    visitedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sequence?: NullableIntFieldUpdateOperationsInput | number | null
    raw?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EntryLocationUncheckedUpdateWithoutEntryInput = {
    id?: StringFieldUpdateOperationsInput | string
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    placeId?: NullableStringFieldUpdateOperationsInput | string | null
    visitedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sequence?: NullableIntFieldUpdateOperationsInput | number | null
    raw?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EntryLocationUncheckedUpdateManyWithoutEntryInput = {
    id?: StringFieldUpdateOperationsInput | string
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    placeId?: NullableStringFieldUpdateOperationsInput | string | null
    visitedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sequence?: NullableIntFieldUpdateOperationsInput | number | null
    raw?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}