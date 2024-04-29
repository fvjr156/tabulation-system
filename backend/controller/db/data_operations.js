const GetDateTime = require('../server/datetime')
const { Judge, Contestant } = require('../../model/db/dbm_JC')
const { Survey } = require('../../model/db/dbm_S')

const POST_UploadContestant = async function (req, res) {
    let contestant_name = await req.body.key_contestant_name
    let timestamp = GetDateTime()

    try {
        await DB_addContestant(contestant_name, timestamp)
        res.status(200).json({ success: "Upload successful." })
    } catch (error) {
        console.error("ERROR: Upload error!" + error);
        res.status(500).json({ error_msg: "ERROR: Upload error!", error_msg2: error })
    }
}

const DB_addContestant = async function (name, timestamp) {
    try {
        await Contestant.create({
            contestant_name: name
            //createdDate: timestamp
        })
        console.log("Entry saved in database")
    } catch (error) {
        console.error("ERROR: Cannot save entry in database!" + error)
        throw error
    }
}

const GET_Contestants = async function (req, res) {
    let db_contestants
    try {
        db_contestants = await Contestant.findAll()
        res.status(200).json(db_contestants)
    } catch (error) {
        res.status(500).json({ error_msg: "ERROR: Cannot fetch entries!", error_msg2: error })
    }
}

const POST_UploadJudge = async function (req, res) {
    let judge_name = await req.body.key_judge_name
    let timestamp = GetDateTime()

    try {
        await DB_addJudge(judge_name, timestamp)
        res.status(200).json({ success: "Upload successful." })
    } catch (error) {
        console.error("ERROR: Upload error!" + error);
        res.status(500).json({ error_msg: "ERROR: Upload error!", error_msg2: error })
    }
}

const DB_addJudge = async function (name, timestamp) {
    try {
        await Judge.create({
            judge_name: name
            //createdDate: timestamp
        })
        console.log("Entry saved in database")
    } catch (error) {
        console.error("ERROR: Cannot save entry in database!" + error)
        throw error
    }
}

const GET_Judges = async function (req, res) {
    let db_judges
    try {
        db_judges = await Judge.findAll()
        res.status(200).json(db_judges)
    } catch (error) {
        res.status(500).json({ error_msg: "ERROR: Cannot fetch entries!", error_msg2: error })
    }
}


const POST_UploadSurveyData = async function (req, res) {
    try {
        const surveyData = req.body.surveyData
        const surveyData_JSON = JSON.parse(surveyData)
        const uploadedImages = req.files
        // console.log('Uploaded Images:', uploadedImages);

        /*
        1. retrieve filename
        2. search db for filename
        2a. if no, add file reference, if yes,
                                        2a1. get count of files named filename
                                        2a2. filename${count+1} as filename
        3. retrieve filename from db
        4. convert surveydataJSON string to JSON file, with retrieved filename + .json
        5. upload to backend
        */

        const surveyData_filename = surveyData_JSON.survey_name + ".json"
        console.log('----------------------------------------------------------')
        console.log(surveyData_filename)
        console.log(surveyData_JSON)

        // Process the data as needed (e.g., save to database)
        res.status(200).json({ message: 'Survey submitted successfully!' })
    } catch (error) {
        throw error
    }
}

const DB_addSurvey = async function (datahere) {

}

const GET_Surveys = async function (req, res) {
    let db_surveys
    try {
        db_surveys = await Survey.findAll()
        res.status(200).json(db_surveys)
    } catch (error) {
        res.status(500).json({ error_msg: "ERROR: Cannot fetch surveys", error_msg2: error })
    }
}

module.exports = { POST_UploadContestant, GET_Contestants, POST_UploadJudge, GET_Judges, POST_UploadSurveyData, DB_addSurvey, GET_Surveys }