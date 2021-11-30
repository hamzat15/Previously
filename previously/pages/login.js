import React from 'react'
import axios from "axios"
import { useState, useEffect } from "react";
import Layout from './layout';


import PropTypes from 'prop-types';




async function loginUsers(credentials) {
    return fetch('http://localhost:3001/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
        
}

function login({ setToken }) {

    const [login, setlogin] = useState("");
    const [password, setPassword] = useState("");

const log = async e => {
    e.preventDefault();
    const token = await loginUsers({
        login,
        password
    });
    const user = { login, password };
    const response = await axios.post(
        "http://localhost:3001/user",
        user
      );
    
        if(response.data.token){
        localStorage.setItem("user", JSON.stringify(response.data))
        window.location.href = '/profil';

        }
}


return (
    <Layout >

    <div className="login-form">
        
                     <h1>Connection</h1>
                  <form onSubmit={log}>

                    <input className="un"
                        type="text"
                        align="center"
                        placeholder="username"
                        onChange={(e) =>
                            setlogin(e.target.value)
                        }
                    />

                    <input className="pass"
                        type="password"
                        align="center"
                        placeholder="Password"
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                    />
                    <button className="submitLog">connexion</button>
                </form>


          
    </div>
    </Layout>
)

}

login.propTypes = {
    setToken: PropTypes.func.isRequired
};

export default login
