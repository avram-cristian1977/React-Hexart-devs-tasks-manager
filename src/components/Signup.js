import './Signup.css'
import { useState } from 'react'



const Signup = () => {


    const [enteredEmail, setEnteredEmail] = useState("")
    const [enteredPassword, setEnteredPassword] = useState("")
    const [signupError, setSignupError] = useState("")


    const submitHandler = (ev) => {
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

        fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA0iMgsDbFZUG5acm-atDoCV3_adRgJbPY",
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
                return response.json().then(data => console.log(data))
            }
        }).then(data => {
            const myToken = data.idToken
            console.log({ myToken });
        }).catch(error => {
            alert(error.message)
        })

    }

    return <form onSubmit={submitHandler}>
        <div className="authWrapper">
            <div className="emailWrapper">
                <label >email </label>
                <input type="email" onChange={(ev) => setEnteredEmail(ev.target.value)} />
            </div>
            <div className="passwordWrapper">
                <label>password </label>
                <input type="password" onChange={(ev) => setEnteredPassword(ev.target.value)} />
            </div>
            <button>Sign up</button>
            <p>{signupError}</p>
        </div>
    </form>
}

export default Signup;