

const TrackItem = (props) => {
    console.log(props);
    return (
        <div>
            <h2>Track: {props.track.name}</h2>
            <h3>Artists</h3>
            <ol>
                {
                    props.track.artists.map((artist) => (
                    <li>
                        <a href={"/artist?artist_id=" + artist._id}>{artist.name}</a>
                    </li>))
                }
            </ol>
            <h3>Album</h3>
            <p>
                <a href={"/album?album_id=" + props.track.album._id}>{props.track.album.name}</a>
                
            </p>
        </div>
    )
}

export default TrackItem;