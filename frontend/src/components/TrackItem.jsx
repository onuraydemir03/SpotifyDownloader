import { LuMusic2 } from "react-icons/lu";
import { BsPeople } from "react-icons/bs";
import { MdAlbum } from "react-icons/md";


const TrackItem = (props) => {
    console.log(props);
    return (
        <div className="track">
            <p><LuMusic2 className="logo"/>{props.track.name}</p>
            {
                props.track.artists.map((artist) => (
                <a href={"/artist?artist_id=" + artist._id}><p><BsPeople className="logo"/>{artist.name}</p></a>
                ))
            }
            <a href={"/album?album_id=" + props.track.album._id}><p><MdAlbum className="logo"/>{props.track.album.name}</p></a>
        </div>
    )
}

export default TrackItem;