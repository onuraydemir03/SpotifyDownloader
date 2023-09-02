import React from "react";
import "../styles/ProgressBar.css"

const ProgressBar = (props) => {
    console.log("Percentage: " + props.progress);
    return (
        <div className="progress-bar-container">
            <div
            className="progress-bar"
            style={{ width: `${props.progress}%`}}
            >
            <p>
                {props.track_name}
            </p>
            </div>
        </div>
    );
}

export default ProgressBar;
