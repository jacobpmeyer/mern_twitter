const Validator = require("validator");
const validText = require("./valid-text");

const validateTweetInput = data => {
  let errors = {};

  data.tweet = validText(data.tweet) ? data.tweet : "";

  if (!Validator.isLength(data.tweet, { min: 5, max: 140 })) {
    errors.tweet = "Tweet must be between 5 and 140 characters";
  }

  if (Validator.isEmpty(data.tweet)) {
    errors.tweet = "Tweet must not be empty";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};

module.exports = validateTweetInput;
