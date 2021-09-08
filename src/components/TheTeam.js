import './TheTeam.css'
import { useDispatch, useSelector } from 'react-redux';
import { fetchDevsData } from '../store'
import { useEffect, useState } from 'react';
import andreiNeagoie from '../assets/images/devs/andrei-neagoie.png'
import aniaKubow from '../assets/images/devs/ania-kubow.jpg'
import benAwad from '../assets/images/devs/ben-awad.jpg'
import bradTraversy from '../assets/images/devs/brad-traversy.jpg'
import coltSteele from '../assets/images/devs/colt-steele.jpg'
import devEd from '../assets/images/devs/dev-ed.jpg'
import harryWolff from '../assets/images/devs/harry-wolff.jpg'
import kyle from '../assets/images/devs/kyle.png'
import maxSchwartzmuller from '../assets/images/devs/max-schwartzmuller.jpg'
import moshHamedani from '../assets/images/devs/mosh-hamedani.jpg'
import pedroMachado from '../assets/images/devs/pedro-machado.jpg'
import qazi from '../assets/images/devs/qazi.jpg'
import { fetchTaskData } from "../store"
import brazilFlag from '../assets/flags/brazil-flag.jpg'
import germanyFlag from '../assets/flags/germany-flag.jpg'
import ukFlag from '../assets/flags/uk-flag.jpg'
import usaFlag from '../assets/flags/usa-flag.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faMinus } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import RatingDevsChart from './RatingDevsChart';
import WageDevsChart from './WageDevsChart'
import { Link } from 'react-scroll'





const DEVS_PICTURES = [
    { profileImg: andreiNeagoie },
    { profileImg: aniaKubow },
    { profileImg: benAwad },
    { profileImg: bradTraversy },
    { profileImg: coltSteele },
    { profileImg: devEd },
    { profileImg: harryWolff },
    { profileImg: kyle },
    { profileImg: maxSchwartzmuller },
    { profileImg: moshHamedani },
    { profileImg: pedroMachado },
    { profileImg: qazi },
]

const TheTeam = (props) => {
    const dispatch = useDispatch()
    const devs = useSelector(state => state.devs.devs)
    const loading = useSelector(state => state.devs.isLoading)
    const [devToSelect, setDevToSelect] = useState(null)
    const [showTeam, setShowTeam] = useState(false)
    const [showTasks, setShowTasks] = useState(false)
    const fullDataDevs = []
    const [showRating, setShowRating] = useState(false)
    const [showWages, setShowWages] = useState(false)
    const [selectedTeam, setSelectedteam] = useState([])
    const [buttonToRetext, setButtonToRetext] = useState(null)
    const [buttonIsVisible, setButtonIsVisible] = useState(true)


    useEffect(() => {
        getDevsHandler()
        getTasksHandler()
    }, [])



    const getDevsHandler = () => {
        dispatch(fetchDevsData())
    }
    const getTasksHandler = () => {
        dispatch(fetchTaskData())
    }

    const getFullDataDevs = () => {
        for (let i = 0; i < devs.length; i++) {
            const combinedObj = { ...devs[i], ...DEVS_PICTURES[i] }
            fullDataDevs.push(combinedObj)
        }
    }



    getFullDataDevs()
    // console.log("fullDataDevs", fullDataDevs);


    const devHandler = (dev) => {

        for (let i = 0; i < selectedTeam.length; i++) {

            if (selectedTeam[i].name === dev.name) {
                console.log("already in the team");

                return
            }
        }
        setSelectedteam([...selectedTeam, dev])

    }
    props.onSaveDevsHandler(selectedTeam)

    const removeDev = (id) => {
        setSelectedteam(selectedTeam.filter(dev => dev.id !== id))
    }


 
    return (
        <div >
            <h2 id="teamSection" className="devsTeamTitle">Devs Team</h2>
            {/* <button onClick={() => setShowTeam(!showTeam)}>Show team</button>
            <button onClick={() => setShowTasks(!showTasks)}>Show tasks</button> */}
            {loading === "PENDING" && <p style={{ color: "red" }}>LOADING...</p>}
            {loading === "REJECTED" && <p style={{ color: "red" }}>Something went wrong. Pleasetry again later.</p>}
            {!showTeam && <div className="devs-container">
                {fullDataDevs.map(dev => {
                    return <>
                        <div key={dev.id} className="flip-card">
                            <div className="flip-card-inner">

                                <div className="flip-card-front">
                                    <div className="devImgWrapper">
                                        <img className="dev-image" src={dev.profileImg} alt="dev" />
                                        <div className="rating">
                                            Rating
                                            <div className="ratingPercent">
                                                {dev.rating}&#x25;
                                            </div>
                                        </div>

                                    </div>
                                    <div className="dev-data">
                                        <div>Name : {dev.name}</div>
                                        <div>Nationality : {dev.country} <span className="flagWrapper"><img className="flag" src={dev.country === "USA" ? usaFlag : dev.country === "UK" ? ukFlag : dev.country === "Germany" ? germanyFlag : dev.country === "Brazil" ? brazilFlag : ""} alt="uk flag" /></span></div>
                                        <div>Role : {dev.department}</div>

                                    </div>
                                </div>
                                <div className="flip-card-back">
                                    <h1>{dev.name}</h1>
                                    <h3>Seniority : {dev.seniority}</h3>
                                    <h3>Wage : {dev.wage}&#36; per year</h3>
                                    <h5>Favorite tehnology : {dev.favTech}</h5>
                                    <div className="socialMedia">
                                        <span><FontAwesomeIcon icon={faGithub} /></span>
                                        <span><FontAwesomeIcon icon={faLinkedin} /></span>
                                        <span><FontAwesomeIcon icon={faTwitter} /></span>
                                        <span title={dev.email}><FontAwesomeIcon icon={faEnvelope} /></span>
                                    </div>
                                  <div className="devCardAction">
                                  <Link
                                        activeClass="active"
                                        to="plan"
                                        spy={true}
                                        smooth={true}
                                        offset={-180}
                                        duration={50}>
                                             <button className="addDevBtn" onClick={() => {devHandler(dev)}}>
                                                <FontAwesomeIcon icon={faPlus} />
                                            </button>
                                    </Link>

                                    <Link
                                        activeClass="active"
                                        to="plan"
                                        spy={true}
                                        smooth={true}
                                        offset={-180}
                                        duration={50}>
                                               <button className="addDevBtn" onClick={() => removeDev(dev.id)}>
                                                   <FontAwesomeIcon icon={faMinus} />
                                               </button>
                                    </Link>
                                  </div>
                                </div>
                            </div>
                        </div>
                    </>
                })}
            </div>}
            {/* {!showTasks && <>
                {tasks.map(task => {
                    return <div>{task.title}</div>
                })}
            </>} */}
            <button className="showDevsRatingsBtn" onClick={() => setShowRating(!showRating)}>{showRating ? "Hide" : "Show"} Devs Ratings </button>
            <button className="showDevsRatingsBtn" onClick={() => setShowWages(!showWages)}>{showWages ? "Hide" : "Show"} Devs Wages </button>

            <div className="charts">
                {showRating && <div className="ratingDevsChart"><RatingDevsChart /></div>}
                {showWages && <div className="wagesDevsChart"><WageDevsChart /></div>}
            </div>




        </div>
    );
}

export default TheTeam;