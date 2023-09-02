import { LuMusic2 } from "react-icons/lu";
import { MdAlbum } from "react-icons/md";
import TrackItem from "./TrackItem";
const ArtistItem = (props) => {
    return (
        <div>
            <h1 className="header">{props.artist.name}</h1>
            <h2>Popular Tracks</h2>
                {
                    props.artist.popular_tracks.map((track) => (
                        <div className="track-item">
                            <TrackItem track={track}/>
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