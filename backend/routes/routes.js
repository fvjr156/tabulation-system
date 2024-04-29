const express = require('express')
const router = express.Router()
const GET_ServerTest = require('../controller/server/server_operations')
const { GET_TestConnection, GET_SyncDatabase } = require('../controller/db/db_operations')
const { POST_UploadContestant, GET_Contestants, POST_UploadJudge, GET_Judges, POST_UploadSurveyData, GET_Surveys } = require('../controller/db/data_operations')
const { uploadImages, uploadSurveyData } = require('../configs/db/multer')


router.get('/', GET_ServerTest)
router.get('', GET_ServerTest)
router.get('/db', GET_TestConnection)
router.get('/db-sync', GET_SyncDatabase)

router.get('/judges', GET_Judges)
router.get('/contestants', GET_Contestants)
router.post('/add-judge', POST_UploadJudge)
router.post('/add-contestant', POST_UploadContestant)

router.get('/surveys', GET_Surveys)
router.post('/uploadsurvey', uploadImages.array('images', 64), POST_UploadSurveyData)

module.exports = router