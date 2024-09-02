import multer, { StorageEngine } from "multer";
import path from "path";
import { Request } from "express";

export default class MulterMiddleware {
   private storage: StorageEngine;

   constructor() {
      this.storage = multer.diskStorage({
         destination: (req, file, cb) => {
            cb(null, path.join(__dirname, "../../../public/uploads"));
         },
         filename: (req, file, cb) => {
            cb(null, `${Date.now()}-${file.originalname}`);
         },
      });
   }

   public exec() {
      const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
         if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/svg+xml") {
            cb(null, true);
         } else {
            cb(new Error(`Unsupported file type: ${file.mimetype}. Only JPEG and PNG are allowed.`));
         }
      };

      return multer({
         storage: this.storage,
         limits: {
            fileSize: 5 * 1024 * 1024,
         },
         fileFilter: fileFilter,
      });
   }

   public single(fieldName: string) {
      return this.exec().single(fieldName);
   }

   public array(fieldName: string, maxCount?: number) {
      return this.exec().array(fieldName, maxCount);
   }
}
