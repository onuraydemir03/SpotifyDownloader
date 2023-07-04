import spotipy.client


class Obj:
    def __init__(self, id: str,
                 access_point: spotipy.client.Spotify):
        self._id = id
        self._client = access_point
