import './App.css';
import { useState, useEffect } from 'react';
import logo from './assets/hextra.png'
import LoginPanel from './components/LoginPanel'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from './store/index'
import Menu from './components/Menu'
import TheTeam from './components/TheTeam';
import TheTasks from './components/TheTasks';
import ThePlan from './components/ThePlan';
import Time from './components/Time'
import Greetings from './components/Greetings'


const App = () => {
  const dispatch = useDispatch()
  const token = useSelector(state => state.auth.token)
  const hasRanderedFadeOutPanel = useSelector(state => state.auth.renderedFadeOutPanel)
  const [selectedTask, setSelectedTask] = useState()
  const [selectedDevs, setSelectedDevs] = useState([])
  // const [offsetY, setOffsetY] = useState(0)

  // const handleScroll = () => {
  //   setOffsetY(window.pageYOffset)
  // }

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll)
  //   return () => window.removeEventListener("scroll", handleScroll)
  // }, [])

  const TaskHandeler = (task) => {
      setSelectedTask(task)
  }

  const devsHandler = (devs) => {
    setSelectedDevs(devs)
  }

 

  return (
    <div className="App" >
      {/* style={{ transform: `translateY(-${offsetY * 0.8}px)` }} */}
      <div className="logoWrapper">
        <img src={logo} width="500" alt="hexartLogo" />
        {token && <div>
          <Time/>
          <button className="logoutBtn" onClick={() => dispatch(authActions.logout())}>Logout</button>
          <Menu />
        </div>}
      </div>
      {token && !hasRanderedFadeOutPanel && <div className="loginFormFade" >
      {/* style={{ transform: `translateY(${offsetY * 1}px)` }} */}
        <LoginPanel />
      </div>}
    
      <Greetings/>
      <div className="welcomeMsg" >
      {/* style={{ transform: `translateY(${offsetY * 0.5}px)` }} */}
        <div className='typing-demo'> Welcome to HEXART's Manager Panel </div>
      </div>
      {!token && <div className="loginForm" >
      {/* style={{ transform: `translateY(${offsetY * 1}px)` }} */}
        <LoginPanel />
      </div>}
      <div>
      {/* style={{ transform: `translateY(${offsetY * 0.5}px)` }} */}
        {token && <><TheTeam onSaveDevsHandler={devsHandler}/>
        <TheTasks onSaveSelectedTask={TaskHandeler}/>
        <ThePlan  newTask = {selectedTask} newDevs = {selectedDevs} /></>}
      </div>
    </div>
  );
}

export default App;
