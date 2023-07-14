from backend.exceptions import NoneTrackException
from backend.logic.template import Obj


class Playlist(Obj):
    def __init__(self, id, access_point):
        super().__init__(id, access_point)
        playlist = self._client.playlist(playlist_id=self._id)
        for k, v in playlist.items():
            if k == "tracks":
                tracks = []
                for track in v.get('items'):
                    if track.get('track') is None:
                        raise NoneTrackException("track.track return value is None.")
                    exact_track = track.get('track')
                    tracks.append({
                        "_id": exact_track.get('id'),
                        "name": exact_track.get('name')
                    })
                setattr(self, k, tracks)
            else:
                setattr(self, k, v)

    def __repr__(self):
        return getattr(self, "name")

    def to_dict(self):
        return_dict = {}
        for key, value in self.__dict__.items():
            if key in self._drop_keys:
                continue
            return_dict[key] = value
        return return_dict
