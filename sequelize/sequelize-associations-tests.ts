///<reference path="sequelize.d.ts" />
///<reference path="../bluebird/bluebird.d.ts" />

import Sequelize = require('sequelize');
var DataTypes: Sequelize.DataTypes;


interface IPersonInstance extends Sequelize.Instance<{}> {
  setFather(dad: IPersonInstance): void;
  getFather(): IPersonInstance;
}
interface IPersonModel extends Sequelize.Model<IPersonInstance, {}> {}

interface IUserProjectsInstance extends Sequelize.Instance<{
  status: string;
}>{
  status: string;
}
interface IProjectInstance extends Sequelize.Instance<{
  UserProjects: IUserProjectsInstance;
}> {
  UserProjects: { status: string; }
  getTasks(options?: Sequelize.IFindOptions): Promise<any[]>;
  setTasks(tasks: any[]): Promise<any[]>;
  addTask(task: any): Promise<void>;
  removeTask(task: any): Promise<void>;

  setUsers(users: IUserInstance[]): Promise<IUserInstance[]>;
  hasUsers(users: IUserInstance[]): Promise<boolean>;
  hasUser(user: IUserInstance): Promise<boolean>;
  addUser(user: IUserInstance): Promise<void>;
}
interface IProjectModel extends Sequelize.Model<IProjectInstance, {}> {}
interface IUserInstance extends Sequelize.Instance<{}> {
  getProjects(options?: Sequelize.IFindOptions): Promise<IProjectInstance[]>;
  setProjects(projects: IProjectInstance[], data?: any): Promise<IProjectInstance[]>;
  addProject(project: IProjectInstance, data?: any): Promise<void>;
}
interface IUserModel extends Sequelize.Model<IUserInstance, {}> {}

(function associations1() {

var sequelize = new Sequelize('database', 'username');

var User = sequelize.define<IUserModel>('User', {/* ... */});
var Project = sequelize.define<IProjectModel>('Project', {/* ... */});

// One-way associations
Project.hasOne(User);

/*
  In this example hasOne will add an attribute ProjectId to the User model!
  Furthermore, Project.prototype will gain the methods getUser and setUser according
  to the first parameter passed to define. If you have underscore style
  enabled, the added attribute will be project_id instead of ProjectId.

  You can also define the foreign key, e.g. if you already have an existing
  database and want to work on it:
*/

Project.hasOne(User, { foreignKey: 'initiator_id' });

/*
  Because Sequelize will use the model's name (first parameter of define) for
  the accessor methods, it is also possible to pass a special option to hasOne:
*/

Project.hasOne(User, { as: 'Initiator' });
// Now you will get Project#getInitiator and Project#setInitiator

// Or let's define some self references
var Person = sequelize.define<IPersonModel>('Person', { /* ... */});

Person.hasOne(Person, {as: 'Father'});
// this will add the attribute FatherId to Person

// also possible:
Person.hasOne(Person, {as: 'Father', foreignKey: 'DadId'});
// this will add the attribute DadId to Person

// In both cases you will be able to do:
//Person#setFather;
//Person#getFather;

var Team: Sequelize.ModelT<{}>;
var Game: Sequelize.ModelT<{}>;
// If you need to join a table twice you can double join the same table
Team
  .hasOne(Game, {foreignKey : 'homeTeamId'})
  .hasOne(Game, {foreignKey : 'awayTeamId'});
Game
  .belongsTo(Team);


var Deadline: Sequelize.ModelT<{}>;
var Attachment: Sequelize.ModelT<{}>;
// Since v1.3.0 you can also chain associations:
Project
  .hasOne(User)
  .hasOne(Deadline)
  .hasOne(Attachment);

// One-way back associations
Project.belongsTo(User);


var User = sequelize.define<IUserModel>('User', {/* ... */});
var Project = sequelize.define<IProjectModel>('Project', {/* ... */});

// OK. Now things get more complicated (not really visible to the user :)).
// First let's define a hasMany association
Project.hasMany(User, {as: 'Workers'});

/*
  This will add the attribute ProjectId or project_id to User.
  Instances of Project will get the accessors getWorkers and setWorkers.

  We could just leave it the way it is and let it be a one-way association.
  But we want more! Let's define the other way around:
*/

// again the Project association to User
Project.hasMany(User, { as: 'Workers' });

// now comes the association between User and Project
User.hasMany(Project);

/*
  This will remove the attribute ProjectId (or project_id) from User and create
  a new model called ProjectsUsers with the equivalent foreign keys ProjectId
  (or project_id) and UserId (or user_id). If the attributes are camelcase or
  not depends on the Model it represents.

  Now you can use Project#getWorkers, Project#setWorkers, User#getTasks and
  User#setTasks.
*/

// Of course you can also define self references with hasMany:

Person.hasMany(Person, { as: 'Children' });
// This will create the table ChildrenPersons which stores the ids of the objects.

// Since v1.5.0 you can also reference the same Model without creating a junction
// table (but only if each object will have just one 'parent'). If you need that,
// use the option foreignKey and set through to null
Person.hasMany(Person, { as: 'Children', foreignKey: 'ParentId', through: null });

// You can also use a predefined junction table using the option through:
Project.hasMany(User, {through: 'project_has_users'});
User.hasMany(Project, {through: 'project_has_users'});


var User = sequelize.define<IUserModel>('User', {});
var Project = sequelize.define<IProjectModel>('Project', {});
var UserProjects = sequelize.define('UserProjects', {
    status: DataTypes.STRING
});

User.hasMany(Project, { through: UserProjects });
Project.hasMany(User, { through: UserProjects });


var Task: Sequelize.ModelT<{}>;
Project.hasMany(Task);
Task.hasMany(Project);

var project: IProjectInstance;
var task1: any, task2: any;
Project.create({}).then((x) => { project = x; });
Task.create({}).then((x) => { task1 = x; });
Task.create({}).then((x) => { task2 = x; });

// save them... and then:
project.setTasks([task1, task2]).then(function() {
  // saved!
});

// ok now they are save... how do I get them later on?
project.getTasks().then(function(associatedTasks) {
  // associatedTasks is an array of tasks
});

// You can also pass filters to the getter method.
// They are equal to the options you can pass to a usual finder method.
project.getTasks({ where: 'id > 10' }).then(function(tasks) {
  // tasks with an id greater than 10 :)
});

// You can also only retrieve certain fields of a associated object.
// This example will retrieve the attibutes "title" and "id"
project.getTasks({attributes: ['title']}).then(function(tasks) {
  // tasks with an id greater than 10 :)
});

// remove the association with task1
project.setTasks([task2]).then(function(associatedTasks) {
  // you will get task2 only
});

// remove 'em all
project.setTasks([]).then(function(associatedTasks) {
  // you will get an empty array
});

// or remove 'em more directly
project.removeTask(task1).then(function() {
  // it's gone
});

// and add 'em again
project.addTask(task1).then(function() {
  // it's back again
});

// project is associated with task1 and task2
task2.setProject(null).then(function() {
  // and it's gone
});


var u: IUserInstance;;
// Either by adding a property with the name of the join table model to the object, before creating the association
project.UserProjects = {
  status: 'active'
};
u.addProject(project);

// Or by providing a second argument when adding the association, containing the data that should go in the join table
u.addProject(project, { status: 'active' });


var project1: IProjectInstance;
var project2: IProjectInstance;
// When associating multiple objects, you can combine the two options above. In this case the second argument
// will be treated as a defaults object, that will be used if no data is provided
project1.UserProjects = {
    status: 'inactive'
};

u.setProjects([project1, project2], { status: 'active' });
// The code above will record inactive for project one, and active for project two in the join table

u.getProjects().then(function(projects) {
  var project = projects[0]
 
  if (project.values.UserProjects.status === 'active') {
    // .. do magic
 
    // since this is a real DAO instance, you can save it directly after you are done doing magic
    project.values.UserProjects.save()
  }
});

// This will select only name from the Projects table, and only status from the UserProjects table
u.getProjects({ attributes: ['name'], joinTableAttributes: ['status']});


// check if an object is one of associated ones:
Project.create({ /* */ }).then(function(project) {
  User.create({ /* */ }).then(function(user) {
    project.hasUser(user).then(function(result) {
      // result would be false
      project.addUser(user).then(function() {
        project.hasUser(user).then(function(result) {
          // result would be true
        })
      })
    })
  })
});
 
var user1: IUserInstance;
var user2: IUserInstance;
// check if all associated objects are as expected:
// let's assume we have already a project and two users
project.setUsers([user1, user2]).then(function() {
  project.hasUsers([user1]).then(function(result) {
    // result would be false
    project.hasUsers([user1, user2]).then(function(result) {
      // result would be true
    })
  })
});

})();

