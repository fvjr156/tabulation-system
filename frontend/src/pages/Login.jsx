import { useState } from 'react';
import './Login.css';
import { submit_login } from '../../api/login';

function Login(){
    const [username, set_username] = useState('');
    const [password, set_password] = useState('');
    const [showpassword, set_showpassword] = useState(false);

    return(
        <>
            <div className="login-main">
                <div className="header">
                    <h2>Log-in to TSPro Tabulation System</h2>
                </div>
                <div className='login-form-box'>
                    <label>Username: </label>
                    <input type='text' value={username} onChange={(e)=>set_username(e.target.value)}/>
                    <br/>
                    <label>Password: </label>
                    <input type={showpassword ? 'text' : 'password'} value={password} onChange={(e)=>set_password(e.target.value)}/>
                    <br/>
                    <label>Show Password: </label>
                    <input type='checkbox' value={showpassword} onChange={(e)=>set_showpassword(!showpassword)}/>
                    <div className='action-btn-box'>
                    <button onClick={(e)=>{
                        e.preventDefault();
                        submit_login(username, password);
                    }}>Log-in</button>
                </div>
                </div>
            </div>
        </>
    );
}

export default Login;