

const ProgressBarComponent = ({percentage}) => {
    const inline_style = {
        border: "2px solid red"
    }
    if (percentage > 0){
        return (
            <div style={inline_style}>
            This is a progress bar : {percentage}..
            </div>
        )
    }else{
        return (
            <div style={inline_style}>
            Download.
            </div>
        )
    }
}


export default ProgressBarComponent;