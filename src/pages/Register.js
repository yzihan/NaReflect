import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { redirect } from "react-router-dom";
import React, { useState } from "react";
var connect_config = require('../config.json');

const Register = (props) => {
    const [email, setEmail] = useState('');
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const navigate = useNavigate();

    //const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        var serverUrl = connect_config.server_host+'/register/'
        fetch(serverUrl, {
            method: 'POST',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'email':email, 'user':user, 'password':pass})
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
                navigate('/account');
            }
          })
    }

    return (
        <div className='auth-form-container' onSubmit={handleSubmit}>
            <form className='register-form' >
            <label className='h1' style={{textAlign:'center'}}>NaReflect</label>
                <div >
                    <button className='h2-dark' onClick={() => navigate("/login")}>Login</button>
                    <label className='hspace'></label>
                    <label className='h2-light'>Register</label>
                </div>
                <input className='input-box' value={email} onChange={e => setEmail(e.target.value)} type='email' placeholder='Your email address' id='email' name='email' />
                <input className='input-box' value={user} onChange={e => setUser(e.target.value)} type='user' placeholder='Your name' id='user' name='user' />
                <input className='input-box' value={pass} onChange={e => setPass(e.target.value)} type='password' placeholder='Your password' id='password' name='password' />
                <label className='vspace'> </label>

                <button className='button-dark' type='submit'>Start</button>
            </form>
        </div>
    );
};

export default Register;
