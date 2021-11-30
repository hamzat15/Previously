import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import Layout from "./layout";

export default function MembreSeries(data) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [seriesInfo, setSeriesInfo] = useState([]);
  const [deleteserie, setDeleteserie] = useState([]);
  const [id, setId] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setId(user.user.id);
      setToken(user.token);
    }

    console.log(user.user.id);
    console.log(user.token);

    axios
      .post("http://127.0.0.1:3001/membreSeries", {
        id: user.user.id,
        client_id: "6f3870b30551",
        token: user.token,
      })

      .then((result) => {
        setSeriesInfo(result.data);
        console.log(result);
      })

      // Remarque : il faut gérer les erreurs ici plutôt que dans
      // un bloc catch() afin que nous n’avalions pas les exceptions
      // dues à de véritables bugs dans les composants.
      .catch((error) => {
        setError(error);
        console.log(error);
      });
  }, []);

  console.log(seriesInfo);

  return (
    <Layout>
      {seriesInfo.map((series) => {
        if (series.user.archived === false) {
          return (
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

                      <p class="movie-desc">{series.description}</p>
                      <button
                    className="btnn btnn-outline"
                    onClick={() => {

                      const loggedInUser = localStorage.getItem("user");
                      if (loggedInUser) {
                        const user = JSON.parse(loggedInUser);
                       setId(user.user.id);

                        axios
                          .post("http://127.0.0.1:3001/archive", {
                            id: series.id,
                            client_id: "6f3870b30551",
                            token: user.token
                          })
                          .then((result) => {
                            console.log(result.data);
                            setArchive([result.data]);
                          })
                          // Remarque : il faut gérer les erreurs ici plutôt que dans
                          // un bloc catch() afin que nous n’avalions pas les exceptions
                          // dues à de véritables bugs dans les composants.
                          .catch((error) => {
                            setError(error);
                            console.log(error);
                          });
                        alert("Vous avez bien archivé la serie !");
                        window.location.reload()
                      } else {
                        alert(
                          "veillez vous connectez pour archivé une serie !"
                        );
                      }
                    }}
                  >
                    Archiver la serie
                  </button>
                      <button className="btnn btnn-outline"
                      onClick={()=>{
                        const user = JSON.parse(localStorage.getItem("user"));
                        if (user) {
                          setId(user.user.id);
                          setToken(user.token);
                        }
                    
                        console.log(user.user.id);
                        console.log(user.token);
                    
                        axios
                          .post("http://127.0.0.1:3001/DeletemembreSeries", {
                            id: series.id,
                            client_id: "6f3870b30551",
                            token: user.token,
                          })
                    
                          .then((result) => {
                            setDeleteserie([result.data]);
                            console.log(result);
                          })
                    
                          // Remarque : il faut gérer les erreurs ici plutôt que dans
                          // un bloc catch() afin que nous n’avalions pas les exceptions
                          // dues à de véritables bugs dans les composants.
                          .catch((error) => {
                            setError(error);
                            console.log(error);
                          });
                          console.log(deleteserie)
                          alert("Vous avez supprimé cette série !")
                          window.location.reload()
                      }}  
                      >Supprimer</button>
                      <button className="btnn btnn-outline"
                      ><Link href ={`/saisons/${series.id}`}>Voir les saisons</Link></button>
                   
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
          );
        }
      })}
    </Layout>
  );
}
