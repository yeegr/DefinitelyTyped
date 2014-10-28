/// <reference path="sequelize.d.ts" />

import Sequelize = require('sequelize');


interface IUserType {
  username: string;
  mood?: string;
  accessLevel?: number;
}
interface IUserInstance extends Sequelize.Instance<IUserType> {}
interface IUserModel extends Sequelize.Model<IUserInstance, IUserType> {}

(function sampleUsage1() {
var sequelize = new Sequelize('db','user','pass');

// Method 1 via the .define() method
var User = sequelize.define<IUserModel>('User', {
  username: Sequelize.DataTypes.STRING,
  mood: {
    type: Sequelize.DataTypes.ENUM,
    values: ['happy', 'sad', 'neutral']
  }
}, {
  hooks: {
    beforeValidate: function(user: IUserInstance, fn: (err: any, res: IUserInstance) => void) {
      user.values.mood = 'happy'
      fn(null, user)
    },
    afterValidate: function(user: IUserInstance, fn: (err: any, res: IUserInstance) => void) {
      user.values.username = 'Toni'
      fn(null, user)
    }
  }
});
 
// Method 2 via the .hook() method
var User = sequelize.define<IUserModel>('User', {
  username: Sequelize.DataTypes.STRING,
  mood: {
    type: Sequelize.DataTypes.ENUM,
    values: ['happy', 'sad', 'neutral']
  }
});
 
User.hook('beforeValidate', function(user, fn) {
  user.mood = 'happy'
  fn(null, user)
});
 
User.hook('afterValidate', function(user) {
  //return sequelize.Promise.reject("I'm afraid I can't let you do that!")
});
 
// Method 3 via the direct method
var User = sequelize.define<IUserModel>('User', {
  username: Sequelize.DataTypes.STRING,
  mood: {
    type: Sequelize.DataTypes.ENUM,
    values: ['happy', 'sad', 'neutral']
  }
});
 
User.beforeValidate(function(user) {
  user.values.mood = 'happy'
  //return sequelize.Promise.resolve(user)
});
 
User.afterValidate(function(user, fn) {
  user.values.username = 'Toni'
  fn(null, user)
});


// ...define ...
User.beforeCreate(function(user, fn) {
  if (user.values.accessLevel > 10 && user.values.username !== "Boss") {
    return fn("You can't grant this user an access level above 10!");
  }
  return fn();
});
User.create({username: 'Not a Boss', accessLevel: 20}).error(function(err) {
  console.log(err) // You can't grant this user an access level above 10!
});
User.create({username: 'Boss', accessLevel: 20}).then(function(user) {
  console.log(user) // user object with username as Boss and accessLevel of 20
});


User.destroy({accessLevel: 0}, {individualHooks: true});
// Will select all records that are about to be deleted and emit before- + after- Destroy on each instance
 
User.update({username: 'Toni'}, {accessLevel: 0}, {individualHooks: true});
// Will select all records that are about to be updated and emit before- + after- Update on each instance
 
User.bulkCreate([{username: null, accessLevel: 0}, null], {individualHooks: true});
// Will select all records that are about to be deleted and emit before- + after- Create on each instance


User.beforeBulkCreate(function(records, fields, fn) {
  // records = the first argument sent to .bulkCreate
  // fields = the second argument sent to .bulkCreate
})
 
User.bulkCreate([
  {username: 'Toni'}, // part of records argument
  {username: 'Tobi'} // part of records argument
], { fields: ['username'] } /* part of fields argument */);
 
User.beforeBulkUpdate(function(attributes, where, fn) {
  // attributes = first argument sent to Model.update
  // where = second argument sent to Model.update
});
 
User.update({gender: 'Male'} /*attributes argument*/, {username: 'Tom'} /*where argument*/)
 
User.beforeBulkDestroy(function(whereClause, fn) {
  // whereClause = first argument sent to Model.destroy
});
 
User.destroy({username: 'Tom'} /*whereClause argument*/);



var Projects = sequelize.define('Projects', {
  title: Sequelize.STRING
});
 
var Tasks = sequelize.define('Tasks', {
  title: Sequelize.STRING
});
 
Projects.hasMany(Tasks, {onDelete: 'cascade', hooks: true});
Tasks.belongsTo(Projects);


// Transactions Test

sequelize.transaction().then(function(t) {
  // we just opened a new connection to the database which is transaction exclusive.
  // also we send some first transaction queries to the database.
  
  User.findAll({}, {
    transaction: t,
    lock: t.LOCK.SHARE
  });

  // do some async stuff ...
  
  // if everything is ok ... commit the transaction
  t.commit().then(function() {});
  
  // if something failed ... rollback the transaction
  t.rollback().then(function() {});
});

sequelize.transaction().then(function(t) {
  User.create({ username: 'foo' }, { transaction: t }).then(function() {
    // this user will only be available inside the session
    User.all({ transaction: t }); // will return the user
    User.all(); // will not return the user
  })
});

})();

