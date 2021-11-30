
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import axios from "axios";
import Layout from '../layout';



export default function SeriesD(data){
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [seriesInfo, setSeriesInfo] = useState([]);
    const router = useRouter()    
    const { id } = router.query;
    
    console.log(router.query.id)
    useEffect(() => {        
      if (!router.query.id)  
      return
          axios.post("http://127.0.0.1:3001/SerieShow", {   
              id: router.query.id,
              client_id: "6f3870b30551"
          })
        
          .then((result) => {
                console.log(result.data)
                  setSeriesInfo([result.data]);
              })
              // Remarque : il faut gérer les erreurs ici plutôt que dans
              // un bloc catch() afin que nous n’avalions pas les exceptions
              // dues à de véritables bugs dans les composants.
              .catch((error) => {
                  setError(error);
                  console.log(error);
              })
          }, [router.query.id]);

          console.log(seriesInfo)

     
    return(
        <Layout>
        {seriesInfo.map((series) => (
    <div class="workshopbody" >
      <div id="movie-card-list">
        
        <div class="movie-card" style={{backgroundImage:`url(${series.show.images.poster})`}}>
          <div class="color-overlay">
            <div class="movie-share">&nbsp;</div>

            <div class="movie-content">
              <div class="movie-header">
                <h1 class="movie-title">{series.show.title}</h1>

                <h5 class="movie-info">
                  Episodes : {series.show.episodes}
                </h5>
                <h5 class="movie-info">
                  DURÉE : {series.show.length} minutes
                </h5>
                <h5 class="movie-info">
                  Season : {series.show.seasons}
                  <br />
                  Note total : {series.show.notes.total}
                </h5> 
                <div >
                  <h5 class="movie-info">Genre :</h5>
                {Object.entries(series.show.genres).map(([key, value]) =>
                <ul className="genreList">

            <li> {value}</li>
                </ul>
            )}
                </div>
              </div>

              <p class="movie-desc">{series.show.description}</p>
           
            </div>
          </div>
        </div>
      </div>
    </div>
    ))}

    </Layout>
    )
}


// export async function getServerSideProps(context) {

//   const { id } = context.query;
//  const res = await fetch("http://127.0.0.1:3001/test")
//  const data = await res.json()

  // if (!data) {
  //   return {
  //     notFound: true,
  //   }
  // }

  // return {
  //   props: {data}, // will be passed to the page component as props
  // }
// }

