//const MongoClient = require('mongodb').MongoClient;
//Below is the example of object destructuring
const {MongoClient, ObjectID} = require('mongodb');

//var obj = new ObjectID();

//console.log(obj);

//var user = { name: 'Raj', age: 36 };
//Below is the example of object destructuring
//var {name} = user;
//console.log(name);

MongoClient.connect('mongodb://localhost:27017/todoApp', (err, db) => {
  if(err) {
    return  console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

//Delete Many
/*
db.collection('Todos').deleteMany({ text: 'Eat lunch'}).then((result) => {
  console.log(result);
});
*/


//DeleteMany
/*
db.collection('Todos').deleteOne({ text: 'Eat lunch'}).then((result) => {
  console.log(result);
});
*/
//Find one and delete
/*
db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
  console.log(result);
});
*/
/*
db.collection('Users').deleteMany({ name: 'Raj'}).then((result) => {
  console.log(result);
});
*/
db.collection('Users').findOneAndDelete({_id: new ObjectID('5afbe5f7afec051f5c9624b5')}).then((result) => {
  console.log(result);
});

})
