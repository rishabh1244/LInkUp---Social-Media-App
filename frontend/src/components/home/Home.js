import { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar"
import Feed from './feed/Feed';
import UsersList from './users/UsersList';
import Chat from '../chat/Chat';

export default function Home() {
  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      navigate("/auth");
    }
  }, []);

  const logout = () => {
    console.log(localStorage.getItem("token"))
    localStorage.removeItem("token");
    console.log(localStorage.getItem("token"))
    navigate("/auth");
  }

  return (

    <div>
      <Navbar username={localStorage.getItem("username")} logout={logout} />


      <div style={{
        display: "flex",
        height: "100vh"
      }}>
        <Chat/>
        <Feed username={localStorage.getItem("username")} />
        <UsersList />
      </div>

    </div>
  )
}


// export default function Feed() {
//   const [PostInfo, setPostInfo] = useState([]);

//   useEffect(() => {
//     const fetchPostCount = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/api/fetchPostData", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             username: "",
//             type: "all",
//           }),
//         });
//         const data = await response.json();
//         console.log(data.length);
//         console.log(data);

//         setPostInfo(data);
//       } catch (error) {
//         console.error("Error fetching post count:", error);
//       }
//     };

//     fetchPostCount();
//   }, []);

//   return (
//     <>

//       <div className="feed scrollable">
//         {PostInfo.map((post, index) => (
//           <div key={post._id || index} className="post">
//             <img src={`http://localhost:5000/api/fetchPostFile/${post.author}/${post.post_name}`}></img>
//           </div>
//         ))}
//       </div>

//     </>
//   );
// }
