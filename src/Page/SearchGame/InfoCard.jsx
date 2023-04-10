import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ThemeContext from '../../Context/ThemeContext';

const Card = styled.div`
    width: 100%;
    font-family: "Lato";
    display: flex;
    flex-direction: column;
    background-color: ${props => props.color === "dark" ? "var(--dark-bg-primary)" : "var(--light-bg-primary)" };
    color: ${props => props.color === "dark" ? "var(--dark-font-primary)" : "var(--light-font-primary)" };
    cursor: pointer;
    transition-duration: 0.5s;
    &:hover {
        transform: scale(1.05,1.05);
    }
    .image-container {
        width: 100%;
        img {
            width: 100%;
        }
    }
    .description-container {
        padding: 0.5rem 1rem 1rem 1rem;
        h3 {
            font-size: 1.2rem;
            text-align: center;
            font-family: "LatoBold";
        }
        p {
            display: -webkit-box;
            overflow: scroll;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
        }
        div {
            padding-top: 0.5rem;
            display: flex;
            justify-content: space-between;
            p {
                display: block;
                padding: 0 0.3rem;
                font-size: 0.8rem;
                background-color: ${props => props.color === "dark" ? "var(--dark-font-primary)" : "var(--light-font-primary)" };
                color: ${props => props.color === "dark" ? "var(--dark-bg-primary)" : "var(--light-bg-primary)" };
            }
        }
    }
`

const InfoCard = ( game ) => {
    const { theme } = useContext(ThemeContext);
    const navigate = useNavigate();
    const {id, thumbnail, title, short_description, genre, platform, game_url} = game.data;

    function handleRoute(id) {
        navigate(`/searchgame/${id}`);
    }

  return (
    <Card 
        color={theme} 
        key={id}
        onClick={() => handleRoute(id)}
    >
        <div className="image-container">
            <img src={thumbnail} alt={title} />
        </div>
        <div className="description-container">
            <h3>{title}</h3>
            <p>{short_description}</p>
            <div>
                <p>{genre}</p>
                <p>{platform}</p>
            </div>
        </div>    
    </Card>
  )
}

export default InfoCard