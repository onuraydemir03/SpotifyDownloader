import React, { useEffect, useState } from "react";
import TrackItem from "./TrackItem";


const Track = () => {
    const [title, setTitle] = useState();

    const downloadData = async (title) => {
        const urlParams = new URLSearchParams(window.location.search);
        const response = await fetch("/download?title=" + encodeURIComponent(title));
        if (response.ok){
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");

            link.href = url;
            link.download = title + ".mp3";

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
        return title;
    }

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
        downloadData(jsonData.title);
        return jsonData;
    }

    useEffect( () => {
        fetchData()
        .then(response => {
            setTitle(response.title);
        })
        .catch(error => console.log(error));
    }, []);
    
    if (!title) return null;
    console.log(title);
}

export default Track;