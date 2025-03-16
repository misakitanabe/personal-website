import { Request, Response, NextFunction } from "express";
import multer from "multer";

class ImageFormatError extends Error {}

const storageEngine = multer.diskStorage({
    destination: function (req, file, cb) {
        // TODO 1
        const UPLOAD_DIR = process.env.IMAGE_UPLOAD_DIR;
        if (!UPLOAD_DIR) {
            throw new Error("Missing IMAGE_UPLOAD_DIR from env file");
        }
        cb(null, UPLOAD_DIR);
    },
    filename: function (req, file, cb) {
        // TODO 2
        const filetype = file.mimetype;
        console.log(`image type: ${filetype}`);
        let fileExtension = "";
        if (filetype === "image/png") {
            fileExtension = "png";
        } else if (filetype === "image/jpg" || filetype === "image/jpeg") {
            fileExtension = "jgp";
        } else {
            cb(new ImageFormatError("Unsupported image type"), "");
        }
        const fileName = Date.now() + "-" + Math.round(Math.random() * 1E9) + "." + fileExtension;
        cb(null, fileName);
    }
});

export const imageMiddlewareFactory = multer({
    storage: storageEngine,
    limits: {
        files: 1,
        fileSize: 5 * 1024 * 1024 // 5 MB
    },
});

export function handleImageFileErrors(err: any, req: Request, res: Response, next: NextFunction) {
    if (err instanceof multer.MulterError || err instanceof ImageFormatError) {
        res.status(400).send({
            error: "Bad Request",
            message: err.message
        });
        console.log(err);
        return;
    }
    next(err); // Some other error, let the next middleware handle it
}