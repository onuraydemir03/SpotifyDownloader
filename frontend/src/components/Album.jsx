import React, { useEffect, useState } from "react";
import AlbumItem from "./AlbumItem";


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
    <div>
        <AlbumItem album={album}/>
    </div>
    );
}

export default Album;