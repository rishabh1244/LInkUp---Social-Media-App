import './navbar.css'
import userIcon from '../home/feed/user.png'
import { Link } from 'react-router-dom';
import logout from "./power-off.png"
export default function Navbar(props) {

    const username = localStorage.getItem("username");
    const imageUrl = `http://localhost:5000/api/fetchPfp?username=${username}`;

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <img src={imageUrl}
                onError={(e) => {
                    e.target.onerror = null; // prevent infinite loop if fallback also fails
                    e.target.src = userIcon; // set to default image
                }} style={{ height: '40px', width: 'auto', marginLeft: '10px', borderRadius: '100%' }}></img>



            <a className="navbar-brand" style={{ marginLeft: '22px' }} href="#">{localStorage.getItem("username")}</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Link</a>
                    </li>


                </ul>

                <button
                    onClick={() => { props.logout() }}
                    type="button"
                    className="logout-btn"
                >
                    <img src={logout} alt="logout" />
                </button>


            </div>

        </nav>
    )
}
