const express = require("express");

const apiController = require("../controller/api");
const jwtController = require("../controller/jwt");

const router = express.Router();

router.post("/save", jwtController.verifyJWT, apiController.save);
router.post("/get", jwtController.verifyJWT, apiController.get);
router.post("/update", jwtController.verifyJWT, apiController.update);
router.post("/delete", jwtController.verifyJWT, apiController.delete);
router.get("/token", jwtController.signJWT);

module.exports = router;
