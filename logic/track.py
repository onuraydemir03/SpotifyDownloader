from logic.template import Obj


class Track(Obj):
    def __init__(self, id, access_point):
        super().__init__(id, access_point)
        track = self._client.track(track_id=self._id)
        self.artist_names = []
        for artist in track.get('artists', []):
            self.artist_names.append(artist.get('name'))

        print("")
