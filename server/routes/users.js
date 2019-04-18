var express = require('express');
var router = express.Router();
var bCrypt = require('bcrypt-nodejs');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var TwitterUserCollection = require('../models/TwitterUserSchema');

router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser(function (user, done) {
    done(null, user._id);
});
passport.deserializeUser(function (id, done) {
    TwitterUserCollection.findById(id, function (err, user) {
        done(err, user);
    });
});

var isValidPassword = function (user, password) {
    return bCrypt.compareSync(password, user.password);
};
var createHash = function (password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

//cookie check PRETTY SURE THIS IS WRONG
// router.get('/', (req, res) => {
//   if (req.session.username) {
//     res.send(req.session.username);
//     console.log(req.session.username)
//   } else {
//     res.send(null);
//   }
// });

//logout route
router.get('/logout', (req, res) => {
    req.session = null
});

//CREATE A NEW USER
//register strategy
passport.use('register', new LocalStrategy(
    {passReqToCallback: true},
    function (req, username, password, done) {
        findOrCreateUser = function () {
            TwitterUserCollection.findOne({'username': username}, (errors, user) => {
                if (user) {
                    return done(null, false, {message: 'User Exists'});
                } else {
                    var newUser = new TwitterUserCollection();

                    newUser.username = username;
                    newUser.password = createHash(password);
                    newUser.profileImage = req.body.profileImage;
                    newUser.backgroundImage = req.body.backgroundImage;

                    newUser.save((errors) => {
                        if (errors) {
                            throw errors;
                        }
                        return done(null, newUser);
                    });
                }
            });
        };
        process.nextTick(findOrCreateUser);
    })
);

//register routes
router.post('/register',
    passport.authenticate('register',
        {failureRedirect: '/users/registerFail'}
    ), (req, res) => {
        res.send("Successful Registration")
    });
router.get('/registerFail', (req, res) => {
    res.send("Failed Registration");
});

//LOG IN AN EXISTING USER
//login strategy
passport.use(new LocalStrategy(
    function (username, password, done) {
        TwitterUserCollection.findOne({username: username}, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, {message: 'Incorrect username.'});
            }
            if (!isValidPassword(user, password)) {
                return done(null, false, {message: 'Incorrect password.'});
            }
            return done(null, user, {user: user.username});
        });
    }
));

//login routes
router.post('/login',
    passport.authenticate('local',
        {failureRedirect: '/users/loginFail'}),

    function (req, res) {
        req.session.username = req.body.username;
        res.send(req.session.username);
        console.log("session username: " + req.session.username)
    });
router.get('/loginFail', (req, res) => {
    res.send(undefined);
});

//add a tweet
router.post('/addTweet', (req, res) => {
    TwitterUserCollection.findOneAndUpdate({username: req.body.username},
        {$push: {tweets:req.body}}, (errors) => {
            if (errors) res.send(errors);
            else res.send("Tweet Added");
        });
});

//get all tweets
//results = user object array. Map array for each user THEN map each user for tweets
router.get('/grabTweets',(req,res)=> {
   TwitterUserCollection.find({},(errors,results)=>{
       if(errors) res.send(errors);
       else{
           res.send(results)
       }
   })
});

//search tweets INCOMPLETE SEARCH BY USERNAME
router.get('/searchTweets',(req,res)=> {
    TwitterUserCollection.findOne({username:req.body.username},(errors,results)=>{
        if(errors) res.send(errors);
        else{
            res.send(results)
        }
    })
});

module.exports = router;
