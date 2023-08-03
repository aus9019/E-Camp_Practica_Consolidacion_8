const express = require("express");
const router = express.Router();
const controller = require("../controllers/bootcamp.controller");
const { authJwt } = require("../middleware");

router.post("/", authJwt, controller.createBootcamp);
router.post("/adduser", authJwt, controller.addUser);
router.get("/:id", authJwt, controller.findById);
router.get("/", controller.findAll);

module.exports = router;
