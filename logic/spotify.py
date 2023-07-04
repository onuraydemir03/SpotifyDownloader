import spotipy
from spotipy import oauth2

class Client:
    def __init__(self, args):
        re = oauth2.SpotifyClientCredentials(client_id=args.client_id,
                                             client_secret=args.client_secret).get_access_token()
        self._client = spotipy.Spotify(auth=re['access_token'])

    @property
    def access_point(self):
        return self._client


