const express = require('express');
const { getNote, createNote, deleteNote, updateNote } = require('../../controllers/noteControllers');
const auth = require('../../middlewares/Auth');
const noteRouter = express.Router();

noteRouter.get('/',  auth, getNote);


noteRouter.post('/',  auth,  createNote);

noteRouter.delete('/:id', auth , deleteNote);

noteRouter.put('/:id', auth, updateNote);


module.exports = noteRouter;