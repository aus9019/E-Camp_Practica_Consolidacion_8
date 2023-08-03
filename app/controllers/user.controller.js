const { user } = require("../models");
const db = require("../models");
const User = db.users;
const Bootcamp = db.bootcamps;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config/auth.config.js");

//* Crear y Guardar Usuarios
exports.createUser = (user) => {
  return User.create({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: user.password
  })
    .then(user => {
      console.log(`>> Se ha creado el usuario: ${JSON.stringify(user, null, 4)}`)
      return user
    })
    .catch(err => {
      console.log(`>> Error al crear el usuario ${err}`)
    })
}

// obtener los bootcamp de un usuario
exports.findUserById = (userId) => {
  return User.findByPk(userId, {
    include: [{
      model: Bootcamp,
      as: "bootcamps",
      attributes: ["id", "title"],
      through: {
        attributes: [],
      }
    },],
  })
    .then(users => {
      return users
    })
    .catch(err => {
      console.log(`>> Error mientras se encontraba los usuarios: ${err}`)
    })
}

// obtener todos los Usuarios incluyendo los bootcamp
exports.findAll = () => {
  return User.findAll({
    include: [{
      model: Bootcamp,
      as: "bootcamps",
      attributes: ["id", "title"],
      through: {
        attributes: [],
      }
    },],
  }).then(users => {
    return users
  })
}

// Actualizar usuarios
exports.updateUserById = (userId, fName, lName) => {
  return User.update({
    firstName: fName,
    lastName: lName
  }, {
    where: {
      id: userId
    }
  })
    .then(user => {
      console.log(`>> Se ha actualizado el usuario: ${JSON.stringify(user, null, 4)}`)
      return user
    })
    .catch(err => {
      console.log(`>> Error mientras se actualizaba el usuario: ${err}`)
    })
}

// Actualizar usuarios
exports.deleteUserById = (userId) => {
  return User.destroy({
    where: {
      id: userId
    }
  })
    .then(user => {
      console.log(`>> Se ha eliminado el usuario: ${JSON.stringify(user, null, 4)}`)
      return user
    })
    .catch(err => {
      console.log(`>> Error mientras se eliminaba el usuario: ${err}`)
    })
}

//* Función para iniciar sesión (signIn)
exports.signIn = async (req, res) => {
  try {
    const { user } = req;
    const expiresIn = "24h";

    const token = jwt.sign({ user }, config.secret, {
      expiresIn,
    });

    const response = {
      ok: true,
      status: 200,
      data: user,
      token,
    };

    return res.status(response.status).json(response);
  } catch (error) {
    const response = {
      ok: false,
      status: error.code || 500,
      message: error.message || "Error al Iniciar Sesión",
    };

    return res.status(response.status).json(response);
  }
};