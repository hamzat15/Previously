import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

import Layout from "./layout";

function Home() {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [series, setSeries] = useState([]);
  const [archive, setArchive] = useState([]);
  const [token, setToken] = useState();
  const [id, setId] = useState("")

  var pressTimer;

  // Remarque : le tableau vide de dépendances [] indique
  // que useEffect ne s’exécutera qu’une fois, un peu comme
  // componentDidMount()
  useEffect(() => {
    /*var requestOptions = {
              method: 'GET',
              redirect: 'follow'
              };*/

    fetch("http://localhost:3001/series" /*, requestOptions*/, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      // .then(response => response.text())
      // .then(result => console.log(result))
      // .catch(error => console.log('error', error));
      .then((res) => res.json())
      .then(
        (result) => {
          setSeries(result.shows);
        },
        // Remarque : il faut gérer les erreurs ici plutôt que dans
        // un bloc catch() afin que nous n’avalions pas les exceptions
        // dues à de véritables bugs dans les composants.
        (error) => {
          setError(error);
          console.log(error);
        }
      );
  }, []);

  const Archive = () =>{
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
        setId(user.user.id);
        setToken(user.token)
    }
    
    console.log(user.user.id)     
    console.log(user.token) 

      axios.post("http://127.0.0.1:3001/archive", {   
              id: user.user.id,
              client_id: "6f3870b30551",
              token: user.token
            
      })
    
      .then((result) => {
        setArchive(result.data);
          console.log(result)
          })
 
          // Remarque : il faut gérer les erreurs ici plutôt que dans
          // un bloc catch() afin que nous n’avalions pas les exceptions
          // dues à de véritables bugs dans les composants.
          .catch((error) => {
            
              console.log(error);
          })
          alert("bien archivée")
  }

  return (
    <Layout>
      {series.map((series) => (
        <div class="workshopbody">
          <div id="movie-card-list">
            <div
              class="movie-card"
              style={{ backgroundImage: `url(${series.images.poster})` }}
            >
              <div class="color-overlay">
                <div class="movie-share">&nbsp;</div>

                <div class="movie-content">
                  <div class="movie-header">
                    <h1 class="movie-title">{series.title}</h1>

                    <h4 class="movie-info">
                      Season : {series.seasons}
                      <br />
                      Langue : {series.language}
                    </h4>
                  </div>

                  <p class="movie-desc">{}</p>
                  <button
                    className="btnn btnn-outline"
                    onMouseDown={ () => {
                      pressTimer = window.setTimeout(function () {
                        router.push(`/series/${series.id}`)}, 1000)
                        console.log('worked')
                        return false
                    }
                    }
                  >
                    Read more
                  </button>
                  <br></br>
                  <button
                    className="btnn btnn-outline"
                    onClick={() => {
                      const loggedInUser = localStorage.getItem("user");
                      if (loggedInUser) {
                        const token = JSON.parse(loggedInUser);
                        setToken(token.token);
                        console.log(token.token);

                        axios
                          .post("http://127.0.0.1:3001/AddSerie", {
                            id: series.id,
                            client_id: "6f3870b30551",
                            token: token.token,
                          })
                          .then((result) => {
                            console.log(result.data);
                            setSeriesInfo([result.data]);
                          })
                          // Remarque : il faut gérer les erreurs ici plutôt que dans
                          // un bloc catch() afin que nous n’avalions pas les exceptions
                          // dues à de véritables bugs dans les composants.
                          .catch((error) => {
                            setError(error);
                            console.log(error);
                          });
                        alert("Vous avez bien ajouter la serie !");
                      } else {
                        alert(
                          "veillez vous connectez pour ajouter une serie !"
                        );
                      }
                    }}
                  >
                   +
                  </button>
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Layout>
  );
}

export default Home;
