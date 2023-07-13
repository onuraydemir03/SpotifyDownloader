import spotipy.client


class Obj:
    def __init__(self, id: str,
                 access_point: spotipy.client.Spotify):
        self._id = id
        self._client = access_point

        self._drop_keys = ["_client",
                           "_drop_keys",
                           "external_urls",
                           "type",
                           "uri",
                           "_id",
                           "collaborative",
                           "description",
                           "primary_color",
                           "snapshot_id",
                           "uri",
                           "available_markets",
                           "copyrights",
                           "external_ids",
                           "id",
                           ]

