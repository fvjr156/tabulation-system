const multer = require('multer')
const fs = require('fs')

const imageStorage = multer.diskStorage({
    destination: function(req, file, cb){
      const uploadDir = './model/static/uploads'
      fs.mkdirSync(uploadDir, {recursive: true})
      cb(null, uploadDir)
    },
    filename: function(req, file, cb){
      cb(null, file.originalname)
    }
  })
  
const uploadImages = multer({
    storage: imageStorage,
    limits: {
        fileSize: 1024 * 1024 * 10
    }
})

const surveyDataStorage = multer.diskStorage({
    destination: function(req, file, cb){
      const uploadDir = './model/static/surveys'
      fs.mkdirSync(uploadDir, {recursive: true})
      cb(null, uploadDir)
    },
    filename: function(req, file, cb){
      cb(null, file.originalname)
    }
  })
  
const uploadSurveyData = multer({
    storage: surveyDataStorage
})

  module.exports = {uploadImages, uploadSurveyData}