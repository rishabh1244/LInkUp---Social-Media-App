import { Link } from 'react-router-dom'
import userIcon from "../feed/user.png"

import userContext from '../../../context/user/userContext';
import { useContext, useEffect } from 'react';

import "./style.css"

export default function UsersList() {
    const context = useContext(userContext);
    const { user, fetchUsers } = context;
    const username = localStorage.getItem("username");
    const imageUrl = `http://localhost:5000/api/fetchPfp?username=${username}`;

    useEffect(() => {

        fetchUsers()
    }, []);



    return (
        <div className='users-list'>
            <br/>
            <div>
                <img src={imageUrl} style={{ borderRadius: '100%', height: '70px' }} alt="user" />

                <Link
                    to="/profile"
                    state={{ username: localStorage.getItem("username") }}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                >
                    <h1>{localStorage.getItem("username")}</h1>
                </Link>
            </div>
            <hr />
            <h1 style={{ marginTop: "2%" }}>Friends</h1>
            <br />

            {user.map((user) => (

                localStorage.getItem("username") !== user.username && (
                    <div
                        key={user.username}
                        style={{ display: "flex", marginLeft: "20%", marginTop: "5px", alignItems: "center" }}
                    >
                        <img
                            src={`http://localhost:5000/api/fetchPfp?username=${user.username}`}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = userIcon;
                            }}
                            style={{ borderRadius: '100%', height: '30px', marginRight: '8px' }}
                            alt="user"
                        />
                        <Link
                            to="/profile"
                            state={{ username: user.username }}
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            <h4>{user.username}</h4>
                        </Link>

                    </div>
                )

            ))}

        </div>
    )
}
