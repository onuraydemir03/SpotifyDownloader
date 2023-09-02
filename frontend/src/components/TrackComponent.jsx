import downloadSingleTrack from "../utils/Download"
import DownloadButtonComponent from "./DownloadButtonComponent";



const TrackComponent = ({track}) => {
    return (
        <>
            {track.name}
            <DownloadButtonComponent downloadItem={[track]}/>
        </>
    )
}

export default TrackComponent;