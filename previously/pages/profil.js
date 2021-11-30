import React, { Component } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Container, Nav } from "react-bootstrap";
import Layout from "../pages/layout";

export function Profil() {
  const [login, setlogin] = useState();
  const [freinds, setFreinds] = useState();
  const [avatar, setAvatar] = useState("");
  const [Blockee, setBlockee] = useState("");
  const [error, setError] = useState(null);
  const [id, setId] = useState("");
  const [token, setToken] = useState("");

  const [isLoaded, setIsLoaded] = useState(false);

  function logout() {
    sessionStorage.clear();
    localStorage.clear();
    window.location.href = "/login";
  }

useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      setlogin(user.user.login);
      setToken(user.id);
    } 

    console.log(user.user.id)

    axios
      .post("http://127.0.0.1:3001/userinfo", {
      
          id: user.user.id,
    
      })
      .then((result) => {
        // console.log(result.data.member)
        setAvatar(result.data);
      })
      // Remarque : il faut gérer les erreurs ici plutôt que dans
      // un bloc catch() afin que nous n’avalions pas les exceptions
      // dues à de véritables bugs dans les composants.
      .catch((error) => {
        setError(error);
        console.log(error);
      });


}, []);
 console.log(avatar.member)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      setlogin(user.user.login);
      setToken(user.token);
    } else {
      alert("Connect toi le sang ;)");
      window.location.href = "/login";
    }

    axios
      .get("http://127.0.0.1:3001/amis", {
        params: {
          token: user.token,
        },
      })
      .then((result) => {
        setFreinds(result.data.users);
        setIsLoaded(true);
      })
      // Remarque : il faut gérer les erreurs ici plutôt que dans
      // un bloc catch() afin que nous n’avalions pas les exceptions
      // dues à de véritables bugs dans les composants.
      .catch((error) => {
        setError(error);
        setIsLoaded(true);
        console.log(error);
      });

    axios
      .get("http://127.0.0.1:3001/blockee", {
        params: {
          token: user.token,
        },
      })
      .then((result) => {
        console.log(result.data);
        setBlockee(result.data);
      })
      // Remarque : il faut gérer les erreurs ici plutôt que dans
      // un bloc catch() afin que nous n’avalions pas les exceptions
      // dues à de véritables bugs dans les composants.
      .catch((error) => {
        setError(error);
        console.log(error);
      });
  }, []);

  function block(e) {
    setId(e);
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setToken(user.token);
    }
    if (id) {
      axios.post("http://127.0.0.1:3001/block", {
        token: user.token,
        id: id,
      });
      window.location.href = "/profil";
    }
  }

  function deblock(e) {
    setId(e);
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setToken(user.token);
    }
    if (id) {
      axios.delete("http://127.0.0.1:3001/deblock", {
        params: {
          token: user.token,
        },
        data: {
          id: id,
        },
      });
      window.location.href = "/profil";
    }
  }

  function delte(e) {
    setId(e);
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setToken(user.token);
    }

    console.log(id);
    if (id) {
      axios.delete("http://127.0.0.1:3001/deletF", {
        params: {
          token: user.token,
        },
        data: {
          id: id,
        },
      });
      window.location.href = "/profil";
      alert("vous avez bien supprimé l'utilisateur");
    }
  }

  if (error) {
    return <div>Erreur : {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Chargement...</div>;
  } else {
    return (
      <Layout>
        <div>
          <div className="Dashboard">
            <h2></h2>
            <div>
              <div class="container mt-5 d-flex justify-content-center">
                <div class="card p-3">
                  <div class="d-flex align-items-center">
                    <div class="image">
                      {" "}
                      {Object.keys(avatar).map((item, i) =>
                      <img
                        src={avatar[item].avatar}
                        className="rounded-img"
                        width="155"
                        ></img>
                        )}
                        {" "}
                    </div>
                    <div class="ml-3 w-100">
                      <h4 class="mb-0 mt-0 text-center">{login}</h4>

                      <div class="button mt-2 d-flex flex-row align-items-center">
                        {" "}
                        <button class="btn btn-sm btn-outline-info w-100">
                          <Link href="/membreSeries">Voir Mes Series</Link>
                        </button>{" "}
                        <button class="btn btn-sm btn-outline-info w-100">
                          <Link href="/archive">Voir Mes Series archivée</Link>
                        </button>{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center mt-2 search" >
            <h1>Amis :</h1>
            {freinds.map((freinds) => (
              <div className="Dashboard">
                <h2></h2>
                <div>
                  <ul>
                    <li>
                      {freinds.login}
                      </li>
                      <button
                        id={freinds.id}
                        onClick={(e) => delte(e.target.id)}
                      >
                        supprimer
                      </button>
                      <button
                        id={freinds.id}
                        onClick={(e) => block(e.target.id)}
                      >
                        Bloquer
                      </button>
                  </ul>
                </div>
              </div>
            ))}
            <button>
              <Link href="/search">cherchez des amies</Link>
            </button>
            <h1>Utilisateurs bloqués : </h1>
            {Object.keys(Blockee).map((item, i) => (
              <div className="Dashboard">
                <h2></h2>
                <div>
                  <ul>
                    <li>
                      {Blockee[item].login}
                      <button
                        id={Blockee[item].id}
                        onClick={(e) => deblock(e.target.id)}
                      >
                        debloquer
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
        </div>
      </Layout>
    );
  }
}

export default Profil;
