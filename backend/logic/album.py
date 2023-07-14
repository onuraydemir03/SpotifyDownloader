from backend.logic.template import Obj


class Album(Obj):
    def __init__(self, id, access_point):
        super().__init__(id, access_point)
        album = self._client.album(album_id=self._id)
        for k, v in album.items():
            if k == "tracks":
                tracks = []
                for track in v.get('items'):
                    tracks.append({
                        "_id": track.get('id'),
                        "name": track.get('name')
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