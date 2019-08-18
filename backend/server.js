require('./data')();
let express = require("express");
let bodyParser = require('body-parser');
let app = express();
var cors = require('cors');
//app.use(cors());
const Userdao = require('../backend/FoodHubbackenddao/User.dao.server');
let bcryptjs = require('bcryptjs')
let jsonwebtoken = require('jsonwebtoken')
let passport = require('passport')

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS");
  next();
})

let cookieParser = require('cookie-parser');
// Start All the Routes
app.use(express.static(__dirname + 'public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(passport.initialize());

////// Passport JWT Auth
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'AHSDEUIYEIUER';
passport.use(
  new JwtStrategy(opts, (jwt_payload, done) => {
    Userdao.findOneById(jwt_payload.id, (err, user) => {
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      })
  })
)

const Commentdao = require('../backend/FoodHubbackenddao/Comments.dao.server');
const Recipedao = require('../backend/FoodHubbackenddao/Recipe.dao.server');
const SaveRecipedao = require('../backend/FoodHubbackenddao/SavedRecipes.dao.server');

app.post('/api/addrecipe', passport.authenticate('jwt', {session: false}), (req, res) => {
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
  SaveRecipedao.onSaveRecipe('5c15f2c1b7be38caa02508fc', req.params.id).then(response => res.send(response))
})
app.get('/api/recipes/:filterfood', (req, res) => {
  Recipedao.fetchOnlyThereFoodType(req.params.filterfood).then(response => res.send(response))
})

app.post('/api/register', (req, res) => {
  Userdao.createUser({username: req.body.email, password: req.body.password})
    .then(user => {
      const token = jsonwebtoken.sign({id: user._id}, 'AHSDEUIYEIUER', {expiresIn: '1d'});
      res.send({success: "user signUp successfully", token : token})
  }).catch(err => {
    res.send(err);
  })
})

app.post('/api/login', (req, res) => {
  const user = Userdao.findOneUser({email: req.body.email}).then(user => {
    if(!user) {
      return res.status(400).json({err: "invalid username or password"})
    } else {
      bcryptjs.compare(req.body.password, user.password).then(matched => {
        if(!matched) {
          return res.status(401).json({err: "invalid credentials"});
        } else {
          const token = jsonwebtoken.sign({id: user._id}, 'AHSDEUIYEIUER', {expiresIn: '1d'});
          res.send({success: "user signIn successfully", token : token})
        }
      })
    }
  }).catch(err => {
    return res.status(500).json(err);
  })
})

app.post('/api/user', (req, res) => {
  var auth = req.headers.authorization;
  var decoded = jsonwebtoken.verify(auth, 'AHSDEUIYEIUER');
  var userId = decoded.id;
  Userdao.findOneById(userId).then(user => res.send(user))
})

app.listen(3002);
