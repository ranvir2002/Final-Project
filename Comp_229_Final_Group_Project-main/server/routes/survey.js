let express = require("express");

let router = express.Router();

let mongoose = require("mongoose");

let passport = require("passport");

let surveyController = require("../controllers/survey");

function requiredAuth(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }
  next();
}

router.get("/", requiredAuth, surveyController.displaySurveyList);

router.get("/add", requiredAuth, surveyController.displayAddSurveyResponse);

router.post("/add", requiredAuth, surveyController.addSurveyResponse);

router.get(
  "/edit/:id",
  requiredAuth,
  surveyController.displayEditSurveyResponse
);

router.post("/edit/:id", requiredAuth, surveyController.editSurveyResponse);

router.get("/delete/:id", requiredAuth, surveyController.deleteSurveyResponse);

module.exports = router;
