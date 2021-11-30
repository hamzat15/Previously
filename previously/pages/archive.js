
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import axios from "axios";
import Layout from "./layout";




export default function Archive(data){
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [seriesInfo, setSeriesInfo] = useState([]);
    const [id, setId] = useState("")
    const [token, setToken] = useState("")

    
    useEffect(() => {  
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            setId(user.user.id);
            setToken(user.token)
        }
        
        console.log(user.user.id)
        console.log(user.token) 

          axios.post("http://127.0.0.1:3001/membreSeries", {   
                  id: user.user.id,
                  client_id: "6f3870b30551",
                  token: user.token
                
          })
        
          .then((result) => {
              setSeriesInfo(result.data);
              console.log(result)
              })
     
              // Remarque : il faut gérer les erreurs ici plutôt que dans
              // un bloc catch() afin que nous n’avalions pas les exceptions
              // dues à de véritables bugs dans les composants.
              .catch((error) => {
                  setError(error);
                  console.log(error);
              })
            
          }, []);

          console.log(seriesInfo)

     
          return (
            <Layout>
              {seriesInfo.map((series) => {
                if (series.user.archived === true) {
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
                               onClick={() => {
                                const user = JSON.parse(localStorage.getItem("user"));
                                if (user) {
                                    setToken(user.token)
                                }   
                                const serieId = series.id
                                console.log(series.id);
                                axios.delete("http://127.0.0.1:3001/deletearchive", {
                                    data:{
                                        id: serieId,
                                        client_id: "6f3870b30551",
                                        token: user.token
                                    }
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
                             alert("Vous avez bien désarchivé la serie !")
                             window.location.reload()
                            }}
                              >Supprimer</button>
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
