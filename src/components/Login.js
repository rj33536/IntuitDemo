import { useState } from "react";

export default function LoginRegister(props) {
    const [username, setUsername] = useState("");
    const tryLogin = () => {
        props.onLogin(username);
    }
    const tryRegister = () => {
        props.onRegister(username)
    }
    return (
        <div className="login-container">
            <h1>Login and Registration</h1>
            <div>
                <input role="input" className="username" onChange={(e) => setUsername(e.target.value)} />
                <div className="login-btn-container">
                    <button name="login" disabled={username.length < 7} onClick={tryLogin} >Login</button>
                    <button name="register" disabled={username.length < 7} onClick={tryRegister} >Register</button>
                </div>
            </div>
        </div>
    );
}