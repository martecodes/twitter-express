const MongoClient = require('mongodb').MongoClient
const express = require ('express');
const bodyParser= require('body-parser')
const app = express();

var db, collection;

const url = "mongodb+srv://palindrome:leonnoel@cluster0.nrd65.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const dbName = "twitter";

app.listen(3000, () => {
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
      if(error) {
          throw error;
      }
      db = client.db(dbName);
      collection = db.collection('tweets')
      console.log("Connected to `" + dbName + "`!");
  });
});

 app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

//-------------------------------GET(Read)
app.get('/', (req, res) => {
    db.collection('tweets').find().toArray((err, result) => {
      if (err) return console.log(err)
      res.render('index.ejs', {tweets: result})
    })
})

//------------------------------PUT (Update)
app.put('/loves', (req, res) => {
    db.collection('tweets').findOneAndUpdate({tweet: req.body.tweet},
      { $inc: 
        { heart: 1,}
      }, 
      { sort: {_id: -1},
      upsert: true
    }, 
      (err, result) => {
      if (err) return res.send(err)
      res.send(result)
    })
})

app.put('/retweets', (req, res) => {
    db.collection('tweets').findOneAndUpdate({tweet: req.body.tweet}, {
      $inc: {
        retweet: 1,
      }
    }, {
      sort: {_id: -1},
      upsert: true
    }, (err, result) => {
      if (err) return res.send(err)
      res.send(result)
    })
  })
  
//-------------------------------POST (create)

app.post('/tweets', (req, res) => {
    db.collection('tweets').insertOne({tweet: req.body.tweet, heart: 0, retweet: 0}, (err, result) => {
      if (err) return console.log(err)
      console.log('saved to database')
      
      res.redirect('/')
    })
  })

//-------------------------------Delete (delete)

app.delete('/tweets', (req, res) => {
    db.collection('tweets').findOneAndDelete({tweet: req.body.tweet}, (err, result) => {
      if (err) return res.send(500, err)
      res.send('Message deleted!')
    })
  })