import { useEffect, useState } from 'react';
import heart from './heart.png';
import cmnt from './comment.png';
import likedIcon from "./liked.png"

export default function Post(props) {

  const [likeHover, setLikeHover] = useState(false);
  const [commentHover, setCommentHover] = useState(false);

  const [likeActive, setLikeActive] = useState(false);
  const [commentActive, setCommentActive] = useState(false);

  const [liked, setLiked] = useState();
  const [LikeCount , setCount] = useState(props.LikeCount);

  const baseFilter = "invert(1) brightness(2)";
  const hoverFilter = "invert(0.1) brightness(1.5)";
  const activeFilter = "invert(0.5) brightness(1.8)";


  useEffect(() => {
    const getLikedInfo = async () => {
      const response = await fetch("http://localhost:5000/api/postInt/isLiked", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postAuthor: props.author,
          LikedBy: localStorage.getItem("username"),
          postName: props.postName,
        }),
      });

      const result = await response.json();
      setLiked(result.liked);
    };

    getLikedInfo();
  }, [liked, props.author, props.postName]);

  const handleClick = async (setActive) => {
    setActive(true);
    setTimeout(() => setActive(false), 150); // effect lasts 150ms

    const response = await fetch("http://localhost:5000/api/postInt/Like", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postAuthor: props.author,
        LikedBy: localStorage.getItem("username"),
        postName: props.postName

      }),
    });
    const json = await response.json();
    console.log(json);
    
    if(liked == false){
      setCount(LikeCount+1)
    }else{
      setCount(LikeCount-1)

    }
    setLiked(!liked);

  }

  return (
    <div className="post" style={{
      marginBottom: "10vh"

    }}>
      <div className="card" style={{ width: '68vh', backgroundColor: "#3a3f4b", color: "white" }}>
        <div className="card-body">
          <h5 className="card-title">
            <img src={`http://localhost:5000/api/fetchPfp?username=${props.author}`} style={{ borderRadius: '100%', height: '40px', width: 'auto', marginRight: '10px' }} alt="user" />
            {props.author}
          </h5>
          <img src={props.image} style={{ marginBottom: '5px' }} className="card-img-top" alt="..." />
          <h5 className="card-text"><b>{props.author}</b>  {props.desc}</h5>
        </div>

        <div className="card-body">
          <button
            style={{
              marginRight: "70%",
              border: "none",
              background: "none",
              cursor: "pointer",
            }}
            onMouseEnter={() => setLikeHover(true)}
            onMouseLeave={() => setLikeHover(false)}
            onClick={() => handleClick(setLikeActive)}
          >
            <img
              id="like"
              src={liked ? likedIcon : heart}  // switch icon image
              alt="like"
              style={{
                filter: likeActive ? activeFilter : likeHover ? hoverFilter : baseFilter,  // color/filter unchanged
                height: "5vh",
                width: "auto",
                marginTop: "-5px",
                transition: "filter 0.15s ease, transform 0.15s ease",
                transform: likeActive ? "scale(1.1)" : "scale(1)",
              }}
            />


            <p style={{ color: "white" }}>{LikeCount}</p>
          </button>
          <button
            style={{
              marginLeft: "7%",
              border: "none",
              background: "none",
              cursor: "pointer",
            }}
            onMouseEnter={() => setCommentHover(true)}
            onMouseLeave={() => setCommentHover(false)}
            onClick={() => handleClick(setCommentActive)}
          >
            <img
              id="comment"
              src={cmnt}
              alt="comment"
              style={{
                filter:
                  commentActive ? activeFilter : commentHover ? hoverFilter : baseFilter,
                height: "5vh",
                width: "auto",
                marginTop: "-5px",
                transition: "filter 0.15s ease, transform 0.15s ease",
                transform: commentActive ? "scale(1.1)" : "scale(1)",
              }}
            />
            <p style={{ color: "white" }}>{props.CommentCount}</p>

          </button>
        </div>
      </div>
    </div >
  )
}
