import spotipy.client

from logic.playlist import Playlist
from logic.template import Obj


class User(Obj):
    def __init__(self, username: str,
                 access_point: spotipy.client.Spotify):
        self.username = username
        self._client = access_point
        playlists = self._client.user_playlists(user=self.username, limit=50).get('items', [])
        self.playlists = []
        for playlist in playlists:
            playlist_id = playlist.get('id')
            playlist = Playlist(id=playlist_id,
                                access_point=self._client)
            self.playlists.append(playlist)
            print("")
