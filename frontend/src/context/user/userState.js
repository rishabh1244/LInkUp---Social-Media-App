import userContext from "./userContext";
import { useState } from "react";

export default function UserState(props) {
    const host = "http://localhost:5000";
    const [user, setUser] = useState([]);

    const fetchUsers = async () => {
        const response = await fetch(`${host}/api/auth/fetchallusers`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            
        });

        const json = await response.json();
        setUser(json);
    };

    return (
        <userContext.Provider value={{ user, fetchUsers }}>
            {props.children}
        </userContext.Provider>
    );
}
