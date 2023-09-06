import "../styles/Playlist.css"
import {LuLibrary} from "react-icons/lu"

const PlaylistComponent = ({idx, playlist}) => {
    return (
        <div className="playlist">
            {
                (idx + 1)? (<span className="playlist-id">{idx + 1}</span>): null
            }
            <div className="playlist-row">
                <p>
                    <LuLibrary/>
                    <span className="playlist-name">{playlist.name}</span></p>
            </div>
        </div>
        
    )
}

export default PlaylistComponent;