import os
from json import JSONEncoder

import uvicorn
from fastapi import FastAPI
from pydantic.v1.generics import GenericModel

from backend.logic.album import Album
from backend.logic.playlist import Playlist
from backend.logic.spotify import Client
from backend.logic.track import Track
from backend.logic.user import User
from backend.logic.artist import Artist
from typing import Generic, Optional, TypeVar


T = TypeVar('T')
app = FastAPI()
client = Client()


class Response(GenericModel, Generic[T]):
    code: str
    status: str
    message: str
    result: Optional[T]


class MyEncoder(JSONEncoder):
    def default(self, o):
        return o.__dict__


@app.get("/")
async def user(user_id: str):
    return {"message": "Camed here"}

@app.get("/user")
async def user(user_id: str):
    user = User(id=user_id,
                access_point=client.access_point)
    return Response(status="Ok",
                    code="200",
                    message=f"User {user.display_name} got successfully.",
                    result=user.to_dict())


@app.get("/playlist")
async def playlist(playlist_id: str):
    playlist = Playlist(id=playlist_id,
                    access_point=client.access_point)
    return Response(status="Ok",
                    code="200",
                    message=f"Playlist {playlist.name} got successfully.",
                    result=playlist.to_dict())


@app.get("/track")
async def track(track_id: str):
    track = Track(id=track_id,
                    access_point=client.access_point)
    return Response(status="Ok",
                    code="200",
                    message=f"Track {track.name} got successfully.",
                    result=track.to_dict())


@app.get("/album")
async def track(album_id: str):
    album = Album(id=album_id,
                    access_point=client.access_point)
    return Response(status="Ok",
                    code="200",
                    message=f"Album {album.name} got successfully.",
                    result=album.to_dict())

@app.get("/artist")
async def artist(artist_id: str):
    artist = Artist(id=artist_id,
                    access_point=client.access_point)
    return Response(status="Ok",
                    code="200",
                    message=f"Artist {artist.name} got successfully.",
                    result=artist.to_dict())

if __name__ == '__main__':
    uvicorn.run("app:app", host="0.0.0.0", port=int(os.environ.get("PORT", 8085)))