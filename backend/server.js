require('./data')();
var firebase = require('firebase/app')
require('firebase/auth')

var firebaseConfig = {
    apiKey: "AIzaSyB-bn43n1ZFznWHe_bRkXv2lrG1iMY-w8k",
    authDomain: "meanfoodheaven.firebaseapp.com",
    databaseURL: "https://meanfoodheaven.firebaseio.com",
    projectId: "meanfoodheaven",
    storageBucket: "meanfoodheaven.appspot.com",
    messagingSenderId: "736989505659",
    appId: "1:736989505659:web:81de580d6ba6a794"
};

firebase.initializeApp(firebaseConfig)

let express = require("express");
let bodyParser = require('body-parser');
let app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS");
  next();
})

let cookieParser = require('cookie-parser');
// Start All the Routes

app.use(express.static(__dirname + 'public'));
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());
app.use(bodyParser.json()); // for parsing application/json

const Userdao = require('../backend/FoodHubbackenddao/User.dao.server');

const Commentdao = require('../backend/FoodHubbackenddao/Comments.dao.server');
const Recipedao = require('../backend/FoodHubbackenddao/Recipe.dao.server');
const SaveRecipedao = require('../backend/FoodHubbackenddao/SavedRecipes.dao.server')
app.post('/api/addrecipe', (req, res) => {
  Recipedao.createSingleRecipe(req.body).then(recipe => res.send(recipe))
})
app.get('/api/allrecipe', (req, res) => {
  Recipedao.fetchAllRecipe().then(response => res.send(response))
})
app.get('/api/foods/:id', (req, res) => {
  Recipedao.fetchOneRecipe(req.params.id).then(response => res.send(response))
})
app.put('/api/foods/:id', (req, res) => {
  Recipedao.fetchOneRecipeAndUpdate(req.params.id, req.body).then(response => res.send(response))
})
app.delete('/api/foods/:id', (req, res) => {
  Recipedao.fetchOneRecipeAndDelete(req.params.id).then((response) =>
    Commentdao.DeleteAllCommentForThePost(req.params.id)).then(response => res.send(response))
})
app.post('/api/foods/:id/comment', (req, res) => {
  Commentdao.createComment(req.params.id, req.body).then(commentObject =>
    Recipedao.AddCommentToTheRecipe(req.params.id, commentObject)).then(response => res.send(response))
});
app.get('/api/foods/:id/comment/:commentid', (req, res) => {
  Commentdao.FetchOneCommentById(req.params.commentid).then(response => res.send(response))
})
app.put('/api/foods/:id/comment/:commentid', (req, res) => {
  Commentdao.UpdateOneCommentForAPost(req.params.commentid, req.body).then(response => res.send(response))
})
app.delete('/api/foods/:id/comment/:commentid', (req, res) => {
  Commentdao.DeleteOneCommentForAPost(req.params.commentid).then(response => {
    Recipedao.DeleteACommentInAPost(req.params.id, req.params.commentid)
  }).then(response => res.send(response))
})
app.post('/api/foods/:id/likes', (req, res) => {
  SaveRecipedao.onSaveRecipe('5c15f2c1b7be38caa02508fc', req.params.id).then(response => res.send(response));
})
app.get('/api/recipes/:filterfood', (req, res) => {
  Recipedao.fetchOnlyThereFoodType(req.params.filterfood).then(response => res.send(response))
})

app.post('/api/register', (req, res) => {
  firebase.auth().createUserWithEmailAndPassword(req.body.username, req.body.password)
    .then((err) => {
      if(err) {
        console.log(err)
      }}).then((err) => {
      if (firebase.auth().currentUser) {
        Userdao.createUser({username: req.body.username, password:
              req.body.password}).then((response) => {
              res.send(response)
      })} else {
        res.send(err)
      }
  })
})

app.post('/api/login', (req, res) => {
  firebase.auth().signInWithEmailAndPassword(req.body.username,
    req.body.password).
  then((err) => {
    if(err) {
      console.log(err)
    }
  })
})

app.get('/api/logout', (req, res) => {
 firebase.auth().signOut().then(err => {
    if (err) {
      console.log(err)
    }
  })
})

app.get('/api/register', (req, res) => {
  if(firebase.auth().currentUser) {
    res.send(firebase.auth().currentUser)
  } else {
    res.send('None')
  }
})

app.listen(3002);
