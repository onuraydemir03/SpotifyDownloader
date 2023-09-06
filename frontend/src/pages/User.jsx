import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UserComponent from "../components/UserComponent";
import PlaylistComponent from "../components/PlaylistComponent";
import fetchData from "../utils/Request";

const User = () => {
    const [response, setResponse] = useState({})
    const state = useLocation();
    let navigate = useNavigate();
    const user = state.state.user
    const getUser = async () => {
        console.log(user);
        const res = await fetchData("user", user.id);
        console.log(res);
        setResponse(res.data.result);
    }


    const handlePlaylistClick = (playlist) => {
        navigate("/playlist", {
            "state": {
                "user": user,
                "playlist": playlist
            }
        });
    }

    useEffect(() => {
        getUser()
    }, []);
    
    
    return (
        <div className="container">
            <UserComponent user={user}/>
            <div className="playlists">
                {
                    response.playlists?.map((playlist, idx) => (
                        <div key={idx} onClick={() => handlePlaylistClick(playlist)}>
                            <PlaylistComponent idx={idx} playlist={playlist}/>
                        </div>   
                    ))
                }
            </div>
            
        </div>
    )

}


export default User;