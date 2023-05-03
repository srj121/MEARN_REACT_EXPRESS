const express = require('express');
const app = express();
const cors = require('cors')
app.use(cors())
require('dotenv').config();
const {connectToDatabaseAuth, authclient, connectToDatabaseAuth } = require('./db');
const authCollection = authclient.db('security').collection('auth');
connectToDatabaseAuth();
//_____________________________________LOGGER_______________________________________

const logger = require('./logger/logger');

//_____________________________________PARSE BODY_______________________________________
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//_____________________________________MODEL_______________________________________
const authUser = require('./model/AuthUser');

//_________________________________CONNECTION TO PORT_________________________________

const port = process.env.PORT;
app.listen(port, () => {
  logger.info(`Server started on port ${port}`);
});
//____________________________________POST ADDUSER_______________________________________

app.post('/authsignup', async (req, res) => {
  const {email, name, password } = req.body;

  const newAuthUser = new authUser({
    email,
    name,
    password
  });

  console.log(email)
  console.log(name)
  console.log(password)

  try {
    
    const savedUser = await authCollection.insertOne(newAuthUser);
    logger.info(savedUser)
    res.json(savedUser)
    
  } catch (err) {
    logger.error(err)
    res.status(500).json({ message: 'Error inserting document' });
    logger.info('Error inserting document' )
  }
});
