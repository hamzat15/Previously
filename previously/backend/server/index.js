const express = require("express");
const axios = require("axios");
const md5 = require("md5");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3001;
const limit = 10;


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.post("/user", (req, res) => {
  axios
    .post("https://api.betaseries.com/members/auth", {
      login: req.body.login,
      password: md5(req.body.password),
      client_id: "031c82786122",
    })
    .then((response) => {
      console.log(response.data);
      res.send(response.data);
    })
    .catch((error) => {
      console.log(error.message);
    });
});

app.get("/series", (req, res) => {
  axios
    .get(
      "https://api.betaseries.com/shows/list?key=031c82786122&order=popularity",
      {
        client_id: "031c82786122",
      }
    )
    .then((response) => {
      console.log(response.data);
      res.send(response.data);
    })
    .catch((error) => {
      console.log(error.message);
    });
});

// app.get("/test", (req, res) => {

//   axios.get("https://api.betaseries.com/shows/display", {

//     data: {
//       id: req.body.id,
//       client_id : "031c82786122"
//     }

//   })
//     .then(response => {
//       res.status(200).json(response.data)
//       console.log(response.data)
//     })
//     .catch(error => {
//       console.log(error.message)

//     })

//   })

app.post("/SerieShow", (req, res) => {
  console.log(req.query, req.params, req.body);
  axios({
    url: "https://api.betaseries.com/shows/display",
    method: "get",
    data: {
      id: req.body.id,
      client_id: req.body.client_id,
    },
    headers: {
      "Content-Type": "application/json",
      "X-BetaSeries-Key": "031c82786122",
    },
  })
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

app.post("/AddSerie", (req, res) => {
  console.log(req.query, req.params, req.body);
  axios
    .post("https://api.betaseries.com/shows/show", {
      id: req.body.id,
      client_id: req.body.client_id,
      token: req.body.token,
    })
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

app.post("/membreSeries", (req, res) => {
  console.log(req.body);
  axios
    .get("https://api.betaseries.com/shows/member", {
      headers: {
        Authorization: "Bearer " + req.body.token,
      },
      data: {
        id: req.body.id,

        client_id: req.body.client_id,
      },
    })
    .then((response) => {
      // console.log(response.data.shows)
      res.send(response.data.shows);
    })
    .catch((error) => {
      console.log(error.message);
    });
});

app.post("/DeletemembreSeries", (req, res) => {
  console.log(req.body);
  axios
    .delete("https://api.betaseries.com/shows/show", {
      headers: {
        Authorization: "Bearer " + req.body.token,
      },
      data: {
        id: req.body.id,

        client_id: req.body.client_id,
      },
    })
    .then((response) => {
      // console.log(response.data.shows)
      res.send(response.data.shows);
    })
    .catch((error) => {
      console.log(error.message);
    });
});

app.post("/archive", (req, res) => {
  console.log(req.body);
  axios.post("https://api.betaseries.com/shows/archive", {
      id: req.body.id,
      client_id: req.body.client_id,
      token: req.body.token,
    })
    .then((response) => {
      // console.log(response.data.shows)
      res.send(response.data.shows);
    })
    .catch((error) => {
      console.log(error.message);
    });
});

app.delete("/deletearchive", (req, res) => {
  console.log(req.body);
  axios.delete("https://api.betaseries.com/shows/archive", {
    data:{

      id: req.body.id,
      client_id: req.body.client_id,
      token: req.body.token,
    }
    })
    .then((response) => {
      // console.log(response.data.shows)
      res.send(response.data.shows);
    })
    .catch((error) => {
      console.log(error.message);
    });
});


app.post("/saisons", (req, res) => {
  console.log(req.body);
  axios.get("https://api.betaseries.com/shows/seasons", {
 
      data: {
        id: req.body.id,
        client_id: req.body.client_id,
        token: req.body.token
      },
    })
    .then((response) => {
      // console.log(response.data.shows)
      res.send(response.data);
    })
    .catch((error) => {
      console.log(error.message);
    });
});


app.post("/episodes", (req, res) => {2
  console.log(req.body);
  axios.get("https://api.betaseries.com/shows/episodes", {
 
      data: {
        id: req.body.id,
        client_id: req.body.client_id,
        token: req.body.token,
        season :req.body.season,
      },
    })
    .then((response) => {
      // console.log(response.data.shows)
      res.send(response.data);
    })
    .catch((error) => {
      console.log(error.message);
    });
});



app.post("/episodesdetail", (req, res) => {
  console.log(req.body);
  axios.get("https://api.betaseries.com/episodes/display", {
 
      data: {
        id: req.body.id,
        client_id: req.body.client_id,
        token: req.body.token,
      },
    })
    .then((response) => {
      // console.log(response.data.shows)
      res.send(response.data);
    })
    .catch((error) => {
      console.log(error.message);
    });
});



app.get("/amis", (req, res) => {
  axios.get("https://api.betaseries.com/friends/list", {
    headers: {
      Authorization: req.query.token
    },
    params: {
      client_id: "031c82786122"
    }

  })
    .then(response => {
      res.send(response.data)
    })
    .catch(error => {
      console.log(error.message)

    })
})


app.get("/blockee", (req, res) => {
  axios.get("https://api.betaseries.com/friends/list", {
    headers: {
      Authorization: req.query.token
    },
    params: {
      client_id: "031c82786122",
      blocked: true
    }

  })
    .then(response => {
      console.log(response.data.users)
      res.send(response.data.users)
    })
    .catch(error => {
      console.log(error.message)

    })
})

app.delete("/deletF", (req, res) => {

  axios.delete("https://api.betaseries.com/friends/friend", {
    headers: {
      Authorization: req.query.token
    },
    data: {
      client_id: "031c82786122",
      id : req.body.id
    }

  })
    .then(response => {
      console.log(response.data)
      res.send(response.data)
    })
    .catch(error => {
      console.log(error.message)

    })
})

app.post("/add", (req, res) => {

  axios.post("https://api.betaseries.com/friends/friend", {
    
      token: req.body.token,
      client_id: "031c82786122",
      id : req.body.id

  })
    .then(response => {
      console.log(response.data)
      res.send(response.data)
    })
    .catch(error => {
      console.log(error.message)

    })
})


app.post("/block", (req, res) => {

  axios.post("https://api.betaseries.com/friends/block", {
      token : req.body.token,
      client_id: "031c82786122",
      id : req.body.id

  })
    .then(response => {
      console.log(response.data)
      res.send(response.data)
    })
    .catch(error => {
      console.log(error.message)

    })
})


app.delete("/deblock", (req, res) => {

  axios.delete("https://api.betaseries.com/friends/block", {
    headers: {
      Authorization: req.query.token
    },
    data: {
      client_id: "031c82786122",
      id : req.body.id
    }
  })
    .then(response => {
      console.log(response.data)
      res.send(response.data)
    })
    .catch(error => {
      console.log(error.message)

    })
})




app.get("/searchUser/:id", (req, res) => {
  
  axios.get("https://api.betaseries.com/members/search", {
    data: {
      client_id: "031c82786122",
      login: req.params.id + "%",
      limit
    }
  })
  .then(response => {
    res.send(response.data.users)
  })
  .catch(error => {
    console.log(error.message)
  })
  console.log(req.body)
})


app.post("/userinfo", (req, res) => {
  console.log(req.body);
  axios.get("https://api.betaseries.com/members/infos", {
 
      data: {
        id: req.body.id,
        client_id: "031c82786122",
      },
    })
    .then((response) => {
      // console.log(response.data.shows)
      console.log(response.data)
      res.send(response.data);
    })
    .catch((error) => {
      console.log(error.message);
    });
});

app.post("/watched", (req, res) => {
  console.log(req.body);
  axios.post("https://api.betaseries.com/episodes/watched", {
 
  
        id: req.body.id,
        client_id: "6f3870b30551",
        token: req.body.token
      
    })
    .then((response) => {
      // console.log(response.data.shows)
      console.log(response.data)
      res.send(response.data);
    })
    .catch((error) => {
      console.log(error.message);
    });
});

app.post("/allepwatched", (req, res) => {
  console.log(req.body);
  axios.post("https://api.betaseries.com/episodes/watched", {
 
  
        id: req.body.id,
        client_id: "6f3870b30551",
        token: req.body.token,
        bulk: true
      
    })
    .then((response) => {
      // console.log(response.data.shows)
      console.log(response.data)
      res.send(response.data);
    })
    .catch((error) => {
      console.log(error.message);
    });
});


app.post("/deletwatched", (req, res) => {
  console.log(req.body);
  axios.delete("https://api.betaseries.com/episodes/watched", {
 data:{

   id: req.body.id,
   client_id: "6f3870b30551",
   token: req.body.token
  }
      
    })
    .then((response) => {
      // console.log(response.data.shows)
      console.log(response.data)
      res.send(response.data);
    })
    .catch((error) => {
      console.log(error.message);
    });
});

app.post("/commentaire", (req, res) => {
  console.log(req.body.id);
  axios.get("https://api.betaseries.com/comments/comments", {
 
      data: {
        client_id: "6f3870b30551",
        type : "episode",
        id: req.body.id,
        nbpp: "10",
        order: "asc",
        replies: "1"

      },
    })
    .then((response) => {
  
      console.log(response.data)
      res.send(response.data);
    })
    .catch((error) => {
      console.log(error.message);
    });
});
