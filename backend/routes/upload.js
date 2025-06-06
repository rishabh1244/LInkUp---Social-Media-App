const express = require("express");
const router = express.Router();

const path = require("path");
const fs = require("fs")

const User = require('../models/User');
const Post = require('../models/Post');

const upload = require("../middleware/multer");
const app = express();
//upload 
router.post("/upload", upload.single("file"), (req, res) => {
    res.json({ message: "File uploaded successfully" });
});

router.get("/fetchPfp", (req, res) => {
    const username = req.query.username;
    const filePath = path.join(__dirname, "../../uploads", `${username}`, "pfp.png");

    res.sendFile(filePath, (err) => {
        if (err) {
            console.error("File not found:", err.message);
            if (!res.headersSent) {
                res.status(404).send("File not found");
            }
        }
    });
});

router.post("/postMedia", async (req, res, next) => {
    const username = req.query.username;
    const user = await User.findOne({ username });

    if (!user) return res.status(404).send("User not found");

    user.posts += 1;
    req.postCount = user.posts; // store in req for multer to use
    await user.save();

    next();
}, upload.single("file"), async (req, res) => {
    const username = req.query.username;
    const user = await User.findOne({ username });
    if (!user) return res.status(404).send("User not found");


    await Post.create({
        author: username,
        post_name: `${username}_${user.posts}`,
        post_description: req.body.description
    });

    res.send("File uploaded successfully");
});

router.post("/fetchPostData", async (req, res) => {
  try {
    const { type, username } = req.body;

    let output;

    if (type === "all") {
      output = await Post.find(); // fetch all posts
    } else if (username) {
      output = await Post.find({ author: username }); // fetch specific user’s posts
    } else {
      return res.status(400).json({ error: "Username required for non-'all' types" });
    }

    // Add dir_path to each post
    const updatedPosts = output.map((post, index) => ({
      ...post.toObject(),
      dir_path: path.join(
        __dirname,
        "../../uploads",
        post.author,
        "posts",
        `${post.author}_${index + 1}.png`
      )
    }));

    res.json(updatedPosts);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

router.get("/fetchPostFile/:username/:index", (req, res) => {
    const { username, index } = req.params;
    const filePath = path.join(__dirname, "../../uploads", username, "posts", `${index}.png`);
    console.log(filePath)
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error("File not found:", err.message);
            if (!res.headersSent) {
                res.status(404).send("File not found");
            }
        }
    });
});
router.get("/fetchInfo", async (req, res) => {
    try {
        const count = await Post.countDocuments();
        res.send({ count });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

module.exports = router