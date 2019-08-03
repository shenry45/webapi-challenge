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

// ROUTES
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

router.get('/:id/actions', validateProjID, async (req, res) => {
  try {
    const {id} = req.params;

    const projectInfo = await projectDb.getProjectActions(id);

    res.status(200).json({
      success: true,
      actions: projectInfo
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
})

router.post('/', async (req, res) => {
  try {
    const project = req.body;

    if (project.name && project.description) {
      const projectInfo = await projectDb.insert(project);

      res.status(201).json({
        success: true,
        project: projectInfo
      })
    } else {
      res.status(400).json({
        success: false,
        message: "All required fields not found"
      })
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
})

router.put('/:id', validateProjID, async (req, res) => {
  try {
    const project = req.body;
    const {id} = req.params;

    const projectInfo = await projectDb.update(id, project);

    res.status(200).json({
      success: true,
      project: projectInfo
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
})

router.delete('/:id', validateProjID, async (req, res) => {
  try {
    const {id} = req.params;

    const projectInfo =  await projectDb.remove(id);

    res.status(200).json({
      success: true,
      project: projectInfo
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
})

module.exports = router;