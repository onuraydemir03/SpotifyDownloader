const ArtistItem = (props) => {
    console.log(props);
    return (
        <div>
            <h1>{props.artist.name}</h1>
            <h2>Popular Tracks</h2>
            <ol>
                {
                    props.artist.popular_tracks.map((track) => (
                        <li>
                            <h4>
                                <a href={"/track?track_id=" + track._id}>{track.name}</a>
                            </h4>
                        </li>
                    ))
                }
            </ol>
            <h2>Albums</h2>
            <ul>
                {
                    props.artist.albums.map((album) => (
                        <h4>
                            <li><a href={"/album?album_id=" + album._id}>{album.name}</a></li>
                        </h4>
                    ))
                }
            </ul>
        </div>
    )
}

export default ArtistItem;