import React, { useState, useEffect, useContext, useRef } from 'react';
import styled from 'styled-components';
import ThemeContext from '../../Context/ThemeContext';
import axios from 'axios';
import DisplayData from './DisplayData';

const FetchData = ({platformParams, genreParams}) => {
    const { theme } = useContext(ThemeContext);

    const [ gamesData, setGamesData] = useState([]);
    const [ pcGamesData, setPcGamesData ] = useState([]);
    const [ webGamesData, setWebGamesData ] = useState([]);
    const [ platformFilteredData, setPlatformFilteredData ] = useState([]);
    const [ filteredData, setFilteredData ] = useState([]);

    // useEffect(() => {
    //     if(platformParams && genreParams) {
    //         const options = {
    //             method: 'GET',
    //             url: 'https://free-to-play-games-database.p.rapidapi.com/api/filter',
    //             params: {tag: genreParams, platform: platformParams},
    //             headers: {
    //             'X-RapidAPI-Key': '1387894674mshb058706095cc610p195c77jsn534b25093058',
    //             'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
    //             }
    //         };
    //         setOptionData(options);
    //     }
    // },[platformParams,  genreParams])

    // useEffect(() => {
    //     if(optionData) {
    //         const fetchData = async () => {
    //             await axios.request(optionData).then(function (response) {
    //             console.log(response.data);
    //             }).catch(function (error) {
    //             console.error(error);
    //             });
    //         }
    //         fetchData();
    //     }
    // }, [optionData])

    // {get all game data}
    useEffect(() => {
        const options = {
            method: 'GET',
            url: 'https://free-to-play-games-database.p.rapidapi.com/api/games',
            headers: {
              'X-RapidAPI-Key': '1387894674mshb058706095cc610p195c77jsn534b25093058',
              'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
            }
          };          
        axios.request(options).then(function (response) {
            console.log(response.data);
            setGamesData(response.data);
            setFilteredData(response.data);
            setPlatformFilteredData(response.data);
            const pcGames = response.data.filter((value) => {
                return value.platform.toLowerCase().includes('pc');
            })
            setPcGamesData(pcGames);
            const webGames = response.data.filter((value) => {
                return value.platform.toLowerCase().includes('web');
            })
            setWebGamesData(webGames);
        }).catch(function (error) {
            console.error(error);
        });
    }, [])

    // {filter data by platform option}
    useEffect(() => {
        if(genreParams === "") {
            switch(platformParams) {
                case 'all':
                    setPlatformFilteredData(gamesData);
                    setFilteredData(gamesData);
                break;
                case 'pc':
                    setPlatformFilteredData(pcGamesData);
                    setFilteredData(pcGamesData);
                break;
                case 'web':
                    setPlatformFilteredData(webGamesData);
                    setFilteredData(webGamesData);
                break;
            }
        } else {
            let v = new Array;
            switch(platformParams) {
                case 'all':
                    v = gamesData;
                    setPlatformFilteredData(gamesData);
                break;
                case 'pc':
                    v = pcGamesData;
                    setPlatformFilteredData(pcGamesData);
                break;
                case 'web':
                    v = webGamesData;
                    setPlatformFilteredData(webGamesData);
                break;
            }
            filteredGenre(v);
        }
    }, [platformParams])
    
    // {filter data by genre option}
    useEffect(() => {
        if(genreParams != "") {
            filteredGenre(platformFilteredData);
        } else if(genreParams === "") {
            console.log(genreParams);
            setFilteredData(platformFilteredData);
        }
    }, [genreParams])

    // {method od filtering data by genre option}
    function filteredGenre(v) {
        let newArray = new Array;
        {genreParams.map((genre) => {
            const newFilter = v.filter((value) => {
                return value.genre.toLowerCase().includes(genre.value.toLowerCase());
            })
            console.log(newFilter);
            newArray = newArray.concat(newFilter);
        })}
        console.log(newArray);
        setFilteredData(newArray);
    }

  return (
    <div>
        <DisplayData filteredData={filteredData} />
    </div>
  )
}

export default FetchData