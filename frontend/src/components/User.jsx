import React, { useEffect, useState } from "react";
import PlaylistItem from "./PlaylistItem";

import "../styles/User.css"
import { LuUserCheck } from "react-icons/lu";

const User = () => {
    const [queryResult, setQueryResult] = useState();
    const [playlists, setPlaylists] = useState();
    /* const [refreshFlag, setRefreshFlag] = useState(false); */

    const fetchData = async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const user_id = urlParams.get("user_id");
        const response = await fetch("/user?user_id=" + encodeURIComponent(user_id), {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
        });
        const jsonData = await response.json();
        return jsonData;
    }

    useEffect( () => {
        fetchData()
        .then(response => {
        setQueryResult(response.result);
        setPlaylists(response.result.playlists);
        /* setRefreshFlag(!refreshFlag); */
        })
        .catch(error => console.log(error));
    }, []);

    if (!queryResult) return null;
    console.log(queryResult);
    return (
        <div>
            <h1 className="header"><LuUserCheck className="logo"/>{queryResult.name}</h1>
            <div className="container">
                <div className="row">
                        {
                            playlists.map((playlist, index) => 
                                (
                                    <div key={index} className="col-lg-12 col-md-6 col-12 row-item">
                                    <PlaylistItem playlist={playlist}/>
                                    </div>
                                ))
                        }
                </div>
            </div>
        </div>
    );
}

export default User;