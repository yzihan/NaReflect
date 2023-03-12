import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from "react";
var connect_config = require('../config.json');

const Login = (props) => {
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        var serverUrl = connect_config.server_host+'/login/'
        fetch(serverUrl, {
            method: 'POST',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'user':user, 'password':pass})
          })
          .then(response => response.json())
          .then(response => {
            //alert('get user:'+window.sessionStorage.getItem('user_name'));
            if (response.res === false) {alert('[Error] '+response.message);}
            else {
                console.log(response)
                window.sessionStorage.setItem('user_name', user);
                window.sessionStorage.setItem('user_id', response.id);
                window.sessionStorage.setItem('title', '');
                window.sessionStorage.setItem('style', 'real photo high resolution');
                window.sessionStorage.setItem('desc', '');
                navigate('/theme');
            }
          })
    }

    return (
        <div className='auth-form-container'  onSubmit={handleSubmit}>
            <form className='login-form'>
                <label className='h1' style={{textAlign:'center'}}>NaReflect</label>
                <div >
                    <label className='h2-light'>Login</label>
                    <label className='hspace'></label>
                    <button className='h2-dark' type="button" onClick={() => navigate("/register")}>Register</button>
                </div>
                <input className='input-box' value={user} onChange={e => setUser(e.target.value)} placeholder='User ID' id='user' name='user' />
                <input className='input-box' value={pass} onChange={e => setPass(e.target.value)} type='password' placeholder='Keywords' id='password' name='password' />
                <label className='vspace'> </label>
                <label className='vspace'> </label>
                <button className='button-dark' type='submit'>Start</button>
            </form>
        </div>
    );
};

export default Login;
