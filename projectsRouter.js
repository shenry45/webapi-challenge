const express = require('express');

const projectDb = require('./data/helpers/projectModel.js');

const router = express.Router();

// CUSTOM MIDDLEWARE
async function validateProjID(req, res, next) {
  try {
    const {id} = req.params;

    const validateID = await projectDb.get(id);

    if (validateID) {
      next();
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
}

// GET PROJECT
router.get('/', async (req, res) => {
  try {
    const projectInfo = await projectDb.get();

    res.status(200).json({
      success: true,
      projects: projectInfo
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
})

// GET PROJECT BY ID
router.get('/:id', validateProjID, async (req, res) => {
  try {
    const {id} = req.params;

    const projectInfo = await projectDb.get(id);

    res.status(200).json({
      success: true,
      projects: projectInfo
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
})

// GET PROJECT ACTIONS
router.get('/:id', async (req, res) => {
  try {

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
})

router.post('/', (req, res) => {
  try {

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
})

router.put('/:id', validateProjID, (req, res) => {
  try {

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
})

router.delete('/:id', validateProjID, (req, res) => {
  try {

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
})

module.exports = router;