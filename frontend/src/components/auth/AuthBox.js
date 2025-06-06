import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import styles from "./Auth.module.css"


export default function AuthBox() {
  
  
  const url = "http://localhost:5000/api/auth/";
  const [credential, setCred] = useState({ username: "", password: "" });
  const [authCtx, setCtx] = useState(null);
  
  let navigate = useNavigate();

  const HandleClick = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(url + authCtx, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: credential.username,
          password: credential.password,
        }),
      });

      const json = await response.json();

      if (!response.ok ) {
        const errorMessage = json.error || `HTTP error! Status: ${response.status}`;
        throw new Error(errorMessage);
      }

      localStorage.setItem("token", json.token);
      localStorage.setItem("username", credential.username);

      //setting the global context to username
      navigate("/");

    } catch (error) {
      console.error(` ${authCtx} failed :`, error);
      alert(error.message); 
    }
  };

  const onChange = (e) => {
    setCred({ ...credential, [e.target.name]: e.target.value });
  };


  return (

    <div className={styles.box} style={{ width: '68vh',backgroundColor: "	#4a5266",color:"white" }}>
      <form onSubmit={(e) => HandleClick(e, authCtx)}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Pick a user-name</label>
          <input onChange={onChange} value={credential.username} name="username" type="username" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter username" />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input onChange={onChange} value={credential.password} name="password" type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
        </div>
        <button type="submit" className="btn btn-primary" onClick={() => { setCtx("register") }}>Register</button>
        <br />
        <br />
        <p>already a user ?</p>
        <button type="submit" className="btn btn-primary" onClick={() => { setCtx("login") }}>Login</button>
      </form>
    </div>

  )
}
