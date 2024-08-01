var express = require('express');
var router = express.Router();
const userModel = require("./users");
const postModel = require("./post");
const passport = require('passport');

// Correct passport strategy setup
const localStrategy = require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/profile', isLoggedIn, function(req, res, next) {
  res.render('feed');
});

router.post('/register', function(req, res) {
 
  const { username, email, fullname } = req.body;
  console.log("Extracted data:", { username, email, fullname });
  console.log("Received registration data:", req.body);
  
  if (!username) {
    console.log("Username is missing");
    return res.status(400).send('Username is required');
  }
  const userData = new userModel({ username, email, fullname });
  userModel.register(userData, req.body.password)
    .then(function() {
      passport.authenticate("local")(req, res, function() {
        res.redirect("/profile");
      });
    })
    .catch(function(error) {
      res.status(500).send(error.message);
    });
});

router.post('/login', passport.authenticate("local", {
  successRedirect: "/profile",
  failureRedirect: '/'
}));

router.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/');
}


// router.get('/allUserPost',async function(req, res, next) {
//   let user = await userModel.findOne({_id:"66a9001ceaf01cde62ace5d3"})
//   .populate('posts')
//   res.send(user)
// });
// router.get('/user', async function(req, res, next) {
// let createdUser = await userModel.create({
//   username: "Adil",
//   password: "Youtuber2061",
//   posts: [],

//   email:"aryal.rajat242@gmail.com",
//   fullName:"Rajat Aryal"
//  });
//  res.send(createdUser)
// });
// router.get('/post', async function(req, res, next) {
//   let postUser = await postModel.create({
//     postText: "Hello EveryOne",
//     user: "66a9001ceaf01cde62ace5d3"
//    });
//    let user = await userModel.findOne({_id:"66a9001ceaf01cde62ace5d3"})
//    user.posts.push(postUser._id)
//    await user.save()
//    res.send("Done")
//   });

module.exports = router;
