import "./TheTasks.css"

import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { Link } from 'react-scroll'
const TheTasks = (props) => {
   
    const tasks = useSelector(state => state.tasks.tasks)
   
    const contractTaskaHandler = (task) =>{
        props.onSaveSelectedTask(task)
      
    }
   
    
  

    return <>
        <h2 id="tasksSection" className="tasksTitle">Public Tasks</h2><table className="tasksTable">
            <tbody>
                <th><div><div >#</div></div></th>
                <th><div>Title</div></th>
                <th><div>Type</div></th>
                <th><div title="require backend">B</div></th>
                <th><div title="require frontend">F</div></th>
                <th><div title="require QA">QA</div></th>
                <th><div>Delivery</div></th>
                <th><div>Budget</div></th>
                <th><div>Action</div></th>
            </tbody>

            {tasks.map(task => {
                return <tr>
                    <td>{task.id}</td>
                    <td>{task.title}</td>
                    <td>{task.type}</td>
                    <td >{task.backend ? "yes" : "no"}</td>
                    <td>{task.frontend ? "yes" : "no"}</td>
                    <td>{task.qa ? "yes" : "no"}</td>
                    <td>{task.delivery}</td>
                    <td>{task.budget}&#36;</td>
                    <Link
                    activeClass="active"
                    to="selectedContract"
                    spy={true}
                    smooth={true}
                    offset={-180}
                    duration={50}
                    >
                    <td><button onClick={()=>contractTaskaHandler(task)} className="contractBtn">Contract</button></td>
                    </Link>
                </tr>
            })}
        </table>
    </>
}

export default TheTasks;