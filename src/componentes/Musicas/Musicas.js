import React, { useEffect, useState } from "react";
import { Botao, ContainerInputs, ContainerMusicas, InputMusica, Musica } from "./styled";
import axios from "axios";
// const musicasLocal = [{
//     artist: "Artista 1",
//     id: "1",
//     name: "Musica1",
//     url: "http://spoti4.future4.com.br/1.mp3"
// },
// {
//     artist: "Artista 2",
//     id: "2",
//     name: "Musica2",
//     url: "http://spoti4.future4.com.br/2.mp3"
// },
// {
//     artist: "Artista 3",
//     id: "3",
//     name: "Musica3",
//     url: "http://spoti4.future4.com.br/3.mp3"
// }]

export default function Musicas({ playlist: { id, name } }) {
  const [musicas, setMusicas] = useState([]);
  const [artista, setArtista] = useState("");
  const [musica, setMusica] = useState("");
  const [url, setURl] = useState("");

  const handleChange = (event) => {
    setArtista(event.target.value);
  };
  const handleChange2 = (event) => {
    setMusica(event.target.value);
  };
  const handleChange3 = (event) => {
    setURl(event.target.value);
  };
  console.log(artista, musica, url);
  const playlistID = id;
  const getAllTracks = () => {
    const url = `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${playlistID}/tracks`;
    const headers = { headers: { Authorization: "thiago-santiago-lovelace" } };

    const res = axios.get(url, headers).then((res) => {
      setMusicas(res.data.result.tracks);
    });
  };

  const addTrackToPlaylist = () => {
    const url = `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${playlistID}/tracks`;
    const headers = { headers: { Authorization: "thiago-santiago-lovelace" } };

    const body = {
      name: musica,
      artist: artista,
      url: url,
    };

    axios
      .post(url, body, headers)
      .then((res) => {
        getAllTracks();
      })
      .catch((error) => {
        alert(error);
      });
  };

  const deletarMusica = (idMusica) => {
    const url = `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${playlistID}/tracks/${idMusica}`;
    const headers = { headers: { Authorization: "thiago-santiago-lovelace" } };

    axios
      .delete(url, headers)
      .then((res) => {
        getAllTracks();
      })
      .catch((error) => {
        alert(error);
      });
  };

  useEffect(() => {
    getAllTracks();
  }, []);

  return (
    <ContainerMusicas>
      {/* <h2>{props.playlist.name}</h2> */}
      {musicas.map((musica) => {
        return (
          <Musica key={musica.id}>
            <h3>
              {musica.name} - {musica.artist}
            </h3>
            <audio src={musica.url} controls />
            <button onClick={() => deletarMusica(musica.id)}>X</button>
          </Musica>
        );
      })}
      <ContainerInputs>
        <InputMusica onChange={handleChange} placeholder="artista" value={artista} />
        <InputMusica onChange={handleChange2} placeholder="musica" value={musica} />
        <InputMusica onChange={handleChange3} placeholder="url" value={url} />
        <Botao onClick={addTrackToPlaylist}>Adicionar musica</Botao>
      </ContainerInputs>
    </ContainerMusicas>
  );
}
