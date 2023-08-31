from datetime import datetime
from typing import Dict
import os

import spotipy
from spotipy import oauth2


class Album:
    def __init__(self,
                 _id: str,
                 name: str,
                 release_date: str):
        self._id = _id
        self.name = name
        self.release_date = release_date

        self.artists = None
        self.tracks = None

    @classmethod
    def from_id(cls, _id: str):
        _album_info = global_access.album(album_id=_id)
        return cls(
            _id=_id,
            name=_album_info.get('name'),
            release_date=_album_info.get('release_date')
        )

    def set_artists(self):
        _album_info = global_access.album(album_id=self._id)
        artists = []
        for _artist in _album_info.get('artists'):
            artists.append(Artist(_id=_artist.get('id'),
                                  name=_artist.get('name')))
        self.artists = artists

    def set_tracks(self):
        _album_info = global_access.album_tracks(album_id=self._id)
        tracks = []
        for _track in _album_info.get('items'):
            tracks.append(Track(_id=_track.get('id'),
                                name=_track.get('name'),
                                added_at=None,
                                duration_ms=_track.get('duration_ms')))
        self.tracks = tracks


class Artist:
    def __init__(self,
                 _id: str,
                 name: str):
        self._id = _id
        self.name = name

        self.albums = None
        self.popular_tracks = None

    @classmethod
    def from_id(cls, _id: str):
        _artist_info = global_access.artist(artist_id=_id)
        return cls(
            _id=_id,
            name=_artist_info.get('name'))

    def set_albums(self):
        _artist_album_info = global_access.artist_albums(artist_id=self._id)
        _albums = []
        start_index = 0
        prev_album_count = 0
        while len(_albums) != _artist_album_info.get('total'):
            _albums.extend(global_access.artist_albums(artist_id=self._id, offset=start_index).get('items'))
            start_index += len(_albums)
            if prev_album_count == len(_albums):
                break
            prev_album_count = len(_albums)

        albums = []
        for _album in _albums:
            album = Album(_id=_album.get('id'),
                          name=_album.get('name'),
                          release_date=_album.get('release_date'))
            album.artists = list(map(lambda artist: Artist(_id=artist.get('id'),
                                                           name=artist.get('name')),
                                     _album.get('artists')))
            albums.append(album)
        self.albums = albums

    def set_popular_tracks(self):
        _popular_track_info = global_access.artist_top_tracks(artist_id=self._id).get('tracks')
        popular_tracks = []
        for _track in _popular_track_info:
            popular_tracks.append(Track(_id=_track.get('id'),
                                        name=_track.get('name'),
                                        duration_ms=_track.get('duration_ms'),
                                        added_at=None))
        self.popular_tracks = popular_tracks


class Track:
    def __init__(self,
                 _id: str,
                 name: str,
                 added_at: str,
                 duration_ms: int):
        self._id = _id
        self.name = name
        self.duration_ms = duration_ms

        self.added_by = None
        self.added_at = None
        self.artists = None
        self.album = None

    @classmethod
    def from_id(cls, _id: str):
        _track_info = global_access.track(track_id=_id)
        return Track(_id=_id,
                     name=_track_info.get('name'),
                     added_at=None,
                     duration_ms=_track_info.get('duration_ms'))

    def set_artists(self):
        _track_info = global_access.track(track_id=self._id)
        self.artists = list(map(lambda artist: Artist(_id=artist.get('id'),
                                                      name=artist.get('name')), _track_info.get('artists')))

    def set_album(self):
        _track_info = global_access.track(track_id=self._id)
        self.album = Album.from_id(_id=_track_info.get('album').get('id'))


class Playlist:
    def __init__(self,
                 _id: str,
                 name: str):
        self._id = _id
        self.name = name

        self.owner = None
        self.tracks = None

    @classmethod
    def from_id(cls, _id):
        _playlist_info = global_access.playlist(playlist_id=_id)
        name = _playlist_info.get('name')
        instance = cls(_id=_id,
                       name=name)
        return instance

    def set_owner(self):
        _playlist_info = global_access.playlist(playlist_id=self._id)
        self.owner = User(_id=_playlist_info.get('owner').get('id'),
                          name=_playlist_info.get('owner').get('id'))

    def set_tracks(self):
        _playlist_items = global_access.playlist_items(playlist_id=self._id)
        _tracks = []
        start_index = 0
        while len(_tracks) != _playlist_items.get('total'):
            _tracks.extend(global_access.playlist_items(playlist_id=self._id, offset=start_index).get('items'))
            start_index += len(_tracks)
        tracks = []
        for _track in _tracks:
            if _track.get('track') is not None:
                track = Track(_id=_track.get('track').get('id'),
                              name=_track.get('track').get('name'),
                              added_at=_track.get('added_at'),
                              duration_ms=_track.get('track').get('duration_ms'),
                              )
                track.added_at = _track.get('added_at')
                track.added_by = User(_id=_track.get('added_by').get('id'),
                                      name=_track.get('added_by').get('id'))
                track.artists = list(map(lambda artist: Artist(_id=artist.get('id'),
                                                               name=artist.get('name')),
                                         _track.get('track').get('artists')))
                track.album = Album(_id=_track.get('track').get('album').get('id'),
                                    name=_track.get('track').get('album').get('name'),
                                    release_date=_track.get('track').get('album').get('release_date'))
                tracks.append(track)
        self.tracks = tracks


class User:
    def __init__(self,
                 _id: str,
                 name: str):
        self._id = _id
        self.name = name

        self.playlists = None

    @classmethod
    def from_id(cls, _id):
        _user_info = global_access.user(user=_id)
        name = _user_info.get('display_name')
        return cls(_id=_id,
                   name=name)

    def set_playlists(self):
        _playlists = global_access.user_playlists(user=self._id).get('items')
        self.playlists = list(map(lambda playlist: Playlist(_id=playlist.get('id'),
                                                            name=playlist.get('name')), _playlists))


class Client:
    def __init__(self):
        re = oauth2.SpotifyClientCredentials(client_id=os.environ.get("CLIENT_ID"),
                                             client_secret=os.environ.get("CLIENT_SECRET")).get_access_token()
        self._client = spotipy.Spotify(auth=re['access_token'], requests_timeout=5, retries=0)

    @property
    def access_point(self):
        return self._client


global_access: spotipy.client.Spotify = Client().access_point
