from logic.album import Album
from logic.artist import Artist
from logic.template import Obj


class Track(Obj):
    def __init__(self, id, access_point):
        super().__init__(id, access_point)
        track = self._client.track(track_id=self._id)
        for k, v in track.items():
            if k == "artists":
                artists = []
                for artist in v:
                    artists.append(Artist(id=artist.get('id'),
                                          access_point=self._client))
                setattr(self, k, artists)
            elif k == "album":
                setattr(self, k, Album(id=v.get('id'),
                                       access_point=self._client))
            else:
                setattr(self, k, v)

    def __repr__(self):
        return self.name
