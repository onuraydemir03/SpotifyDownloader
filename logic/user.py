import spotipy.client

from exceptions import NoneTrackException
from logic.playlist import Playlist
from logic.template import Obj


class User(Obj):
    def __init__(self, id: str,
                 access_point: spotipy.client.Spotify):
        super().__init__(id=id, access_point=access_point)
        self._client = access_point
        user = self._client.user(id)
        for k, v in user.items():
            setattr(self, k, v)
        playlists = self._client.user_playlists(user=id, limit=50).get('items', [])
        self.playlists = []
        for playlist in playlists:
            playlist_id = playlist.get('id')
            try:
                playlist = {
                    "_id": playlist_id,
                    "name": playlist.get('name')
                }
                self.playlists.append(playlist)
            except NoneTrackException as exc:
                print(f"Exception : {exc}")

    def __repr__(self):
        return getattr(self, "display_name")

    def to_dict(self):
        return_dict = {}
        for key, value in self.__dict__.items():
            if key in self._drop_keys:
                continue
            return_dict[key] = value
        return return_dict
