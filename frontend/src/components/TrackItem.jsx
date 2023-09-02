import { LuMusic2 } from "react-icons/lu";
import { BsPeople } from "react-icons/bs";
import { MdAlbum } from "react-icons/md";
import { useState, useEffect } from "react";
import ProgressBar from "./ProgressBar";

const TrackItem = (props) => {
    const [progress, setProgress] = useState(0);
    const [isDownloading, setDownloading] = useState(false);
    console.log(props);
    const handleDownload = async (title) => {
        const response = await fetch("/download?title=" + encodeURIComponent(title), {
            method: 'GET',
            headers: {
                "Content-Type": "audio/mpeg",
            },
            });
        if (response.ok){
            const totalBytes = parseInt(response.headers.get("content-length"), 10);
                const chunks = [];
                let loadedBytes = 0;
    
                const reader = response.body.getReader();
    
                while (true){
                    const {done, value} = await reader.read();
                    if (done){
                        setProgress(100);
                        break;
                    }
    
                    loadedBytes += value.length;
                    chunks.push(value);
                    var percent = ((loadedBytes / totalBytes) * 100);
                    percent = (percent < 50) ? 50 : percent;
                    setProgress(percent);
                    console.log("Progress: " + progress);
                }
            console.log(progress);
            const blob = new Blob(chunks);
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = title + ".mp3";
    
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
        setDownloading(false);
        return title;
    }
    
    const handleTrack = async (event) => {
        setDownloading(true);
        const track_id = event.target.id;
        const response = await fetch("/track?track_id=" + encodeURIComponent(track_id), {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
        });
        setProgress(30);
        const jsonData = await response.json();
        handleDownload(jsonData.result.title);
        setProgress(50);
        return jsonData;
    }

    useEffect(() => {}, [progress]);
    return (
        <div className="track">
            {
                !isDownloading ? (
                    <div>
                        <LuMusic2 className="logo"/>
                        <button id={props.track._id} onClick={handleTrack}>
                            {props.track.name}
                        </button>
                        
                        {props.track.artists !== null ? (
                        props.track.artists.map((artist) => (
                            <a href={"/artist?artist_id=" + artist._id}><p><BsPeople className="logo"/>{artist.name}</p></a>
                            )))
                            : null}
                        {
                            props.track.album !== null ?
                            (<a href={"/album?album_id=" + props.track.album._id}><p><MdAlbum className="logo"/>{props.track.album.name}</p></a>): null
                        }
                    </div>

                ) :
                (
                    <ProgressBar progress={progress} track_name={props.track.name}/>
                )
            }
            
            

        </div>
    )
}

export default TrackItem;