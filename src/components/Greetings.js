import './Greetings.css'

import { useSelector } from 'react-redux';

const Greetings = () => {

const token = useSelector(state => state.auth.token)
let greeting;
const now = new Date()
const currentHour = now.getHours()

if(currentHour > 1 && currentHour <= 13){
    greeting = "Good morning!"
}
if(currentHour >13 && currentHour <= 16){
    greeting = "Good afternoon!"
}
if(currentHour <=24 && currentHour > 16){
    greeting = "Good Evening!"
}

    return <>
     {token && <h2 className="greeting">{greeting}</h2>}
    </>
}
 
export default Greetings;