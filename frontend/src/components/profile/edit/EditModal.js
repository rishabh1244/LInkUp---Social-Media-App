import "./modal.css"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UpdatePfp from "./UpdatePfp";


export default function EditModal({ show, onClose, children }) {

    const route = "http://localhost:5000/api/auth/updateUser"
    const [Username, setUsername] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        setUsername(localStorage.getItem("username"));
    }, []);

    const onChange = (e) => {
        setUsername(e.target.value);
        console.log(e.target.value)
    };

    const HandleClick = async (e) => {
        e.preventDefault();
        console.log("handel click")
        try {
            const response = await fetch(route, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: localStorage.getItem("username"),
                    newUsername: Username
                }),
            });
            const json = await response.json();

            if (response.ok || json.success) {
                localStorage.setItem("username", Username);
                navigate("/");

            }

            console.log(json)

        } catch (error) {
            console.error(`failed :`, error);
        }
    }
    if (!show) return null;

    return (
        <div className="edit-modal-backdrop">
            <div className="edit-modal-content">
                {children}
                <button onClick={onClose} className="close-btn">X</button>
                <form onSubmit={(e) => HandleClick(e)}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">New username</label>
                        <input type="username" onChange={onChange} className="form-control" id="username" aria-describedby="emailHelp" value={Username} />

                    </div>

                    <button type="submit" className="btn btn-primary">Save</button>
                </form>
                <hr />
                <UpdatePfp></UpdatePfp>
            </div>
        </div>
    );
}