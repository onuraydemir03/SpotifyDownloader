import { useState } from "react";
import "../styles/Enter.css";
import { useNavigate } from "react-router-dom";

const Enter = () => {
    const navigate = useNavigate();
    const [_id, setID] = useState("");
    const handleChange = (event) => {
        setID(event.target.value);
    }
    const handleSubmit = (event) => {
        navigate("/user?user_id=" + _id);
    }
    return(
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Spotify Username</label>
                    <input id="_id" className="form-control" type="text" placeholder="Ex:oaydemir4898" onChange={handleChange}/>
                    <small id="emailHelp" className="form-text text-muted">Enter that the user you want to see..</small>
                </div>
                <button type="submit" className="btn btn-primary">Go</button>
            </form>
        </div>
    )
}

export default Enter;