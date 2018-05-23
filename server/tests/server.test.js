const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');
const {todos, populateTodos, users, populateUsers} = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateTodos);

//describe('POST /todos', () => {
describe('POST /todos', function () {
  this.timeout(5000);
  it('should create a new todo', (done) => {
    var text = 'Test todo text';

    request(app)
           .post('/todos')
          .send({text})
          .expect(200)
          .expect((res) => {
             expect(res.body.text).toBe(text);
          })
          .end((err, res) => {
            if(err) {
              return done(err);
            }

            Todo.find({text}).then((todos) => {
              expect(todos.length).toBe(1);
              expect(todos[0].text).toBe(text);
              done();
            }).catch((e) => done(e));
          })
  })

  it('should not create todo with invalid body data', (done) => {
  //  var text = 'Test todo text';

    request(app)
           .post('/todos')
          .send({})
          .expect(400)
  //        .expect((res) => {
  //           expect(res.body.text).toBe(text);
      //    })
          .end((err, res) => {
            if(err) {
              return done(err);
            }

            Todo.find().then((todos) => {
              expect(todos.length).toBe(2);
      //        expect(todos[0].text).toBe(text);
              done();
            }).catch((e) => done(e));
          })
  })

})

describe('GET /todos', () => {

  it('should get all todos', (done) => {

    request(app)
           .get('/todos')
          .expect(200)
          .expect((res) => {
             expect(res.body.todos.length).toBe(2);
          })
          .end(done);

          })
  })

  describe('GET /todos/:id', () => {

    it('should return todo doc', (done) => {

      request(app)
             .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
               expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);

            })
      it('should return 404 if todo not found', (done) => {

        var oId = new ObjectID().toHexString();
        request(app)
             .get(`/todos/${oId}`)
              .expect(404)
              .end(done);

        })

        it('should return 404 for non-ObjectIDs', (done) => {

          var oId = '123';
          request(app)
               .get(`/todos/${oId}`)
                .expect(404)
                .end(done);

          })

    })

    describe('DELETE /todos/:id', () => {

      it('should remove a todo', (done) => {
        var oId = todos[1]._id.toHexString();
        request(app)
               .delete(`/todos/${oId}`)
              .expect(200)
              .expect((res) => {
                 expect(res.body.todo._id).toBe(oId);
              })
              .end((err, res) => {
                if(err) {
                  return done(err);
                }

                Todo.findById(oId).then((todo) => {
                  expect(todo).toNotExist();
                  done();
                }).catch((e) => done(e));
              })

              })

        it('should return 404 if todo not found', (done) => {

          var oId = new ObjectID().toHexString();
          request(app)
               .delete(`/todos/${oId}`)
                .expect(404)
                .end(done);

          })

          it('should return 404 if object id is invalid', (done) => {

            var oId = '123';
            request(app)
                 .delete(`/todos/${oId}`)
                  .expect(404)
                  .end(done);

            })

      })

      describe('PATCH /todos/:id', () => {

        it('should update the todo', (done) => {
          var oId = todos[0]._id.toHexString();
          var body = {
            _id: oId,
            text: 'Testing todo patch',
            completed: true
          }
          request(app)
                 .patch(`/todos/${oId}`)
                 .send(body)
                .expect(200)
                .expect((res) => {
                   expect(res.body.todo._id).toBe(oId);
        //             expect(res.body.todo.text).toBe(body.text);
        //             expect(res.body.todo.completed).toBe(body.completed);
        //             expect(res.body.todo.completedAt).toBeA("number");
        //             done();
                })
                .end((err, res) => {
                  if(err) {
                    return done(err);
                  }
                  Todo.findById(oId).then((todo) => {
                      expect(todo.text).toBe(body.text);
                      expect(todo.completed).toBe(body.completed);
                      expect(todo.completedAt).toBeA("number");
                      done();

                  }).catch((e) => done(e));
                })

                })



          it('should clear completedAt when todo is not completed', (done) => {

            var oId = todos[1]._id.toHexString();
            var body = {
              text: 'Testing todo patch for 2nd Item',
              completed: false

            }

            request(app)
                   .patch(`/todos/${oId}`)
                   .send(body)
                  .expect(200)
                  .expect((res) => {
                     expect(res.body.todo._id).toBe(oId);
                //     expect(res.body.todo.text).toBe(body.text);
                //     expect(res.body.todo.completed).toBe(body.completed);
                //     expect(res.body.todo.completedAt).toNotExist();
                  })
                  .end((err, res) => {
                    if(err) {
                      return done(err);
                    }

                  Todo.findById(oId).then((todo) => {
                      expect(todo.text).toBe(body.text);
                      expect(todo.completed).toBe(body.completed);
                      expect(todo.completedAt).toNotExist();
                      done();
                    }).catch((e) => done(e));
                  })

            })



        })

        describe('GET /users/me', () => {

          it('should return user if authenticated', (done) => {

            request(app)
                   .get('/users/me')
                   .set('x-auth', users[0].tokens[0].token)
                  .expect(200)
                  .expect((res) => {
                     expect(res.body._id).toBe(users[0]._id.toHexString());
                     expect(res.body.email).toBe(users[0].email);
                  })
                  .end(done);

                  })

            it('should return 401 if not authenticated', (done) => {
              request(app)
                     .get('/users/me')
                    .expect(401)
                    .expect((res) => {
                       expect(res.body).toEqual({});
                    })
                    .end(done);

                    })


     })

     describe('POST /users', function () {

       it('should create a new user', (done) => {
         var email = 'mno@example.com';
         var password = 'APassword';

         request(app)
                .post('/users')
               .send({email, password})
               .expect(200)
               .expect((res) => {
                  expect(res.body.email).toBe(email);
                  expect(res.body._id).toExist();
                  expect(res.headers['x-auth']).toExist();
               })
               .end((err, res) => {
                 if(err) {
                   return done(err);
                 }

                 User.findOne({email}).then((user) => {
                   expect(user.email).toBe(email);
                   expect(user.password).toNotBe(password);
                   done();
                 })
               })
            })

            it('should return validation error if request invalid', (done) => {
              var email = 'mnoexample.com';
              var password = 'APas';

              request(app)
                     .post('/users')
                    .send({email, password})
                    .expect(400)
            /*        .expect((res) => {
                       expect(res.body.email).toBe(email);
                       expect(res.body._id).toExist();
                       expect(res.headers['x-auth']).toExist();
                    }) */
                    .end(done);

                 })

                 it('should not create user if email in use', (done) => {
                   var email = 'john@example.com';


                   request(app)
                          .post('/users')
                         .send({email})
                         .expect(400)
                 /*        .expect((res) => {
                            expect(res.body.email).toBe(email);
                            expect(res.body._id).toExist();
                            expect(res.headers['x-auth']).toExist();
                         }) */
                         .end(done);

                      })

       })
