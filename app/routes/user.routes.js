const express = require("express");
const router = express.Router();
const controller = require("../controllers/user.controller");
const { authJwt } = require("../middleware");

router.post("/signup", controller.createUser);
router.post("/signin", controller.signIn);
router.get("/:id", authJwt, controller.findUserById);
router.get("/", authJwt, controller.findAll);
router.put("/:id", authJwt, controller.updateUserById);
router.delete("/:id", authJwt, controller.deleteUserById);

module.exports = router;
