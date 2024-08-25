import multer from 'multer';
import fs from 'fs';
import { BadRequestError } from './appErrors.js';
//adjust how files are stored
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let dir = process.cwd();
    //Sets destination for fileType
    if (
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg'
    ) {
      dir = dir + `/uploads/images`;
    } else {
      dir = dir + `/uploads/pdfs`;
    }

    fs.mkdir(dir, { recursive: true }, (err) => {
      if (err) {
        cb(err, null);
      }
      cb(null, dir);
    });
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + '_' + file.originalname);
  }
});

const fileFilter = function (req, file, callback) {
  console.log(file);
  if (
    file.mimetype === 'application/pdf' ||
    file.mimetype === 'application/msword' ||
    file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
    file.mimetype === 'text/csv'
  ) {
    callback(null, true);
  } else {
    callback(
      new BadRequestError('Error uploading file, Must either be Jpgs, docx,doc, png or csv'),
      false
    );
  }
};

const fileSize = function () {
  const size = 1024 * 1024 * 2;
  if (file.mimetype === 'application/pdf' || file.mimetype === 'application/msword') {
    size = 1024 * 1024 * 1;
    return size;
  } else return size;
};

export const upload = multer({
  fileFilter,
  limits: {
    fileSize: fileSize
  },
  storage: storage
});

export const unlinkFiles = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      throw new BadRequestError(err.message || 'Wrong File path');
    }
    return { success: true };
  });
};
