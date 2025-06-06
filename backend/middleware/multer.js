const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const username = req.query.username;

        if (req.query.type === "pfp") {
            const uploadDir = path.join(__dirname, "../../uploads", username);
            fs.mkdirSync(uploadDir, { recursive: true });
            cb(null, uploadDir);
        } else {
            const uploadDir = path.join(__dirname, "../../uploads", username,"posts");
            fs.mkdirSync(uploadDir, { recursive: true });
            cb(null, uploadDir);
        }
    },

    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);

        if (req.query.type === "pfp") {
            cb(null, `pfp${ext}`);
        } else {
            const postCount = req.postCount;  // comes from middleware
            cb(null, `${req.query.username}_${postCount}${ext}`);
        }
    }
});

const upload = multer({ storage });

module.exports = upload;