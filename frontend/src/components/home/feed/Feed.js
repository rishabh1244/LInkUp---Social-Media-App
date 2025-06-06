import { useState, useEffect } from "react";
import Post from "./Post"
import "./feed.css"


export default function Feed(props) {

  const [PostInfo, setPostInfo] = useState([]);

  useEffect(() => {
    const fetchPostCount = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/fetchPostData", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: "",
            type: "all",
          }),
        });
        const data = await response.json();

        setPostInfo(data);
      } catch (error) {
        console.error("Error fetching post count:", error);
      }
    };

    fetchPostCount();
  }, []);

  return (
    <>
      <div className="feed scrollable">
        {[...PostInfo]  // clone the array to avoid mutating original
          .reverse()     // reverse it
          .map((post, idx) => (
            <Post
              key={idx}
              image={`http://localhost:5000/api/fetchPostFile/${post.author}/${post.post_name}`}
              author={post.author}
              postName={post.post_name}
              desc={post.post_description}
              LikeCount={post.LikeCount}
              CommentCount={post.CommentCount}
            />
          ))}
      </div>

    </>
  );
}

// <>
//       <div className="feed scrollable">
//         {postImages.slice(0, 6).map((post, idx) => (
//           <Post key={idx} image={post.image} author={post.author} />
//         ))}
//       </div>
//     </>