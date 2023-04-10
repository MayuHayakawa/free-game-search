import React, { useState, useEffect, useContext } from 'react';
import Select from 'react-select';
import styled from 'styled-components';
import ThemeContext from '../../Context/ThemeContext';
import FetchData from './FetchData';

const SearchContainer = styled.div`
  width: 100%;
  font-family: "Toxigenesis";
  padding: 1rem 3rem;
  display: flex;
  justify-content: space-between;
  background-color: ${props => props.color === "dark" ? "var(--dark-bg-secondary)" : "var(--light-bg-secondary)" };
  p {
    color: ${props => props.color === "dark" ? "var(--dark-font-primary)" : "var(--light-font-primary)" };
  }
  @media screen and (max-width: 768px) {
    padding: 1rem 1rem;
  }

`

const SelectOption = () => {  
    const { theme } = useContext(ThemeContext);

    const platform = [
        {value:"all", label:"All"},
        {value:"pc", label:"PC"},
        {value:"web", label:"Web"},
    ];
    const genre = [
        // {value:"mmo", label: "All"},
        {value:"mmorpg", label: "MMORPG"},
        {value:"shooter", label: "Shooter"},
        {value:"strategy", label: "Strategy"},
        {value:"moba", label: "Moba"},
        {value:"card games", label: "Card games"},
        {value:"racing", label: "Racing"},
        {value:"strategy", label: "Strategy"},
        {value:"sports", label: "Sports"},
        {value:"social", label: "Social"},
        {value:"fighting", label: "Fighting"}
    ];

    const [ selectedPlatform, setSelectedPlatform ] = useState(platform[0]);
    const [ selectedGenre, setSelectedGenre ] = useState("");
    const [ platformParams, setPlatformParams ] = useState("");
    const [ genreParams, setGenreParams ] = useState("");

    useEffect(() => {
        setPlatformParams(selectedPlatform.value);
    },[selectedPlatform])

    useEffect(() => {
        if(selectedGenre.length != 0) {
            setGenreParams(selectedGenre);
            // const newArray = selectedGenre.map((value) => {
            //     return(value.value)
            // });
            // const obj = {...newArray};
            // const params = Object.values(obj).join('.');
            // setGenreParams(params);
        } else {
            setGenreParams("");
        }
    },[selectedGenre])

    return (
        <>
          <SearchContainer color={theme}>
              <div>
                  <p>Platform:</p>
                  <Select 
                      options={platform}
                      defaultValue={selectedPlatform}
                      onChange={(value) => {
                          value ? setSelectedPlatform(value) : platform[0];
                      }}
                      />
              </div>
              <div>
                  <p>Genre:</p>
                  <Select 
                      options={genre}
                      defaultValue={selectedGenre}
                      placeholder={"Select genre..."}
                      onChange={(value) => {
                          value ? setSelectedGenre([...value]) : null;
                      }}
                      isMulti
                  />
              </div>
          </SearchContainer>
          <FetchData platformParams={platformParams} genreParams={genreParams}/>
        </>
    )
}

export default SelectOption
