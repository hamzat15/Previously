import React from 'react'
import { useState, useEffect } from "react"
import axios from 'axios';
import Layout from "./layout"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Nav } from 'react-bootstrap';

function search() {

    const [datas, setLogin] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [id, setId] = useState()
    const [token, setToken] = useState()

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);


    useEffect(() => {

        if (searchTerm === "")
            return
        axios.get("http://127.0.0.1:3001/searchUser/" + searchTerm , {

        })
            .then((result) => {
                console.log(result.data)
                setLogin(result.data);
                setIsLoaded(true);
                
            }),
            (error) => {
                setError(error);
                setIsLoaded(true);
                console.log(error);
            }
            
            
        }, [searchTerm])

   
    function block(e) {
        setId(e)
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            setToken(user.token)
        }
        
        if (id) {
            axios.post("http://127.0.0.1:3001/block", {
                    token: user.token,
                    id: id
            });
            alert("vous avez bien bloqué l'utilisateur")
        }
    };

    function add(e) {
        setId(e)
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            setToken(user.token)
        }
        
        if (id) {
            axios.post("http://127.0.0.1:3001/add", {
                    token: user.token,
                    id: id
            });
            alert("utilsateur ajouté ! ")

        }
    };


    return (
        <Layout>

        <>
            <div className="search">
                <input type="text"
                    name="searchbar"
                    className="inT"
                    placeholder="Search"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    />
            </div>

            <div className="search">
            {Object.keys(datas).map((item, i) => ( 
                
                <div className="lol" >
                    <ul>

                        <li><p>{datas[item].login}</p>
                        <Button variant="danger" id={datas[item].id} onClick={e => block(e.target.id)}>Bloquer</Button>
                        <Button variant="info" id={datas[item].id} onClick={e => add(e.target.id)}>Ajouter a la liste d'amis</Button>

                        </li>
                    </ul>
                </div>
                    ))}

            </div>
        </>
                    </Layout>
    )
}


export default search
