const express = require("express");
const router = express.Router();

const Likes = require('../models/Likes');
const Post = require('../models/Post');
const Like = require('../models/Likes');

router.post("/like", async (req, res) => {
    const { postName, postAuthor, LikedBy } = req.body;

    try {
        let required_post = await Post.findOne({ post_name: postName });
        if (!required_post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const CheckLike = await Likes.findOne({ postName, postAuthor, LikedBy });

        if (CheckLike) {
            // Unlike the post
            if (required_post.LikeCount > 0) {
                required_post.LikeCount--;
                await required_post.save();
            }
            await Likes.deleteOne({ _id: CheckLike._id });
        } else {
            // Like the post
            required_post.LikeCount++;
            await required_post.save();

            await Likes.create({ postName, postAuthor, LikedBy });
        }

        return res.json(required_post);
    } catch (err) {
        console.error("Error in /like route:", err);
        return res.status(500).json({ message: "Server error" });
    }
});

router.post("/isLiked", async (req, res) => {
    const { postName, postAuthor, LikedBy } = req.body;
    //update lke count
    const CheckLike = await Likes.findOne({ postName, postAuthor, LikedBy });

    if (CheckLike) {
        res.json({ liked: true });
    } else {
        res.json({ liked: false });

    }
})



//add in an async function
// await Post.updateMany(
//   {
//     $or: [
//       { LikeCount: { $exists: false } },
//       { CommentCount: { $exists: false } }
//     ]
//   },
//   {
//     $set: {
//       LikeCount: 0,
//       CommentCount: 0
//     }
//   }
// );




module.exports = router