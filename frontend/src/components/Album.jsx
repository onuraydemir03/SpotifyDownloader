import React, { useEffect, useState } from "react";
import AlbumItem from "./AlbumItem";
import "../styles/Album.css";

const Album = () => {
    const [album, setAlbum] = useState();

    const fetchData = async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const album_id = urlParams.get("album_id");
        const response = await fetch("/album?album_id=" + encodeURIComponent(album_id), {
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
        setAlbum(response.result);
        })
        .catch(error => console.log(error));
    }, []);
    
    if (!album) return null;
    console.log(album);
    return (
    <div className="container">
        <div className="album-item">
            <AlbumItem album={album}/>
        </div>
    </div>
    );
}

export default Album;