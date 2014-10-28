/// <reference path="sequelize.d.ts" />

import Sequelize = require('sequelize');

(function models() {

var sequelize = new Sequelize('database', 'username');

var Project = sequelize.define('Project', {
  title: Sequelize.STRING,
  description: Sequelize.TEXT
});
var Task = sequelize.define('Task', {
  title: Sequelize.STRING,
  description: Sequelize.TEXT,
  deadline: Sequelize.DATE
});

var Foo = sequelize.define('Foo', {
  // instantiating will automatically set the flag to true if not set
  flag: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true},

  // default values for dates => current time
  myDate: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },

  // setting allowNull to false will add NOT NULL to the column, which means an error will be
  // thrown from the DB when the query is executed if the column is null. If you want to check that a value
  // is not null before querying the DB, look at the validations section below.
  title: { type: Sequelize.STRING, allowNull: false},

  // Creating two objects with the same value will throw an error. The unique property can be either a
  // boolean, or a string. If you provide the same string for multiple columns, they will form a
  // composite unique key.
  someUnique: {type: Sequelize.STRING, unique: true},
  uniqueOne: { type: Sequelize.STRING,  unique: 'compositeIndex'},
  uniqueTwo: { type: Sequelize.INTEGER, unique: 'compositeIndex'},

  // Go on reading for further information about primary keys
  identifier: { type: Sequelize.STRING, primaryKey: true},

  // autoIncrement can be used to create auto_incrementing integer columns
  incrementMe: { type: Sequelize.INTEGER, autoIncrement: true },

  // Comments can be specified for each field for MySQL and PG
  hasComment: { type: Sequelize.INTEGER, comment: "I'm a comment!" }
});

// for enums:
sequelize.define('model', {

  a: Sequelize.STRING,                      // VARCHAR(255)
  b: Sequelize.STRING(1234),                // VARCHAR(1234)
  c: Sequelize.STRING.BINARY,               // VARCHAR BINARY
  d: Sequelize.TEXT,                        // TEXT

  e: Sequelize.INTEGER,                     // INTEGER
  f: Sequelize.BIGINT,                      // BIGINT
  g: Sequelize.BIGINT(11),                  // BIGINT(11)
  h: Sequelize.FLOAT,                       // FLOAT
  i: Sequelize.FLOAT(11),                   // FLOAT(11)
  j: Sequelize.FLOAT(11, 12),               // FLOAT(11,12)

  k: Sequelize.DECIMAL,                     // DECIMAL
  l: Sequelize.DECIMAL(10, 2),              // DECIMAL(10,2)

  m: Sequelize.DATE,                        // DATETIME for mysql / sqlite, TIMESTAMP WITH TIME ZONE for postgres
  n: Sequelize.BOOLEAN,                     // TINYINT(1)

  o: Sequelize.ENUM('value 1', 'value 2'),  // An ENUM with allowed values 'value 1' and 'value 2'
  p: Sequelize.ARRAY(Sequelize.TEXT),       // Defines an array. PostgreSQL only.

  q: Sequelize.BLOB,                        // BLOB (bytea for PostgreSQL)
  r: Sequelize.BLOB('tiny'),                // TINYBLOB (bytea for PostgreSQL. Other options are medium and long)
  s: Sequelize.UUID,                        // UUID datatype for PostgreSQL and SQLite, CHAR(36) BINARY for MySQL (use defaultValue: Sequelize.UUIDV1 or Sequelize.UUIDV4 to make sequelize generate the ids automatically)

  t: Sequelize.INTEGER.UNSIGNED,              // INTEGER UNSIGNED
  u: Sequelize.INTEGER(11).UNSIGNED,          // INTEGER(11) UNSIGNED
  v: Sequelize.INTEGER(11).ZEROFILL,          // INTEGER(11) ZEROFILL
  w: Sequelize.INTEGER(11).ZEROFILL.UNSIGNED, // INTEGER(11) UNSIGNED ZEROFILL
  x: Sequelize.INTEGER(11).UNSIGNED.ZEROFILL, // INTEGER(11) UNSIGNED ZEROFILL

  states: {
    type:   Sequelize.ENUM,
    values: ['active', 'pending', 'deleted']
  }
});

var Foo = sequelize.define('Foo', {
  name: Sequelize.STRING,
  title: {
    type     : Sequelize.STRING,
    allowNull: false,
    get      : function()  {
       /*
         do your magic here and return something!
         'this' allows you to access attributes of the model.

        example: this.getDataValue('name') works
      */
    },
    set      : function(v: any) { /* do your magic with the input here! */ }
  }
});


