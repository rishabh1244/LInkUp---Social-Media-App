import postContext from "../../../context/post/postContext"
import { useContext, useEffect,useState } from 'react';
import styles from "./Post.module.css"
import ShowPost from "./ShowPost";
export default function Posts(props) {
    const context = useContext(postContext);
    const { posts, fetchPosts } = context;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);

    useEffect(() => {
        fetchPosts(props.username);
        console.log(posts)
    }, [props.username]);

    return (
        <div className="container">
            <div className="row">

                <ShowPost
                    show={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    post={selectedPost}
                />
                {posts.map((post) => (
                    <div className="col-6 col-md-4 col-lg-3 mb-4" key={post.post_name}>
                        <div className="card h-100">
                            <img onClick={() => {
                                setSelectedPost(post);
                                setIsModalOpen(true);
                            }}
                                src={`http://localhost:5000/api/fetchPostFile/${props.username}/${post.post_name}`}
                                className="card-img-top"
                                alt="post"
                                style={{
                                    width: "100%",
                                    height: "300px",
                                    objectFit: "cover",
                                    borderRadius: "8px"
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>

    );
}
