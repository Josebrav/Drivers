import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';
import { Box, Button, Flex } from '@chakra-ui/react';
import Carta from '../Card/Card';

export default function Cards() {
  const allDrivers = useSelector((state) => state.allDrivers);
  const [currentPage, setCurrentPage] = useState(1);
  const driversPerPage = 6;

  const totalDrivers = allDrivers.length;
  const totalPages = Math.ceil(totalDrivers / driversPerPage);

  const [driversToShow, setDriversToShow] = useState([]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * driversPerPage;
    const endIndex = startIndex + driversPerPage;
    setDriversToShow(allDrivers.slice(startIndex, endIndex));
  }, [allDrivers, currentPage]);

  const prevHandler = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const nextHandler = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div>
      <div>
        <Box display={"flex"} flexWrap={"wrap"} ml={"80px"}>
        {driversToShow.map(({ id, surname, name, image, teams, dob }) => {
          return (
            <Carta
              key={id}
              id={id}
              name={name?.surname || surname}
              image={image?.url || image}
              teams={teams}
              dob={dob && format(new Date(dob), 'dd/MM/yyyy')}
            />
          );
        })}
        </Box>
        <Flex
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="row"
          bgColor="gray.300"
          width={{ base: '100%', md: '2xl', lg: '100%' }}
          h="100%"
          borderBottomLeftRadius="md"
          borderBottomRightRadius="md"
          border="1px solid black"
        >
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            marginTop="1rem"
            marginBottom="1rem"
          >
            <Button
              color="black"
              bgColor="#009ED1"
              variant="outline"
              colorScheme="teal"
              onClick={prevHandler}
              disabled={currentPage === 1}
            >
              Anterior
            </Button>

            <Box as="span" marginLeft="1rem" marginRight="1rem" color={"white"}>
              Página {currentPage} de {totalPages}
            </Box>

            <Button
              color="black"
              bgColor="#009ED1"
              variant="outline"
              colorScheme="teal"
              onClick={nextHandler}
              disabled={currentPage === totalPages}
            >
              Siguiente
            </Button>
          </Box>
        </Flex>
      </div>
    </div>
  );
}