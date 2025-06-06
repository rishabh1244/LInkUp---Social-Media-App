import Modal from "./Modal"
import { useState } from "react";
import message from "./message.png"


export default function Chat() {

  const [showEditModal, setShowEditModal] = useState(true);


  const [likeHover, setLikeHover] = useState(false);
  const [likeActive, setLikeActive] = useState(false);

  const baseFilter = "invert(1) brightness(2)";
  const hoverFilter = "invert(0.1) brightness(1.5)";
  const activeFilter = "invert(0.5) brightness(1.8)";


  function handleClick(setActive) {
    setShowEditModal(!showEditModal)
    setActive(true);
    setTimeout(() => setActive(false), 150); // effect lasts 150ms
  }

  return (


    <div>

      <button
        style={{
          marginLeft:"5%",
          marginTop:"15%",
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
          src={message}
          alt="like"
          style={{
            filter: likeActive ? activeFilter : likeHover ? hoverFilter : baseFilter,
            height: "5vh",
            width: "auto",
            marginTop: "-5px",
            transition: "filter 0.15s ease, transform 0.15s ease",
            transform: likeActive ? "scale(1.1)" : "scale(1)",
          }}
        />
      </button>
      <Modal show={showEditModal} onClose={() => setShowEditModal(false)}>
        <h2>Edit Your Profile</h2>
      </Modal>
    </div>
  )
}
