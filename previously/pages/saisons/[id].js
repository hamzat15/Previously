import "bootstrap/dist/css/bootstrap.min.css";
import { Dropdown, ButtonGroup, Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Layout from "../layout";
import Link from "next/link";

export default function SeriesD(data) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [saisons, setSaisons] = useState([]);
  const [episodes, setEpisodes] = useState([]);

  const [token, setToken] = useState("");
  const [episodeId, setEpisodeId] = useState("");
  const router = useRouter();
  const { id } = router.query;
  var pressTimer;

  console.log(router.query.id);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setToken(user.token);
    }
    if (!router.query.id) return;
    axios
      .post("http://127.0.0.1:3001/saisons", {
        id: router.query.id,
        client_id: "6f3870b30551",
        token: user.token,
      })

      .then((result) => {
        console.log(result.data);
        setSaisons(result.data.seasons);
      })
      // Remarque : il faut gérer les erreurs ici plutôt que dans
      // un bloc catch() afin que nous n’avalions pas les exceptions
      // dues à de véritables bugs dans les composants.
      .catch((error) => {
        setError(error);
        console.log(error);
      });
  }, [router.query.id]);

  console.log(saisons);

  const Episode = (e) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setToken(user.token);
    }
    if (!router.query.id) return;

    axios
      .post("http://127.0.0.1:3001/episodes", {
        id: router.query.id,
        season: e.target.value,
        client_id: "6f3870b30551",
        token: user.token,
      })

      .then((result) => {
        console.log(result.data.episodes);
        setEpisodes(result.data.episodes);
      })
      // Remarque : il faut gérer les erreurs ici plutôt que dans
      // un bloc catch() afin que nous n’avalions pas les exceptions
      // dues à de véritables bugs dans les composants.
      .catch((error) => {
        setError(error);
        console.log(error);
      });
  };
  console.log(episodes);

  const Watched = (e) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setToken(user.token);
    }
    if (!router.query.id) return;

    axios
      .post("http://127.0.0.1:3001/watched", {
        id: idd,
        client_id: "6f3870b30551",
        token: user.token,
      })

      .then((result) => {
        console.log(result.data);
        setWatched(result.data);
      })
      // Remarque : il faut gérer les erreurs ici plutôt que dans
      // un bloc catch() afin que nous n’avalions pas les exceptions
      // dues à de véritables bugs dans les composants.
      .catch((error) => {
        setError(error);
        console.log(error);
      });

    const idd = episodes.id;
  };

  return (
    <Layout>
      <div className="buttonss">
        <h1 className="text-center">List of saison</h1>
        <select name="seaons" onChange={Episode}>
          <option>Choisir une seasons and episodes</option>
          {saisons.map((series) => (
            <option value={series.number} key={series.number}>
            Saison:  {series.number}
            </option>
          ))}
        </select>
      </div>
      {episodes.map((episode) =>
        episode.user.seen === true ? (
          <div className="buttonss">
            <Dropdown as={ButtonGroup}>
              <Button
                variant="success"
                onMouseDown={() => {
                  pressTimer = window.setTimeout(function () {
                    router.push(`/saisons/episodes/${episode.id}`);
                  }, 1000);
                  return false;
                }}
              >
                Episode {episode.episode} <span id="nvueT">a été vue</span>
              </Button>

              <Dropdown.Toggle
                split
                variant="success"
                id="dropdown-split-basic"
              />

              <Dropdown.Menu>
                <Dropdown.Item 
                  onClick={() => {
                    const user = JSON.parse(localStorage.getItem("user"));
                    if (user) {
                      setToken(user.token);
                    }
                    if (!router.query.id) return;
  
                    axios
                      .post("http://127.0.0.1:3001/deletwatched", {
                        id: episode.id,
                        client_id: "6f3870b30551",
                        token: user.token,
                      })
  
                      .then((result) => {
                        console.log(result.data);
                        setEpisode(result.data);
                      })
                      // Remarque : il faut gérer les erreurs ici plutôt que dans
                      // un bloc catch() afin que nous n’avalions pas les exceptions
                      // dues à de véritables bugs dans les composants.
                      .catch((error) => {
                        setError(error);
                        console.log(error);
                      });
                      window.location.reload()
                  }}
                >
                  marquer comme Non-vue
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        ) : (
          <div className="buttonss">
            <Dropdown as={ButtonGroup}>
              <Button
                variant="success"
                onMouseDown={() => {
                  pressTimer = window.setTimeout(function () {
                    router.push(`/saisons/episodes/${episode.id}`);
                  }, 1000);
                  return false;
                }}
              >
                Episode {episode.episode} <span id="nvue">non vue</span>
              </Button>

              <Dropdown.Toggle
                split
                variant="success"
                id="dropdown-split-basic"
              />

              <Dropdown.Menu>
                <Dropdown.Item
                  
                  onClick={() => {
                    const user = JSON.parse(localStorage.getItem("user"));
                    if (user) {
                      setToken(user.token);
                    }
                    if (!router.query.id) return;

                    axios
                      .post("http://127.0.0.1:3001/watched", {
                        id: episode.id,
                        client_id: "6f3870b30551",
                        token: user.token,
                      })

                      .then((result) => {
                        console.log(result.data);
                        setEpisode(result.data);
                      })
                      // Remarque : il faut gérer les erreurs ici plutôt que dans
                      // un bloc catch() afin que nous n’avalions pas les exceptions
                      // dues à de véritables bugs dans les composants.
                      .catch((error) => {
                        setError(error);
                        console.log(error);
                      });
                      window.location.reload()
                  }}
                >
                  Marquer comme vue
                </Dropdown.Item>
                <Dropdown.Item
                 onClick={() => {
                  const user = JSON.parse(localStorage.getItem("user"));
                  if (user) {
                    setToken(user.token);
                  }
                  if (!router.query.id) return;

                  axios
                    .post("http://127.0.0.1:3001/allepwatched", {
                      id: episode.id,
                      client_id: "6f3870b30551",
                      token: user.token,
                    })

                    .then((result) => {
                      console.log(result.data);
                      setEpisode(result.data);
                    })
                    // Remarque : il faut gérer les erreurs ici plutôt que dans
                    // un bloc catch() afin que nous n’avalions pas les exceptions
                    // dues à de véritables bugs dans les composants.
                    .catch((error) => {
                      setError(error);
                      console.log(error);
                    });
                    window.location.reload()
                }}
                >
                  Marquer comme vue ainsi que tous les précédents
                </Dropdown.Item>
                <Dropdown.Item href="#/action-3">Commenter</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        )
      )}
    </Layout>
  );
}
