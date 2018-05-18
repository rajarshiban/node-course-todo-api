//const MongoClient = require('mongodb').MongoClient;
//Below is the example of object destructuring
const {MongoClient, ObjectID} = require('mongodb');

//var obj = new ObjectID();

//console.log(obj);

//var user = { name: 'Raj', age: 36 };
//Below is the example of object destructuring
//var {name} = user;
//console.log(name);
/*
MongoClient.connect('mongodb://localhost:27017/todoApp', (err, db) => {
  if(err) {
    return  console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  db.collection('Todos').findOneAndUpdate({_id: new ObjectID('5afd421b644c9dad4546f0bb')}
                          , {
                              $set: {
                                completed: true
                              }
                            }
                          , { returnOriginal: false
                            })
                            .then((result) => {
    console.log(result);
  });
*/

  MongoClient.connect('mongodb://localhost:27017/todoApp', (err, db) => {
    if(err) {
      return  console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    db.collection('Users').findOneAndUpdate({_id: new ObjectID('5afb89c61272411990fcb023')}
                            , {
                                $set: {
                                  name: 'Raj'
                                },
                                $inc: {
                                  age: 1
                                }
                              }
                            , { returnOriginal: false
                              })
//                              .findOneAndUpdate({_id: new ObjectID('5afb89c61272411990fcb023')}
//                                                      , {
//                                                          $inc: {
//                                                            age: 1
//                                                          }
//                                                        }
//                                                      , { returnOriginal: false
//                                                        })
                              .then((result) => {
      console.log(result);
    });



})
