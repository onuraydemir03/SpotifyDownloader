import spotipy

from logic.template import Obj
from logic.track import Track


class Playlist(Obj):
    def __init__(self, id, access_point):
        super().__init__(id, access_point)
        playlist = self._client.playlist(playlist_id=self._id)
        self.name = playlist.get('name')
        self.tracks = []
        tracks = playlist.get('tracks').get('items', [])
        for track in tracks:
            track_id = track.get('track').get('id')
            track = Track(id=track_id,
                          access_point=self._client)
            self.tracks.append(track)


