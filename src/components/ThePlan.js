import { useState, useEffect } from 'react';
import './ThePlan.css'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-scroll'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Axios from 'axios'

const ThePlan = (props) => {
    const [ballance, setBllance] = useState(0)
    const [costs, setCosts] = useState(0)
    const [clientSatisfaction, setClientSatisfaction] = useState(0)
    const [frontEndValid, setFrontEndIsValid] = useState(false)
    const [backEndValid, setBackEndIsValid] = useState(false)
    const [QAValid, setQAIsValid] = useState(false)
    const [emailsSent, setEmailSent] = useState(false)

    const checkCosts = () => {
        let devsWages = 0
        for (let i = 0; i < props.newDevs.length; i++) {
            devsWages += props.newDevs[i].wage
        }
        setBllance((props.newTask.budget - devsWages / 365 * props.newTask.delivery).toFixed(2))
        setCosts((devsWages / 365 * props.newTask.delivery).toFixed(2));
        return devsWages
    }

    const checkFrontendValidity = () => {
        for (let i = 0; i < props.newDevs.length; i++) {
            if (props.newDevs[i].department === "frontend") {
                setFrontEndIsValid(true)
                return
            }
            if (props.newDevs[i].department !== "frontend") {
                setFrontEndIsValid(false)
            }
        }
    }

    const checkBackendValidity = () => {
        for (let i = 0; i < props.newDevs.length; i++) {
            if (props.newDevs[i].department === "backend") {
                setBackEndIsValid(true)
                return
            }
            if (props.newDevs[i].department !== "backend") {
                setBackEndIsValid(false)
            }
        }
    }

    const checkQAValidity = () => {
        for (let i = 0; i < props.newDevs.length; i++) {
            if (props.newDevs[i].department === "QA") {
                setQAIsValid(true)
                return
            }
            if (props.newDevs[i].department !== "QA") {
                setQAIsValid(false)
            }
        }
    }
    const roleValidity = () => {
        checkFrontendValidity()
        checkBackendValidity()
        checkQAValidity()
    }

    const informTeam = () => {
        let emails = []
        for (let i = 0; i < props.newDevs.length; i++) {
            emails.push(props.newDevs[i].email)
        }
        // console.log("contract", props.newTask.title);
        // console.log("emails:", emails);
        Axios.post("http://localhost:3003/informationmail", {
            jobType : props.newTask.title,
            emails:emails
        }).then(response => {
            console.log(response)
            setEmailSent(true)
        }).catch(error=>{
            console.log(error)
        })
    }


    const checkExpectation = () => {
        let satisfaction = 0;
     
        for (let i = 0 ; i < props.newDevs.length ; i++){
            console.log(props.newDevs[i].rating)
             satisfaction += props.newDevs[i].rating
        }

        console.log("props.newTask", props.newTask)
        setClientSatisfaction(satisfaction/props.newDevs.length)
    }

  
console.log("props.newDevs.length", props.newDevs.length)
    return <>
        <h2 id="planSection" className="planTitle">The Plan</h2>
        <div className="plan-container">
            <div className="selectedContract">
                {!props.newTask && <h3>Please, select a contract.</h3>}
                {props.newTask ? <table className="selectedtasktable">
                    <tbody>
                        <th><div><div >#</div></div></th>
                        <th><div>Title</div></th>
                        <th><div>Type</div></th>
                        <th><div title="require backend">B</div></th>
                        <th><div title="require frontend">F</div></th>
                        <th><div title="require QA">QA</div></th>
                        <th><div>Delivery</div></th>
                        <th><div>Budget</div></th>
                    </tbody >
                    <tr id="selectedContract">
                        <td>{props.newTask.id}</td>
                        <td>{props.newTask.title}</td>
                        <td>{props.newTask.type}</td>
                        <td ><div className={backEndValid ? "greenBackground" : "redBackground"} >{props.newTask.backend ? "yes" : "no"}</div></td>
                        <td ><div className={frontEndValid ? "greenBackground2" : "redBackground"} >{props.newTask.frontend ? "yes" : "no"}</div></td>
                        <td ><div className={QAValid ? "greenBackground" : "redBackground"}>{props.newTask.qa ? "yes" : "no"}</div></td>
                        <td>{props.newTask.delivery}</td>
                        <td>{props.newTask.budget}&#36;</td>
                    </tr>
                </table> : "No task selected"}

            </div>
        </div>
        <div id="plan" className="selectedTeam">
            {!props.newDevs.length ? <h3>Please, select a team.</h3> : <div><h3>Select another dev?</h3><Link
                activeClass="active"
                to="teamSection"
                spy={true}
                smooth={true}
                offset={-180}
                duration={50}>
                <button className="upBtn"><FontAwesomeIcon icon={faArrowUp} /></button>
            </Link></div>}
            <table>
                {props.newDevs.length ? <tbody>
                    <th><div>Name</div></th>
                    <th><div>Role</div></th>
                    <th><div>Wage</div></th>
                    <th><div >Seniority</div></th>
                    <th><div >Rating</div></th>
                </tbody> : ""}
                {props.newDevs ? props.newDevs.map(dev => <tr key={dev.id}>
                    <td>{dev.name}</td>
                    <td>{dev.department}</td>
                    <td>{dev.wage}</td>
                    <td>{dev.seniority}</td>
                    <td>{dev.rating}</td>
                </tr>) : ""}
            </table>
                                                                   

            <div>total devs costs : {costs} &#36;</div><span className={ballance > 0 ? "greenText" : ballance < 0 ? "redText"  : "whiteText" }>Ballance : {ballance} &#36; </span>
            <div>Client Expected Satisfaction : {clientSatisfaction} &#x25;</div>
            {emailsSent && <p>Emails sent to selected developers</p>}
            
            {/* <button onClick={checkFrontendValidity}>F validity</button>
            <button onClick={checkBackendValidity}>B validity</button>
            <button onClick={checkQAValidity}>QA validity</button> */}
        </div>
      {(props.newTask &&  props.newDevs.length !== 0 ? <div className="planAction">
            <button onClick={roleValidity}>Overall validity</button>
            <button onClick={checkCosts}>Update costs</button>
           <button onClick={checkExpectation}>Client Expected Satisfaction </button>
            <button onClick={informTeam}>Inform team</button>
        </div> : "")  }
    </>
}

export default ThePlan;