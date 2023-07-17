import React, { useEffect, useState } from "react";
import PlaylistItem from "./PlaylistItem";
const User = () => {
    const [queryResult, setQueryResult] = useState();
    const [playlists, setPlaylists] = useState();

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
        })
        .catch(error => console.log(error));
    }, []);

    if (!queryResult) return null;
    console.log(queryResult);
    return (
        <div>
            <h1>{queryResult.display_name}</h1>
            {
                playlists.map((playlist) => {
                    return (<li>
                        <ul>
                            <PlaylistItem playlist={playlist}/>
                        </ul>
                    </li>)
                })
            }
        </div>
    );
}

export default User;