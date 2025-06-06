import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./profile.css"

import EditModal from "./edit/EditModal";
import PostModal from "./edit/PostModal"

import Navbar from "../navbar/Navbar";

import setting from "./setting.png"
import chat from "./chat.png"
import postIcon from "./more.png"

import Posts from "./posts/Posts";

export default function Profile() {
  let navigate = useNavigate();

  const location = useLocation();
  const { username } = location.state || {};

  const pfp = `http://localhost:5000/api/fetchPfp?username=${username}`;
  //button - settings/chat

  const [showEditModal, setShowEditModal] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);

  const [type, setType] = useState("chat");
  const [logo, setLogo] = useState(chat);


  useEffect(() => {

    if (username === localStorage.getItem("username")) {
      setType("settings");
      setLogo(setting);
    }
    console.log(username)
  }, [username]);


  //button behaviour 
  const [likeHover, setLikeHover] = useState(false);
  const [likeActive, setLikeActive] = useState(false);

  const [likeHover2, setLikeHover2] = useState(false);
  const [likeActive2, setLikeActive2] = useState(false);

  const baseFilter = "invert(1) brightness(2)";
  const hoverFilter = "invert(0.1) brightness(1.5)";
  const activeFilter = "invert(0.5) brightness(1.8)";

  function handleClick(setActive) {
    setActive(true);
    setTimeout(() => setActive(false), 150);

    if (type === "settings") {
      setShowEditModal(true)

    }

  }
  function handleClickPost(setActive) {
    setActive(true);
    setTimeout(() => setActive(false), 150);

    if (type === "settings") {
      setShowPostModal(true)

    }

  }
  //////////////

  const logout = () => {
    console.log(localStorage.getItem("token"))
    localStorage.removeItem("token");
    console.log(localStorage.getItem("token"))
    navigate("/auth");
  }
  return (
    <div className="profile">
      <Navbar username={localStorage.getItem("username")} logout={logout} />
      <img
        src={pfp}
        style={{ height: "10%", width: "10%", borderRadius: "100%" }}
        alt="User Profile"
      />
      <br />
      <h3>{username}</h3>

      <button

        id={type}
        className="button"
        onMouseEnter={() => setLikeHover(true)}
        onMouseLeave={() => setLikeHover(false)}
        onClick={() => handleClick(setLikeActive)}
      >
        <img
          id="like"
          className="image"
          src={logo}
          alt="like"
          style={{
            marginRight: "20px",
            filter: likeActive ? activeFilter : likeHover ? hoverFilter : baseFilter,
            transform: likeActive ? "scale(1.1)" : "scale(1)",
          }}
        />
      </button>


      {(username === localStorage.getItem("username"))&&<button

        id={type}
        className="button"
        onMouseEnter={() => setLikeHover2(true)}
        onMouseLeave={() => setLikeHover2(false)}
        onClick={() => handleClickPost(setLikeActive2)}
      >
        <img
          id="like"
          className="image"
          src={postIcon}
          alt="like"
          style={{
            filter: likeActive2 ? activeFilter : likeHover2 ? hoverFilter : baseFilter,
            transform: likeActive2 ? "scale(1.1)" : "scale(1)",
          }}
        />
      </button>}

      <EditModal show={showEditModal} onClose={() => setShowEditModal(false)}>
        <h2>Edit Your Profile</h2>
      </EditModal>

     <PostModal show={showPostModal} onClose={() => setShowPostModal(false)}>
       <h2>Make a Post</h2>
      </PostModal>

      <hr></hr>
      <Posts username={username}></Posts>

    </div>
  )


}
