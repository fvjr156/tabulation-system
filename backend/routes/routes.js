const express = require('express')
const router = express.Router()
const GET_ServerTest = require('../controller/server/server_operations')
const { GET_TestConnection, GET_SyncDatabase } = require('../controller/db/db_operations')

router.get('/', GET_ServerTest)
router.get('', GET_ServerTest)
router.get('/db', GET_TestConnection)
router.get('/db-sync', GET_SyncDatabase)

module.exports = router;