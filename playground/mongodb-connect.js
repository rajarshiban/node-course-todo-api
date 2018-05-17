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

//  db.collection('Todos').insertOne({
//    text: 'Something to do',
//    completed: false
//  }, (err, result) => {
//    if(err) {
//      return console.log('Unable to insert to do');
//    }
//    console.log(JSON.stringify(result.ops, undefined, 2));
//  })

  db.collection('Users').insertOne({
    name: 'Raj',
    age: 36,
    location: 'Melbourne'
  }, (err, result) => {
    if(err) {
      return console.log('Unable to insert to Users');
    }
    console.log(JSON.stringify(result.ops[0], undefined, 2));
    console.log(JSON.stringify(result.ops[0]._id, undefined, 2));
    console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2));
  })

  db.close();

})
