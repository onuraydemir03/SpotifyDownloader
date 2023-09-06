import downloadSingleTrack from "../utils/Download"
import DownloadButtonComponent from "./DownloadButtonComponent";
import "../styles/Track.css"
import {MdOutlineAudiotrack} from "react-icons/md"

const TrackComponent = (props) => {
    return (
        <div className="track">
            <span className="track-id">{props.track_id + 1}</span>
            <div className="track-row">
                <p><MdOutlineAudiotrack/> {props.track.name}</p>
                <DownloadButtonComponent downloadItem={[props.track]}/>
            </div>
        </div>
    )
}

export default TrackComponent;