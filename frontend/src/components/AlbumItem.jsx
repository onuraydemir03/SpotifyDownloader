

const AlbumItem = (props) => {
    return (
        <div>
            <h1>{props.album.name}</h1>
            <h2>Artists</h2>
            <ol>
                {
                    props.album.artists.map((artist) => (
                        <li>
                            <h4>
                                <a href={"/artist?artist_id=" + artist._id}>{artist.name}</a>
                            </h4>
                        </li>
                    ))
                }
            </ol>
            <h2>Tracks</h2>
            <ol>
                {
                    props.album.tracks.map((track) => (
                        <li>
                            <h4>
                                <a href={"/track?track_id=" + track._id}>{track.name}</a>
                            </h4>
                        </li>
                    ))
                }
            </ol>
        </div>
    )
}

export default AlbumItem;