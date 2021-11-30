import "bootstrap/dist/css/bootstrap.min.css";
import { Dropdown, ButtonGroup, Button } from 'react-bootstrap';
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Layout from "../../layout";
import Link from "next/link";

export default function SeriesD(data) {

  const [episodedes, setEpisodedes] = useState([]);
  const [token, setToken] = useState("");
  const [comment, setComment] = useState("");
  const [idE, setIdEpisode] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setToken(user.token);
    }
    if (!router.query.id) return;
    axios
      .post("http://127.0.0.1:3001/episodesdetail", {
        id: router.query.id,
        client_id: "6f3870b30551",
        token: user.token,
      })

      .then((result) => {
        //   console.log(result.data.episode.id);
        setEpisodedes([result.data.episode]);
        setIdEpisode(result.data.episode.id)
      })
      // Remarque : il faut gérer les erreurs ici plutôt que dans
      // un bloc catch() afin que nous n’avalions pas les exceptions
      // dues à de véritables bugs dans les composants.
      .catch((error) => {
        setError(error);
        console.log(error);
      });

    }, [router.query.id]);

    useEffect(() => {
     
      
      axios
      .post("http://127.0.0.1:3001/commentaire", {
        
        id: idE,
        
      })
      
      .then((result) => {
        // console.log(result.data);
        setComment(result.data.comments);
      })
      .catch((error) => {
        setError(error);
        console.log(error);
      });
      
    }, [idE])
      
      // console.log(episodedes)
      
      
      return (
        <Layout>
 
      {episodedes.map((episode) => (

        <div className="b-desc">
          <img className="imgdesc" src={"https://api.betaseries.com/pictures/episodes?client_id=6f3870b30551&id=" + episode.id} alt=''></img>

          <h1 className="title-desc">{episode.title}</h1>

          <h4 >
            DATE : {episode.date}
            <br />
            NOTE TOTAL : {episode.note.total}
          </h4>
          <p>{episode.description}</p>


        </div>


      ))}
      <div className="commenntss1">
       <h3>Ajouter un commentaire:</h3>
       <input className="pass"
         type="textarea"
         align="center"
         placeholder="commenter"
       />
       <h1>Commentaire:</h1>
       </div>
      {Object.keys(comment).map((item, i) =>

        <div className="commenntss">
          
            
              <h3 className="loginname">{comment[item].login}</h3>
              <p>date : {comment[item].date}:</p>
              <p>{comment[item].text}</p>
      
           
          

        </div>
      )}
    </Layout>
  );
}
