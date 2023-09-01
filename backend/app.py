import io
import json
import os
import time
from json import JSONEncoder

import spotipy
import uvicorn
from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from pydantic.v1.generics import GenericModel


from typing import Generic, Optional, TypeVar

from youtubesearchpython import VideosSearch
from pytube import YouTube
from backend.entities.entities import User, Playlist, Artist, Album, Track

T = TypeVar('T')
app = FastAPI()

class Response(GenericModel, Generic[T]):
    code: str
    status: str
    message: str
    result: Optional[T]

class ObjectEncoder(JSONEncoder):
    """
    This is needed to save object into json file
    """

    def default(self, o):
        return o.__dict__

class MyEncoder(JSONEncoder):
    def default(self, o):
        return o.__dict__


@app.get("/user")
async def user(user_id: str):
    user = User.from_id(_id=user_id)
    user.set_playlists()
    response_dict = {
        **user.__dict__,
        "playlists": list(map(lambda playlist: playlist.__dict__, user.playlists))
    }
    json.dump(response_dict, open("user.json", "w"), indent=1, cls=ObjectEncoder)
    return Response(status="Ok",
                    code="200",
                    message=f"User got successfully.",
                    result=response_dict)


@app.get("/playlist")
async def playlist(playlist_id: str):
    playlist = Playlist.from_id(_id=playlist_id)
    playlist.set_owner()
    playlist.set_tracks()
    response_dict = {
        **playlist.__dict__,
        "owner": playlist.owner.__dict__,
        "tracks": list(map(lambda track: track.__dict__, playlist.tracks))
    }
    return Response(status="Ok",
                    code="200",
                    message=f"Playlist got successfully.",
                    result=response_dict)

@app.get("/artist")
async def artist(artist_id: str):
    artist = Artist.from_id(_id=artist_id)
    artist.set_albums()
    artist.set_popular_tracks()
    response_dict = {
        **artist.__dict__,
        "albums": list(map(lambda album: album.__dict__, artist.albums)),
        "popular_tracks": list(map(lambda track: track.__dict__, artist.popular_tracks))
    }
    return Response(status="Ok",
                    code="200",
                    message=f"Artist got successfully.",
                    result=response_dict)

@app.get("/album")
async def track(album_id: str):
    album = Album.from_id(_id=album_id)
    album.set_artists()
    album.set_tracks()
    response_dict = {
        **album.__dict__,
        "artists": list(map(lambda artist: artist.__dict__, album.artists)),
        "tracks": list(map(lambda track: track.__dict__, album.tracks))
    }
    return Response(status="Ok",
                    code="200",
                    message=f"Album got successfully.",
                    result=response_dict)


@app.get("/track")
async def track(track_id: str):
    track = Track.from_id(_id=track_id)
    track.set_artists()
    artist_names = ', '.join(list(map(lambda art: art.name, track.artists)))
    title = artist_names + " - " + track.name
    return Response(status="Ok",
                    code="200",
                    message=f"Track got successfully.",
                    result={"title": title})


@app.get('/download')
async def download(title: str):
    try:
        result = VideosSearch(title, limit=1).result().get('result')[0]
        yt = YouTube(url=result.get('link'))
        audio = yt.streams.get_audio_only()

        audio_buffer = io.BytesIO()
        audio.stream_to_buffer(audio_buffer)
        audio_data = audio_buffer.getvalue()
        return StreamingResponse(iter([audio_data]), media_type="audio/mpeg")
    except Exception as exc:
        return {"Exception": str(exc)}

if __name__ == '__main__':
    Playlist.from_id(_id="3qb6Gwfo4NRGItqTm8jmDu")
    print("Playlist..")
    uvicorn.run("app:app", host="0.0.0.0", port=int(os.environ.get("PORT", 8085)))
