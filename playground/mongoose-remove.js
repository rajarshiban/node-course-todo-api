const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

//Remove multiple records
/*
Todo.remove({}).then((res) => {
  console.log(res);
})
*/
//Find One and remove


//Find by ID and Remove
Todo.findByIdAndRemove('5b02382261e1edb22711db05').then((doc) => {
      console.log(doc);
})
