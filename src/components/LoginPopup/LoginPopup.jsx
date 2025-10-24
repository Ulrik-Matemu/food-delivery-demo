// Added Form Validation and Password Strength Indicator

import React, { useState, useContext } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { AuthContext } from '../../context/AuthContext'

const LoginPopup = ({ setShowLogin }) => {
    const [currState, setCurrState] = useState("Login")
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [validationErrors, setValidationErrors] = useState({});
    const { login, signup, error, loading } = useContext(AuthContext);

    // Password strength checker
    const checkPasswordStrength = (pwd) => {
        const checks = {
            length: pwd.length >= 8,
            uppercase: /[A-Z]/.test(pwd),
            lowercase: /[a-z]/.test(pwd),
            number: /[0-9]/.test(pwd),
            special: /[!@#$%^&*(),.?":{}|<>]/.test(pwd)
        };
        
        const strength = Object.values(checks).filter(Boolean).length;
        return { checks, strength };
    };

    // Validate form fields
    const validateForm = () => {
        const errors = {};

        // Name validation (only for signup)
        if (currState === "Sign Up") {
            if (!name.trim()) {
                errors.name = "Name is required";
            } else if (name.trim().length < 2) {
                errors.name = "Name must be at least 2 characters";
            } else if (!/^[a-zA-Z\s]+$/.test(name)) {
                errors.name = "Name can only contain letters and spaces";
            }
        }

        // Email validation
        if (!email.trim()) {
            errors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.email = "Please enter a valid email address";
        }

        // Password validation
        if (!password) {
            errors.password = "Password is required";
        } else if (currState === "Sign Up") {
            const { checks } = checkPasswordStrength(password);
            
            if (!checks.length) {
                errors.password = "Password must be at least 8 characters";
            } else if (!checks.uppercase) {
                errors.password = "Password must contain at least one uppercase letter";
            } else if (!checks.lowercase) {
                errors.password = "Password must contain at least one lowercase letter";
            } else if (!checks.number) {
                errors.password = "Password must contain at least one number";
            } else if (!checks.special) {
                errors.password = "Password must contain at least one special character";
            }
        } else if (password.length < 6) {
            errors.password = "Password must be at least 6 characters";
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Clear previous validation errors
        setValidationErrors({});

        // Validate form
        if (!validateForm()) {
            return;
        }

        let success = false;
        if (currState === "Login") {
            success = await login(email, password);
        } else {
            success = await signup(name, email, password);
        }
        if (success) setShowLogin(false);
    };

    // Get password strength indicator
    const getPasswordStrength = () => {
        if (!password || currState === "Login") return null;
        
        const { strength } = checkPasswordStrength(password);
        const colors = ['#ef4444', '#f97316', '#eab308', '#84cc16', '#22c55e'];
        const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
        
        return {
            color: colors[strength - 1],
            label: labels[strength - 1],
            width: `${(strength / 5) * 100}%`
        };
    };

    const passwordStrength = getPasswordStrength();

    return (
        <div className='login-popup'>
            <form className="login-popup-container" onSubmit={handleSubmit}>
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {currState === "Sign Up" && (
                        <div className="input-group">
                            <input 
                                type="text" 
                                placeholder='Your name' 
                                value={name} 
                                onChange={e => {
                                    setName(e.target.value);
                                    setValidationErrors(prev => ({ ...prev, name: '' }));
                                }}
                                className={validationErrors.name ? 'input-error' : ''}
                            />
                            {validationErrors.name && (
                                <span className="error-message">{validationErrors.name}</span>
                            )}
                        </div>
                    )}
                    
                    <div className="input-group">
                        <input 
                            type="email" 
                            placeholder='Your email' 
                            value={email} 
                            onChange={e => {
                                setEmail(e.target.value);
                                setValidationErrors(prev => ({ ...prev, email: '' }));
                            }}
                            className={validationErrors.email ? 'input-error' : ''}
                        />
                        {validationErrors.email && (
                            <span className="error-message">{validationErrors.email}</span>
                        )}
                    </div>
                    
                    <div className="input-group">
                        <input 
                            type="password" 
                            placeholder='Password' 
                            value={password} 
                            onChange={e => {
                                setPassword(e.target.value);
                                setValidationErrors(prev => ({ ...prev, password: '' }));
                            }}
                            className={validationErrors.password ? 'input-error' : ''}
                        />
                        {validationErrors.password && (
                            <span className="error-message">{validationErrors.password}</span>
                        )}
                        
                        {/* Password strength indicator */}
                        {passwordStrength && password && (
                            <div className="password-strength">
                                <div className="strength-bar">
                                    <div 
                                        className="strength-bar-fill" 
                                        style={{ 
                                            width: passwordStrength.width, 
                                            backgroundColor: passwordStrength.color 
                                        }}
                                    />
                                </div>
                                <span 
                                    className="strength-label" 
                                    style={{ color: passwordStrength.color }}
                                >
                                    {passwordStrength.label}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
                
                <button disabled={loading}>
                    {loading ? "Processing..." : (currState === "Sign Up" ? "Create account" : "Login")}
                </button>
                
                {error && <p className="error-message server-error">{error}</p>}
                
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, I agree to the terms of use & privacy policy.</p>
                </div>
                
                {currState === "Login"
                    ? <p>Create a new account? <span onClick={() => {
                        setCurrState("Sign Up");
                        setValidationErrors({});
                    }}>Click here</span></p>
                    : <p>Already have an account? <span onClick={() => {
                        setCurrState("Login");
                        setValidationErrors({});
                    }}>Login here</span></p>
                }
            </form>
        </div>
    )
}

export default LoginPopup