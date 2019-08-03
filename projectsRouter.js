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

    const projectActions = await projectDb.getProjectActions(id);

    res.status(200).json({
      success: true,
      actions: projectActions
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
      const projectAdd = await projectDb.insert(project);

      res.status(201).json({
        success: true,
        project: projectAdd
      })
    } else {
      res.status(400).json({
        success: false,
        message: "Required fields not found"
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

    const projectEdit = await projectDb.update(id, project);

    res.status(200).json({
      success: true,
      project: projectEdit
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
      success: false,
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