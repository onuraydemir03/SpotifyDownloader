from backend.logic.template import Obj


class Track(Obj):
    def __init__(self, id, access_point):
        super().__init__(id, access_point)
        track = self._client.track(track_id=self._id)
        for k, v in track.items():
            if k == "artists":
                artists = []
                for artist in v:
                    artists.append({
                        "_id": artist.get('id'),
                        "name": artist.get('name')
                    })
                setattr(self, k, artists)
            elif k == "album":
                setattr(self, k, {
                    "_id": v.get('id'),
                    "name": v.get("name")
                })
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
