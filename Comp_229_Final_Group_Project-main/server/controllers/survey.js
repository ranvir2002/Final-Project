let Surveys = require("../models/surveys");

module.exports.displaySurveyList = (req, res, next) => {
  Surveys.find((err, surveyResponseList) => {
    if (err) {
      return console.error(err);
    } else {
      res.render("./surveys/list", {
        title: "Survey Response List",
        SurveyResponseList: surveyResponseList,
        displayname: req.user ? req.user.displayname : "",
      });
    }
  });
};

module.exports.displayAddSurveyResponse = (req, res, next) => {
  res.render("./surveys/add", {
    title: "Add Survey Response",
    displayname: req.user ? req.user.displayname : "",
  });
};

module.exports.addSurveyResponse = (req, res, next) => {
  let newSurveyResponse = Surveys({
    personName: req.body.personName,
    currentStatus: req.body.currentStatus,
    emailId: req.body.emailId,
    unemploymentDuration: req.body.unemploymentDuration,
    reasonForUnemployment: req.body.reasonForUnemployment,
    mentalHealthOnUnemployment: req.body.mentalHealthOnUnemployment,
    localActionOnUnemployment: req.body.localActionOnUnemployment,
  });
  Surveys.create(newSurveyResponse, (err, surveyResponse) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/surveys");
    }
  });
};

module.exports.displayEditSurveyResponse = (req, res, next) => {
  let id = req.params.id;
  Surveys.findById(id, (err, surveyResponseToEdit) => {
    if (err) {
      console.log(err);
    } else {
      res.render("./surveys/edit", {
        title: "Edit Product",
        surveyResponseToEdit: surveyResponseToEdit,
        displayName: req.user ? req.user.displayName : "",
      });
    }
  });
};

module.exports.editSurveyResponse = (req, res, next) => {
  let id = req.params.id;
  let editedSurveyResponse = Surveys({
    _id: id,
    personName: req.body.personName,
    currentStatus: req.body.currentStatus,
    emailId: req.body.emailId,
    unemploymentDuration: req.body.unemploymentDuration,
    reasonForUnemployment: req.body.reasonForUnemployment,
    mentalHealthOnUnemployment: req.body.mentalHealthOnUnemployment,
    localActionOnUnemployment: req.body.localActionOnUnemployment,
  });
  Surveys.updateOne({ _id: id }, editedSurveyResponse)
    .then((_) => {
      res.redirect("/surveys");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.deleteSurveyResponse = (req, res, next) => {
  let id = req.params.id;
  Surveys.remove({ _id: id }, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/surveys");
    }
  });
};
