import { useLocation } from "react-router-dom";
import PlaylistComponent from "../components/PlaylistComponent";
import fetchData from "../utils/Request";
import { useEffect, useState } from "react";
import downloadSingleTrack, { downloadAllPlaylist } from "../utils/Download";
import TrackComponent from "../components/TrackComponent";
import UserComponent from "../components/UserComponent";
import DownloadButtonComponent from "../components/DownloadButtonComponent";



const Playlist = () => {
    const state = useLocation();
    const [playlist, setPlaylist] = useState(state.state.playlist);
    const [user, setUser] = useState(state.state.user);
    const getPlaylist = async () => {
        const res = await fetchData("playlist", playlist._id);
        setPlaylist(res.data.result);
    }

    useEffect(() => {
        getPlaylist()
    }, [])
    return (
        <div className="container">
            <UserComponent user={user}/>
            <div className="sample-playlist">
                <PlaylistComponent playlist={playlist}/>
                <DownloadButtonComponent downloadItem={playlist.tracks}/>
            </div>
            
            {
                playlist.tracks?.map((track, idx) => (
                    <div idx={idx}>
                        <TrackComponent track_id={idx} track={track}/>
                    </div>
                ))
            }
        </div>
    )
}

export default Playlist;