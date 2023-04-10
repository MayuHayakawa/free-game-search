import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ThemeContext from '../../Context/ThemeContext';
import styled from 'styled-components';

const InfoContainer = styled.div`
  padding: 10vh 5rem;
  width: 100%;
  height: 100vh;
  font-family: "LatoBold";
  background-color: ${props => props.color === "dark" ? "var(--dark-bg-secondary)" : "var(--light-bg-secondary)" };
  color: ${props => props.color === "dark" ? "var(--dark-font-primary)" : "var(--light-font-primary)" };
  @media screen and (max-width: 768px) {
    padding: 10vh 1rem;
    height: 100%;
  }
`

const DescriptionContainer = styled.div`
  width: 100%;
  padding: 1rem 0;
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`

const MainDescriptionContainer = styled.div`
  width: 40%;
  .main-image {
    width: 100%;
    img {
      width: 100%;
    }
  }
  h1 {
    font-family: "Toxigenesis";
    font-size: 1.5rem;
    text-align: center;
  }
  .game-info {
    .dev-info {
      font-size: 0.9rem;
      margin-left: 0.3rem;
      display: flex;
      gap: 0.5rem;
    }
    .option-info {
      color: ${props => props.color === "dark" ? "var(--dark-bg-primary)" : "var(--light-bg-primary)" };
      p {
        display: inline-block;
        padding: 0 0.3rem;
        margin: 0 0.3rem;
        background-color: ${props => props.color === "dark" ? "var(--dark-font-primary)" : "var(--light-font-primary)" };
      }
    }
  }
  @media screen and (max-width: 768px) {
    width: 100%;
    position: relative;
    padding-bottom: 1rem;
    .game-info {
      font-size: 0.8rem;
      text-align: center;
      div {
        margin: 0;
        display: flex;
        justify-content: center;
        gap: 0.3rem;
      }
      .dev-info {
        margin-top: 0.3rem;
        font-size: 0.7rem;
      }
      &::after {
        content: "";
        display: block;
        width: 100%;
        height: 1px;
        background-color: ${props => props.color === "dark" ? "var(--dark-font-primary)" : "var(--light-font-primary)" };
        position: absolute;
        bottom:0;
      }
    }
  }
  @media screen and (max-width: 414px) {
    .game-info {
      font-size: 1rem;
      padding: 0 1rem;
     .dev-info {
        font-size: 1rem;
        flex-direction: column;
        gap: 0;
     }
    }
  }
`
const DetailContainer = styled.div`
  width: 50%;
  font-size: 1.2rem;
  display: -webkit-box;
  overflow: scroll;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 13;
  @media screen and (max-width: 768px) {
    width: 100%;
    font-size: 1rem;
    text-align: center;
  }
`

const ScreenshotsContainer = styled.div`
  width: 100%;
  .screenshot-container {
    display: flex;
    gap: 1rem;
    flex-direction: row;
  }
  @media screen and (max-width: 768px) {
    .screenshot-container {
      flex-direction: column;
    }
  }
  
`

const GameInfo = () => {
  const { theme } = useContext(ThemeContext);
  const { id } = useParams();
  const [ game, setGame ] = useState([]);
  const {description, developer, game_url, genre, platform, publisher, release_date, screenshots, thumbnail, title} = game;

  useEffect(() => {
    const options = {
      method: 'GET',
      url: 'https://free-to-play-games-database.p.rapidapi.com/api/game',
      params: {id: `${id}`},
      headers: {
        'X-RapidAPI-Key': '1387894674mshb058706095cc610p195c77jsn534b25093058',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
      }
    };
    axios.request(options).then(function (response) {
      console.log(response.data);
      setGame(response.data);
    }).catch(function (error) {
      console.error(error);
    });
  },[id])

  return (
    <InfoContainer color={theme}>
      <DescriptionContainer>
        <MainDescriptionContainer  color={theme}>
          <div className="main-image">
            <img src={thumbnail} alt={title}/>
          </div>
          <h1>
            <a href={game_url}>{title}</a>
          </h1>
          <div className="game-info">
            <div className="option-info">
              <p>{genre}</p>
              <p>{platform}</p>
            </div>
            <div className="dev-info">
              <p>developer: {developer}</p>
              <p>publiser: {publisher}</p>
              <p>Release: {release_date}</p>
            </div>
          </div>
        </MainDescriptionContainer>
        <DetailContainer>
          <p>{description}</p>
        </DetailContainer>
      </DescriptionContainer>
      <ScreenshotsContainer>
        { screenshots && screenshots.length != 0 && (
          <div className="screenshot-container">
            {screenshots.map((value) => {
              return(
                <div className="screenshot-image">
                  <img src={value.image} alt={title}/>
                </div>
              )
            })}
          </div>
        )}
      </ScreenshotsContainer>
    </InfoContainer>
  )
}

export default GameInfo