
// import "bootstrap/dist/css/bootstrap.min.css";
// import React, { useState, useEffect } from "react";
// import { useRouter } from 'next/router';
// import axios from "axios";
// import Layout from '../layout';
// import { getClientBuildManifest } from "next/dist/client/route-loader";




// export default function Myseries(data){
//     const [error, setError] = useState(null);
//     const [isLoaded, setIsLoaded] = useState(false);
//     const [seriesInfo, setSeriesInfo] = useState([]);
//     const [user, setUser] = React.useState("")
//     const [token, setToken] = useState()

//     const router = useRouter()   
//     const { id } = router.query;
    
   
    

//     useEffect(() => {        
//         const loggedInUser = localStorage.getItem("user");
//         if (loggedInUser) {
//             const token = JSON.parse(loggedInUser);
//             setUser(token.token);
//             console.log(token.token)
            
//         }
 
//         if (!router.query.id)  
//         return
//           axios.post("http://127.0.0.1:3001/AddSerie", {   
//               id: router.query.id,
//               client_id: "6f3870b30551",
//               token: token,
//           })
        
//           .then((result) => {
//                 console.log(result.data)
//                   setSeriesInfo([result.data]);
//               })
//               // Remarque : il faut gérer les erreurs ici plutôt que dans
//               // un bloc catch() afin que nous n’avalions pas les exceptions
//               // dues à de véritables bugs dans les composants.
//               .catch((error) => {
//                   setError(error);
//                   console.log(error);
//               })
//           }, [router.query.id]);

//           console.log(seriesInfo)

     
//     return(
//         <Layout>
//         {seriesInfo.map((series) => (
//     <div class="workshopbody" >
//       <div id="movie-card-list">
        
//         <div class="movie-card" style={{backgroundImage:`url(${series.show.images.poster})`}}>
//           <div class="color-overlay">
//             <div class="movie-share">&nbsp;</div>

//             <div class="movie-content">
//               <div class="movie-header">
//                 <h1 class="movie-title">{series.show.title}</h1>

//                 <h4 class="movie-info">
//                   Season : {series.show.seasons}
//                   <br />
//                   Langue : {series.show.description}
//                 </h4>
//               </div>

//               <p class="movie-desc">{}</p>
           
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//     ))}

//     </Layout>
//     )
// }


// // export async function getServerSideProps(context) {

// //   const { id } = context.query;
// //  const res = await fetch("http://127.0.0.1:3001/test")
// //  const data = await res.json()

//   // if (!data) {
//   //   return {
//   //     notFound: true,
//   //   }
//   // }

//   // return {
//   //   props: {data}, // will be passed to the page component as props
//   // }
// // }

//