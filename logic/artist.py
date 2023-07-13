from logic.template import Obj


class Artist(Obj):
    def __init__(self, id, access_point):
        super().__init__(id, access_point)
        artist = self._client.artist(artist_id=self._id)
        for k, v in artist.items():
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