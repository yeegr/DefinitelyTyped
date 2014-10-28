/// <reference path="sequelize.d.ts" />

import Sequelize = require('sequelize');

(function sampleUsage1() {
  var sequelize = new Sequelize('sample','','',{dialect:'sqlite',storage:'./sample.db'});

  sequelize.query('select * from test',null,{raw:true}).then(function(rows: any[]) {
    console.log(rows);
  });
})();

(function sampleUsage2() {
  var sequelize = new Sequelize('sample','','',{dialect:'sqlite',storage:'./sample_development.db'});

  var User = sequelize.define('User', {
    username: Sequelize.STRING,
    password: Sequelize.STRING
  });

  sequelize
    .sync({force: true})
    .finally(function(err: any) {
      if (err) {
        console.log('An error occurred while creating the table:', err);
      } else {
        console.log('It worked');
        var user = User.build({
          username: 'username',
          password: 'pass'
        });
        user
          .save()
          .finally(function(err: any) {
            User.findAll({where:['id>?',0]}).then(function(result) {
              console.log(result);
            });
          }
        );
      }
    }
  );

  var Model = sequelize.define('model', { username: Sequelize.STRING, stuff: Sequelize.STRING, age: Sequelize.INTEGER, }, {
    defaultScope: {
      where: {
        username: 'dan'
      },
      limit: 12
    },
    scopes: {
      isALie: {
        where: {
          stuff: 'cake'
        }
      },
      complexFunction: function(email: string, accessLevel: number) {
        return {
          where: ['email like ? AND access_level >= ?', email + '%', accessLevel]
        }
      },
    }
  });
  Model.findAll(); // WHERE username = 'dan'
  Model.findAll({ where: { age: { gt: 12 } } }); // WHERE age > 12 AND username = 'dan'
  Model.scope({ method: ['complexFunction', 'dan@sequelize.com', 42]}).findAll(); // WHERE email like 'dan@sequelize.com%' AND access_level >= 42

  Model.find({
    where: {
      attr1: 42,
      attr2: 'cake'
    }
  });
  Model.find({
    where: {
      attr1: {
        gt: 50
      },
      attr2: {
        lte: 45
      },
      attr3: {
        in: [1,2,3]
      },
      attr4: {
        ne: 5
      }
    }
  });
  Model.find({
    where: Sequelize.and(
      { name: 'a project' },
      Sequelize.or(
        { id: [1,2,3] },
        { id: { gt: 10 } }
      )
    )
  });

})();


