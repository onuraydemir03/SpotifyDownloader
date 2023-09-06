
import "../styles/ProgressBarComponent.css"

const ProgressBarComponent = ({percentage}) => {
    let btn_text = "";
    if (percentage > 0)
        btn_text  = "This is a progress bar : {percentage}.."   
    else
        btn_text = "Download"

    return(
        <button>
            {btn_text}
        </button>
    )
}


export default ProgressBarComponent;