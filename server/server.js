var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/Todo');
var {User} = require('./models/User');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
 var todo = new Todo({
   text: req.body.text
 })
//  console.log(req.body);


  todo.save().then((doc) => {
    res.send(doc);
  }, (err) => {
    res.status(400).send(err);
  })
})

app.listen(3000, () => {
  console.log('Started on port 3000');
});






/*
var newTodo = new Todo({
                  text: 'Cook Dinner'
});

newTodo.save().then((doc) => {
  console.log('Saved todo', doc);
}, (error) => {
  console.log('Unable to save Todo');
})
*/
/*
var otherTodo = new Todo({
                  text: 'Save the video'
              //    completed: true,
              //    completedAt: 20180518
});

otherTodo.save().then((doc) => {
  console.log('Saved todo', doc);
}, (error) => {
  console.log('Unable to save Todo');
})
*/
/*
var newUser = new User({
                  email: 'xyz@abc.com'
              //    completed: true,
              //    completedAt: 20180518
});

newUser.save().then((doc) => {
  console.log('Saved User', doc);
}, (error) => {
  console.log('Unable to save User');
})
*/
