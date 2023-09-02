import React, { useEffect, useState } from "react";
import { BsPeople } from "react-icons/bs";
import { LuMusic2 } from "react-icons/lu";
import TrackItem from "./TrackItem";

const AlbumItem = (props) => {
    props.album.tracks.map((track) => console.log(track));
    return (
        <div>
            <h1 className="header">{props.album.name}</h1>
            <h2>Artists</h2>
            {
                props.album.artists.map((artist) => (
                    <div className="item">
                        <h4>
                            <BsPeople className="logo"/>
                            <a href={"/artist?artist_id=" + artist._id}>{artist.name}</a>
                        </h4>
                    </div>
                ))
            }
            <h2>Tracks</h2>
            {
                props.album.tracks.map((track) => (
                    <div className="item">
                        <TrackItem track={track}/>
                    </div>
                ))
            }
        </div>
    )
}

export default AlbumItem;