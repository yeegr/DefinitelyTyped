// Type definitions for Sequelize 1.7.9
// Project: http://sequelizejs.com/
// Definitions by: horiuchi <https://github.com/horiuchi/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

///<reference path="../node/node.d.ts" />

declare class Sequelize extends Sequelize.SequelizeStatic {
  constructor(connectionString: string, options?: Sequelize.IConfigOptions);
  constructor(database: string, username: string, options?: Sequelize.IConfigOptions);
  constructor(database: string, username: string, password: string, options?: Sequelize.IConfigOptions);

  getDialect(): string;
  getQueryInterface(): Sequelize.QueryInterface;

  define<M extends Sequelize.ModelT<{}>>(modelName: string, attributes: Object, options?: Sequelize.IDefineOptions): M;
  model<M extends Sequelize.ModelT<{}>>(modelName: string): M;
  isDefined(modelName: string): boolean;
  import<M extends Sequelize.ModelT<{}>>(path: string, fn?: (self: Sequelize, dataType: Sequelize.DataTypes) => M): M;

  query<I extends Sequelize.Instance<{}>, T>(sql: string, callee?: Sequelize.Model<I, T>, options?: Sequelize.IQueryOptions, replacements?: Object): Sequelize.PromiseT<I[]>;
  createSchema<T>(schema: string): Sequelize.PromiseT<T>;
  showAllSchemas<T>(): Sequelize.PromiseT<T>;
  dropSchema<T>(schema: string): Sequelize.PromiseT<T>;
  dropAllSchemas<T>(): Sequelize.PromiseT<T>;
  sync<T>(options?: { force?: boolean; logging?: (message: any, ...optionalParams: any[]) => void; schema?: string; }): Sequelize.PromiseT<T>;
  drop<T>(options?: { cascade?: boolean; }): Sequelize.PromiseT<T>;
  authenticate<T>(): Sequelize.PromiseT<T>;
  validate<T>(): Sequelize.PromiseT<T>;

  transaction(options?: { autocommit: boolean; isolationLevel: string; }): Sequelize.PromiseT<Sequelize.Transaction>;
}

declare module Sequelize {
  export interface IAssociationOptions {
    hooks?: boolean;
    as?: string;
    foreignKey?: string;
    through?: any;  // string or Model
    onDelete?: string;
    onUpdate?: string;
    constraints?: boolean;
  }
  export interface IConfigOptions extends IServerOptions {
    pool?: IPoolOptions;
    protocol?: string;
    logging?: any;
    queue?: boolean;
    native?: boolean;
    ssl?: boolean;
    replication?: IReplicationOptions;
    dialectModulePath?: string;
    maxConcurrentQueries?: number;
    dialectOptions?: any;
  }
  export interface IDefineOptions {
    defaultScope?: IFindOptions;
    scopes?: any;
    omitNull?: boolean;
    timestamps?: boolean;
    paranoid?: boolean;
    underscored?: boolean;
    underscoredAll?: boolean;
    freezeTableName?: boolean;
    name?: {
      singular: string;
      plural: string;
    };
    indexes?: IDefineIndexOptions[];
    createdAt?: any;  // boolean or string
    updatedAt?: any;  // boolean or string
    deletedAt?: any;  // boolean or string
    tableName?: string;
    getterMethods?: any;
    setterMethods?: any;
    instanceMethods?: any;
    classMethods?: any;
    schema?: string;
    schemaDelimiter?: string;
    engine?: string;
    charset?: string;
    comment?: string;
    collate?: string;
    hooks?: IHooks;
    validate?: any;
  }
  export interface IDefineIndexOptions {
    name?: string;
    type?: string;
    method?: string;
    unique?: boolean;
    concurrently?: boolean;
    fields: {
      attribute: string;
      order?: string;
      length?: number;
      collate?: string;
    }[];
  }
  export interface IFindOptions {
    where?: any;
    attributes?: string[];
    include?: IIncludeOptions[];
    order?: any[];
    limit?: number;
    offset?: number;
  }
  export interface IFindOrCreateOptions extends IFindOptions, IQueryOptions {
  }
  export interface IIncludeOptions {
    model: Model<any, any>;
    as?: string;
    where?: Object;
    attributes?: string[];
    required?: boolean;
    include?: IIncludeOptions[];
  }
  export interface IPoolOptions {
    maxConnections?: number;
    minConnections?: number;
    maxIdleTime?: number;
    validateConnection?: (client?: any) => boolean;
  }
  export interface IProxyOptions {
    events: string[];
  }
  export interface IQueryOptions {
    logging?: any;
    plain?: boolean;
    raw?: boolean;
    transaction?: Transaction;
    type?: string;
  }
  export interface IReplicationOptions {
    read?: IServerOptions[];
    write?: IServerOptions;
  }
  export interface IServerOptions {
    host?: string;
    port?: number;
    database?: string;
    username?: string;
    password?: string;
  }
}

