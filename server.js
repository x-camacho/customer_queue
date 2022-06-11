const express = require('express');
//bodyParser reads the data for the <form>
const bodyParser = require('body-parser');
const res = require('express/lib/response');
const MongoClient = require('mongodb').MongoClient
const app = express();
const connectionString = 'mongodb+srv://admin:admin@appointments.hsaew.mongodb.net/appointments?retryWrites=true&w=majority'
const connectionString2 = 'mongodb+srv://admin:admin@cluster0.gugyx.mongodb.net/?retryWrites=true&w=majority'
// Where we tell our app to 'listen' which is our local host names localhost:3000
//We can now communicate to our express server through the browser
app.listen(3000, function() {
    console.log('Listening on 3000')
})

//EJS
app.set('view engine', 'ejs')

//Connect to MongoClient
MongoClient.connect(connectionString2, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('customer-queue')
    const quotesCollection = db.collection('quotes')
    //GET - READ
    app.get('/', (req, res) => {
        const cursor = db.collection('quotes').find().toArray()
            .then(results => {
                res.render('index.ejs', { quotes: results })
            })
        .catch(error => console.error(error))
    })
    //POST - CREATE
    app.post('/quotes', (req, res) => {
        quotesCollection.insertOne(req.body)
            .then(result => {
                res.redirect('/')
            })
            .catch(error => console.error(error))
    })
  })
  .catch(error => console.error(error))

// MongoClient.connect('mongodb+srv://admin:admin@appointments.hsaew.mongodb.net/appointments?retryWrites=true&w=majority', (err, client) => {
//     if (err) return console.error(err)
//     console.log('Connected to DB')
//     const db = client.db('customer-queue')
// })

//middleware
app.use(bodyParser.urlencoded({ extended: true }))
//The urlencoded method within body-parser tells body-parser to extract data from the <form> element and add them to the body property in the request object.


//handlers
//We're performing a GET request here.
//Architectually the request looks like this --------------->  app.get(endpoint, callback)
//  The endpoint is like an API URL endpoint.
//  The callback tells the server what to do whenthe requested endpoint matches the endpoint stated and it takes 2 arguements:  A request and A response.
// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html')
// })
  // Note: __dirname is the current directory you're in. Try logging it and see what you get!
  // Mine was '/Users/xc/x-camacho/Projects/mini_queue' for this app

// app.post('/quotes', (req, res) => {
//     console.log(req.body)
// })