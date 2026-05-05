import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

const memoryUpload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024
  },
  fileFilter(req, file, callback) {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.mimetype)) {
      return callback(new Error("Only JPG, PNG, and WEBP images are allowed"));
    }

    return callback(null, true);
  }
});

const uploadBufferToCloudinary = (file) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: process.env.CLOUDINARY_FOLDER || "PulseArena/tournaments",
        resource_type: "image",
        transformation: [
          { width: 800, crop: "limit" },
          { quality: "auto" },
          { fetch_format: "auto" }
        ]
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }

        return resolve(result);
      }
    );

    stream.end(file.buffer);
  });

const upload = {
  single(fieldName) {
    return [
      memoryUpload.single(fieldName),
      async (req, res, next) => {
        try {
          if (!req.file) {
            return next();
          }

          const result = await uploadBufferToCloudinary(req.file);

          req.file.path = result.secure_url;
          req.file.filename = result.public_id;

          return next();
        } catch (error) {
          return next(error);
        }
      }
    ];
  }
};

export { cloudinary, upload };