declare module Sequelize {
  export module DataTypes {
    export interface Type {
      type(): string;
    }
    interface StringBase extends Type {
      (length?: number): StringBase;
      BINARY: StringBase;
    }
    interface NumberBase extends Type {
      (length?: number, decimals?: number, unsigned?: boolean, zerofill?: boolean): NumberBase;
      UNSIGNED: NumberBase;
      ZEROFILL: NumberBase;
    }

    interface STRING extends StringBase {
    }
    interface CHAR extends StringBase {
    }
    interface TEXT extends Type {
    }
    interface INTEGER extends NumberBase {
    }
    interface BIGINT extends NumberBase {
    }
    interface DATE extends Type {
    }
    interface BOOLEAN extends Type {
    }
    interface FLOAT extends NumberBase {
    }
    interface NOW extends Type {
    }
    interface BLOB extends Type {
      (length?: string): BLOB;
    }
    interface DECIMAL extends Type {
      (precision?: number, scale?: number): DECIMAL;
      PRECISION: number;
      SCALE: number;
    }
    interface UUID extends Type {
    }
    interface UUIDV1 extends UUID {
    }
    interface UUIDV4 extends UUID {
    }
    interface VIRTUAL extends Type {
    }
    interface ENUM extends Type {
      (...values: string[]): ENUM;
    }
    interface ARRAY extends Type {
      (type: Type): ARRAY;
    }
    interface HSTORE extends Type {
    }
  }

  export class DataTypes {
    static STRING: DataTypes.STRING;
    static CHAR: DataTypes.CHAR;
    static TEXT: DataTypes.TEXT;
    static INTEGER: DataTypes.INTEGER;
    static BIGINT: DataTypes.BIGINT;
    static DATE: DataTypes.DATE;
    static BOOLEAN: DataTypes.BOOLEAN;
    static FLOAT: DataTypes.FLOAT;
    static NOW: DataTypes.NOW;
    static BLOB: DataTypes.BLOB;
    static DECIMAL: DataTypes.DECIMAL;
    static UUID: DataTypes.UUID;
    static UUIDV1: DataTypes.UUIDV1;
    static UUIDV4: DataTypes.UUIDV4;
    static VIRTUAL: DataTypes.VIRTUAL;
    static NONE: DataTypes.VIRTUAL;
    static ENUM: DataTypes.ENUM;
    static ARRAY: DataTypes.ARRAY;
    static HSTORE: DataTypes.HSTORE;
  }

  export interface Fn {
  }
  export interface Col extends Fn {}
  export interface Cast extends Fn {}
  export interface Literal extends Fn {}
  export interface And extends Fn {}
  export interface Or extends Fn {}
  export interface Where extends Fn {}

