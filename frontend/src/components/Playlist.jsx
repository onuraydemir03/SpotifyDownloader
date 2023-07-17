import React, { useEffect, useState } from "react";
import TrackItem from "./TrackItem";

const Playlist = () => {
    const [queryResult, setQueryResult] = useState();
    const [tracks, setTracks] = useState();

    const fetchData = async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const playlist_id = urlParams.get("playlist_id");
        const response = await fetch("/playlist?playlist_id=" + encodeURIComponent(playlist_id), {
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
        setTracks(response.result.tracks);
        })
        .catch(error => console.log(error));
    }, []);
    
    if (!queryResult) return null;
    console.log(queryResult);
    return (
    <div>
        <h1>{queryResult.name}</h1>
        <p>Includes {tracks.length} tracks.</p>
        {
            tracks.map((track) => {
                return (
                    <li>
                        <ul>
                            <TrackItem track={track}/>
                        </ul>
                    </li>
                );
            })
        }
    </div>
    );
}

export default Playlist;