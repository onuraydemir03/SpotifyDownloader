import React, { useEffect, useState } from "react";

const Download = () => {
    const [title, setTitle] = useState();

    const fetchData = async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const title = urlParams.get("title");
        const response = await fetch("/download?title=" + encodeURIComponent(title));
        if (response.ok){
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");

            link.href = url;
            link.download = title + ".mp3";

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
        return title;
    }

    useEffect(() => {
        fetchData()
        .then(response => setTitle(response))
        .catch(error => console.log(error));
    }, []);
       
    if (!title) return null;
    console.log(title);
}

export default Download;