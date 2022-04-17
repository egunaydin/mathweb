import pool from "../database/keys";

const authentication = {};

authentication.signUp = (req, res) => {
  console.log(req.body);
  res.send("Registered");
};

module.exports = authentication;
