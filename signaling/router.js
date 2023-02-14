const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.send({ response: "사람살려.." }).status(200)
})

module.exports = router
