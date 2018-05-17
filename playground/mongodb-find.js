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

/* Example of toArray*/
/*  db.collection('Todos').find({completed: false}).toArray().then((docs) => {
  db.collection('Todos').find({_id: new ObjectID('5afb8871979adc18e001800e')}).toArray().then((docs) => {
    console.log('Todos');
    console.log(JSON.stringify(docs, undefined, 2));

  }, (err) => {
    console.log('Unable to fetch Todos', err);
  })
}) */
/* End of Example of toArray*/

/* Example of Count */
/*
db.collection('Todos').find().count().then((count) => {
    console.log('Todos Count:', count);
  //  console.log(JSON.stringify(docs, undefined, 2));

  }, (err) => {
    console.log('Unable to fetch Todos', err);
  })
})
*/

db.collection('Users').find({name: 'Raj'}).toArray().then((docs) => {
    console.log('Users');
    console.log(JSON.stringify(docs, undefined, 2));

  }, (err) => {
    console.log('Unable to fetch Users', err);
  })
})

/* End of Example of Count */
