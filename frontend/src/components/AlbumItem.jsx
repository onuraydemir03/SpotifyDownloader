import { BsPeople } from "react-icons/bs";
import { LuMusic2 } from "react-icons/lu";


const handleDownload = async (title) => {
    const urlParams = new URLSearchParams(window.location.search);
    const response = await fetch("/download?title=" + encodeURIComponent(title), {
        method: 'GET',
        headers: {
            "Content-Type": "audio/mpeg",
        },
        });
    if (response.ok){
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        console.log(blob);
        link.href = url;
        link.download = title + ".mp3";

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    return title;
}

const handleTrack = async (event) => {
    const urlParams = new URLSearchParams(window.location.search);
    const track_id = event.target.id;
    const response = await fetch("/track?track_id=" + encodeURIComponent(track_id), {
    method: 'GET',
    headers: {
        "Content-Type": "application/json",
    },
    });
    const jsonData = await response.json();
    handleDownload(jsonData.result.title);
    return jsonData;
}

const AlbumItem = (props) => {
    props.album.tracks.map((track) => console.log(track));
    return (
        <div>
            <h1 className="header">{props.album.name}</h1>
            <h2>Artists</h2>
            {
                props.album.artists.map((artist) => (
                    <div className="item">
                        <h4>
                            <BsPeople className="logo"/>
                            <a href={"/artist?artist_id=" + artist._id}>{artist.name}</a>
                        </h4>
                    </div>
                ))
            }
            <h2>Tracks</h2>
            {
                props.album.tracks.map((track) => (
                    <div className="item">
                        <h4>
                            <LuMusic2 className="logo"/>
                            <button id={track._id} onClick={handleTrack}>{track.name}</button>
                            {/* <a href={"/track?track_id=" + track._id}>{track.name}</a> */}
                        </h4>
                    </div>
                ))
            }
        </div>
    )
}

export default AlbumItem;
export {handleTrack, handleDownload};