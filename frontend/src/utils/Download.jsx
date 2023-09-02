import fetchData from "./Request"



const downloadSingleTrack = async (track) => {
    const trackTitle = track.artists?.map((artist) => artist.name).join(" & ") + " - "+ track.name
    const response = await fetchData("download", trackTitle);
    const blob = new Blob([response.data], {type: 'audio/mpeg'});
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = trackTitle + ".mp3";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

const downloadAllPlaylist = async (playlist) => {
    let progress = 0;
    const step_size = 100 / playlist.tracks?.length;
    for (const track of playlist.tracks){
        console.log(progress);
        await downloadSingleTrack(track);
        progress += step_size;
    }
}

export default downloadSingleTrack;
export {downloadAllPlaylist};