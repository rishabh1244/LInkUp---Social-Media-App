import postsContext from "./postContext";
import { useState } from "react";

export default function PostState(props) {
    const url = "http://localhost:5000/api/fetchPostData"

    const [posts, addPost] = useState([])
    
    const fetchPosts = async (username) => {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                type:props.type
            }),
        })
        const json = await response.json(); 
        console.log(json)
        addPost(json)

        
    }
    return (
        <postsContext.Provider value={{ posts, fetchPosts }}>
            {props.children}
        </postsContext.Provider>
    );
}