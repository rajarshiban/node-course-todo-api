require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const {ObjectID} = require('mongodb');
const bcrypt = require('bcryptjs');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();
var port = process.env.PORT;

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

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (err) => {
    res.status(400).send(err);
  })
})

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;

    if(!ObjectID.isValid(id)) {
      return res.status(404).send();
    }

    Todo.findById(id).then((todo) => {
      if(!todo) {
        return res.status(404).send();
      }
      res.send({todo});
    }).catch((e) => {
      res.status(400).send();
    })

})

app.delete('/todos/:id', (req, res) =>{
  var id = req.params.id;
  if(!ObjectID.isValid(id))
  {
    return res.status(404).send();
  }

  Todo.findByIdAndRemove(id).then((todo) => {
    if(!todo) {
      return res.status(404).send();
    }
     return res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  })
})

app.patch('/todos/:id', (req, res) =>{
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if(!ObjectID.isValid(id))
  {
    return res.status(404).send();
  }

  if(_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true} ).then((todo) => {
    if(!todo) {
      return res.status(404).send();
    }
     return res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  })
})

app.post('/users', (req, res) => {
   var user = new User(_.pick(req.body, ['email', 'password']));

   user.save().then(() => {
  //   res.send(user);
     return user.generateAuthToken();
   })
    .then((token) => {
      res.header('x-auth', token).send(user);
    })
   .catch((e) => {
     res.status(400).send(e);
   })
})

app.post('/users/login', (req, res) => {
   var {email, password} = new User(_.pick(req.body, ['email', 'password']));

     User.findByCredentials(email, password).then((user) => {
       return user.generateAuthToken().then((token) => {
         return res.header('x-auth', token).send(user);
       })
     })
    .catch((e) => {
    return res.status(400).send();
  })

})




app.get('/users/me', authenticate, (req, res) => {
      res.send(req.user);
  })

app.delete('/users/me/token', authenticate, (req, res) => {

    req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }, () => {
    res.status(400).send();
  })
})


app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {
  app
}






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
