const express = require('express')
const { addMedia, deleteMedia, getMedia } = require('../controllers/mediaController.js');
const {protect} = require('../middleware/auth.js')

const mediaRouter = express.Router();

mediaRouter.use(protect)

mediaRouter.route('/')
        .post(addMedia)
        .get(getMedia);
        
mediaRouter.delete('/delete/:mediaId', deleteMedia);


module.exports = mediaRouter;
