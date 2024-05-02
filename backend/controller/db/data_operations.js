const GetDateTime = require("../server/datetime");
const { Judge, Contestant } = require("../../model/db/dbm_JC");
const { SurveyForm } = require("../../model/db/dbm_S");

const fs = require('fs');
const path = require('path');

const POST_UploadContestant = async function (req, res) {
  let contestant_name = await req.body.key_contestant_name;
  let timestamp = GetDateTime();

  try {
    await DB_addContestant(contestant_name, timestamp);
    res.status(200).json({ success: "Upload successful." });
  } catch (error) {
    console.error("ERROR: Upload error!" + error);
    res
      .status(500)
      .json({ error_msg: "ERROR: Upload error!", error_msg2: error });
  }
};

const DB_addContestant = async function (name, timestamp) {
  try {
    await Contestant.create({
      contestant_name: name,
      //createdDate: timestamp
    });
    console.log("Entry saved in database");
  } catch (error) {
    console.error("ERROR: Cannot save entry in database!" + error);
    throw error;
  }
};

const GET_Contestants = async function (req, res) {
  let db_contestants;
  try {
    db_contestants = await Contestant.findAll();
    res.status(200).json(db_contestants);
  } catch (error) {
    res
      .status(500)
      .json({ error_msg: "ERROR: Cannot fetch entries!", error_msg2: error });
  }
};

const POST_UploadJudge = async function (req, res) {
  let judge_name = await req.body.key_judge_name;
  let timestamp = GetDateTime();

  try {
    await DB_addJudge(judge_name, timestamp);
    res.status(200).json({ success: "Upload successful." });
  } catch (error) {
    console.error("ERROR: Upload error!" + error);
    res
      .status(500)
      .json({ error_msg: "ERROR: Upload error!", error_msg2: error });
  }
};

const DB_addJudge = async function (name, timestamp) {
  try {
    await Judge.create({
      judge_name: name,
      //createdDate: timestamp
    });
    console.log("Entry saved in database");
  } catch (error) {
    console.error("ERROR: Cannot save entry in database!" + error);
    throw error;
  }
};

const GET_Judges = async function (req, res) {
  let db_judges;
  try {
    db_judges = await Judge.findAll();
    res.status(200).json(db_judges);
  } catch (error) {
    res
      .status(500)
      .json({ error_msg: "ERROR: Cannot fetch entries!", error_msg2: error });
  }
};

const POST_UploadSurveyData = async function (req, res) {
  try {
    const surveyData_JSON = req.body;

    // Convert survey data to JSON string
    const jsonData = JSON.stringify(surveyData_JSON, null, 2); // Optionally, use prettified JSON with indentation

    // Define the directory to save the file
    const directoryPath = path.join(__dirname, "..", "..", "model", "static", "surveys");

    // Create the directory if it doesn't exist
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath);
    }

    // Define the filename
    const form_name = surveyData_JSON.form_name;
    const filename = form_name.replace(/\s+/g, '_') + "_" + GetDateTime() + ".json";

    // Define the file path
    const filePath = path.join(directoryPath, filename);

    // Write the JSON data to the file
    fs.writeFileSync(filePath, jsonData);

    // Create the database entry
    await SurveyForm.create({
      form_name: form_name,
      form_author: surveyData_JSON.form_author,
      create_date: new Date().toISOString(),
      form_filename: filename,
    });

    // Respond to the client
    res.status(200).json({
      message: "Survey data saved successfully",
      filename: filename,
      filePath: filePath,
    });
  } catch (error) {
    console.error("Error saving survey data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//     try {
//     const surveyData = req.body.form_data;
//     const surveyData_JSON = JSON.parse(surveyData);
//     const uploadedImages = req.files;

//     const formName = surveyData_JSON.form_name;
//     const surveyData_filename = formName + GetDateTime() + ".json";

//     await SurveyForm.create({
//         form_name: formName,
//         form_author: surveyData_JSON.form_author,
//         create_date: new Date().toISOString(),
//         form_filename: finalFilename
//     });

//     uploadImages.array(uploadedImages, 64);

//     res.status(200).json({ message: 'Survey submitted successfully!' });
//     //ganitp:
//     /*
//         preprocess file in frontend, pasa mo sa backend
//         images array
//         survey data
//         survey data na naka json
//     */
// } catch (error) {
//     throw error;
// }

const POST_UploadImageFiles = async function (req, res) {
  const images = req.files;
  console.log(images);
  res
    .status(200)
    .json({ message: "POST_UploadImageFiles is called", images: images });
  return;
};

const GET_Surveys = async function (req, res) {
  let db_surveys;
  try {
    db_surveys = await SurveyForm.findAll();
    res.status(200).json(db_surveys);
  } catch (error) {
    res
      .status(500)
      .json({ error_msg: "ERROR: Cannot fetch surveys", error_msg2: error });
  }
};

module.exports = {
  POST_UploadContestant,
  GET_Contestants,
  POST_UploadJudge,
  GET_Judges,
  POST_UploadSurveyData,
  GET_Surveys,
  POST_UploadImageFiles,
};
