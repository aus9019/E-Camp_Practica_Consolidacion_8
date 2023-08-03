const db = require("../models");
const User = db.users;

checkDuplicateEmail = (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((user) => {
    if (user) {
      res.status(400).send({ message: "Este correo ya existe" });
      return;
    }
    next();
  });
};

module.exports = {
  checkDuplicateEmail,
};

