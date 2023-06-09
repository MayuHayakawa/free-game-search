import React, { useContext } from 'react';
import SelectOption from './SelectOption';
import { Link as Scroll } from 'react-scroll';
import styled from 'styled-components';
import ThemeContext from '../../Context/ThemeContext';
import { BsArrowUpCircleFill } from 'react-icons/bs';

const SearchGameCotainer = styled.div`
  position: absolute;
  padding: 7rem 1rem 1rem 1rem;
  background-color: ${props => props.color === "dark" ? "var(--dark-bg-secondary)" : "var(--light-bg-secondary)" };
  @media screen and (max-width: 768px) {
  padding-top: 5rem;
  }
`

const UpToTopButton = styled.div`
  height: 3rem;
  width: 3rem;
  position: fixed;
  right: 2rem;
  bottom: 2rem;
  font-size: 3rem;
  cursor: pointer;
  color: ${props => props.color === "dark" ? "var(--dark-font-primary)" : "var(--light-font-primary)" };
  z-index: 10;
`

const SearchGame = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <SearchGameCotainer
      color={theme}
      id="page-top"
    >
      <SelectOption />
      <Scroll
        to="page-top"
        smooth={true}
      >
        <UpToTopButton color={theme}>
          <BsArrowUpCircleFill />
        </UpToTopButton>
      </Scroll>
    </SearchGameCotainer>
  )
}

export default SearchGame