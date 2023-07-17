


const PlaylistItem = (props) => {
    console.log(props.playlist);
    return (
        <div>
            <h3>
                <a href={"/playlist?playlist_id=" + props.playlist._id}>{props.playlist.name}</a>
            </h3>
        </div>
    )
}

export default PlaylistItem;