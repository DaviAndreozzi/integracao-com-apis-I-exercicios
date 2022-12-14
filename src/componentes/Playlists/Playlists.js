import React, { useState, useEffect } from "react";
import Musicas from "../Musicas/Musicas";
import axios from "axios";
// const playlistsLocal = [
//     {
//         id: 1,
//         name: "Playlist 1"
//     },
//     {
//         id: 2,
//         name: "Playlist 2"
//     },
//     {
//         id: 3,
//         name: "Playlist 3"
//     },
//     {
//         id: 4,
//         name: "Playlist 4"
//     },
// ]

function Playlists() {
  const [playlists, setPlaylists] = useState([]);

  const url = "https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists";

  const headers = { headers: { Authorization: "thiago-santiago-lovelace" } };

  console.log(playlists);

  useEffect(() => {
    axios
      .get(url, headers)
      .then((res) => {
        setPlaylists(res.data.result.list);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  return (
    <div>
      {playlists.map((playlist) => {
        return <Musicas key={playlist.id} playlist={playlist} />;
      })}
    </div>
  );
}

export default Playlists;
