// Type definitions for Sequelize 2.0.0
// Project: http://sequelizejs.com/
// Definitions by: horiuchi <https://github.com/horiuchi/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

///<reference path="../node/node.d.ts" />
///<reference path="../bluebird/bluebird.d.ts" />


declare module "sequelize" {
  import _Promise = require("bluebird");

  class Sequelize extends Sequelize.SequelizeStatic {
    constructor(connectionString: string, options?: Sequelize.IConfigOptions);
    constructor(database: string, username: string, options?: Sequelize.IConfigOptions);
    constructor(database: string, username: string, password: string, options?: Sequelize.IConfigOptions);

    getDialect(): string;
    getQueryInterface(): Sequelize.QueryInterface;

    define<M extends Sequelize.ModelT<{}>>(modelName: string, attributes: Object, options?: Sequelize.IDefineOptions): M;
    model<M extends Sequelize.ModelT<{}>>(modelName: string): M;
    isDefined(modelName: string): boolean;
    import<M extends Sequelize.ModelT<{}>>(path: string, fn?: (self: Sequelize, dataType: Sequelize.DataTypes) => M): M;

    query<I extends Sequelize.Instance<{}>, T>(sql: string, callee?: Sequelize.Model<I, T>, options?: Sequelize.IQueryOptions, replacements?: Object): Promise<I[]>;
    createSchema<T>(schema: string): Promise<T>;
    showAllSchemas<T>(): Promise<T>;
    dropSchema<T>(schema: string): Promise<T>;
    dropAllSchemas<T>(): Promise<T>;
    sync<T>(options?: { force?: boolean; logging?: (message: any, ...optionalParams: any[]) => void; schema?: string; }): Promise<T>;
    drop<T>(options?: { cascade?: boolean; }): Promise<T>;
    authenticate<T>(): Promise<T>;
    validate<T>(): Promise<T>;

    transaction(options?: { autocommit: boolean; isolationLevel: string; }): Promise<Sequelize.Transaction>;
  }

  module Sequelize {
    export interface Promise<T> extends _Promise<T> {
    }

    interface IAssociationOptions {
      hooks?: boolean;
      as?: string;
      foreignKey?: string;
      through?: any;  // string or Model
      onDelete?: string;
      onUpdate?: string;
      constraints?: boolean;
    }
    interface IConfigOptions extends IServerOptions {
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
    interface IDefineOptions {
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
    interface IDefineIndexOptions {
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
    interface IFindOptions {
      where?: any;
      attributes?: string[];
      include?: IIncludeOptions[];
      order?: any[];
      limit?: number;
      offset?: number;
    }
    interface IFindOrCreateOptions extends IFindOptions, IQueryOptions {
    }
    interface IIncludeOptions {
      model: Model<any, any>;
      as?: string;
      where?: Object;
      attributes?: string[];
      required?: boolean;
      include?: IIncludeOptions[];
    }
    interface IPoolOptions {
      maxConnections?: number;
      minConnections?: number;
      maxIdleTime?: number;
      validateConnection?: (client?: any) => boolean;
    }
    interface IProxyOptions {
      events: string[];
    }
    interface IQueryOptions {
      logging?: any;
      plain?: boolean;
      raw?: boolean;
      transaction?: Transaction;
      type?: string;
    }
    interface IReplicationOptions {
      read?: IServerOptions[];
      write?: IServerOptions;
    }
    interface IServerOptions {
      host?: string;
      port?: number;
      database?: string;
      username?: string;
      password?: string;
    }

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

    class DataTypes {
      STRING: DataTypes.STRING;
      CHAR: DataTypes.CHAR;
      TEXT: DataTypes.TEXT;
      INTEGER: DataTypes.INTEGER;
      BIGINT: DataTypes.BIGINT;
      DATE: DataTypes.DATE;
      BOOLEAN: DataTypes.BOOLEAN;
      FLOAT: DataTypes.FLOAT;
      NOW: DataTypes.NOW;
      BLOB: DataTypes.BLOB;
      DECIMAL: DataTypes.DECIMAL;
      UUID: DataTypes.UUID;
      UUIDV1: DataTypes.UUIDV1;
      UUIDV4: DataTypes.UUIDV4;
      VIRTUAL: DataTypes.VIRTUAL;
      NONE: DataTypes.VIRTUAL;
      ENUM: DataTypes.ENUM;
      ARRAY: DataTypes.ARRAY;
      HSTORE: DataTypes.HSTORE;
    }

    interface Fn {
    }
    interface Col extends Fn {}
    interface Cast extends Fn {}
    interface Literal extends Fn {}
    interface And extends Fn {}
    interface Or extends Fn {}
    interface Where extends Fn {}

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

    class SequelizeStatic {
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

