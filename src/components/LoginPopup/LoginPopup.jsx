import React, { useState, useContext } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { AuthContext } from '../../context/AuthContext'

const LoginPopup = ({ setShowLogin }) => {
    const [currState, setCurrState] = useState("Login")
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, signup, error, loading } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let success = false;
        if (currState === "Login") {
            success = await login(email, password);
        } else {
            success = await signup(name, email, password);
        }
        if (success) setShowLogin(false);
    };

    return (
        <div className='login-popup '>
            <form className="login-popup-container" onSubmit={handleSubmit}>
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {currState === "Login" ? <></> : <input type="text" placeholder='Your name' required value={name} onChange={e => setName(e.target.value)} />}
                    <input type="email" placeholder='Your email' required value={email} onChange={e => setEmail(e.target.value)} />
                    <input type="password" placeholder='Password' required value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <button disabled={loading}>{currState === "Sign Up" ? "Create account" : "Login"}</button>
                {error && <p style={{color:'red'}}>{error}</p>}
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continue, i agree to the terms of use & Privacy.</p>
                </div>
                {currState === "Login"
                    ? <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>
                    : <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
                }
            </form>
        </div>
    )
}

export default LoginPopup
