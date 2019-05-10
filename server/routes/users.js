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

//cookie check afixme
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
        res.send(req.body.username)
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

//CRUD STUFF
//add a tweet
router.post('/addTweet', (req, res) => {
    TwitterUserCollection.findOneAndUpdate({username: req.body.username},
        {$push: {tweets: req.body}}, (errors) => {
            if (errors) res.send(errors);
            else res.send("Tweet Added");
        });
});

//edit tweet
router.post('/editTweet/:id/:tweetId', (req, res) => {
    TwitterUserCollection.updateOne({_id: req.params.id, "tweets._id": req.params.tweetId},
        {
            $set: {
                "tweets.$.tweetMessage": req.body.tweetMessage,
                "tweets.$.tweetImage": req.body.tweetImage,
                "tweets.$.tweetPublic": req.body.tweetPublic
            }
        }, (errors) => {
            if (errors) res.send(errors);
            else {
                res.send('tweet updated')
            }
        });
});

//results = user object array. Map array for each user THEN map each user for tweets
router.get('/grabTweets', (req, res) => {
    TwitterUserCollection.find({}, (errors, results) => {
        if (errors) res.send(errors);
        else {
            res.send(results)
        }
    })
});

//search tweets
router.post('/searchTweets', (req, res) => {
    TwitterUserCollection.find(
        {"tweets.tweetMessage": {"$regex": req.body.searchBar, "$options": "i"}}, (errors, results) => {
            if (errors) res.send(errors);
            else {
                let resultsArray = [];
                let sendArray = [];
                for (let i = 0; i < results.length; i++) {
                    for (let j = 0; j < results[i].tweets.length; j++) {
                        // resultsArray.push(results[i].tweets[j].tweetMessage);
                        resultsArray.push(
                            {
                                tweetMessage:results[i].tweets[j].tweetMessage,
                                tweetImage:results[i].tweets[j].tweetImage,
                            }
                        )
                    }
                }
                for(let i=0; i<resultsArray.length; i++){
                    if(resultsArray[i].tweetMessage.includes(req.body.searchBar)){
                        sendArray.push(resultsArray[i])
                    }
                }
                res.send(sendArray);
            }
        })
});

//grab user
router.post('/searchUsers', (req, res) => {
    TwitterUserCollection.findOne({username: req.body.username}, (errors, results) => {
        if (errors) res.send(errors);
        else {
            res.send(results);
        }
    })
});

module.exports = router;