  interface IHookFunction {
    <T>(dao: T, callback: (err?: any, dao?: T) => void): void;
  }
  interface IBulkCreateHookFunction {
    <T>(daos: T[], fields: string[], callback: (err?: any, dao?: T) => void): void;
  }
  interface IBulkDestroyHookFunction {
    (where: any, callback: (err?: any, where?: any) => void): void;
  }
  interface IBulkUpdateHookFunction {
    <T>(daos: T[], where: any, callback: (err?: any, daos?: T[], where?: any) => void): void;
  }
  interface IHooks {
    beforeValidate?: IHookFunction;
    afterValidate?: IHookFunction;
    beforeCreate?: IHookFunction;
    afterCreate?: IHookFunction;
    beforeDestroy?: IHookFunction;
    afterDestroy?: IHookFunction;
    beforeUpdate?: IHookFunction;
    afterUpdate?: IHookFunction;
    beforeBulkCreate?: IBulkCreateHookFunction;
    afterBulkCreate?: IBulkCreateHookFunction;
    beforeBulkDestroy?: IBulkDestroyHookFunction;
    afterBulkDestroy?: IBulkDestroyHookFunction;
    beforeBulkUpdate?: IBulkUpdateHookFunction;
    afterBulkUpdate?: IBulkUpdateHookFunction;
  }
  interface Hooks<T> {
    hook(hooktype: string, name: string, fn: (...args: any[]) => void): boolean;
    hook(hooktype: string, fn: (...args: any[]) => void): boolean;
    addHook(hooktype: string, name: string,  fn: (...args: any[]) => void): boolean;
    addHook(hooktype: string, fn: (...args: any[]) => void): boolean;
    beforeValidate(name: string, validator: (dao: T, callback: (err?: any, dao?: T) => void) => void): void;
    beforeValidate(validator: (dao: T, callback: (err?: any, dao?: T) => void) => void): void;
    afterValidate(name: string, validator: (dao: T, callback: (err?: any, dao?: T) => void) => void): void;
    afterValidate(validator: (dao: T, callback: (err?: any, dao?: T) => void) => void): void;
    beforeCreate(name: string, validator: (dao: T, callback: (err?: any, dao?: T) => void) => void): void;
    beforeCreate(validator: (dao: T, callback: (err?: any, dao?: T) => void) => void): void;
    afterCreate(name: string, validator: (dao: T, callback: (err?: any, dao?: T) => void) => void): void;
    afterCreate(validator: (dao: T, callback: (err?: any, dao?: T) => void) => void): void;
    beforeDestroy(name: string, validator: (dao: T, callback: (err?: any, dao?: T) => void) => void): void;
    beforeDestroy(validator: (dao: T, callback: (err?: any, dao?: T) => void) => void): void;
    afterDestroy(name: string, validator: (dao: T, callback: (err?: any, dao?: T) => void) => void): void;
    afterDestroy(validator: (dao: T, callback: (err?: any, dao?: T) => void) => void): void;
    beforeUpdate(name: string, validator: (dao: T, callback: (err?: any, dao?: T) => void) => void): void;
    beforeUpdate(validator: (dao: T, callback: (err?: any, dao?: T) => void) => void): void;
    afterUpdate(name: string, validator: (dao: T, callback: (err?: any, dao?: T) => void) => void): void;
    afterUpdate(validator: (dao: T, callback: (err?: any, dao?: T) => void) => void): void;
    beforeBulkCreate(name: string, validator: (daos: T[], fields: string[], callback: (err?: any, dao?: T) => void) => void): void;
    beforeBulkCreate(validator: (daos: T[], fields: string[], callback: (err?: any, dao?: T) => void) => void): void;
    afterBulkCreate(name: string, validator: (daos: T[], fields: string[], callback: (err?: any, dao?: T) => void) => void): void;
    afterBulkCreate(validator: (daos: T[], fields: string[], callback: (err?: any, dao?: T) => void) => void): void;
    beforeBulkDestroy(name: string, validator: (where: any, callback: (err?: any, where?: any) => void) => void): void;
    beforeBulkDestroy(validator: (where: any, callback: (err?: any, where?: any) => void) => void): void;
    afterBulkDestroy(name: string, validator: (where: any, callback: (err?: any, where?: any) => void) => void): void;
    afterBulkDestroy(validator: (where: any, callback: (err?: any, where?: any) => void) => void): void;
    beforeBulkUpdate(name: string, validator: (instances: T[], where: any, callback: (err?: any, instances?: T[], where?: any) => void) => void): void;
    beforeBulkUpdate(validator: (instances: T[], where: any, callback: (err?: any, instances?: T[], where?: any) => void) => void): void;
    afterBulkUpdate(name: string, validator: (instances: T[], where: any, callback: (err?: any, instances?: T[], where?: any) => void) => void): void;
    afterBulkUpdate(validator: (instances: T[], where: any, callback: (err?: any, instances?: T[], where?: any) => void) => void): void;
  }

  export class SequelizeStatic {
    static fn(fn: string, ...args: any[]): Sequelize.Fn;
    static col(col: string): Sequelize.Col;
    static cast(val: any, type: string): Sequelize.Cast;
    static literal(val: any): Sequelize.Literal;
    static and(...args: string[]): Sequelize.And;
    static and(...args: Object[]): Sequelize.And;
    static or(...args: string[]): Sequelize.Or;
    static or(...args: Object[]): Sequelize.Or;
    static where(attr: string, condition: string): Sequelize.Where;
    static where(attr: string, condition: Object): Sequelize.Where;
    static condition(attr: string, condition: string): Sequelize.Where;
    static condition(attr: string, condition: Object): Sequelize.Where;

    static STRING: DataTypes.STRING;
    static CHAR: DataTypes.CHAR;
    static TEXT: DataTypes.TEXT;
    static INTEGER: DataTypes.INTEGER;
    static BIGINT: DataTypes.BIGINT;
    static DATE: DataTypes.DATE;
    static BOOLEAN: DataTypes.BOOLEAN;
    static FLOAT: DataTypes.FLOAT;
    static NOW: DataTypes.NOW;
    static BLOB: DataTypes.BLOB;
    static DECIMAL: DataTypes.DECIMAL;
    static UUID: DataTypes.UUID;
    static UUIDV1: DataTypes.UUIDV1;
    static UUIDV4: DataTypes.UUIDV4;
    static VIRTUAL: DataTypes.VIRTUAL;
    static NONE: DataTypes.VIRTUAL;
    static ENUM: DataTypes.ENUM;
    static ARRAY: DataTypes.ARRAY;
    static HSTORE: DataTypes.HSTORE;
  }

