const express = require('express');
const app = express();
const crypto = require('crypto');
const cors = require('cors')
app.use(cors())
require('dotenv').config();
const { userclient, connectToDatabaseUser } = require('./db');
const firstCollection = userclient.db('expressJs').collection('first');
connectToDatabaseUser();

const {connectToDatabaseAuth, authclient } = require('./db');
const authCollection = authclient.db('security').collection('auth');
connectToDatabaseAuth();

//_____________________________________LOGGER_______________________________________

const logger = require('./logger/logger');

//_____________________________________PARSE BODY_______________________________________
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//_____________________________________MODEL_______________________________________
const user = require('./model/User');
const authUser = require('./model/AuthUser');

//_________________________________CONNECTION TO PORT_________________________________

const port = process.env.PORT;
app.listen(port, () => {
  logger.info(`Server started on port ${port}`);
});
//_________________________________CONNECTION TO PORT_________________________________

app.get('/reconnect',async (req, res) => {
  try {
    await userclient.close(); // Close the existing connection
    await connectToDatabase(); // Connect to the database again
    res.status(200).send('Successfully reconnected to the database');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error reconnecting to the database');
  }
});
//____________________________________GET ALL_______________________________________

app.get('/', async (req, res) => {
  try {

    const users = await firstCollection.find().toArray();

    res.json(users);

  } catch (err) {
    logger.error(err)
    logger.info('Error retrieving documents')
  }
});

//____________________________________GET BY NAME_______________________________________

app.get('/byname', async (req, res) => {
  logger.info('get by Name')
  try {
    const userName = req.query.name;

    logger.info('userName = ' + userName);

    const findByname = await firstCollection.find({ name: userName }).toArray();

    if (findByname.length === 0) {
      logger.info(`Document with name { ${userName} } not found`)
      res.status(404).send(`Document with name { ${userName} } not found`)
    } else {
      res.json(findByname)
    }
  } catch (err) {
    logger.error(err)
    logger.info('Error retrieving document');
    res.status(500).send('Error retrieving document');
  }
});


//____________________________________GET BY AGE_______________________________________

app.post('/byage', async (req, res) => {
  logger.info('get by Age')
  try {
    const userAge = Number(req.body.age);

    logger.info('userAge = ' + userAge);


    const findByage = await firstCollection.find({ age: userAge }).toArray();
    if (findByage.length === 0) {
      res.status(404).send(`Document with age { ${userAge} } not found`);
      logger.info(`Document with age { ${userAge} } not found`);
    } else {
      res.json(findByage)
    }
  } catch (err) {
    logger.error(err)
    logger.info('Error retrieving document');
    res.status(500).send('Error retrieving document');
  }
});



//____________________________________DELETE BY ID_______________________________________

app.post('/deleteuserbyid', async (req, res) => {
  const number1 = req.body._id;
  console.log(number1)

  try {
    const { ObjectId } = require('mongodb');


    const number = req.body._id;
    const objectId = new ObjectId(String(number));
    logger.info(objectId);


    const result  = await firstCollection.deleteOne({ _id: objectId});
  
      if (result.deletedCount === 1) {
        res.json(result)
        logger.info('Document deleted successfully');
      }else {
      res.status(404).send('Document not found');
      }
      // } else {
      //   logger.info('Document not found');
      //   res.status(404).send('Document not found');
      // }
}
catch (err) {
  res.status(400).send('Error retrieving document');
  logger.info('Error retrieving document');
}
});

//____________________________________DELETE BY NAME_______________________________________

app.post('/deleteuserbyname', async (req, res) => {
  try {

    const name = req.body.name;
    logger.info(name);
    const result  = await firstCollection.deleteMany({ name: name});

      if (result.deletedCount > 0) {
        logger.info('Document deleted successfully')
        res.status(200).send({"count":result.deletedCount});

        
      } else {
        logger.info('Document not found')
        res.status(404).send('Document not found');
      }
}
catch (err) {
  logger.error(err)
  res.status(500).send('Error retrieving document');
}
});
//____________________________________POST ADDUSER_______________________________________

app.post('/addUser', async (req, res) => {
  const { name, age } = req.body;

  const newUser = new user({
    name,
    age
  });
  console.log(name)
  console.log(age)

  try {
    if(age <= 0) {
      res.status(400).send("Age should not be less than 0");
    }else {

    const savedUser = await firstCollection.insertOne(newUser);
    logger.info(savedUser)
    res.json(savedUser)
    }
  } catch (err) {
    logger.error(err)
    res.status(500).json({ message: 'Error inserting document' });
    logger.info('Error inserting document' )
  }
});
//____________________________________POST AUTH ADDUSER_______________________________________

app.post('/authsignup', async (req, res) => {
  const {email, name, password } = req.body;

  const algorithm = 'aes-256-cbc';
  const key = crypto.scryptSync(password, 'salt', 32);
  const iv = crypto.randomBytes(16);
  
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update('Hello, world!', 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  console.log('Encrypted message:', encrypted);


  // const algorithm = 'aes-256-cbc';
  // const password = 'mysecretpassword';
  // const key = crypto.scryptSync(password, 'salt', 32);
  // const iv = crypto.randomBytes(16);
  
  // const cipher = crypto.createCipheriv(algorithm, key, iv);
  // let encrypted = cipher.update('Hello, world!', 'utf8', 'hex');
  // encrypted += cipher.final('hex');
  
  // console.log('Encrypted message:', encrypted);
  
  const newAuthUser = new authUser({
    email,
    name,
    password : encrypted
  });

  console.log(email)
  console.log(name)
  console.log(encrypted)

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

