import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { orderCards, filterAPIorDB, filterName, filterTeam, getAllDrivers } from "../Redux/actions";
import { useDispatch } from "react-redux";
import { Box, Button, Input, Select } from '@chakra-ui/react';
import axios from "axios";


export default function SearchBar() {
  const [name, setName] = useState("");
  const [teams, setTeams] = useState([]);
  const [team, setTeam] = useState("");

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get('http://localhost:3001/teams');
        setTeams(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTeams();
  }, []);



  const dispatch = useDispatch()


  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleFilterName(name);
    }
  };

  const handleOrder = event => {
    dispatch(orderCards(event.target.value));
  };

  const handleFilterName = (name) => {
    dispatch(filterName(name));
  };

  const handleFilterAPIorDB = event => {
    dispatch(filterAPIorDB(event.target.value));
  }
  const handleTeamChange = (event) => {
    const selectedTeam = event.target.value;
    setTeam(selectedTeam);
    dispatch(filterTeam(selectedTeam));
  };

  const handleResetFilters = (event) => {
    dispatch(getAllDrivers())
  }

  return (

    <Box bgAttachment={"fixed"} display="flex" bg='rgb(233 20 20 / 90%)' padding="15" alignItems="center" borderRadius={"20px"}>
      <Box mr={"15px"}>
        <Link to="/">
          <Button colorScheme="teal" borderRadius={"20px"}>
            Home
          </Button>
        </Link>
      </Box>
      <Box mr={"15px"}>
        <Link to="/form">
          <Button colorScheme="teal" borderRadius={"20px"}>Crear driver</Button>
        </Link>
      </Box>

      <Box mr={"15px"}>
        <Input
          type="search"
          value={name}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Buscar driver por nombre"
          variant="filled"
          borderRadius={"15px"}
        />
      </Box>
<Box>
<label>Ordenar por:</label>
</Box>
      <Box mr={"15px"}>
        
        <Select name="filterAPIorDB" id="filterAPIorDB" onChange={handleFilterAPIorDB} variant="filled" borderRadius={"15px"}>
          <option value="ALL">Traer todos</option>
          <option value="DB">Drivers DB</option>
          <option value="API">Drivers API</option>
        </Select>
      </Box>

      <Box mr={"15px"}>
        <Select name="order" id="order" onChange={handleOrder} variant="filled" borderRadius={"15px"}>
          <option value="A">A-Z</option>
          <option value="D">Z-A</option>
          <option value="Dob">Fecha de nacimiento</option>
        </Select>
      </Box>

      <Box mr={"15px"}>
        <Select name="teamFilter" id="teamFilter" borderRadius={"15px"} onChange={handleTeamChange} value={team} variant="filled">
          {teams.map((teamOption, index) => (
            <option key={index} value={teamOption}>
              {teamOption}
            </option>
          ))}
        </Select>
      </Box>

      <Box mr={"15px"}>
        <Button onClick={() => handleResetFilters()} colorScheme="teal" borderRadius={"20px"}>
          Reset filters
        </Button>
      </Box>
    </Box>
  );
}