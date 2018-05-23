const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

/* Below example using Crypto JS*/

/*
var message = "How are You";

var hashMessage = SHA256(message).toString();

console.log(`Original Message ${message}`);
console.log(`Encrypted Message ${hashMessage}`);

var data = {
  id: 4
}

var token = {
  data,
  hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
}

token.data.id = 5;
token.hash =  SHA256(JSON.stringify(token.data)).toString();

var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

if(resultHash === token.hash) {
  console.log('Data was not changed');
}
else {
  console.log('Data was changed. Do not trust.');
}
*/

/* Below example using JWT */
/*
var data = {
  id: 10
}

var token = jwt.sign(data, 'abc123');
console.log(token);

var decoded = jwt.verify(token, 'abc123');
console.log('Decoded', decoded);
*/

/* B-Crypt password hashing demo */

var password = '123abc!';

/*
bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(password, salt, (err, hash) => {
    console.log(hash);
  })
});
*/

var hashPassword = '$2a$10$f45S2EBLFUpU1NTmje6xGO3voc7aK9weL9jrt3l4y0kZnKXJM6ugq';

bcrypt.compare(password, hashPassword, (err, res) => {
    console.log(res);
})
