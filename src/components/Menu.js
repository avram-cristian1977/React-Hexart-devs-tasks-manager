import '../components/Menu.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { faTasks } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-scroll'

const Menu = () => {
    return <ul className="menuItems">
        <Link
            activeClass="active"
            to="teamSection"
            spy={true}
            smooth={true}
            offset={-180}
            duration={50}
            className="theTeamMenuItem"><a href="#"> <span className="faIcons"><span><FontAwesomeIcon icon={faUser} /></span></span> The Team</a></Link>
        <Link
            activeClass="active"
            to="tasksSection"
            spy={true}
            smooth={true}
            offset={-400}
            duration={50}
            className="theTasksMenuItem"><a href="#"><span className="faIcons"><span><FontAwesomeIcon icon={faTasks} /></span></span> The Tasks</a></Link>
        <Link
            activeClass="active"
            to="planSection"
            spy={true}
            smooth={true}
            offset={0}
            duration={50}
            className="thePlanMenuItem"><a href="#"><span className="faIcons"><span><FontAwesomeIcon icon={faPencilAlt} /></span> </span> The Plan</a></Link>
    </ul>
}

export default Menu;