  export interface Instance<T> {
    Model: Model<Instance<T>, T>;
    sequelize: Sequelize;

    isNewRecord: boolean;
    isDeleted: boolean;
    isDirty: boolean;
    values: T;
    primaryKeyValues: T;
    getDataValue(key: string): any;
    setDataValue(key: string, value: any): void;
    get(): T;
    get(key: string): any;
    set(key: string, value: any, options?: { raw?: boolean; reset?: boolean; include?: IIncludeOptions }): void;
    set(key: IFindOptions, value: any, options?: { raw?: boolean; reset?: boolean; include?: IIncludeOptions }): void;
    set(values: Object, options?: { raw?: boolean; reset?: boolean; include?: IIncludeOptions; attributes: string[]; }): void;
    setAttributes(key: string, value: any, options?: { raw?: boolean; reset?: boolean; include?: IIncludeOptions }): void;
    setAttributes(key: IFindOptions, value: any, options?: { raw?: boolean; reset?: boolean; include?: IIncludeOptions }): void;
    changed(): string[];
    changed(key: string): boolean;
    previous(key: string): any;
    save(fields?: string[], options?: { fields?: Object; silent?: boolean; transaction?: Transaction; }): PromiseT<Instance<T>>;
    reload(options?: IFindOptions): PromiseT<Instance<T>>;
    validate(options?: { skip?: string[] }): PromiseT<Error>;
    updateAttributes(updates: Object, options?: { fields?: Object; silent?: boolean; transaction?: Transaction; }): PromiseT<Instance<T>>;
    destroy(options?: { force?: boolean }): Promise;
    increment(field: string, options?: { by?: number; transaction?: Transaction; }): Promise;
    increment(fields: string[], options?: { by?: number; transaction?: Transaction; }): Promise;
    increment(fields: { [key: string]: number; }, options?: { by?: number; transaction?: Transaction; }): Promise;
    decrement(field: string, options?: { by?: number; transaction?: Transaction; }): Promise;
    decrement(fields: string[], options?: { by?: number; transaction?: Transaction; }): Promise;
    decrement(fields: { [key: string]: number; }, options?: { by?: number; transaction?: Transaction; }): Promise;

    equals<U>(other: Instance<U>): boolean;
    equalsOneOf(others: any[]): boolean;
    toJSON(): T;
  }
  export interface Model<I extends Instance<{}>, T> extends Associations, Hooks<I> {
    sequelize: Sequelize;
    name: string;
    tableName: string;

    sync(options?: { force?: boolean; }): Sequelize.PromiseT<Model<I, T>>;
    drop(options?: { cascade?: boolean; }): Sequelize.Promise;

    schema(schema: string, options?: { schemaDelimiter: string; }): Model<I, T>;
    getTableName(options: Object): { tableName: string; table: string; name: string; schema: string; delimiter: string; };

    scope(options?: string): Model<I, T>;
    scope(options?: Object): Model<I, T>;
    scope(options?: Object[]): Model<I, T>;

    findAll(options?: IFindOptions, queryOptions?: { transaction?: Transaction; lock?: string; }): PromiseT<I[]>;
    all(options?: IFindOptions, queryOptions?: { transaction?: Transaction; lock?: string; }): PromiseT<I[]>;
    find(id: number, queryOptions?: { transaction?: Transaction; lock?: string; }): PromiseT<I>;
    find(options?: IFindOptions, queryOptions?: { transaction?: Transaction; lock?: string; }): PromiseT<I>;
    find(limit?: number, queryOptions?: { transaction?: Transaction; lock?: string; }): PromiseT<I[]>;
    aggregate<U>(field: string, aggregateFunction: string, options?: { dataType: DataTypes.Type; distinct: boolean; }): PromiseT<U>;
    count(options?: IFindOptions): PromiseT<number>;
    findAndCountAll(options?: IFindOptions, queryOptions?: { transaction?: Transaction; lock?: string; }): PromiseT<{ rows: I[]; count: number;}>;
    max<U>(field: string, options?: { dataType?: DataTypes.Type; distinct?: boolean; }): PromiseT<U>;
    min<U>(field: string, options?: { dataType?: DataTypes.Type; distinct?: boolean; }): PromiseT<U>;
    sum<U>(field: string, options?: { dataType?: DataTypes.Type; distinct?: boolean; }): PromiseT<U>;

