import React, { useEffect, useState } from "react";
import styled from "styled-components";
import instance from "../axios";
import requests from "../requests";
import Movies from "./Movies";
import Jumbotron from "./Jumbotron";

function Home() {
  const [jumbotronMovie, setJumbotronMovie] = useState([]);
  const fetchJumbotronData = async () => {
    const data = await instance.get(requests.fetchRecommended);
    // console.log(data.data.results);
    setJumbotronMovie(
      data.data.results[
        Math.floor(Math.random() * data.data.results.length - 1)
      ]
    );
    return data;
  };

  useEffect(() => {
    fetchJumbotronData();
  }, []);
  // console.log("jumbotron movie in Home.js", jumbotronMovie);

  const renderJumbotronMovie = () => (
    <Jumbotron jumbotronmovie={jumbotronMovie} type="movie" />
  );

  return (
    <Container>
      {renderJumbotronMovie()}
      {/* <Jumbotron /> */}

      <Movies
        title="Recommended For You"
        fetchUrl={requests.fetchRecommended}
        selectMovie={setJumbotronMovie}
      />
      <Movies title="Trending Now" fetchUrl={requests.fetchTrending} />
      <Movies
        title="Netflix Movies Originals"
        fetchUrl={requests.fetchNetflixMovieOriginals}
        selectMovie={setJumbotronMovie}
      />
      <Movies
        title="Netflix TV Originals"
        fetchUrl={requests.fetchNetflixTvOriginals}
        selectMovie={setJumbotronMovie}
      />
      <Movies
        title="Action Movies"
        fetchUrl={requests.fetchAction}
        selectMovie={setJumbotronMovie}
      />
      <Movies
        title="Comedy Movies"
        fetchUrl={requests.fetchComedy}
        selectMovie={setJumbotronMovie}
      />
    </Container>
  );
}

export default Home;

const Container = styled.main`
  overflow: hidden;
  min-height: calc(100vh - 70px);
  position: relative;

  &:before {
    background: url("/images/home-background.png") center center / cover
      no-repeat fixed;
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
  }
`;