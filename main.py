import argparse

from logic.spotify import Client
from logic.user import User


# def parse_args():
#     parser = argparse.ArgumentParser(prog="Spotify Music Downloader",
#                                      description="Downloads mp3 files with Spotify song tags from Youtube")
#     parser.add_argument("--client-id", type=str, default="e9132514a8c846ec922ee49f9f3e0d7f")
#     parser.add_argument("--client-secret", type=str, default="c70660aeb63244c380c1f1f33053c6de")
#     args = parser.parse_args()
#     return args


if __name__ == '__main__':
    client = Client()
    user = User(id="oaydemir4898",
                access_point=client.access_point)
    print("")
