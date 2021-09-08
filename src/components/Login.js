import './Login.css'
import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { authActions } from '../store/index'


const Login = () => {

    const [enteredEmail, setEnteredEmail] = useState("")
    const [enteredPassword, setEnteredPassword] = useState("")
    const [signupError, setSignupError] = useState("")

    const dispatch = useDispatch()


    const loginHandler = (ev) => {
        ev.preventDefault()
        console.log("fire");
        if (!enteredEmail || !enteredPassword) {
            setSignupError("All fields are required")
            return
        }
        if (!enteredEmail.includes("@")) {
            setSignupError("Invalid email address")
            return
        }
        if (enteredPassword.trim().length < 5) {
            setSignupError("Password must be at least 6 digits long.")
            return
        }

        fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA0iMgsDbFZUG5acm-atDoCV3_adRgJbPY",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: enteredEmail,
                    password: enteredPassword,
                    returnSecureToken: true
                })
            }
        ).then(response => {
            if (response.ok) {
                console.log({ response });
                return response.json()
            } else {
                return response.json().then(data => {
                    let errorMessage = "Auth failed"
                    throw new Error(errorMessage)
                })
            }
        }).then(data => {
            const myToken = data.idToken;
            dispatch(authActions.login(myToken))
            console.log({ myToken }, "sign in");

        }).catch(error => {
            console.log(error.message)
        })
    }

    return <>
        <form onSubmit={loginHandler}>
            <div className="loginWrapper">
                <div className="emailWrapper">
                    <label>email </label>
                    <input type="email" onChange={(ev) => setEnteredEmail(ev.target.value)} />
                </div>
                <div className="passwordWrapper">
                    <label>password </label>
                    <input type="password" onChange={(ev) => setEnteredPassword(ev.target.value)} />
                </div>
                <button className="loginBtn">Login</button>
                <p>{signupError}</p>
            </div>
        </form>
    </>
}

export default Login;