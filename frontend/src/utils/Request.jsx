import axios, {CancelToken, isCancel} from "axios";



const fetchData = async(route, id, cancelDownloading) => {
    let response = null;
    if (route == "download"){
        response = await axios.get(route + "?id=" + id, {
            responseType: "arraybuffer",
            headers: {
                "Content-Type": "audio/wav"
            },
            cancelToken: new CancelToken(cancel => cancelDownloading.current = cancel),
            onDownloadProgress: (progressEvent) => {
                if (progressEvent.event.lengthComputable) {
                    const progress = (progressEvent.loaded / progressEvent.total) * 100;
                    console.log(`Download progress: ${progress.toFixed(2)}%`);
                    
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
    }else{
        response = await axios.get(route + "?id=" + id).then((val) => val);
        return response;
    }
}


export default fetchData;