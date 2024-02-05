import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDriverId } from "../Redux/actions"
import { Box, Button, Flex,Image } from '@chakra-ui/react';





export default function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const driver = useSelector((state) => state.driver);


  useEffect(() => {
    dispatch(getDriverId(id));
  }, [id]);


  return (
    <Flex
    display={"flex"}
                flexDirection="row"  // Cambié a columna para alinear elementos verticalmente
                w={"1000px"}
                mx="auto"  // Para centrar horizontalmente
                mt="40px"
                mb={"130px"}  // Ajusta según tus necesidades
                borderRadius={"20px"}
                p="6"  // Añadí padding para mejorar la apariencia
                justifyContent="center"  // Para centrar verticalmente
                
                >
      <Box bg={"red"} w={"700px"} borderRadius={"20px"} mr={"20px"}
        h={"400px"}>
        <h1>Detalles del Driver</h1>
        <p>Nombre: {driver?.forename && driver?.forename} {driver?.surname && driver.surname} </p>
        {driver?.driverRef && <p>Apodo: {driver?.driverRef}</p>}
        {driver?.number && <p>Número: {driver?.number}</p>}
        <p>Nacionalidad: {driver?.nationality && driver?.nationality}</p>
        <p>Descripción: {driver?.description && driver?.description}</p>
        <p>Equipos: {driver?.teams && driver?.teams}</p>
        </Box>
        <Box>
      {driver?.image && (
        <Image
        w={"400px"}
        h={"400px"}
          src={driver?.image?.url || driver?.image}
          alt={`${driver?.forename} ${driver?.surname}`}
        />
        
      )}
      </Box>
      </Flex>
  );
};

