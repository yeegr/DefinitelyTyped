/// <reference path="sequelize.d.ts" />

import Sequelize = require('sequelize');

interface IProjectType {
  title: string;
  description: string;
}
interface ITaskType {
  title: string;
  description: string;
  deadline: Date;
}
interface ITask2Type {
  title: string;
  rating?: number;
}
interface ITask3Type {
  subject: string;
  status: string;
}
interface IUserType {
  username: string;
  isAdmin?: boolean;
}
interface ITasksType {
  name: string;
  code: string;
}

(function Instances() {

var sequelize = new Sequelize('database', 'username');

var Project = sequelize.define<Sequelize.ModelT<IProjectType>>('Project', {
  title: Sequelize.STRING,
  description: Sequelize.TEXT
});
var Task = sequelize.define<Sequelize.ModelT<ITaskType>>('Task', {
  title: Sequelize.STRING,
  description: Sequelize.TEXT,
  deadline: Sequelize.DATE
});

var project = Project.build({
  title: 'my awesome project',
  description: 'woot woot. this will make me a rich man'
});
 
var task = Task.build({
  title: 'specify the project idea',
  description: 'bla',
  deadline: new Date()
});

// first define the model
var Task2 = sequelize.define<Sequelize.ModelT<ITask2Type>>('Project', {
  title: Sequelize.STRING,
  rating: { type: Sequelize.INTEGER, defaultValue: 3 }
})
 
// now instantiate an object
var task2 = Task2.build({title: 'very important task'});
 
console.log(task2.values.title);  // ==> 'very important task'
console.log(task2.values.rating); // ==> 3

project.save().then(function() {
  // my nice callback stuff
});
 
task.save().error(function(error) {
  // mhhh, wth!
});
 
// you can also build, save and access the object with chaining:
Task
  .build({ title: 'foo', description: 'bar', deadline: new Date() })
  .save()
  .then(function(anotherTask) {
    // you can now access the currently saved task with the variable anotherTask... nice!
  }).error(function(error) {
    // Ooops, do some error-handling
  });

Task.create({ title: 'foo', description: 'bar', deadline: new Date() }).then(function(task) {
  // you can now access the newly created task via the variable task
});

var User: Sequelize.ModelT<IUserType>;
User.create({ username: 'barfooz', isAdmin: true }, [ 'username' ]).then(function(user) {
  // let's assume the default of isAdmin is false:
  console.log(user.values) // => { username: 'barfooz', isAdmin: false }
});

// way 1
task.values.title = 'a very different title now'
task.save().then(function() {});
 
// way 2
task.updateAttributes({
  title: 'a very different title now'
}).then(function() {});

task.values.title = 'foooo'
task.values.description = 'baaaaaar'
task.save(['title']).then(function() {
 // title will now be 'foooo' but description is the very same as before
});
 
// The equivalent call using updateAttributes looks like this:
task.updateAttributes({ title: 'foooo', description: 'baaaaaar'}, ['title']).then(function() {
 // title will now be 'foooo' but description is the very same as before
});

Task2.create({ title: 'a task' }).then(function(task) {
  // now you see me...
  task.destroy().then(function() {
    // now i'm gone :)
  })
});


User.bulkCreate([
  { username: 'barfooz', isAdmin: true },
  { username: 'foo', isAdmin: true },
  { username: 'bar', isAdmin: false }
]).then(function() { // Notice: There are no arguments here, as of right now you'll have to...
  User.findAll().then(function(users) {
    console.log(users) // ... in order to get the array of user objects
  })
});

var Task3: Sequelize.ModelT<ITask3Type>;
Task3.bulkCreate([
  {subject: 'programming', status: 'executing'},
  {subject: 'reading', status: 'executing'},
  {subject: 'programming', status: 'finished'}
]).then(function() {
  Task3.update(
    {status: 'inactive'} /* set attributes' value */, 
    {subject: 'programming'} /* where criteria */
  ).then(function(affectedRows) {
    // affectedRows will be 2
    Task3.findAll().then(function(tasks) {
      console.log(tasks) // the 'programming' tasks will both have a status of 'inactive'
    })
  })
});

Task3.bulkCreate([
  {subject: 'programming', status: 'executing'},
  {subject: 'reading', status: 'executing'},
  {subject: 'programming', status: 'finished'}
]).then(function() {
  Task3.destroy(
    {subject: 'programming'} /* where criteria */,
    {truncate: true /* truncate the whole table, ignoring where criteria */} /* options */
  ).then(function(affectedRows) {
    // affectedRows will be 2
    Task3.findAll().then(function(tasks) {
      console.log(tasks) // no programming, just reading :(
    })
  })
});

User.bulkCreate([
  { username: 'foo' },
  { username: 'bar', admin: true}
], { fields: ['username'] }).then(function() {
  // nope bar, you can't be admin! 
});
 
// an easier way to keep track of which fields you want to explicitly build, use Object.keys() like so
var objects = [
  { username: 'foo' },
  { username: 'bar' }
];
User.bulkCreate(objects, { fields: Object.keys(objects) }).then(function() {
  // ...
});

var Tasks = sequelize.define<Sequelize.ModelT<ITasksType>>('Tasks', {
  name: {
    type: Sequelize.STRING,
    validate: {
      notNull: { args: true, msg: 'name cannot be null' }
    }
  },
  code: {
    type: Sequelize.STRING,
    validate: {
      len: [3, 10]
    }
  }
});
 
Tasks.bulkCreate([
  {name: 'foo', code: '123'},
//  {code: '1234'},
  {name: 'bar', code: '1'}
], {validate: true}).error(function(errors) {
  /* console.log(errors) would look like:
  [
    {
      "record": {
        "code": "1234"
      },
      "errors": {
        "name": [
          "name cannot be null"
        ]
      }
    },
    {
      "record": {
        "name": "bar",
        "code": "1"
      },
      "errors": {
        "code": [
          "String is not in range: code"
        ]
      }
    }
  ]
  */
});

var Person: Sequelize.ModelT<{ name: string; firstname: string; }>;
Person.create({
  name: 'Rambow',
  firstname: 'John'
}).then(function(john) {
  console.log(john.values)
});
 
// result:
 
// { name: 'Rambow',
//   firstname: 'John',
//   id: 1,
//   createdAt: Tue, 01 May 2012 19:12:16 GMT,
//   updatedAt: Tue, 01 May 2012 19:12:16 GMT
// }

Person.find({ where: { name: 'john' } }).then(function(person) {
  person.values.name = 'jane'
  console.log(person.values.name) // 'jane'
 
  person.reload().then(function() {
    console.log(person.values.name) // 'john'
  })
});

User.find(1).then(function(user) {
  user.increment('my-integer-field', { by: 2 }).then(() => {});
});

User.find(1).then(function(user) {
  user.increment([ 'my-integer-field', 'my-very-other-field' ], { by: 2 }).then(() => {});
});

User.find(1).then(function(user) {
  user.increment({
    'my-integer-field':    2,
    'my-very-other-field': 3
  }).then(() => {});
});

User.find(1).then(function(user) {
  user.decrement('my-integer-field', { by: 2 }).then(() => {});
});

User.find(1).then(function(user) {
  user.decrement([ 'my-integer-field', 'my-very-other-field' ], { by: 2 }).then(() => {});
});

User.find(1).then(function(user) {
  user.decrement({
    'my-integer-field':    2,
    'my-very-other-field': 3
  }).then(() => {});
});

})();