    build(values: T, options?: { raw?: boolean; isNewRecord?: boolean; isDirty?: boolean; include?: IIncludeOptions[]; }): I;
    create(values: T, options?: { raw?: boolean; isNewRecord?: boolean; isDirty?: boolean; fields?: string[]; include?: IIncludeOptions[]; transaction?: Transaction; }): PromiseT<I>;
    findOrInitialize(where: Object, defaults?: Object, options?: IQueryOptions): PromiseT2<I, boolean>;
    findOrCreate(where: Object, defaults?: Object, options?: IFindOrCreateOptions): PromiseT2<I, boolean>;

    bulkCreate(records: T[], options?: { fields?: string[]; validate?: boolean; hooks?: boolean; individualHooks?: boolean; ignoreDuplicates?: boolean; }): PromiseT<I[]>;
    destroy(where?: Object, options?: { hooks?: boolean; individualHooks?: boolean; limit?: number; truncate?: boolean; }): PromiseT<number>;
    update(attrValueHash: Object, where: Object, options?: { validate?: boolean; hooks?: boolean; individualHooks?: boolean; returning?: boolean; limit?: number; }): PromiseT<number>;
    describe<U>(): PromiseT<U>;
    dataset(): any; // node-sql instance.
  }
  export interface ModelT<T> extends Model<Instance<T>, T> {}

  export interface Associations {
    hasOne<I extends Instance<{}>, T>(target: Model<I, T>, options?: IAssociationOptions): Associations;
    belongsTo<I extends Instance<{}>, T>(target: Model<I, T>, options?: IAssociationOptions): Associations;
    hasMany<I extends Instance<{}>, T>(target: Model<I, T>, options?: IAssociationOptions): Associations;
  }

  export interface Promise {
    ok(onSuccess: () => void): Promise;
    success(onSuccess: () => void): Promise;

    error(onError: (err?: any) => void): Promise;
    fail(onError: (err?: any) => void): Promise;
    failure(onError: (err?: any) => void): Promise;

    done(onDone: (err: any) => void): Promise;
    complete(onDone: (err: any) => void): Promise;

    sql(onSQL: (sql: string) => void): Promise;
    proxy(promise: Promise, options?: IProxyOptions): Promise;
  }
  export interface PromiseT<T> {
    ok(onSuccess: (result: T) => void): PromiseT<T>;
    success(onSuccess: (result: T) => void): PromiseT<T>;

    error(onError: (err: any) => void): PromiseT<T>;
    fail(onError: (err: any) => void): PromiseT<T>;
    failure(onError: (err: any) => void): PromiseT<T>;

    done(onDone: (err: any, result: T) => void): PromiseT<T>;
    complete(onDone: (err: any, result: T) => void): PromiseT<T>;

    sql(onSQL: (sql: string) => void): PromiseT<T>;
    proxy(promise: PromiseT<T>, options?: IProxyOptions): PromiseT<T>;
  }
  export interface PromiseT2<T, U> {
    ok(onSuccess: (t: T, u: U) => void): PromiseT2<T, U>;
    success(onSuccess: (t: T, u: U) => void): PromiseT2<T, U>;

    error(onError: (err: any) => void): PromiseT2<T, U>;
    fail(onError: (err: any) => void): PromiseT2<T, U>;
    failure(onError: (err: any) => void): PromiseT2<T, U>;

    done(onDone: (err: any, t: T, u: U) => void): PromiseT2<T, U>;
    complete(onDone: (err: any, t: T, u: U) => void): PromiseT2<T, U>;

    sql(onSQL: (sql: string) => void): PromiseT2<T, U>;
    proxy(promise: PromiseT<T>, options?: IProxyOptions): PromiseT2<T, U>;
  }

  export interface QueryInterface {
  }

  export interface Transaction extends TransactionStatic {
    commit(): PromiseT<Transaction>;
    rollback(): PromiseT<Transaction>;
  }
  export interface TransactionStatic {
    ISOLATION_LEVELS: {
      READ_UNCOMMITTED: string; // "READ UNCOMMITTED"
      READ_COMMITTED: string; // "READ COMMITTED"
      REPEATABLE_READ: string; // "REPEATABLE READ"
      SERIALIZABLE: string; // "SERIALIZABLE"
    };
    LOCK: {
      UPDATE: string; // 'UPDATE'
      SHARE: string; // 'SHARE'
    };
  }
}

declare module "sequelize" {
  export = Sequelize;
}