(function associations2() {

var sequelize = new Sequelize('database', 'username');

var Task = this.sequelize.define('Task', { title: Sequelize.STRING });
var User = this.sequelize.define('User', { username: Sequelize.STRING });
 
User.hasMany(Task);
Task.belongsTo(User);

var Document = this.sequelize.define('Document', {
      author: Sequelize.STRING
    });
var Version = this.sequelize.define('Version', {
      timestamp: Sequelize.DATE
    });
 
Document.hasMany(Version); // This adds document_id to version
Document.belongsTo(Version, { as: 'Current', foreignKey: 'current_version_id'}); // This adds current_version_id to document

Document.hasMany(Version);
Document.belongsTo(Version, { as: 'Current', foreignKey: 'current_version_id', constraints: false});


// Series has a trainer_id=Trainer.id foreign reference key after we call Trainer.hasMany(series)
var Series = sequelize.define('Series', {
  title:        DataTypes.STRING,
  sub_title:    DataTypes.STRING,
  description:  DataTypes.TEXT,
 
  // Set FK relationship (hasMany) with `Trainer`
  trainer_id: {
    type: DataTypes.INTEGER,
    references: "Trainer",
    referencesKey: "id"
  }
})
 
var Trainer = sequelize.define('Trainer', {
  first_name: DataTypes.STRING,
  last_name:  DataTypes.STRING
});
 
// Video has a series_id=Series.id foreign reference key after we call Series.hasOne(Video)...
var Video = sequelize.define('Video', {
  title:        DataTypes.STRING,
  sequence:     DataTypes.INTEGER,
  description:  DataTypes.TEXT,
 
  // set relationship (hasOne) with `Series`
  series_id: {
    type: DataTypes.INTEGER,
    references: Series, // Can be both a string representing the table name, or a reference to the model
    referencesKey: "id"
  }
});
 
Series.hasOne(Video);
Trainer.hasMany(Series);

})();

