import React, { useEffect, useState } from "react";
import TrackItem from "./TrackItem";


const Track = () => {
    const [track, setTrack] = useState();

    const fetchData = async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const track_id = urlParams.get("track_id");
        const response = await fetch("/track?track_id=" + encodeURIComponent(track_id), {
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
        setTrack(response.result);
        })
        .catch(error => console.log(error));
    }, []);
    
    if (!track) return null;
    console.log(track);
    window.location.replace(track.link);
}

export default Track;