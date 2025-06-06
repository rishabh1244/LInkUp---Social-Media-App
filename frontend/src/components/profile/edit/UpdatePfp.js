import "./update.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UpdatePfp() {
    const [selectedFile, setSelectedFile] = useState(null);
    const navigate = useNavigate();

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

    const HandleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedFile) return;

        const username = localStorage.getItem("username");
        const formData = new FormData();
        formData.append("file", selectedFile);

        const type = "pfp";

        try {
            const response = await fetch(`http://localhost:5000/api/upload?username=${username}&type=${type}` ,{
                method: "POST",
                body: formData,
            });

            const result = await response.json();
            console.log(result.message);
            navigate("/");
        } catch (error) {
            console.error("Upload failed:", error);
        }
    }
    return (
        <div>
            <form onSubmit={(e) => HandleSubmit(e)}>

                <div className="mb-3">
                    <label htmlFor="formFile" className="form-label">Default file input example</label>
                    <input className="form-control" onChange={handleFileChange} type="file" id="formFile" />
                    <br />


                    {selectedFile && <button type="submit" className="btn btn-primary" >upload</button>}
                    {!selectedFile && <button type="submit" className="btn btn-primary" disabled>upload</button>}
                </div>
            </form>

        </div>
    )
}