var slugify = function(str: string) {
  var from  = "ąàáäâãåæćęèéëêìíïîłńòóöôõøśùúüûñçżź",
      to    = "aaaaaaaaceeeeeiiiilnoooooosuuuunczz",
      regex = new RegExp('[' + from.replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1') + ']', 'g');

  if (str == null) return '';
  str = String(str).toLowerCase().replace(regex, function(c) {
    return to.charAt(from.indexOf(c)) || '-';
  });
  return str.replace(/[^\w\s-]/g, '').replace(/([A-Z])/g, '-$1').replace(/[-_\s]+/g, '-').toLowerCase();
}

var Foo = sequelize.define('Foo', {
  title: {
    type     : Sequelize.STRING,
    allowNull: false,
  }
}, {
  getterMethods   : {
    title       : function()  { return this.getDataValue('title'); },
    title_slug  : function()  { return slugify(this.title); }
  },
  setterMethods   : {
    title       : function(title: any) { return this.setDataValue('title', title.toString().toLowerCase()); }
  }
});


var ValidateMe = sequelize.define('Foo', {
  foo: {
    type: Sequelize.STRING,
    validate: {
      is: ["^[a-z]+$",'i'],     // will only allow letters
      not: ["[a-z]",'i'],       // will not allow letters
      isEmail: true,            // checks for email format (foo@bar.com)
      isUrl: true,              // checks for url format (http://foo.com)
      isIP: true,               // checks for IPv4 (129.89.23.1) or IPv6 format
      isIPv4: true,             // checks for IPv4 (129.89.23.1)
      isIPv6: true,             // checks for IPv6 format
      isAlpha: true,            // will only allow letters
      isAlphanumeric: true,     // will only allow alphanumeric characters, so "_abc" will fail
      isNumeric: true,          // will only allow numbers
      isInt: true,              // checks for valid integers
      isFloat: true,            // checks for valid floating point numbers
      isDecimal: true,          // checks for any numbers
      isLowercase: true,        // checks for lowercase
      isUppercase: true,        // checks for uppercase
      notNull: true,            // won't allow null
      isNull: true,             // only allows null
      notEmpty: true,           // don't allow empty strings
      equals: 'specific value', // only allow a specific value
      contains: 'foo',          // force specific substrings
      notIn: [['foo', 'bar']],  // check the value is not one of these
      isIn: [['foo', 'bar']],   // check the value is one of these
      notContains: 'bar',       // don't allow specific substrings
      len: [2,10],              // only allow values with length between 2 and 10
      isUUID: 4,                // only allow uuids
      isDate: true,             // only allow date strings
      isAfter: "2011-11-05",    // only allow date strings after a specific date
      isBefore: "2011-11-05",   // only allow date strings before a specific date
      max: 23,                  // only allow values <= 23
      min: 23,                  // only allow values >= 23
      isArray: true,            // only allow arrays
      isCreditCard: true,       // check for valid credit card numbers

      // custom validations are also possible:
      isEven: function(value: any) {
        if(parseInt(value) % 2 != 0) {
          throw new Error('Only even values are allowed!')
        // we also are in the model's context here, so this.otherField
        // would get the value of otherField if it existed
        }
      },
      isIn2: {
        args: [['en', 'zh']],
        msg: "Must be English or Chinese"
      }
    }
  }
});

var Pub = sequelize.define('Pub', {
  name: { type: Sequelize.STRING },
  address: { type: Sequelize.STRING },
  latitude: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: null,
    validate: { min: -90, max: 90 }
  },
  longitude: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: null,
    validate: { min: -180, max: 180 }
  },
}, {
  validate: {
    bothCoordsOrNone: function() {
      if ((this.latitude === null) === (this.longitude === null)) {
        throw new Error('Require either both latitude and longitude or neither')
      }
    }
  }
});

var Bar = sequelize.define('Bar', { /* bla */ }, {
  // don't add the timestamp attributes (updatedAt, createdAt)
  timestamps: false,

  // don't delete database entries but set the newly added attribute deletedAt
  // to the current date (when deletion was done). paranoid will only work if
  // timestamps are enabled
  paranoid: true,

  // don't use camelcase for automatically added attributes but underscore style
  // so updatedAt will be updated_at
  underscored: true,

  // disable the modification of tablenames; By default, sequelize will automatically
  // transform all passed model names (first parameter of define) into plural.
  // if you don't want that, set the following
  freezeTableName: true,

  // define the table's name
  tableName: 'my_very_custom_table_name'
});
var Foo = sequelize.define('Foo',  { /* bla */ }, {
  // don't forget to enable timestamps!
  timestamps: true,

  // I don't want createdAt
  createdAt: false,

  // I want updatedAt to actually be called updateTimestamp
  updatedAt: 'updateTimestamp',

  // And deletedAt to be called destroyTime (remember to enable paranoid for this to work)
  deletedAt: 'destroyTime',
  paranoid: true
});
var Person = sequelize.define('Person', { /* attributes */ }, {
  engine: 'MYISAM'
});
// or globally
var sequelize = new Sequelize('db', 'user', 'pw', {
  define: { engine: 'MYISAM' }
});
var Person = sequelize.define('Person', { /* attributes */ }, {
  comment: "I'm a table comment!"
});


