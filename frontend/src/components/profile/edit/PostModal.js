import "./modal.css"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PostModal({ show, onClose, children }) {
    const Navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState(null);
    const [Descripton, setDescripton] = useState("");

    useEffect(() => {
        setDescripton(`${localStorage.getItem("username")}'s post !`);
    }, []);

    const HandleSubmit = async (e) => {
        e.preventDefault();


        const fileInput = document.getElementById("fileInput");
        const file = fileInput.files[0];
        if (!file) {
            console.error("No file selected");
            return;
        }
        const username = localStorage.getItem("username");

        const formData = new FormData();
        formData.append("file", file);
        formData.append("username", username);
        formData.append("description",Descripton);

        const type = "post";



        try {
            const response = await fetch(`http://localhost:5000/api/postMedia?username=${username}&type=${type}`, {
                method: "POST",
                body: formData,
            });

            const result = await response.text(); // or .json() if your response is JSON
            console.log(result);
        } catch (error) {
            console.error("Upload failed:", error);
        }
        Navigate("/")

    }
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            console.log("File selected:", file.name);
        } else {
            setSelectedFile(null);
            console.log("No file selected");
        }
    };

    const onChangeDesc = (e) => {
        console.log("desc changing")
        console.log(Descripton)

        setDescripton(e.target.value);
    }
    if (!show) return null;
    return (
        <div className="edit-modal-backdrop">
            <div className="edit-modal-content">
                {children}
                <button onClick={onClose} className="close-btn">X</button>

                <form onSubmit={(e) => HandleSubmit(e)}>

                    <div className="mb-3">
                        <label htmlFor="formFile" className="form-label">Default file input example</label>
                        <input className="form-control" onChange={handleFileChange} type="file" id="fileInput" />
                        <br />

                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Description</label>
                            <input className="form-control" onChange={onChangeDesc} placeholder="write post description" value={Descripton} />
                        </div>

                        {selectedFile && <button type="submit" className="btn btn-primary" >upload</button>}
                        {!selectedFile && <button type="submit" className="btn btn-primary" disabled>upload</button>}
                    </div>
                </form>

                <hr />
            </div>
        </div>
    )
}