const express = require('express');
const router = express.Router();
const config = require('../config.js');
const Twit = require('twit');

//Authenticates the newly created twit
//resolves with the authUser's name, screen_name, friends count, profile image and banner;
//rejects the user if any key is invalid.
const isAuthenticated = keys => {
    return new Promise((resolve,reject) => {
        let T = new Twit(keys)
        T.get('account/verify_credentials', (err, data) => {
            if (err) return reject(err)
            let authUser = {};
            authUser.id = data.id;
            authUser.name = data.name;
            authUser.screenName = data.screen_name;
            authUser.picture = data.profile_image_url;
            authUser.banner = data.profile_banner_url;
            authUser.friendsNum = data.friends_count;
            resolve(authUser);
        });
    });
}

//gets the authUser's last 5 friends
//resolves with the authuser's 5 most recent friends
//rejects if any error's occur or if they exceeding 15 attempts in 15 minutes
const getFriends = authUser => {
    return new Promise((resolve,reject) => {
        T.get('friends/list', {count: 5}, (err, data) => {
            if (err) return reject(err);
            authUser.friends = data.users
            resolve(authUser);
        });
    });
};

//Describes what happens when the server recieves a get request to the / route.
//authenticates the user retrieving the last 5 tweets,DM's, and friends rendering that info to the screen.
//reject's the user's request if any error's are present with a friendly message
router.get('/', (req, res) => {
    isAuthenticated(config)
        .then(user => {
            console.log(user);
            res.render('index')
        }).catch(err => {
            console.log(err.message);
            //error = err.message might have to dynamically write the error to /error
            res.redirect('/error');
        });
});


module.exports = router;