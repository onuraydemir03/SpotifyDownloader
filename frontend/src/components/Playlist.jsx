import React, { useEffect, useState } from "react";
import TrackItem from "./TrackItem";

import "../styles/Playlist.css";

const Playlist = () => {
    const [queryResult, setQueryResult] = useState();
    const [tracks, setTracks] = useState();
    const [refreshFlag, setRefreshFlag] = useState(false);

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
        setRefreshFlag(!refreshFlag);
        })
        .catch(error => console.log(error));
    }, [refreshFlag]);
    
    if (!queryResult) return null;
    console.log(queryResult);
    return (
    <div className="container">
        <h1 className="header">{queryResult.name}</h1>
        <div>
            <div className="row">
                {
                    tracks.map((track) => {
                        return (
                            <div className="col-lg-12 col-md-6 col-12">
                                <div className=" track-item">
                                    <TrackItem track={track}/>
                                </div>
                                <hr/>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    </div>
    );
}

export default Playlist;