// in your server file - e.g. app.js
var Project = sequelize.import(__dirname + "/path/to/models/project")


// Create the tables:
Project.sync(); // will emit success or failure event
Task.sync(); // will emit success or failure event

// Force the creation!
Project.sync({force: true}); // this will drop the table first and re-create it afterwards

// drop the tables:
Project.drop(); // will emit success or failure event
Task.drop(); // will emit success or failure event

// event handling:
Project.sync().success(function() {
  // ok ... everything is nice!
}).error(function(error) {
  // oooh, did you entered wrong database credentials?
});
Project.drop().success(function() {
  // ok ... everything is nice!
}).error(function(error) {
  // oooh, did you entered wrong database credentials?
});

// create all tables... now!
sequelize.sync(); // will emit success or failure

// force it!
sequelize.sync({force: true}); // emit ... nomnomnom

// want to drop 'em all?
sequelize.drop(); // I guess you've got it (emit)

// emit handling:
sequelize.sync().success(function() {
  // woot woot
}).error(function(error) {
  // whooops
});
sequelize.drop().success(function() {
  // woot woot
}).error(function(error) {
  // whooops
});


// search for known ids
Project.find(123).success(function(project) {
  // project will be an instance of Project and stores the content of the table entry
  // with id 123. if such an entry is not defined you will get null
});

// search for attributes
Project.find({ where: {title: 'aProject'} }).success(function(project) {
  // project will be the first entry of the Projects table with the title 'aProject' || null
});

// since v1.3.0: only select some attributes and rename one
Project.find({
  where: {title: 'aProject'},
  attributes: ['id', 'name', 'title']
}).success(function(project) {
  // project will be the first entry of the Projects table with the title 'aProject' || null
  // project.title will contain the name of the project
});

Project
  .findAndCountAll({
     where: ["title LIKE 'foo%'"],
     offset: 10,
     limit: 2
  })
  .success(function(result) {
    console.log(result.count);
    console.log(result.rows);
  });

// find multiple entries
Project.findAll().success(function(projects) {
  // projects will be an array of all Project instances
});

// also possible:
Project.all().success(function(projects) {
  // projects will be an array of all Project instances
});

// search for specific attributes - hash usage
Project.findAll({ where: { name: 'A Project' } }).success(function(projects) {
  // projects will be an array of Project instances with the specified name
});

// search with string replacements
Project.findAll({ where: ["id > ?", 25] }).success(function(projects) {
  // projects will be an array of Projects having a greater id than 25
});

// search within a specific range
Project.findAll({ where: { id: [1,2,3] } }).success(function(projects) {
  // projects will be an array of Projects having the id 1, 2 or 3
  // this is actually doing an IN query
});

// or
Project.findAll({ where: "name = 'A Project'" }).success(function(projects) {
  // the difference between this and the usage of hashes (objects) is, that string usage
  // is not sql injection safe. so make sure you know what you are doing!
});

// since v1.7.0 we can now improve our where searches
Project.findAll({
  where: {
    id: {
      gt: 6,              // id > 6
      gte: 6,             // id >= 6
      lt: 10,             // id < 10
      lte: 10,            // id <= 10
      ne: 20,             // id != 20
      between: [6, 10],   // BETWEEN 6 AND 10
      nbetween: [11, 15]  // NOT BETWEEN 11 AND 15
    }
  }
});

Project.find({
  where: Sequelize.and(
    { name: 'a project' },
    Sequelize.or(
      { id: [1,2,3] },
      { id: { lt: 10 } }
    )
  )
}, { raw: true });

// limit the results of the query
Project.findAll({ limit: 10 });

// step over the first 10 elements
Project.findAll({ offset: 10 });

// step over the first 10 elements, and take 2
Project.findAll({ offset: 10, limit: 2 });

Project.findAll({ order: [['title', 'DESC']] });
// yields ORDER BY title DESC

Project.findAll({ group: 'name' });
// yields GROUP BY name

