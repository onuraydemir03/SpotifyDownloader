import os

import spotipy
from spotipy import oauth2

class Client:
    def __init__(self):
        re = oauth2.SpotifyClientCredentials(client_id=os.environ.get("CLIENT_ID"),
                                             client_secret=os.environ.get("CLIENT_SECRET")).get_access_token()
        self._client = spotipy.Spotify(auth=re['access_token'])

    @property
    def access_point(self):
        return self._client


