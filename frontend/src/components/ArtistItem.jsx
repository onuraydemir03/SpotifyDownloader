import { LuMusic2 } from "react-icons/lu";
import { MdAlbum } from "react-icons/md";
import { handleTrack } from "./AlbumItem";
const ArtistItem = (props) => {
    console.log(props);
    return (
        <div>
            <h1 className="header">{props.artist.name}</h1>
            <h2>Popular Tracks</h2>
                {
                    props.artist.popular_tracks.map((track) => (
                        <div className="track-item">
                            <h4>
                                <LuMusic2 className="logo"/>
                                <button id={track._id} onClick={handleTrack}>{track.name}</button>
                            </h4>
                        </div>
                    ))
                }
            <h2>Albums</h2>
                {
                    props.artist.albums.map((album) => (
                        <div className="album-item">
                            <h4>
                                <MdAlbum className="logo"/>
                                <a href={"/album?album_id=" + album._id}>{album.name}</a>
                            </h4>
                        </div>
                    ))
                }
        </div>
    )
}

export default ArtistItem;