Project.find({
  order: [
    'name',
    // will return `name`
    'username DESC',
    // will return `username DESC` -- i.e. don't do it!
    ['username', 'DESC'],
    // will return `username` DESC
    Sequelize.fn('max', Sequelize.col('age')),
    // will return max(`age`)
    [Sequelize.fn('max', Sequelize.col('age')), 'DESC'],
    // will return max(`age`) DESC
    [Sequelize.fn('otherfunction', Sequelize.col('col1'), 12, 'lalala'), 'DESC'],
    // will return otherfunction(`col1`, 12, 'lalala') DESC
    [Sequelize.fn('otherfunction', Sequelize.fn('awesomefunction', Sequelize.col('col'))), 'DESC'],
    // will return otherfunction(awesomefunction(`col`)) DESC, This nesting is potentially infinite!
    [{ raw: 'otherfunction(awesomefunction(`col`))' }, 'DESC']
    // This won't be quoted, but direction will be added
  ]
});


Project.count().success(function(c) {
  console.log("There are " + c + " projects!")
});

Project.count({ where: ["id > ?", 25] }).success(function(c) {
  console.log("There are " + c + " projects with an id greater than 25.")
});

/*
  Let's assume 3 person objects with an attribute age.
  The first one is 10 years old,
  the second one is 5 years old,
  the third one is 40 years old.
*/
Project.max('age').success(function(max) {
  // this will return 40
});

Project.max('age', { where: { age: { lt: 20 } } }).success(function(max) {
  // wil be 10
});

/*
  Let's assume 3 person objects with an attribute age.
  The first one is 10 years old,
  the second one is 5 years old,
  the third one is 40 years old.
*/
Project.min('age').success(function(min) {
  // this will return 5
});

Project.min('age', { where: { age: { gt: 5 } } }).success(function(min) {
  // wil be 10
});

/*
  Let's assume 3 person objects with an attribute age.
  The first one is 10 years old,
  the second one is 5 years old,
  the third one is 40 years old.
*/
Project.sum('age').success(function(sum) {
  // this will return 55
});

Project.sum('age', { where: { age: { gt: 5 } } }).success(function(sum) {
  // wil be 50
});

})();


interface IFooInstance extends Sequelize.Instance<{}> {
  method2(): string;
}
interface IFooModel extends Sequelize.Model<IFooInstance, {}> {
  method1(): string;
}
interface IUserType {
  firstname: string;
  lastname: string;
}
interface IUserInstance extends Sequelize.Instance<IUserType> {
  getFullname(): string;
}
interface IGlobalInstance<T> extends Sequelize.Instance<T> {
  method3(): void;
}
interface IGlobalModel<T> extends Sequelize.Model<IGlobalInstance<T>, {}> {
  method1(): void;
  method2(): void;
}

(function models2() {

var Foo = sequelize.define<IFooModel>('Foo', { /* attributes */}, {
  classMethods: {
    method1: function(){ return 'smth' }
  },
  instanceMethods: {
    method2: function() { return 'foo' }
  }
})
// Example:
Foo.method1();
Foo.build({}).method2();

var User = sequelize.define<Sequelize.Model<IUserInstance, IUserType>>('User', { firstname: Sequelize.STRING, lastname: Sequelize.STRING }, {
  instanceMethods: {
    getFullname: function() {
      return [this.firstname, this.lastname].join(' ');
    }
  }
});
// Example:
User.build({ firstname: 'foo', lastname: 'bar' }).getFullname(); // 'foo bar'

var sequelize = new Sequelize('database', 'username', 'password', {
  // Other options during the initialization could be here
  define: {
    classMethods: {
      method1: function() {},
      method2: function() {}
    },
    instanceMethods: {
      method3: function() {}
    }
  }
});
// Example:
var Foo2 = sequelize.define<IGlobalModel<{}>>('Foo', { /* attributes */});
Foo2.method1();
Foo2.method2();
Foo2.build({}).method3();


var User2 = sequelize.define<Sequelize.ModelT<{ username: string; job: string; }>>('User2', { username: Sequelize.STRING, job: Sequelize.STRING });
User2
  .findOrCreate({ username: 'sdepold' }, { job: 'Technical Lead JavaScript' })
  .success(function(user, created) {
    console.log(user.values)
    console.log(created)

    /*
      {
        username: 'sdepold',
        job: 'Technical Lead JavaScript',
        id: 1,
        createdAt: Fri Mar 22 2013 21: 28: 34 GMT + 0100(CET),
        updatedAt: Fri Mar 22 2013 21: 28: 34 GMT + 0100(CET)
      }
      created: true
    */
  });
User2
  .create({ username: 'fnord', job: 'omnomnom' })
  .success(function() {
    User
      .findOrCreate({ username: 'fnord' }, { job: 'something else' })
      .success(function(user, created) {
        console.log(user.values)
        console.log(created)

        /*
          {
            username: 'fnord',
            job: 'omnomnom',
            id: 2,
            createdAt: Fri Mar 22 2013 21: 28: 34 GMT + 0100(CET),
            updatedAt: Fri Mar 22 2013 21: 28: 34 GMT + 0100(CET)
          }
          created: false
        */
      })
  });

})();

