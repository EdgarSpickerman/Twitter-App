const express = require('express');
const router = express.Router();
const config = require('../config.js');
const Twit = require('twit');

const organizeTimeStamp = authUser => {
    return new Promise((resolve, reject) => {
        if (authUser.tweets.length === 5 && authUser.messages.length === 5) {
            authUser.tweets.sort((a, b) => a.created_at < b.created_at);
            authUser.messages.sort((a, b) => a.created_at < b.created_at);
            for (let i = 0; i < authUser.tweets.length; i++) {
                authUser.tweets[i].created_at = new Date(authUser.tweets[i].created_at).toLocaleString();
                authUser.messages[i].created_at = new Date(authUser.messages[i].created_at).toLocaleString();
            }
            resolve(authUser)
        } else reject(new Error('The last 5 tweets/messages were not retrieved'));
    });
}

//Authenticates the newly created twit
//resolves with the authUser's name, screen_name, friends count, profile image and banner;
//rejects the user if any key is invalid.
const isAuthenticated = () => {
    return new Promise((resolve,reject) => {
        let T = new Twit(config);
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
        let T = new Twit(config);
        T.get('friends/list', { count: 5 }, (err, data) => {
            if (err) return reject(err);
            authUser.friends = data.users
            resolve(authUser);
        });
    });
};

//retrieves the last 5 tweets made by the authUser
//resolves with a sorted list by date of the tweets
//rejects if any error's occur.
const getTweets = authUser => {
    return new Promise((resolve, reject) => {
        let T = new Twit(config);
        T.get('statuses/user_timeline', { count: 5 }, (err, data) => {
            if (err) return reject(err);
            authUser.tweets = data
            resolve(authUser);
        });
    });
};


//gets the authUser's last 5 DM's that they sent
//resolves with the authUser's last 5 DM's
//Rejects if exceeds 15 attempts in 15 minutes
const getMessages = authUser => {
    return new Promise((resolve, reject) => {
        let T = new Twit(config);
        T.get('direct_messages/sent', { count: 5 }, (err, data) => {
            if (err) return reject(err);
            authUser.messages = data
            resolve(authUser);
        });
    });
};

//Describes what happens when the server recieves a get request to the / route.
//authenticates the user retrieving the last 5 tweets,DM's, and friends rendering that info to the screen.
//reject's the user's request if any error's are present with a friendly message
router.get('/', (req, res) => {
    isAuthenticated()
        .then(getTweets)
        .then(getFriends)
        .then(getMessages)
        .then(organizeTimeStamp)
        .then(user => {
            res.locals = user;
            res.render('index')
        }).catch(err => {
            console.log(err.message);
            //error = err.message might have to dynamically write the error to /error
            res.redirect('/error');
        });
});

router.post('/', (req, res) => {
    let T = new Twit(config);
    T.post('statuses/update', { status: req.body.newTweet }, (err, data) => {
        if (err) return res.send(err);
        let tweetData = {};
        tweetData.picture = data.user.profile_image_url;
        tweetData.author = '<h4>' + data.user.name + '</h4> @' + data.user.screen_name;
        tweetData.date = new Date(data.created_at).toLocaleString();
        tweetData.like = data.favorite_count;
        tweetData.retweet = data.retweet_count;
        tweetData.message = data.text;
        res.send(tweetData);
    });
});

module.exports = router;