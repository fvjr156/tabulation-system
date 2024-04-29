import { useState } from "react"
import GetDateTime from "../../api/datetime"
import './HelloWorld.css'

function HelloWorld() {
    document.title="Hello World!!"
    return(
        <h1 className="spinning">Hello World!!</h1>
    )
}
function PlaceholderDiv() {
    document.title = 'Sorry'
    const [datetime, setdatetime] = useState('')

    setInterval(function(){
        setdatetime(GetDateTime())
    }, 100)

    setTimeout(function(){
        document.getElementById('extra').style.display='flex'
        document.getElementById('aud').style.display='block'
    }, 5000)

    const handleMouseEnter = () => {
        const tooltip = document.getElementById('tooltip')
        tooltip.style.display = 'block';
    };

    const handleMouseLeave = () => {
        const tooltip = document.getElementById('tooltip')
        tooltip.style.display = 'none';
    };

    return(
        <div className="pageplaceholderdiv">
            <img className="image" alt="Under Construction" src="./assets/notdoneyet.PNG"/>
            <h2>This page is under construction.</h2>
            {datetime}
            <div id="extra">
            <audio
                className="aud"
                id="aud"
                loop
                controls
                src="./assets/konata.mp3"
                style={{ display: "none" }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            />
            <div id="tooltip"/>
            </div>
        </div>
    )
}
export {HelloWorld, PlaceholderDiv}