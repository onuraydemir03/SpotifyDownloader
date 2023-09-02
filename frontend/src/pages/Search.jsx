import { useState } from "react";
import axios from "axios";
import UserComponent from "../components/UserComponent";
import { useNavigate } from "react-router-dom";
import fetchData from "../utils/Request";

const Search = () => {
    const [userUrl, setUserUrl] = useState("");
    const [user, setUser] = useState(null);
    let navigate = useNavigate();
    const searchUser = async () => {
        const user = await fetchData("search", userUrl);
        const response = user.data;
        if (response.code == 200){
             setUser(response.result);
        }else{
             setUser(false);
         }
    }

    const handleUserClick = () => {
        navigate("/user", {
            "state": {
                "user": user
            }
        });
    }

    return (
        <>
            <input value={userUrl} onChange={(e) => setUserUrl(e.target.value)} placeholder="User url ex: https://open.spotify.com/user/oaydemir4898"></input>
            <button onClick={searchUser}>Search</button>
            {
                user != null ? (
                    user != false ? (
                    <div onClick={handleUserClick}>
                        <UserComponent user={user}/>
                    </div>): (
                        <div>
                            User not found.
                        </div>
                    )
                ): null
            }
        </>
    )
}

export default Search;