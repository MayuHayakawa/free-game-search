import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ThemeContext from '../../Context/ThemeContext';
import styled from 'styled-components';

import mainImageLight from "../../assets/image/background-light.jpeg";
import mainImageDark from "../../assets/image/background-dark.jpeg";

const Main = styled.div`
    position: relative;
    width: 100vw;
    height: 100vh;
    .imageContainer {
        width: 100%;
        height: 100%;
        background-color: ${props => props.color === "dark" ? "var(--dark-bg-primary)" : "var(--light-bg-primary)" };
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            opacity: ${props => props.color === "dark" ? "30%" : "50%" };
        }
    }
    .titleContainer {
      position: absolute;
      width: 100%;
      top: 45%;
      left: 50%;
      transform: translate(-50%, -50%);
      -webkit-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      h1 {
          font-size: 2.3rem;
          font-family: "Recharge";
          color: ${props => props.color === "dark" ? "var(--dark-font-primary)" : "var(--light-font-primary)" };
          text-align: center;
      }
    }
    .buttonContainer {
      position: absolute;
      top: 65%;
      left: 50%;
      transform: translate(-50%, -50%);
      -webkit-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
    }
  @media screen and (max-width: 768px) {
    .titleContainer {
      h1 {
        font-size: 1.5rem;
      }
    }
  }
`

const Button = styled.button`
  width: 100%;
  font-family: "Recharge";
  margin: 0 auto;
  padding: 1rem 2.5rem;
  background: transparent;
  border: none;
  outline: none;
  font-size: 1.5rem;
  color: ${props => props.color === "dark" ? "var(--dark-font-primary)" : "var(--light-font-primary)" };
  &::after,
  &::before {
    content: "";
    position: absolute;
    height: 100%;
    width: 50%;
    transform: skewX(30deg);
    transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    z-index: -2;
  }
  &::before {
    background-color: ${props => props.color === "dark" ? "var(--dark-font-secondary)" : "var(--light-font-secondary)" };
    top: -1rem;
    left: 0rem;
  }
  &::after {
    background-color: ${props => props.color === "dark" ? "var(--dark-bg-third)" : "var(--light-bg-third)" };
    top: 1rem;
    left: 8rem;
  }
  &:hover {
    &::before,
    &::after {
      top: 0;
      transform: skewx(0deg);
    }
    &::after {
      left: 0rem;
    }
    &::before {
      left: 8.75rem;
    }
  }
  @media screen and (max-width: 768px) {
    font-size: 0.9rem;
    padding: 1rem 1.5rem;
    &::after,
    &::before {
      width: 70%;
    }
    &::before {
      left: -3rem;
    }
    &::after {
      left: 5rem;
    }
  }  
  @media screen and (max-width: 414px) {
    font-size: 0.8rem;
    padding: 1rem 1rem;
  }  
`

const Hero = () => {
    const { theme } = useContext(ThemeContext);

  return (
    <Main color={theme}>
        <div className='imageContainer'>
            <img src={theme === "light" ? mainImageLight : mainImageDark} />
        </div>
        <div className='titleContainer'>
            <h1>Start searching for games free to play</h1>
        </div>
        <div className='buttonContainer'>
          <Link to="/searchgame">
              <Button color={theme}>GET STARTED</Button>
          </Link>
        </div>
    </Main>
  )
}

export default Hero