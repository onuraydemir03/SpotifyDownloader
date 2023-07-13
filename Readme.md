# Spotify Python API for Users

You need to specify your developer API Key to run this app.

## Install Instructions

~~~
pip install -r requirements.txt
~~~

## Run

~~~
python app.py
~~~

This app will run on 8085 port.
 ## Endpoints

USER: Returns user
~~~
/user?user_id={USERID}
~~~

PLAYLIST: Returns playlist
~~~
/playlist?playlist_id={PLAYLISTID}
~~~

TRACK: Returns track
~~~
/track?track_id={TRACKID}
~~~

ALBUM: Returns album
~~~
/album?album_id={ALBUMID}
~~~

ARTIST: Returns artist
~~~
/artist?artist_id={ARTISTID}
~~~