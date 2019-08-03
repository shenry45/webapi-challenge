const express = require('express');
const db = require('./data/helpers/actionModel.js');

const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const actionsInfo = await db.get();
  
    res.status(200).json({
      success: true,
      action: actionsInfo
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const {id} = req.params;
    
    const validateID = await db.get(id);

    if (id !== null && validateID) {
      res.status(200).json({
        success: true,
        action: validateID
      })
    } else {
      res.status(404).json({
        success: false,
        message: "ID not found"
      })
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
})

router.get('/', (req, res) => {

})

router.get('/', (req, res) => {

})

router.get('/', (req, res) => {

})

module.exports = router;