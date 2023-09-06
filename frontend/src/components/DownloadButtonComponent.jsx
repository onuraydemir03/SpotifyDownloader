import { useEffect, useRef, useState } from "react"
import fetchData from "../utils/Request";
import axios, {CancelToken, isCancel} from "axios";
import {FiDownload} from "react-icons/fi"
import {MdCancel} from "react-icons/md"
import "../styles/Download.css"

const DownloadButtonComponent = ({downloadItem}) => {
    const [isDownloading, setDownloading] = useState(false);
    const [btnText, setBtnText] = useState(<FiDownload/>);
    const cancelDownloading = useRef(null);
    const downloadProgress = useRef(0);
    const totalProgress = useRef(0);

    const downloadRequest = async (trackTitle) => {
        const response = await axios.get("download" + "?id=" + trackTitle, {
            responseType: "arraybuffer",
            headers: {
                "Content-Type": "audio/wav"
            },
            cancelToken: new CancelToken(cancel => cancelDownloading.current = cancel),
            onDownloadProgress: (progressEvent) => {
                if (progressEvent.event.lengthComputable) {
                    const progress = (progressEvent.loaded / progressEvent.total) * 100;
                    downloadProgress.current = progress.toFixed(2);
                    console.log("Download: ", downloadProgress.current)
                    // Update your progress bar or state with the progress value here
                  }
            }
        }).then((val) => val)
        .catch(err => {
            console.log(err)
            if( isCancel(err)){
                alert(err.message);
            }
        })
        return response;
    }

    const handleBtnText = async (downloadItem) => {
        if (isDownloading)
            setBtnText(<FiDownload/>)
        else
            setBtnText(<MdCancel/>)
        setDownloading(!isDownloading)
        if (isDownloading){
            console.log("Aborting..")
            cancelDownloading.current("Stopped");
        }else{
            await download(downloadItem).then(() => {
                console.log("Download completed...");
                setBtnText(<FiDownload/>);
                setDownloading(!isDownloading);
            }).catch((exc) => console.log(exc));
            
        }
    }

    const download = async (tracks) => {
        const step = 100 / tracks.length;
        for (const track of tracks){
            const trackTitle = track.artists?.map((artist) => artist.name).join(" & ") + " - " + track.name;
            await downloadRequest(trackTitle).then(
                (response) => {
                    const blob = new Blob([response.data], { type: 'audio/mpeg' });
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement("a");
    
                    link.href = url;
                    link.download = trackTitle + ".mp3";
    
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }
            )
            totalProgress.current += step;
            console.log("Total progress: ", totalProgress.current);
        }
    }

    useEffect(() => {}, [totalProgress.current]);
    return (
        <div className="download-btn">
            <button onClick={() => handleBtnText(downloadItem)}>{btnText}</button>
        </div>
    )
}

export default DownloadButtonComponent;