(function usage() {
  var sequelize = new Sequelize('database', 'username', 'password', {
    host: "my.server.tld",
    port: 12345
  });
  var sequelize = new Sequelize('database', 'username');
  var sequelize = new Sequelize('database', 'username', null);
  var sequelize = new Sequelize('mysql://user:pass@example.com:9821/dbname', {
    // Look to the next section for possible options
  });

  var sequelize = new Sequelize('database', 'username', 'password', {
    // custom host; default: localhost
    host: 'my.server.tld',

    // custom port; default: 3306
    port: 12345,

    // custom protocol
    // - default: 'tcp'
    // - added in: v1.5.0
    // - postgres only, useful for heroku
    protocol: null,

    // disable logging; default: console.log
    logging: false,

    // max concurrent database requests; default: 50
    maxConcurrentQueries: 100,

    // the sql dialect of the database
    // - default is 'mysql'
    // - currently supported: 'mysql', 'sqlite', 'postgres', 'mariadb'
    dialect: 'mysql',

    // you can also pass any dialect options to the underlying dialect library
    // - default is empty
    // - currently supported: 'mysql', 'mariadb'
    dialectOptions: {
      socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock',
      supportBigNumbers: true,
      bigNumberStrings: true
    },

    // the storage engine for sqlite
    // - default ':memory:'
    storage: 'path/to/database.sqlite',

    // disable inserting undefined values as NULL
    // - default: false
    omitNull: true,

    // a flag for using a native library or not.
    // in the case of 'pg' -- set this to true will allow SSL support
    // - default: false
    native: true,

    // Specify options, which are used when sequelize.define is called.
    // The following example:
    //   define: {timestamps: false}
    // is basically the same as:
    //   sequelize.define(name, attributes, { timestamps: false })
    // so defining the timestamps for each model will be not necessary
    // Below you can see the possible keys for settings. All of them are explained on this page
    define: {
      underscored: false,
      freezeTableName: false,
      syncOnAssociation: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
      classMethods: {method1: function() {}},
      instanceMethods: {method2: function() {}},
      timestamps: true
    },

    // similiar for sync: you can define this to always force sync for models
    sync: { force: true },

    // sync after each association (see below). If set to false, you need to sync manually after setting all associations. Default: true
    syncOnAssociation: true,

    // use pooling in order to reduce db connection overload and to increase speed
    // currently only for mysql and postgresql (since v1.5.0)
    pool: { maxConnections: 5, maxIdleTime: 30},

    // language is used to determine how to translate words into singular or plural form based on the [lingo project](https://github.com/visionmedia/lingo)
    // options are: en [default], es
    language: 'en'
  });

  var sequelize = new Sequelize('database', null, null, {
    dialect: 'mysql',
    port: 3306,
    replication: {
      read: [
        { host: '8.8.8.8', username: 'anotherusernamethanroot', password: 'lolcats!' },
        { host: 'localhost', username: 'root', password: null }
      ],
      write: { host: 'localhost', username: 'root', password: null }
    },
    pool: { // If you want to override the options used for the read pool you can do so here
      maxConnections: 20,
      minConnections: 5,
      maxIdleTime: 30000
    },
  });


  var sequelize = new Sequelize('database', 'username', 'password', {
    // mysql is the default dialect, but you know...
    // for demo purporses we are defining it nevertheless :)
    // so: we want mysql!
    dialect: 'mysql'
  });
  var sequelize = new Sequelize('database', 'username', 'password', {
    dialect: 'mariadb'
  });
  var sequelize = new Sequelize('database', 'username', 'password', {
    // sqlite! now!
    dialect: 'sqlite',

    // the storage engine for sqlite
    // - default ':memory:'
    storage: 'path/to/database.sqlite'
  });
  var sequelize = new Sequelize('database', 'username', 'password', {
    // gimme postgres, please!
    dialect: 'postgres'
  });


  // Quick example
  sequelize.query("SELECT * FROM myTable").then(function(myTableRows) {
    console.log(myTableRows)
  });

  // Callee is the model definition. This allows you to easily map a query
  // to a predefined model for sequelizejs e.g:
  var Projects: Sequelize.ModelT<{}>;
  sequelize
    .query('SELECT * FROM projects', Projects)
    .then(function(projects){
      // Each record will now be mapped to the project's DAO-Factory.
      console.log(projects)
    });


  // Options is an object with the following keys:
  sequelize
    .query('SELECT 1', null, {
      // A function (or false) for logging your queries
      // Will get called for every SQL query that gets send
      // to the server.
      logging: console.log,

      // If plain is true, then sequelize will only return the first
      // record of the result set. In case of false it will all records.
      plain: false,

      // Set this to true if you don't have a model definition for your query.
      raw: false
    });

  // Note the second argument being null!
  // Even if we declared a callee here, the raw: true would
  // supersede and return a raw object.
  sequelize
    .query('SELECT * FROM projects', null, { raw: true })
    .then(function(projects) {
      console.log(projects)
    });

  sequelize
    .query(
      'SELECT * FROM projects WHERE status = ?', null,
      { raw: true }, ['active']
    )
    .then(function(projects) {
      console.log(projects)
    });

  sequelize
    .query(
      'SELECT * FROM projects WHERE status = :status ', null,
      { raw: true }, { status: 'active' }
    )
    .then(function(projects) {
      console.log(projects)
    });
})();

