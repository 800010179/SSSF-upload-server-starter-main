import express, {Request} from 'express';
import {catPost} from '../controllers/uploadController';
import multer, {FileFilterCallback} from 'multer';
import {getCoordinates, makeThumbnail, authenticate} from '../../middlewares';

const fileFilter = (
  request: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (file.mimetype.includes('image')) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({dest: './uploads/', fileFilter});
const router = express.Router();

// TODO: Add auth middleware
router
  .route('/')
  .post(
    upload.single('cat'),
    authenticate,
    makeThumbnail,
    getCoordinates,
    catPost
  );

export default router;
