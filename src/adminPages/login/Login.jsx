import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../adminRedux/apiCalls';
import { useHistory } from "react-router-dom";

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const dispatch = useDispatch();
    let history = useHistory();


    const handleClick = (e) => {
        e.preventDefault();
        if(isAdmin){
            const username = "shwetasharma";
            const password = "shwetasharma";
            login(dispatch, {username,password})
            .then(res => {history.push("/")})
            .catch(err => alert(err));
        }
        else{
            login(dispatch, {username, password})
            .then(res => {history.push("/")})
            .catch(err => alert(err));
        }
    }

    return (
        <div 
            style={{
                display: "flex", 
                flexDirection: "column",
                alignItems: "center", 
                justifyContent: "center",
                height: "100vh",
            }}
        >
            <input 
                type="text" 
                // placeholder="username" 
                onChange={e => setUsername(e.target.value)} 
                style={{
                    padding: "10px",
                    marginBottom: "20px",
                    width: "30%",
                }}
                placeholder={isAdmin ? "shwetasharma" : "username"}
            />
            <input 
                type="password" 
                // placeholder="password" 
                onChange={e => setPassword(e.target.value)} 
                style={{
                    padding: "10px",
                    marginBottom: "20px",
                    width: "30%",
                }}
                placeholder={isAdmin ? "shwetasharma" : "password"}
            />

            <div style={{margin:"20px"}}>
                <input type="checkbox" id="isAdmin" name="isAdmin" value={isAdmin} onChange={() => setIsAdmin(!isAdmin)}/> Check this box for auto fill with admin credentials.
            </div>

            <button 
                onClick={handleClick}
                style={{
                    padding: "10px",
                    width: "200px",
                    cursor:"pointer",
                    color:"white",
                    backgroundColor:"teal",
                    border:"none",
                    margin:"20px"
                }}
            >
                <h3>LOGIN</h3>
            </button>
            
            <a href={process.env.REACT_APP_CLIENT_URL}>
                <button
                    style={{
                        padding: "10px",
                        width: "150px",
                        cursor:"pointer",
                        fontSize:"10px",
                    }}
                >
                    GO TO CLIENT LOGIN 
                </button>
            </a> 
        </div>
    )
}

export default Login