    interface Instance<T> {
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
      save(fields?: string[], options?: { fields?: Object; silent?: boolean; transaction?: Transaction; }): Promise<Instance<T>>;
      reload(options?: IFindOptions): Promise<Instance<T>>;
      validate(options?: { skip?: string[] }): Promise<Error>;
      updateAttributes(updates: Object, options?: { fields?: Object; silent?: boolean; transaction?: Transaction; }): Promise<Instance<T>>;
      destroy(options?: { force?: boolean }): Promise<void>;
      increment(field: string, options?: { by?: number; transaction?: Transaction; }): Promise<void>;
      increment(fields: string[], options?: { by?: number; transaction?: Transaction; }): Promise<void>;
      increment(fields: { [key: string]: number; }, options?: { by?: number; transaction?: Transaction; }): Promise<void>;
      decrement(field: string, options?: { by?: number; transaction?: Transaction; }): Promise<void>;
      decrement(fields: string[], options?: { by?: number; transaction?: Transaction; }): Promise<void>;
      decrement(fields: { [key: string]: number; }, options?: { by?: number; transaction?: Transaction; }): Promise<void>;

      equals<U>(other: Instance<U>): boolean;
      equalsOneOf(others: any[]): boolean;
      toJSON(): T;
    }
    interface Model<I extends Instance<{}>, T> extends Associations, Hooks<I> {
      sequelize: Sequelize;
      name: string;
      tableName: string;

      sync(options?: { force?: boolean; }): Promise<Model<I, T>>;
      drop(options?: { cascade?: boolean; }): Promise<void>;

      schema(schema: string, options?: { schemaDelimiter: string; }): Model<I, T>;
      getTableName(options: Object): { tableName: string; table: string; name: string; schema: string; delimiter: string; };

      scope(options?: string): Model<I, T>;
      scope(options?: Object): Model<I, T>;
      scope(options?: Object[]): Model<I, T>;

      findAll(options?: IFindOptions, queryOptions?: { transaction?: Transaction; lock?: string; }): Promise<I[]>;
      all(options?: IFindOptions, queryOptions?: { transaction?: Transaction; lock?: string; }): Promise<I[]>;
      find(id: number, queryOptions?: { transaction?: Transaction; lock?: string; }): Promise<I>;
      find(options?: IFindOptions, queryOptions?: { transaction?: Transaction; lock?: string; }): Promise<I>;
      find(limit?: number, queryOptions?: { transaction?: Transaction; lock?: string; }): Promise<I[]>;
      aggregate<U>(field: string, aggregateFunction: string, options?: { dataType: DataTypes.Type; distinct: boolean; }): Promise<U>;
      count(options?: IFindOptions): Promise<number>;
      findAndCountAll(options?: IFindOptions, queryOptions?: { transaction?: Transaction; lock?: string; }): Promise<{ rows: I[]; count: number;}>;
      max<U>(field: string, options?: { dataType?: DataTypes.Type; distinct?: boolean; }): Promise<U>;
      min<U>(field: string, options?: { dataType?: DataTypes.Type; distinct?: boolean; }): Promise<U>;
      sum<U>(field: string, options?: { dataType?: DataTypes.Type; distinct?: boolean; }): Promise<U>;

      build(values: T, options?: { raw?: boolean; isNewRecord?: boolean; isDirty?: boolean; include?: IIncludeOptions[]; }): I;
      create(values: T, options?: { raw?: boolean; isNewRecord?: boolean; isDirty?: boolean; fields?: string[]; include?: IIncludeOptions[]; transaction?: Transaction; }): Promise<I>;
      findOrInitialize(where: Object, defaults?: Object, options?: IQueryOptions): Promise<any[]>;  // [I, boolean]
      findOrCreate(where: Object, defaults?: Object, options?: IFindOrCreateOptions): Promise<any[]>;  // [I, boolean]

      bulkCreate(records: T[], options?: { fields?: string[]; validate?: boolean; hooks?: boolean; individualHooks?: boolean; ignoreDuplicates?: boolean; }): Promise<I[]>;
      destroy(options?: { where?: Object; hooks?: boolean; individualHooks?: boolean; limit?: number; force?: boolean; truncate?: boolean; cascade?: boolean; }): Promise<void>;
      update(values: Object, options?: { where: Object; validate?: boolean; hooks?: boolean; individualHooks?: boolean; returning?: boolean; limit?: number; }): Promise<number>;
      describe<U>(): Promise<U>;
      dataset(): any; // node-sql instance.
    }
    interface ModelT<T> extends Model<Instance<T>, T> {}

    interface Associations {
      hasOne<I extends Instance<{}>, T>(target: Model<I, T>, options?: IAssociationOptions): Associations;
      belongsTo<I extends Instance<{}>, T>(target: Model<I, T>, options?: IAssociationOptions): Associations;
      hasMany<I extends Instance<{}>, T>(target: Model<I, T>, options?: IAssociationOptions): Associations;
    }

    interface QueryInterface {
    }

    interface Transaction extends TransactionStatic {
      commit(): Promise<Transaction>;
      rollback(): Promise<Transaction>;
    }
    interface TransactionStatic {
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

  export = Sequelize;
}

