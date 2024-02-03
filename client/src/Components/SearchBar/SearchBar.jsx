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
        
            <Box display="flex" bg="red" padding="4" alignItems="center">
              <Box>
                <Link to="/home">
                  <Button colorScheme="teal" mr="4">
                    Home
                  </Button>
                </Link>
          
                <Link to="/form">
                  <Button colorScheme="teal">Crear driver</Button>
                </Link>
              </Box>
          
              <Box ml="4">
                <Input
                  type="search"
                  value={name}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Buscar driver por nombre"
                  variant="filled"
                />
              </Box>
          
              <Box ml="4">
                <label>Ordenar por:</label>
                <Select name="filterAPIorDB" id="filterAPIorDB" onChange={handleFilterAPIorDB} variant="filled">
                  <option value="ALL">Traer todos</option>
                  <option value="DB">Drivers DB</option>
                  <option value="API">Drivers API</option>
                </Select>
              </Box>
          
              <Box ml="4">
                <Select name="order" id="order" onChange={handleOrder} variant="filled">
                  <option value="A">A-Z</option>
                  <option value="D">Z-A</option>
                  <option value="Dob">Fecha de nacimiento</option>
                </Select>
              </Box>
          
              <Box ml="4">
                <Select name="teamFilter" id="teamFilter" onChange={handleTeamChange} value={team} variant="filled">
                  {teams.map((teamOption, index) => (
                    <option key={index} value={teamOption}>
                      {teamOption}
                    </option>
                  ))}
                </Select>
              </Box>
          
              <Box ml="4">
                <Button onClick={() => handleResetFilters()} colorScheme="teal">
                  Reset filters
                </Button>
              </Box>
            </Box>
      );
}