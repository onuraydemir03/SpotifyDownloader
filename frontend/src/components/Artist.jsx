import React, { useEffect, useState } from "react";
import ArtistItem from "./ArtistItem";

import "../styles/Artist.css";

const Artist = () => {
    const [artist, setArtist] = useState();

    const fetchData = async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const artist_id = urlParams.get("artist_id");
        const response = await fetch("/artist?artist_id=" + encodeURIComponent(artist_id), {
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
        setArtist(response.result);
        })
        .catch(error => console.log(error));
    }, []);
    
    if (!artist) return null;
    console.log(artist);
    return (
    <div className="container">
        <div className="artist-item">
            <ArtistItem artist={artist}/>
        </div>
        
    </div>
    );
}

export default Artist;