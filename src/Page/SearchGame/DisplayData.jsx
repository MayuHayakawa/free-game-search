import React, { useState, useEffect } from 'react';
import { SimpleGrid } from '@chakra-ui/react'
import InfoCard from './InfoCard';

const DisplayData = ( filteredData ) => {
    const [ displayData, setDisplayData ] = useState([]);

    useEffect(() => {
        if(filteredData != "") {
            setDisplayData(filteredData.filteredData);
        }
    },[filteredData])

  return (
    <>
        { displayData && displayData.length != 0 && (
            <SimpleGrid spacing={5} templateColumns='repeat(auto-fill, minmax(25rem, 1fr))'>
                {displayData.map((game) => {
                    return(
                        <InfoCard data={game}/>
                    )
                })}
            </SimpleGrid>
        )}
    </>
  )
}

export default DisplayData