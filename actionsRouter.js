const express = require('express');
const actionDb = require('./data/helpers/actionModel.js');
const projectDb = require('./data/helpers/projectModel.js');

const router = express.Router();

// CUSTOM MIDDLEWARE
async function validateID(req, res, next) {
  try {
    const {id} = req.params;
      
    const validateID = await actionDb.get(id);
  
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
    const actionsInfo = await actionDb.get();
  
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

router.get('/:id', validateID, async (req, res) => {
  res.status(200).json({
    success: true,
    action: validateID
  })
})

router.post('/', async (req, res) => {
  try {
    const action = req.body;
    const projID = req.body.project_id;


    const validateProj = await projectDb.get(projID);

    if (validateProj) {
      if (action.project_id && action.description && action.notes) {
        const actionInfo = await actionDb.insert(action);

        res.status(201).json({
          success: true,
          message: actionInfo
        })
      } else {
        res.status(400).json({
          success: false,
          message: "Required fields not found"
        })
      }
    } else {
      res.status(404).json({
        success: false,
        message: "Project ID not found"
      })
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
})

router.put('/:id', validateID, async (req, res) => {
  try {
    const actionInfo = await actionDb.update(id, changes);

    res.status(200).json({
      success: true,
      message: actionInfo
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
})

router.delete('/:id', validateID, async (req, res) => {
  try {
    const {id} = req.params;

    const actionInfo = await actionDb.remove(id);

    res.status(200).json({
      success: true,
      message: actionInfo
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
})

module.exports = router;