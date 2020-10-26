import React, { useEffect, useState } from "react";
import Header from "./Header";
import Content from "./Content";
import SongList from "./SongList"

const Top50 = () => {
  const [allSongs, setAllSongs] = useState([]);

  useEffect(() => {
    // this is where we fetch the data from the server and add it to state.
    fetch("/top50")
      .then((res) => res.json())
      .then((json) => {
        setAllSongs(json.data);
      });
  }, []);

  console.log("Top50.js: allSongs: ", allSongs);

  return (
    <>
      <Header pageTitle="Top 50 Songs Streamed on Spotify" />
      <Content>Need to render all of the songs here...</Content>
      <SongList songs={allSongs}></SongList>
    </>
  );
};

export default Top50;
