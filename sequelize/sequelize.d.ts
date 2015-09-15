// Type definitions for Sequelize 2.0.0
// Project: http://sequelizejs.com/
// Definitions by: horiuchi <https://github.com/horiuchi/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

///<reference path="../node/node.d.ts" />
///<reference path="../bluebird/bluebird.d.ts" />

declare namespace Sequelize {

  interface IAssociationOptions {
    hooks?: boolean;
    as?: string;
    foreignKey?: string;
    through?: string|Model<any, any>;
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
    createdAt?: boolean|string;
    updatedAt?: boolean|string;
    deletedAt?: boolean|string;
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
    fields: string[]|{
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
    transaction?: Transaction;
    lock?: string;
  }
  interface IFindOrCreateOptions extends IFindOptions, IQueryOptions {
  }
  interface IIncludeOptions {
    model: Model<any, any>;
    as?: string;
    association?: Associations;
    where?: Object;
    attributes?: string[];
    required?: boolean;
    through?: {
      where?: any;
      attributes?: string[];
    };
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
    raw?: boolean;
    transaction?: Transaction;
    lock?: string;
    type?: string;
    nest?: boolean;
    plain?: boolean;
    replacements?: any;
    useMaster?: boolean;
    logging?: any;
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

  interface DataTypes {
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

  interface SequelizeStaticAndInstance {
    fn(fn: string, ...args: any[]): Fn;
    col(col: string): Col;
    cast(val: any, type: string): Cast;
    literal(val: any): Literal;
    and(...args: string[]): And;
    and(...args: Object[]): And;
    or(...args: string[]): Or;
    or(...args: Object[]): Or;
    where(attr: string, condition: string): Where;
    where(attr: string, condition: Object): Where;
    condition(attr: string, condition: string): Where;
    condition(attr: string, condition: Object): Where;

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
  interface SequelizeStatic extends SequelizeStaticAndInstance {
    new(connectionString: string, options?: IConfigOptions): Sequelize;
    new(database: string, username: string, options?: IConfigOptions): Sequelize;
    new(database: string, username: string, password: string, options?: IConfigOptions): Sequelize;
  }
  interface Sequelize extends SequelizeStaticAndInstance {
    Sequelize: SequelizeStatic;

    getDialect(): string;
    getQueryInterface(): QueryInterface;

    define<M extends ModelT<{}>>(modelName: string, attributes: Object, options?: IDefineOptions): M;
    model<M extends ModelT<{}>>(modelName: string): M;
    isDefined(modelName: string): boolean;
    import<M extends ModelT<{}>>(path: string): M;

    query<I extends Instance<{}>, T>(sql: string, options?: IQueryOptions): Promise<I[]>;
    createSchema<T>(schema: string): Promise<T>;
    showAllSchemas<T>(): Promise<T>;
    dropSchema<T>(schema: string): Promise<T>;
    dropAllSchemas<T>(): Promise<T>;
    sync<T>(options?: { force?: boolean; logging?: (message: any, ...optionalParams: any[]) => void; schema?: string; }): Promise<T>;
    drop<T>(options?: { cascade?: boolean; }): Promise<T>;
    authenticate<T>(): Promise<T>;
    validate<T>(): Promise<T>;

    transaction(options?: { autocommit?: boolean; isolationLevel?: string; }): Promise<Transaction>;
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
    save(options?: { fields?: string[]; silent?: boolean; validate?: boolean; transaction?: Transaction; }): Promise<Instance<T>>;
    reload(options?: IFindOptions): Promise<Instance<T>>;
    validate(options?: { skip?: string[] }): Promise<Error>;
    updateAttributes(updates: Object, options?: { fields?: Object; silent?: boolean; transaction?: Transaction; }): Promise<Instance<T>>;
    destroy(options?: { force?: boolean; transaction?: Transaction; }): Promise<void>;
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

    findAll(options?: IFindOptions): Promise<I[]>;
    all(options?: IFindOptions): Promise<I[]>;
    findById(id: number|string|Buffer, options?: IFindOptions): Promise<I>;
    findByPrimary(id: number|string|Buffer, options?: IFindOptions): Promise<I>;
    find(options?: IFindOptions): Promise<I>;
    findOne(options?: IFindOptions): Promise<I>;
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

    bulkCreate(records: T[], options?: { fields?: string[]; validate?: boolean; hooks?: boolean; individualHooks?: boolean; ignoreDuplicates?: boolean; transaction?: Transaction; }): Promise<I[]>;
    destroy(options?: { where?: Object; hooks?: boolean; individualHooks?: boolean; limit?: number; force?: boolean; truncate?: boolean; cascade?: boolean; transaction?: Transaction }): Promise<number>;
    update(values: Object, options?: { where: Object; validate?: boolean; hooks?: boolean; individualHooks?: boolean; returning?: boolean; limit?: number; transaction?: Transaction; }): Promise<number>;
    upsert(values: Object, options?: { validate?: boolean; fields?: string[]; }): Promise<boolean>;

    describe<U>(): Promise<U>;
    dataset(): any; // node-sql instance.
  }
  interface ModelT<T> extends Model<Instance<T>, T> {}

  interface Associations {
    hasOne<I extends Instance<{}>, T>(target: Model<I, T>, options?: IAssociationOptions): Associations;
    belongsTo<I extends Instance<{}>, T>(target: Model<I, T>, options?: IAssociationOptions): Associations;
    belongsToMany<I extends Instance<{}>, T>(target: Model<I, T>, options?: IAssociationOptions): Associations;
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

declare module "sequelize" {
  var sequelize: Sequelize.SequelizeStatic;
  export = sequelize;
}

