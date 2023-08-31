import { LuLibrary } from "react-icons/lu";

const PlaylistItem = (props) => {
    console.log(props.playlist);
    return (
        <a href={"/playlist?playlist_id=" + props.playlist._id}>
            <div>
                <h3>
                    <LuLibrary className="logo"/> {props.playlist.name}
                </h3>
            </div>
        </a>
    )
}

export default PlaylistItem;