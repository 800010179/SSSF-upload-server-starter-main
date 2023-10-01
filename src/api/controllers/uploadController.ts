import {Request, Response, NextFunction} from 'express';
import CustomError from '../../classes/CustomError';
import {Point} from 'geojson';

const catPost = async (
  req: Request,
  res: Response<{}, {coords: Point}>,
  next: NextFunction
) => {
  try {
    if (!req.file) {
      const err = new CustomError('file not valid', 400);
      throw err;
    }

    const response = {
      message: 'file uploaded',
      data: {
        filename: req.file.filename,
        location: res.locals.coords,
      },
    };
    res.json(response);
  } catch (error) {
    next(new CustomError((error as Error).message, 400));
  }
};

export {catPost};
