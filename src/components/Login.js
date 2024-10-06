import { useState } from "react";
import {login, register} from "../services/UserService.js";

export default function LoginRegister(props) {
    const[username, setUsername] = useState("");
    const tryLogin = () => {
        login(username).then(response=>props.updateUser(username));
    }
    const tryRegister = () => {
        register(username).then(response=>props.updateUser(username));
    }
    return (
        <div>
            <input role="input" onChange={(e)=>setUsername(e.target.value)} />
            <button name="login" disabled={username.length<7} onClick={tryLogin} >Login</button>
            <button name="register" disabled={username.length<7} onClick={tryRegister} >Register</button>
        </div>
    );
}