const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Tweet = require("../../models/tweets");
const validateTweetInput = require("../../validation/tweets");

router.get("/", (req, res) => {
  Tweet.find()
    .sort({ date: -1 })
    .then(tweets => res.json(tweets))
    .catch(err => res.status(404).json({ notweetsfound: "No Tweets found" }));
});

router.get("/user/:user_id", (req, res) => {
  Tweet.find({ user: req.params.user_id })
    .then(tweets => res.json(tweets))
    .catch(err =>
      res.status(404).json({ notweetsfound: "No tweets from this user found" }),
    );
});

router.get("/:id", (req, res) => {
  Tweet.findById(req.params.id)
    .then(tweets => res.json(tweets))
    .catch(err =>
      res.status(404).json({ notweetsfound: "No tweets found with that ID" }),
    );
});

// Protected route for a logged in user to post tweets
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateTweetInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newTweet = new Tweet({
      tweet: req.body.tweet,
      user: req.user.id,
    });

    newTweet
      .save()
      .then(tweet => res.json(tweet))
      .catch(err => res.status(400).json({ error: err }));
  },
);

module.exports = router;
