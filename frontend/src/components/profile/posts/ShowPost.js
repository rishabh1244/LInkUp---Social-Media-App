import React, { useEffect, useRef, useState } from 'react';
import heart from './heart.png';
import likedIcon from './liked.png';
import cmnt from './comment.png';

export default function ShowPost({ show, onClose, post }) {
    const modalRef = useRef(null);

    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [likeActive, setLikeActive] = useState(false);
    const [likeHover, setLikeHover] = useState(false);

    const baseFilter = "invert(1) brightness(2)";
    const hoverFilter = "invert(0.1) brightness(1.5)";
    const activeFilter = "invert(0.5) brightness(1.8)";

    // Escape key to close
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleEsc);
        return () => document.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    // Click outside to close
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                onClose();
            }
        };
        if (show) document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [show, onClose]);

    // Fetch like state from backend
    useEffect(() => {
        if (!post) return;
        setLikeCount(post.LikeCount);

        const getLikedInfo = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/postInt/isLiked", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        postAuthor: post.author,
                        LikedBy: localStorage.getItem("username"),
                        postName: post.post_name,
                    }),
                });
                const result = await response.json();
                setLiked(result.liked);
            } catch (err) {
                console.error("Error fetching like status:", err);
            }
        };

        getLikedInfo();
    }, [post]);

    const handleLikeClick = async () => {
        if (!post) return;

        setLikeActive(true);
        setTimeout(() => setLikeActive(false), 150);

        try {
            const response = await fetch("http://localhost:5000/api/postInt/Like", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    postAuthor: post.author,
                    LikedBy: localStorage.getItem("username"),
                    postName: post.post_name,
                }),
            });
            await response.json();

            setLiked(!liked);
            setLikeCount((prev) => liked ? prev - 1 : prev + 1);
        } catch (err) {
            console.error("Error toggling like:", err);
        }
    };

    if (!show || !post) return null;

    return (
        <div style={styles.overlay}>
            <div ref={modalRef} style={styles.modal}>
                <div style={styles.imageSection}>
                    <img
                        src={`http://localhost:5000/api/fetchPostFile/${post.author}/${post.post_name}`}
                        alt="Post"
                        style={styles.postImage}
                    />
                    <button onClick={onClose} style={styles.closeButton}>×</button>
                </div>

                <div style={styles.infoSection}>
                    <div style={styles.userInfo}>
                        <img
                            src={`http://localhost:5000/api/fetchPfp?username=${post.author}`}
                            style={{ borderRadius: '100%', height: '40px', marginRight: '8px' }}
                            alt="user"
                        />
                        <strong style={styles.username}>@{post.author}</strong>
                        <p style={styles.description}>{post.post_description}</p>
                    </div>

                    <div style={styles.commentsSection}>
                        <h5 style={styles.commentsTitle}>Comments</h5>
                        <p style={styles.commentsPlaceholder}>No comments yet...</p>
                    </div>

                    <div style={styles.iconBar}>
                        <button
                            onMouseEnter={() => setLikeHover(true)}
                            onMouseLeave={() => setLikeHover(false)}
                            onClick={handleLikeClick}
                            style={{ background: "none", border: "none", cursor: "pointer" }}
                        >
                            <img
                                src={liked ? likedIcon : heart}
                                alt="like"
                                style={{
                                    ...styles.icon,
                                    filter: likeActive ? activeFilter : likeHover ? hoverFilter : baseFilter,
                                    transform: likeActive ? "scale(1.1)" : "scale(1)",
                                    transition: "filter 0.15s ease, transform 0.15s ease"
                                }}
                            />
                        </button>
                        <p style={{ color: "white" }}>{likeCount}</p>

                        <img src={cmnt} alt="comment" style={styles.icon} />
                        <p style={{ color: "white" }}>{post.CommentCount}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

const styles = {
    overlay: {
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
        backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex',
        justifyContent: 'center', alignItems: 'center', zIndex: 1000,
    },
    modal: {
        background: '#282c34', color: '#f0f0f0', display: 'flex',
        borderRadius: '10px', overflow: 'hidden', width: '90%', height: '80%',
        position: 'relative',
    },
    imageSection: {
        flex: 2, position: 'relative',
    },
    postImage: {
        width: '100%', height: '100%', objectFit: 'contain',
        backgroundColor: 'rgba(0,0,0,0.1)'
    },
    closeButton: {
        position: 'absolute', top: '10px', right: '10px',
        background: 'transparent', border: 'none', fontSize: '2rem',
        color: '#fff', cursor: 'pointer',
    },
    infoSection: {
        flex: 1, padding: '20px', display: 'flex',
        flexDirection: 'column', justifyContent: 'space-between',
        backgroundColor: '#282c34',
    },
    userInfo: {
        marginBottom: '10px',
    },
    username: {
        color: '#61dafb',
        fontSize: '1.1rem',
    },
    description: {
        color: '#ccc',
        marginTop: '5px',
    },
    iconBar: {
        display: 'flex', gap: '15px', alignItems: 'center',
    },
    icon: {
        width: '24px', height: '24px', cursor: 'pointer',
    },
    commentsSection: {
        marginTop: '20px', flexGrow: 1, overflowY: 'auto',
    },
    commentsTitle: {
        marginBottom: '10px',
        color: '#f0f0f0',
    },
    commentsPlaceholder: {
        fontStyle: 'italic',
        color: '#999',
    },
};