(function models3() {

var sequelize = new Sequelize('database', 'username', 'password');

var User = sequelize.define<Sequelize.ModelT<{name:string;}>>('User', { name: Sequelize.STRING });
var Task = sequelize.define<Sequelize.ModelT<{name:string;}>>('Task', { name: Sequelize.STRING });
var Tool = sequelize.define<Sequelize.ModelT<{name:string;}>>('Tool', { name: Sequelize.STRING });

Task.belongsTo(User);
User.hasMany(Task);
User.hasMany(Tool, { as: 'Instruments' });

sequelize.sync().done(function() {
  // this is where we continue ...
});

Task.findAll({ include: [{ model: User }] }).success(function(tasks) {
  console.log(JSON.stringify(tasks))

  /*
    [{
      "name": "A Task",
      "id": 1,
      "createdAt": "2013-03-20T20:31:40.000Z",
      "updatedAt": "2013-03-20T20:31:40.000Z",
      "UserId": 1,
      "user": {
        "name": "John Doe",
        "id": 1,
        "createdAt": "2013-03-20T20:31:45.000Z",
        "updatedAt": "2013-03-20T20:31:45.000Z"
      }
    }]
  */
});
User.findAll({ include: [{ model: Task }] }).success(function(users) {
  console.log(JSON.stringify(users))

  /*
    [{
      "name": "John Doe",
      "id": 1,
      "createdAt": "2013-03-20T20:31:45.000Z",
      "updatedAt": "2013-03-20T20:31:45.000Z",
      "tasks": [{
        "name": "A Task",
        "id": 1,
        "createdAt": "2013-03-20T20:31:40.000Z",
        "updatedAt": "2013-03-20T20:31:40.000Z",
        "UserId": 1
      }]
    }]
  */
});
User.findAll({ include: [{ model: Tool, as: 'Instruments' }] }).success(function(users) {
  console.log(JSON.stringify(users))

  /*
    [{
      "name": "John Doe",
      "id": 1,
      "createdAt": "2013-03-20T20:31:45.000Z",
      "updatedAt": "2013-03-20T20:31:45.000Z",
      "instruments": [{
        "name": "Toothpick",
        "id": 1,
        "createdAt": null,
        "updatedAt": null,
        "UserId": 1
      }]
    }]
  */
});


var Company: Sequelize.ModelT<{}>;
var Division: Sequelize.ModelT<{}>;
var Department: Sequelize.ModelT<{}>;
var DepartmentDivision: Sequelize.ModelT<{}>;

Company.findAll({ include: [{ model: Division }], order: [ [ Division, 'name' ] ] });
Company.findAll({ include: [{ model: Division }], order: [ [ Division, 'name', 'DESC' ] ] });
Company.findAll({
  include: [ { model: Division, as: 'Div' } ],
  order: [ [ { model: Division, as: 'Div' }, 'name' ] ]
});
Company.findAll({
  include: [ { model: Division, include: [{ model: Department }] } ],
  order: [ [ Division, Department, 'name' ] ]
});
Company.findAll({
  include: [ { model: Division, include: [{ model: Department }] } ],
  order: [ [ Division, DepartmentDivision, 'name' ] ]
});


var Teacher: Sequelize.ModelT<{}>;
User.findAll({
  include: [
    {model: Tool, as: 'Instruments', include: [
      {model: Teacher }
    ]}
  ]
}).success(function(users) {
  console.log(JSON.stringify(users))

  /*
    [{
      "name": "John Doe",
      "id": 1,
      "createdAt": "2013-03-20T20:31:45.000Z",
      "updatedAt": "2013-03-20T20:31:45.000Z",
      "instruments": [{ // 1:M and N:M association
        "name": "Toothpick",
        "id": 1,
        "createdAt": null,
        "updatedAt": null,
        "UserId": 1,
        "Teacher": { // 1:1 association
          "name": "Jimi Hendrix"
        }
      }]
    }]
  */
});

Tool.findAll({ include: [{ model: User }] }).success(function(tools) {
  console.log(JSON.stringify(tools))
})
// Error: User is not associated to Tool!

})();

