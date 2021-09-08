import './Time.css'
import { useState } from 'react'

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const Time = () => {
    const [currentTime, setCurrentTime] = useState(new Date())
    const currentDay = currentTime.getDate()
    const dayOfTheWeek = days[currentTime.getDay()];
    const month = months[currentTime.getMonth()];

    const getTime = () => {
        setInterval(() => {
            setCurrentTime(new Date())
        }, 1000);
    }
    getTime()

    return <>
<span className="dateAndTimeWrapper">
    
<span className="clock">{currentTime.toLocaleTimeString()}</span>
        <span>{dayOfTheWeek}</span>
        <span>{month},</span>
        <span className="day">{currentDay}</span><span className="daySuphix" >
        {currentDay === 1 ? "th" : currentDay === 2 ? "nd" : "rd"}</span>

</span>
    </>
}

export default Time;