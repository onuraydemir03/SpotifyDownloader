import io
import json
import os
import os.path as op
from json import JSONEncoder

import uvicorn
from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from pydantic.v1.generics import GenericModel


from typing import Generic, Optional, TypeVar

from youtubesearchpython import VideosSearch
from pytube import YouTube
from backend.entities.entities import User, Playlist, Artist, Album, Track, global_access

T = TypeVar('T')
app = FastAPI()


DEV = True


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


@app.get("/search")
async def search(id: str):
    if DEV:
        response_dict = json.load(open("search.json", "r"))
        return Response(status="Ok",
                        code="200",
                        message=f"User got successfully.",
                        result=response_dict)
    else:
        try:
            user = global_access.user(op.basename(id))
            json.dump(user, open("search.json", "w"), indent=1, cls=ObjectEncoder)
            return Response(status="Ok",
                            code="200",
                            message=f"User got successfully.",
                            result=user)
        except Exception as exc:
            return Response(status="Fail",
                            code="429",
                            message="User not found.")

@app.get("/user")
async def user(id: str):
    if DEV:
        response_dict = json.load(open("user.json", "r"))
    else:
        user = User.from_id(_id=id)
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
async def playlist(id: str):
    if DEV:
        response_dict = json.load(open("playlist.json", "r"))
    else:
        playlist = Playlist.from_id(_id=id)
        playlist.set_owner()
        playlist.set_tracks()
        response_dict = {
            **playlist.__dict__,
            "owner": playlist.owner.__dict__,
            "tracks": list(map(lambda track: track.__dict__, playlist.tracks))
        }
        json.dump(response_dict, open("playlist.json", "w"), indent=1, cls=ObjectEncoder)
    return Response(status="Ok",
                    code="200",
                    message=f"Playlist got successfully.",
                    result=response_dict)

@app.get("/artist")
async def artist(id: str):
    if DEV:
        response_dict = json.load(open("artist.json", "r"))
    else:
        artist = Artist.from_id(_id=id)
        artist.set_albums()
        artist.set_popular_tracks()
        response_dict = {
            **artist.__dict__,
            "albums": list(map(lambda album: album.__dict__, artist.albums)),
            "popular_tracks": list(map(lambda track: track.__dict__, artist.popular_tracks))
        }
        json.dump(response_dict, open("artist.json", "w"), indent=1, cls=ObjectEncoder)
    return Response(status="Ok",
                    code="200",
                    message=f"Artist got successfully.",
                    result=response_dict)

@app.get("/album")
async def track(id: str):
    if DEV:
        response_dict = json.load(open("album.json", "r"))
    else:
        album = Album.from_id(_id=id)
        album.set_artists()
        album.set_tracks()
        response_dict = {
            **album.__dict__,
            "artists": list(map(lambda artist: artist.__dict__, album.artists)),
            "tracks": list(map(lambda track: track.__dict__, album.tracks))
        }
        json.dump(response_dict, open("album.json", "w"), indent=1, cls=ObjectEncoder)
    return Response(status="Ok",
                    code="200",
                    message=f"Album got successfully.",
                    result=response_dict)


@app.get("/track")
async def track(id: str):
    if DEV:
        response_dict = json.load(open("track.json", "r"))
    else:
        track = Track.from_id(_id=id)
        track.set_artists()
        artist_names = ', '.join(list(map(lambda art: art.name, track.artists)))
        title = artist_names + " - " + track.name
        response_dict = {"title": title}
        json.dump(response_dict, open("track.json", "w"), indent=1, cls=ObjectEncoder)
    return Response(status="Ok",
                    code="200",
                    message=f"Track got successfully.",
                    result=response_dict)


@app.get('/download')
async def download(id: str):
    try:
        result = VideosSearch(id, limit=1).result().get('result')[0]
        yt = YouTube(url=result.get('link'))
        audio = yt.streams.get_audio_only()

        audio_buffer = io.BytesIO()
        audio.stream_to_buffer(audio_buffer)
        audio_data = audio_buffer.getvalue()
        content_length = len(audio_data)
        return StreamingResponse(iter([audio_data]), media_type="audio/mpeg",
                                 headers={"Content-Length": str(content_length)})
    except Exception as exc:
        return {"Exception": str(exc)}

if __name__ == '__main__':
    uvicorn.run("app:app", host="0.0.0.0", port=int(os.environ.get("PORT", 8085)))
